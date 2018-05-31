import { Injectable, NgZone, ErrorHandler } from '@angular/core';
import { Log, LocalStorage, ConfigConstants, CoreConfig } from '@shared/common';
import { Track } from '../track/track.service';

import { get, set, map, update, isObject } from 'lodash-es';

import { config, setDataCallback, captureException, captureMessage, setUserContext } from 'raven-js';

@Injectable()
export class RavenErrorHandler implements ErrorHandler {

    public static disabledErrorMessages: Array<string> = [
        'Cannot read property \'disconnect\' of null',
        'PubNub call failed',
        'PubNub call failed, check status for details',
        'InvalidStateError: Failed to execute \'transaction\'',
        'Loading chunk',
        'You provided \'undefined\' where a stream was expected',
        'Cannot read property \'value\' of undefined',
        'Uncaught (in promise): OK',
        'Uncaught (in promise): Error: Timeout',
        'NS_ERROR_NOT_INITIALIZED',
        'Error: No available storage method found'
    ];

    constructor(private log: Log, private localStorage: LocalStorage, private zone: NgZone, private configConstants: ConfigConstants, private trackService: Track, protected coreConfig: CoreConfig) {
        if (this.isEnabled()) {
            try {
                this.zone.runOutsideAngular(() => {
                    config(this.configConstants.sentryClientKey, <any>{
                        autoBreadcrumbs: {
                            'xhr': false,
                            'console': false,
                            'dom': true,
                            'location': false
                        },
                        shouldSendCallback: function (data) {
                            return true;
                        },
                        release: this.configConstants.getFullAppName(),
                        environment: this.localStorage.get('SERVER') || 'prod',
                        includePaths: [/yoobic-loopback/],
                        maxMessageLength: 1000,
                        tags: {}
                    }).install();

                    if (this.trackService.isEnabled()) {
                        setDataCallback((data) => {
                            data = this.normalizeRaven(data);
                            data.extra.sessionURL = this.trackService.getLogRocketSessionUrl();
                            return data;
                        });
                    }
                });
            } catch (err) {
                this.log.error(err);
            }
        }
    }

    isEnabled() {
        return this.configConstants.configMode === 'prod' && this.configConstants.sentryClientKey && this.configConstants.sentryClientKey.length > 0;
    }

    handleError(err: any): void {
        let disabled = false;
        RavenErrorHandler.disabledErrorMessages.forEach(m => {
            if (err && err.message && err.message.indexOf(m) >= 0) {
                disabled = true;
            }
        });
        if (disabled) {
            return;
        }
        if (err && this.isEnabled()) {
            try {
                captureException(err.originalError || err);
            } catch (e) { }
            this.trackService.sendLogRocketError(err.originalError || err);
            this.log.error(err.originalError || err);
        } else if (err && this.configConstants.configMode === 'dev') {
            this.log.error(err);
        }
    }

    track(exception, extra) {
        if (this.isEnabled()) {
            try {
                captureException(exception, { tags: { mode: this.configConstants.configMode }, extra: extra });
            } catch (e) { }
        }
    }

    debug(message, error, extra) {
        if (this.isEnabled()) {
            try {
                if (error) {
                    if (isObject(error)) {
                        message += ' ' + JSON.stringify(error);
                    } else {
                        message += ' ' + error.toString();
                    }
                }
                captureMessage(message, { tags: { mode: this.configConstants.configMode }, extra: extra });
            } catch (e) { }
        }
    }

    identify(id, email, username) {
        if (this.isEnabled()) {
            try {
                setUserContext({ email, username, id });
            } catch (e) { }
        }
    }

    normalizeFilename(filename: string): string {
        if (this.coreConfig.isCordova() && filename && filename.indexOf('/www/') > 0) {
            filename = this.configConstants.webUrl + filename.substr(filename.indexOf('/www/') + 4);
        }
        return filename || '';
    }

    fixStackFrame(frame) {
        let filename = this.normalizeFilename(get(frame, ['filename'], '')); //.split(':');
        set(frame, ['filename'], filename);
        return frame;
    }

    normalizeRaven(payload: any): any {
        return update(update(payload, ['culprit'], (p) => this.normalizeFilename(p)), ['exception', 'values'], values => {
            return map(values, value => {
                return update(value, ['stacktrace', 'frames'], frames => {
                    return map(frames, frame => {
                        return this.fixStackFrame(frame);
                    });
                });
            });
        });
    }
}
