import { Injectable, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Slide } from '@shared/data-core';
import { isPresent } from '@shared/common';
import { IFormField, FormFieldType } from '@shared/interfaces';

import { Mission, Missions, Missiondata, Missiondatas, Missiondescriptions, Session } from '@operations/data';

import { BasePageBaseComponent } from '../base-page/base-page.component';

import { sortBy, isNumber, keys, forEach, reduce } from 'lodash-es';

@Injectable()
export class MissionResultsPageBaseComponent extends BasePageBaseComponent implements OnInit, OnChanges, OnDestroy {

    @Input() mission: Mission;
    public slidesNumber: number;
    public photosNumber: number;
    public questionsNumber: number;

    public distance: number;
    public photos: Array<any>;
    public missiondata: Missiondata;
    public slides: Array<any>;
    public formDefinition: Array<IFormField>;
    public hasTodos: boolean;
    public hasAudit: boolean;

    public formDefinitionOrdered: Array<IFormField>;
    public orderedCount: number;
    public formDefinitionSatisfactory: Array<IFormField>;
    public satisfactoryCount: number;
    public formDefinitionUnsatisfactory: Array<IFormField>;
    public unsatisfactoryCount: number;
    public formDefinitionNonapplicable: Array<IFormField>;
    public nonapplicableCount: number;

    protected missions: Missions;
    protected missiondatas: Missiondatas;

    private isDestroyed: boolean;

    initExtraProviders() {
        this.missions = this.injector.get<Missions>(Missions);
        this.missiondatas = this.injector.get<Missiondatas>(Missiondatas);

        this.photos = [];
        this.orderedCount = 0;
        this.satisfactoryCount = 0;
        this.unsatisfactoryCount = 0;
        this.nonapplicableCount = 0;
    }

    ngOnInit() {
        (this.session as Session).selectedMission = this.mission;
        if (this.mission && this.mission.location) {
            this.session.selectedLocation = this.mission.location;
        }
        this.photos = [];
        this.init();
        this.updateFilter();

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

    init() {

    }

    ngOnChanges(changes?) {
        if (!this.isDestroyed) {

        }
    }

    ngOnDestroy() {
        this.session.selectedLocation = null;
        (this.session as Session).selectedMission = null;
        this.isDestroyed = true;
    }

    updateFilter() {
        this.missiondata = null;
        if (this.mission.status !== 'finished' || this.mission.type === 'todo' || !this.mission || !this.mission._id) {
            this.cd.markForCheck();
            return;
        }

        this.isLoading = true;
        this.missions.getData(this.mission._id).subscribe(data => {
            // if (this.isDestroyed) {
            //     return;
            // }
            this.missiondata = data;
            if (!this.missiondata) {
                //this.log.log('cant find mission data for mission : ' + this.mission._id);
            } else if (this.mission && this.mission.type === 'memo') {
                this.processSlides({ slides: this.missions.getMemoSlides() });
            } else if (this.missiondata.missiondescription) {
                this.processSlides(this.missiondata.missiondescription);
            }
            if (this.missiondata && this.missiondata._geolocSave && this.missiondata._geolocSave.length === 2 && this.mission._geoloc && this.mission._geoloc.length === 2) {
                this.distance = this.geoloc.getDistance(this.missiondata._geolocSave[1], this.missiondata._geolocSave[0], this.mission._geoloc[1], this.mission._geoloc[0]);
            }
            this.updateTodo().then(() => {
                if (!this.isDestroyed) {
                    this.updateOrderedFields();
                    this.updateSatisfactoryCount();
                    this.isLoading = false;
                    this.cd.detectChanges();
                }
            });

        });
    }

    processSlides(description) {
        this.slides = description.slides || [];
        this.formDefinition = Missiondescriptions.getFields(description, null, [FormFieldType.information]);
        this.photos = this.missiondatas.extractPhotos(this.formDefinition, this.missiondata || {}, null);
        this.init();
    }

    updateOrderedFields() {
        this.orderedCount = 0;
        if (this.formDefinition) {
            this.formDefinitionOrdered = sortBy(this.formDefinition.filter(f => isNumber(f.reportOrder)), f => f.reportOrder);
            this.formDefinitionOrdered.forEach(field => {
                if (this.missiondata && this.missiondata[field.name] && isPresent(this.missiondata[field.name].value)) {
                    this.orderedCount += 1;
                }
            });
        }
    }

    updateSatisfactoryCount() {
        this.formDefinitionNonapplicable = [];
        this.formDefinitionSatisfactory = [];
        this.formDefinitionUnsatisfactory = [];
        this.nonapplicableCount = 0;
        this.satisfactoryCount = 0;
        this.unsatisfactoryCount = 0;
        this.hasAudit = false;
        if (this.formDefinition) {
            let formDefinition = this.formDefinition;
            this.formDefinition = [];
            formDefinition.forEach(field => {
                if (field.valuesType && this.missiondata && this.missiondata[field.name] && isPresent(this.missiondata[field.name].value)) {
                    let values: Array<any> = [].concat(this.missiondata[field.name].value);
                    values.forEach(key => {
                        let type = field.valuesType.find(t => t.key === key);
                        if (type) {
                            if (type.value === 'satisfactory') {
                                this.satisfactoryCount += 1;
                                this.formDefinitionSatisfactory.push(field);
                            } else if (type.value === 'unsatisfactory') {
                                this.unsatisfactoryCount += 1;
                                this.formDefinitionUnsatisfactory.push(field);
                            } else if (type.value === 'nonapplicable') {
                                this.nonapplicableCount += 1;
                                this.formDefinitionNonapplicable.push(field);
                            } else {
                                this.formDefinition.push(field);
                            }
                        } else {
                            this.formDefinition.push(field);
                        }
                    });

                } else {
                    this.formDefinition.push(field);
                }
            });
            this.hasAudit = this.satisfactoryCount + this.unsatisfactoryCount + this.nonapplicableCount > 0;
        }
    }

    updateTodo() {
        return new Promise((resolve, reject) => {
            if (this.missiondata) {
                let todoKeys = [];
                keys(this.missiondata).forEach(key => {
                    let d = this.missiondata[key];
                    if (d && d.fieldType === FormFieldType.todo && d.value && d.value.values && d.value.values.length > 0) {
                        this.hasTodos = true;
                        todoKeys.push(key);
                    } else if (d && d.fieldType === FormFieldType.task && d.value && d.value.length > 0) {
                        this.hasTodos = true;
                        this.missiondata[key].value = [];
                        todoKeys.push(key);
                    } else if (d && d.tasks && d.tasks.length > 0) {
                        this.hasTodos = true;
                        this.missiondata[key].tasks = [];
                        todoKeys.push(key);
                    }
                });
                if (todoKeys.length > 0) {
                    this.isLoading = true;
                    this.missions.getTodosData(todoKeys, this.mission._id).subscribe(ret => {
                        forEach(todoKeys, key => {
                            forEach(ret.data, (mission: Mission) => {
                                //mode todo
                                let originalFieldNames = [].concat(mission.originalFieldName);
                                if (originalFieldNames.indexOf(key) >= 0 && this.missiondata && this.missiondata[key] && this.missiondata[key].fieldType === FormFieldType.todo) {
                                    let id = this.missiondata[key].value._id;
                                    this.missiondata[key].value = mission.todo;
                                    this.missiondata[key].value._id = id;
                                } else if (originalFieldNames.indexOf(key) >= 0 && this.missiondata && this.missiondata[key] && this.missiondata[key].fieldType === FormFieldType.task) {
                                    //mode independant task
                                    this.missiondata[key].value = this.missiondata[key].value.concat(mission.todo.values.filter((t: any) => t.originalFieldName === key));
                                } else if (originalFieldNames.indexOf(key) >= 0 && this.missiondata && this.missiondata[key]) {
                                    //mode task
                                    this.missiondata[key].tasks = this.missiondata[key].tasks || [];
                                    this.missiondata[key].tasks = this.missiondata[key].tasks.concat(mission.todo.values.filter((t: any) => t.originalFieldName === key));
                                }
                            });
                        });
                        // if (todo) {
                        //     this.missiondata[key].value = todo;
                        // }
                        this.isLoading = false;
                        resolve(ret);
                    });
                } else {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    }

}