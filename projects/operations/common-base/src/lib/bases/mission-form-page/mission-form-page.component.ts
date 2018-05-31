import { Injectable, OnInit, Input, ViewChild, OnDestroy, EventEmitter } from '@angular/core';
import { FormFieldType } from '@shared/interfaces';
import { Network, Position } from '@shared/common';
import { Version, Slide, MissionDescription } from '@shared/data-core';
import { Track, RavenErrorHandler } from '@shared/data-live';
import { Mission, Missions, Session, Missiondescriptions } from '@operations/data';
import { AppFormDynamicComponent } from '@app/common-base';

import { BasePageBaseComponent } from '../base-page/base-page.component';
import { UtilsService } from '../../services/utils/utils.service';
import { Observable, Observer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { merge, isEmpty } from 'lodash-es';

@Injectable()
export class MissionFormPageBaseComponent extends BasePageBaseComponent implements OnInit, OnDestroy {
    @Input() mission: Mission;
    @Input() missionDescription: MissionDescription;

    @ViewChild('form') form: AppFormDynamicComponent;

    public slides: Array<Slide>;
    public data: any;
    public mode: string;
    public liveAnswers: boolean;
    public progress: any;
    public isSavingMission: boolean;
    public savingProgress: any;

    protected cacheChanged$: Observable<any>;
    protected cacheChangedObserver: Observer<any>;
    protected savingProgressEmitter: EventEmitter<any>;

    protected isDestroyed: boolean;

    protected missions: Missions;
    protected version: Version;
    protected session: Session;
    protected track: Track;
    protected raven: RavenErrorHandler;
    protected network: Network;

    initExtraProviders() {
        this.missions = this.injector.get<Missions>(Missions);
        this.version = this.injector.get<Version>(Version);
        this.track = this.injector.get<Track>(Track);
        this.raven = this.injector.get<RavenErrorHandler>(RavenErrorHandler);
        this.network = this.injector.get<Network>(Network);

        this.slides = [];
        this.cacheChanged$ = new Observable<any>(observer => this.cacheChangedObserver = observer);
        this.cacheChanged$.pipe(debounceTime(500)).subscribe(res => {
            this.onUpdateCache();
        });
        this.savingProgressEmitter = new EventEmitter<any>();
    }

    ngOnInit() {
        this.mode = this.mission ? this.mission.type : 'mission';
        this.initForm();
    }

    ngOnDestroy() {
        this.isDestroyed = true;
    }

    initForm() {
        this.data = {};
        this.session.selectedLocation = null;

        if (this.mode === 'service' && this.missionDescription) {
            this.initFormService();
            if (this.missionDescription.versionmin && this.version.isCurrentVersionHigherThan(this.missionDescription.versionmin) === false) {
                this.dialog.alert('ERROR', 'MISSIONBOOKVERSION');
                this.onCancel();
            }
        } else if (this.mode === 'mission' && this.mission && !isEmpty(this.mission)) {
            this.initFormMission();
            if (this.mission.versionmin && this.version.isCurrentVersionHigherThan(this.mission.versionmin) === false) {
                this.dialog.alert('ERROR', 'MISSIONBOOKVERSION').then(() => {
                    this.onCancel();
                });
            }
        } else if (this.mode === 'memo' && this.mission && !isEmpty(this.mission)) {
            this.initFormMemo();
        } else if (!this.slides || this.slides.length <= 0) {
            this.onCancel();
        }
    }

    initFormMission() {
        this.liveAnswers = this.mission.quizzMode === 'LIVEANSWERS';
        this.missions.getMissionDataFromCache(this.mission._id).subscribe(data => {
            if (this.isDestroyed) {
                return;
            }
            this.data = data;
            if (this.mission && this.mission.isService) {
                this.data = merge(this.data, this.mission.serviceData);
            }
            if (this.mission && this.mission.description) {
                this.slides = (this.mission.description.slides || []); //.filter(s => s.service !== true);
                this.slides.forEach(s => {
                    if (s.service && s.items) {
                        s.items.forEach(f => {
                            f.readonly = true;
                        });
                    }
                });
            }
            if (this.mission && this.mission.location) {
                this.session.selectedLocation = this.mission.location;
            }

            this.hideFromMobile();
            this.cd.markForCheck();
        });
        this.missions.getMissionProgressFromCache(this.mission._id).subscribe(progress => {
            if (progress) {
                this.progress = progress;
            }
        });
    }

    initFormMemo() {
        this.slides = this.missions.getMemoSlides(true);
        this.missions.getMemoData(this.mission).subscribe(data => {
            if (this.isDestroyed) {
                return;
            }
            this.data = data || {};
            this.cd.markForCheck();
        });

    }

    initFormService() {
        this.slides = (this.missionDescription.slides || []).filter(s => s.service === true);
        if (this.slides.length > 0) {
            this.slides[0].items = this.slides[0].items || [];
            if (this.slides[0].items.filter(f => f.name === 'missiontitle').length <= 0) {
                this.slides[0].items.unshift(
                    { type: FormFieldType.text, name: 'missiontitle', title: 'TITLE', required: false }
                );
            }
        }
        if (this.mission && this.mission.serviceData) {
            this.data = this.mission.serviceData;
            this.missions.getMissionProgressFromCache(this.mission._id).subscribe(progress => {
                if (progress) {
                    this.progress = progress;
                }
            });
        }
        let user = this.session.user;
        if (!this.authentication.isAdmin() && user.location && user.location._id) {
            this.data.location = { value: user.location };
        } else if (!this.authentication.isAdmin() && user.locationRef) {
            this.broker.getById('locations', user.locationRef).subscribe(loc => {
                this.data.location = { value: loc };
            });
        } //else {
        if ((user.location && user.location._id || user.locationRef) && this.authentication.hasRole('store')) {
            //dont add form store users
        } else {
            this.slides.push({
                title: this.translate.get('STORE'),
                hideheader: true,
                items: [<any>{ type: FormFieldType.location, name: 'location', linktoprofile: { name: 'location' }, required: true, showMap: true }]
            });
        }

        this.hideFromMobile();
    }

    hideFromMobile() {
        //we keep them when in ionic because of sanofi image reco kpis, otherwise they will not be save
        if (this.slides && this.coreConfig.isWeb()) {
            this.slides.forEach(s => {
                if (s && s.items && s.items.length > 0) {
                    s.items = s.items.filter(f => !f.hideMobile);
                }
            });
        }
    }

    onDataChanged(data) {
        this.data = data;
        this.cacheChangedObserver.next(data);
    }

    onUpdateCache() {
        if (this.mode === 'mission' && this.mission) {
            this.missions.addMissionDataToCache(this.mission, this.data);
            this.missions.addMissionProgressToCache(this.mission, this.progress);
        }
    }

    updateDataFieldType(data) {
        if (this.slides) {
            let fields = Missiondescriptions.getFieldsFromSlides(this.slides);
            this.missions.updateDataFieldType(data, fields);
        }
    }

    getData() {
        let data = { ...this.data };
        this.updateDataFieldType(data);
        return data;
    }

    onSave(data) {
        if (!this.isSavingMission) {
            this.data = data;
            this.onActualSave();
        }
    }

    onCancel() {
        this.closeModal(null);
    }

    onClose(mission: Mission) {
        this.closeModal(mission);
    }

    onActualSave() {
        this.isSavingMission = true;
        let data: any = this.getData();
        this.onDataChanged(data);
        this.savingProgressEmitter.subscribe((retVal) => {
            this.savingProgress = retVal;
            this.cd.markForCheck();
        });
        if (this.mode === 'mission' && this.mission) {
            let saveText = (this.mission && this.mission.type === 'poll') ? 'POLLSAVEDSUCCESS' : 'MISSIONSAVEDSUCCESS';
            this.dialog.confirm('SAVE', 'SAVECONFIRM').then((retVal) => {
                if (retVal) {
                    if (this.network.isOffline()) {
                        this.missions.savePending(this.mission).then(() => {
                            this.isSavingMission = false;
                            this.onClose(this.mission);
                        });
                    } else {
                        this.geoloc.getLocation(true).then((position: Position) => {
                            if (position) {
                                data._geolocSave = [position.longitude, position.latitude];
                            }
                        }, err => { }).then(() => {
                            if (this.mission) {
                                this.track.track('finish.mission', { title: this.mission.title, type: this.mission.type, _id: this.mission._id });
                            }
                            this.missions.finish(this.mission, data, this.savingProgressEmitter).subscribe((ret) => {
                                this.isSavingMission = false;
                                let selectedMission = this.mission;
                                (this.utils as UtilsService).showMissionSavingSuccess(selectedMission, saveText);
                                this.onClose(selectedMission);
                            }, (err) => {
                                //if (err === 'QUIZZNOTVALID') {
                                this.raven.track(err, { type: 'MISSIONS-FORM ON SAVE ERROR' });
                                this.isSavingMission = false;
                                (this.utils as UtilsService).showMissionSavingError(this.mission, err);
                                this.cd.markForCheck();
                                //}
                            });
                        });
                    }
                } else {
                    this.isSavingMission = false;
                    this.cd.markForCheck();
                }
            });
        }

        if (this.mode === 'memo') {
            this.dialog.confirm('SAVE', 'SAVECONFIRM').then((retVal) => {
                if (retVal) {
                    this.missions.saveData(this.mission, data).subscribe(() => {
                        this.isSavingMission = false;
                        this.onClose(this.mission);
                    });
                }
            });
        }

        if (this.mode === 'service') {
            this.dialog.confirm('SAVE', 'SAVECONFIRM').then((retVal) => {
                if (retVal) {
                    this.missions.finishService(this.missionDescription, data, this.savingProgressEmitter).subscribe((mission) => {
                        this.isSavingMission = false;
                        if (this.mission && this.mission._id) {
                            this.missions.removeMissionServiceFromCache(this.mission._id);
                        }
                        let successText = this.missionDescription && this.missionDescription.successtext ? this.missionDescription.successtext : 'SERVICESAVEDSUCCESS';
                        setTimeout(() => {
                            (this.utils as UtilsService).showMissionSavingSuccess(mission, successText);
                        }, 300);
                        this.onClose(mission);
                    }, (err) => {
                        this.isSavingMission = false;
                        (this.utils as UtilsService).showMissionSavingError(null, err);
                        this.cd.markForCheck();
                    });
                } else {
                    this.isSavingMission = false;
                    this.cd.markForCheck();
                }
            });
        }
    }

}
