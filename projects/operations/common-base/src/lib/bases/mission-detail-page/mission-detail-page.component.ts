import { Injectable, OnInit, Input } from '@angular/core';

import { Slide } from '@shared/data-core';
import { FormFieldType } from '@shared/interfaces';
import { Mission, Missions } from '@operations/data';

import { BasePageBaseComponent } from '../base-page/base-page.component';
import { UtilsService } from '../../services/utils/utils.service';
import { reduce } from 'lodash-es';

@Injectable()
export class MissionDetailPageBaseComponent extends BasePageBaseComponent implements OnInit {
    @Input() public mission: Mission;
    public slidesNumber: number;
    public photosNumber: number;
    public questionsNumber: number;

    protected missions: Missions;

    initExtraProviders() {
        super.initExtraProviders();
        this.missions = this.injector.get<Missions>(Missions);
    }

    ngOnInit() {
        this.missions.getWithSlides(this.mission).subscribe((mission: Mission) => {
            if (!mission || !mission.description || !mission.description.slides) {
                return;
            }
            this.photosNumber = reduce(mission.description.slides, (total: number, slide: Slide) => {
                total += (slide.items || []).filter(f => f.type === FormFieldType.photo).length;
                (slide.items || []).filter(f => f.type === FormFieldType.multiphotos).forEach(f => {
                    total += Math.max(f.minPhotos || 0, 1);
                });
                return total;
            }, 0);
            this.questionsNumber = reduce(mission.description.slides, (total: number, slide: Slide) => {
                total += (slide.items || []).filter(f => f.type !== FormFieldType.photo && f.type !== FormFieldType.information).length;
                return total;
            }, 0);
            this.slidesNumber = mission.description.slides.length;
            this.cd.markForCheck();
        });
    }

    onBook(ev: { detail: 'book' | 'start' | 'unbook' }) {
        let state = ev.detail;
        (this.utils as UtilsService).bookMission(state, this.mission).subscribe();
        this.closeModal();
    }

}
