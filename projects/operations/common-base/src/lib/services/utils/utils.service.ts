import { Injectable, EventEmitter } from '@angular/core';
import { UtilsService as BaseUtilsService, slideXEnterAnimation, slideXLeaveAnimation } from '@app/common-base';
import { UserSettings, User } from '@shared/data-core';
import { Feed, Mission, Missions } from '@operations/data';
import { IWalkthroughEntry } from '@shared/interfaces';
import { Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UtilsService extends BaseUtilsService {
    public missionFinished$: EventEmitter<Mission>;

    protected missions: Missions;

    initExtraProviders() {
        super.initExtraProviders();
        this.missionFinished$ = new EventEmitter<Mission>();
        this.missions = this.injector.get<Missions>(Missions);
    }

    showFeedDetail(feed: Feed) {
        return this.dialog.modal(this.getFeedDetailComponent(), { feed }, 'modal-full-height');
    }

    showFeedCreate() {
        return this.showFormDynamic<Feed>({}, { collectionName: Feed });
        // return this.dialog.modal(this.getFeedCreateComponent(), {});
    }

    showFeedComments(feed: Feed) {
        return this.dialog.modal(this.getFeedCommentsComponent(), { feed, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showChatCreate() {
        return this.dialog.modal(this.getChatCreateComponent(), {});
    }

    showEventCreate() {
        return this.dialog.modal(this.getEventCreateComponent(), {});
    }

    showServiceCreate() {
        return this.dialog.modal(this.getServiceCreateComponent(), {});
    }

    showTaskCreate() {
        return this.dialog.modal(this.getTaskCreateComponent(), {});
    }

    showSearchPage() {
        return this.dialog.modal(this.getSearchPageComponent(), {});
    }

    showCalendarPage() {
        return this.dialog.modal(this.getCalendarPageComponent(), {});
    }

    showMissionDetail(mission: Mission) {
        if (mission.status === 'finished') {
            return this.dialog.modal(this.getMissionResultsComponent(), { mission, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
        } else {
            return this.dialog.modal(this.getMissionDetailComponent(), { mission, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
        }
    }

    showWalkthrough() {
        let config: Array<IWalkthroughEntry> = [{
            title: this.translate.get('WK_TITLE_1'),
            subtitle: this.translate.get('WK_SUBTITLE_1'),
            imageUrl: './assets/walkthrough/1.svg'
        }, {
            title: this.translate.get('WK_TITLE_2'),
            subtitle: this.translate.get('WK_SUBTITLE_2'),
            imageUrl: './assets/walkthrough/2.svg'
        }, {
            title: this.translate.get('WK_TITLE_3'),
            subtitle: this.translate.get('WK_SUBTITLE_3'),
            imageUrl: './assets/walkthrough/3.svg'
        }, {
            title: this.translate.get('WK_TITLE_4'),
            subtitle: this.translate.get('WK_SUBTITLE_4'),
            imageUrl: './assets/walkthrough/4.svg',
            type: 'geoloc'
        }, {
            title: this.translate.get('WK_TITLE_5'),
            subtitle: this.translate.get('WK_SUBTITLE_5'),
            imageUrl: './assets/walkthrough/5.svg',
            type: 'notifications'
        }];
        return this.dialog.modal(this.getWalkthroughPageComponent(), { config, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showDocuments() {
        this.dialog.modal(this.getDocumentsComponent(), { closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showDocumentViewer(document) {

    }

    showFolderDetail(folder) {
        this.dialog.modal(this.getDocumentDetailDialog(), { folder: folder, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showContacts() {
        this.dialog.modal(this.getContactsComponent(), { closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showNotes() {
        this.dialog.modal(this.getNotesComponent(), { closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showUserSettings() {
        this.loading$.emit(true);
        this.broker.getById('user', this.session.userId).subscribe((user: User) => {
            this.loading$.emit(false);
            this.showFormDynamic<UserSettings>(user, {
                collectionName: UserSettings,
                title: 'SETTINGS'
            }).then(retVal => {
                if (retVal && retVal.data) {
                    // Colors.setDarkTheme(retVal.darkTheme === true);
                    // this.localStorage.setObject('dark-theme', retVal.darkTheme || false);
                    // Colors.setBigFonts(retVal.useBigFonts === true);
                    // this.localStorage.setObject('use-big-fonts', retVal.useBigFonts || false);

                    this.loading$.emit(true);
                    this.authentication.updateProfile(retVal.data).subscribe((updateUser: any) => {
                        this.loading$.emit(false);
                        // this.currentUser = updateUser;
                        // this.cd.markForCheck();
                    });
                } else {
                    this.loading$.emit(false);
                }
            });
        });
    }

    bookMission(state: 'book' | 'start' | 'unbook', mission: Mission): Observable<any> { //, missionsGrid?: any
        if (state) {
            let obs: Observable<any>;
            if ((state === 'book' || state === 'start') && mission.status !== 'booked') {
                obs = this.missions.book(mission);
            } else if (state === 'book' && mission.status === 'booked') {
                obs = this.missions.update(mission);
            } else if (state === 'start' && mission.status === 'booked') {
                obs = of(mission);
            } else if (state === 'unbook') {
                // if (missionsGrid) {
                //     missionsGrid.remove(selectedMission);
                // }
                obs = new Observable<any>((observer: Observer<any>) => {
                    this.missions.unbook(mission).subscribe(ret => {
                        observer.next(ret);
                        observer.complete();
                    }, err => {
                        observer.next(mission);
                        observer.complete();
                    });
                });
            }
            return obs.pipe(map((m: Mission) => {
                let promise;
                if (state === 'unbook') {
                    promise = this.missions.cleanupMissionCache(m); //.toPromise();
                } else if (m && m._id) {
                    let promises = [this.missions.addMissionToCache(m)];
                    if (m.description && m.description._id) {
                        promises.push(this.missions.addMissionDescriptionToCache(m.description));
                    }
                    promise = Promise.all(promises);
                }
                if (promise) {
                    promise.then(() => {
                        if (state === 'start') {
                            this.missions.getWithSlides(m).subscribe((missionWithSlides) => {
                                this.showMissionForm(missionWithSlides).then(ret => {
                                    if (ret && ret.data) {
                                        this.missionFinished$.emit(ret.data);
                                    }
                                });
                                //session.selectedMission = missionWithSlides;
                                //setTimeout(() => session.goToMissionForm(), 100);
                            });
                        } else {
                            // if (missionsGrid && state === 'book') {
                            //     missionsGrid.insert(mission, false);
                            // }
                        }
                    });
                }
            }, (error) => {
                //TODO: reimplement this
                //this.dialog.openModal(this.getMissionSavingErrorPopoverComponent(), injector, viewContainerRef, { selectedMission, errorType: 'MISSIONBOOKEDERROR' });
            }));
        }
        return of(null);
    }

    showMissionForm(mission: Mission) {
        return this.dialog.modal(this.getMissionFormComponent(), { mission, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showMissionSavingSuccess(mission: Mission, text: string) {
        if (mission) {
            let content = this.translate.polyglot(text || 'MISSIONSAVEDSUCCESS');
            let score = null;
            if (mission.score) {
                score = mission.score ? mission.score.value : 0;
                if (mission.score && mission.score.isPercentage) {
                    score += '%';
                } else if (mission.quizz && mission.score && mission.score.total) {
                    score += '/' + mission.score.total;
                }

                content += '<br/><br/>' + this.translate.polyglot(mission.score.title) + ': ' + score;
            }
            return this.showResultDialog('CONGRATULATIONS', content, true);
        }
    }

    showMissionSavingError(mission: Mission, errorType: string) {
        let text = '';
        if (errorType === 'QUIZZNOTVALID') {
            text = 'QUIZZSAVEDERROR';
        } else if (errorType === 'MISSIONBOOKEDERROR') {
            text = 'MISSIONBOOKEDERROR';
        } else if (errorType === 'NOT_FOUND_ERR') {
            text = 'MISSIONPHOTONOTFOUNDERROR';
        } else if (errorType === 'QUIZZNOTVALID') {
            text = 'MISSIONSAVEDERROR';
        }
        return this.showResultDialog('ERROR', text, false);
    }

    protected getFeedDetailComponent() {
        return null;
    }

    protected getChatCreateComponent() {
        return null;
    }

    protected getEventCreateComponent() {
        return null;
    }

    protected getServiceCreateComponent() {
        return null;
    }

    protected getTaskCreateComponent() {
        return null;
    }

    protected getFeedCreateComponent() {
        return null;
    }

    protected getFeedCommentsComponent() {
        return null;
    }

    protected getSearchPageComponent() {
        return null;
    }

    protected getCalendarPageComponent() {
        return null;
    }

    protected getMissionDetailComponent() {
        return null;
    }

    protected getMissionResultsComponent() {
        return null;
    }

    protected getMissionFormComponent() {
        return null;
    }

    protected getDocumentsComponent() {
        return null;
    }

    protected getContactsComponent() {
        return null;
    }

    protected getNotesComponent() {
        return null;
    }

    protected getDocumentDetailDialog() {
        return null;
    }

}