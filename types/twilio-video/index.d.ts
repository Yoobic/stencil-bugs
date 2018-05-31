// Type definitions for twilio-video.js
// Project: https://github.com/twilio/twilio-video.js
// Definitions by: Joshua Estrin Skrzypek <https://github.com/jskrzypek/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'twilio-video/dist/twilio-video' {
    import connect = Twilio.Video.connect;
    import createLocalAudioTrack = Twilio.Video.createLocalAudioTrack;
    import createLocalTracks = Twilio.Video.createLocalTracks;
    import createLocalVideoTrack = Twilio.Video.createLocalVideoTrack;
    import LocalAudioTrack = Twilio.Video.LocalAudioTrack;
    import LocalVideoTrack = Twilio.Video.LocalVideoTrack;
    import version = Twilio.Video.version;
    export { connect, createLocalAudioTrack, createLocalTracks, createLocalVideoTrack, LocalAudioTrack, LocalVideoTrack, version };
}

declare module 'twilio-video/lib/webrtc/rtcpeerconnection/firefox' {
    const firefoxRTCPeerConnection: any;
    export = firefoxRTCPeerConnection;
}

declare module 'twilio-video/lib/webrtc/rtcpeerconnection/chrome' {
    const chromeRTCPeerConnection: any;
    export = chromeRTCPeerConnection;
}

declare namespace Twilio {
    export namespace Video {

        export class EventEmitter {
            on(event: string, handler: Function): void;
            once(event: string, handler: Function): void;
            removeListener(event: string, handler: Function): void;
        }

        type RTCIceTransportPolicy = any;

        export const version: string;

        /*******************************  EXPORTS  *******************************/

        /**
         * Connect to a {@link Room}.
         *   <br><br>
         *   By default, this will automatically acquire an array containing a
         *   {@link LocalAudioTrack} and {@link LocalVideoTrack} before connecting to
         *   the {@link Room}. The {@link LocalTrack}s will be stopped when you
         *   disconnect from the {@link Room}.
         *   <br><br>
         *   You can override the default behavior by specifying
         *   <code>options</code>. For example, rather than acquiring {@link LocalTrack}s
         *   automatically, you can pass your own array which you can stop yourself.
         *   See {@link ConnectOptions} for more information.
         * @param {string} token - The Access Token string
         * @param {ConnectOptions} [options] - Options to override the default behavior
         * @returns {CancelablePromise<Room>}
         * @throws {RangeError}
         * @throws {TwilioError}
         * @throws {TypeError}
         * @example
         * var Video = require('twilio-video');
         * var token = getAccessToken();
         * Video.connect(token, {
         *   name: 'my-cool-room'
         * }).then(function(room) {
         *   room.on('participantConnected', function(participant) {
         *     console.log(participant.identity + ' has connected');
         *   });
         *
         *   room.once('disconnected', function() {
         *     console.log('You left the Room:', room.name);
         *   });
         * });
         * @example
         * var Video = require('twilio-video');
         * var token = getAccessToken();
         *
         * // Connect with audio-only
         * Video.connect(token, {
         *   name: 'my-cool-room',
         *   audio: true
         * }).then(function(room) {
         *   room.on('participantConnected', function(participant) {
         *     console.log(participant.identity + ' has connected');
         *   });
         *
         *   room.once('disconnected', function() {
         *     console.log('You left the Room:', room.name);
         *   });
         * });
         */
        export function connect(token: string, options?: ConnectOptions);

        /**
         * You may pass these options to {@link connect} in order to override the
         * default behavior.
         * @typedef {object} ConnectOptions
         * @property {boolean} [audio=true] - Whether or not to get local audio
         *    with <code>getUserMedia</code> when <code>tracks</code> are not
         *    provided.
         * @property {Array<RTCIceServer>} [iceServers] - Override the STUN and TURN
         *   servers used by the {@link Client} when connecting to {@link Room}s
         * @property {RTCIceTransportPolicy} [iceTransportPolicy="all"] - Override the
         *   ICE transport policy to be one of "relay" or "all"
         * @property {?string} [name=null] - Set to connect to a {@link Room} by name
         * @property {LogLevel|LogLevels} [logLevel='warn'] - Set the log verbosity
         *   of logging to console. Passing a {@link LogLevel} string will use the same
         *   level for all components. Pass a {@link LogLevels} to set specific log
         *   levels.
         * @property {Array<LocalTracks>} [tracks] - The {@link LocalTrack}s with which
         *   to join the {@link Room}. These tracks can be obtained either by calling
         *   {@link createLocalTracks}, or by constructing them from the MediaStream
         *   obtained by calling <code>getUserMedia()</code>.
         * @property {boolean} [video=true] - Whether or not to get local video
         *    with <code>getUserMedia</code> when <code>tracks</code> are not
         *    provided.
         */
        export interface ConnectOptions {
            audio?: boolean | MediaTrackConstraints;
            iceServers?: Array<RTCIceServer>;
            iceTransportPolicy?: RTCIceTransportPolicy;
            name?: string;
            logLevel?: LogLevel | LogLevels;
            tracks?: Array<LocalAudioTrack | LocalVideoTrack>;
            video?: boolean | MediaTrackConstraints;
        }

        /**
         * Request {@link LocalTrack}s. By default, it requests a
         * {@link LocalAudioTrack} and a {@link LocalVideoTrack}.
         * @param {CreateLocalTracksOptions} [options]
         * @returns {Promise<Array<LocalTrack>>}
         * @example
         * var Video = require('twilio-video');
         * // Request audio and video tracks
         * Video.createLocalTracks().then(function(localTracks) {
         *   var localMediaContainer = document.getElementById('local-media-container-id');
         *   localTracks.forEach(function(track) {
         *     localMediaContainer.appendChild(track.attach());
         *   });
         * });
         * @example
         * var Video = require('twilio-video');
         * // Request just the default audio track
         * Video.createLocalTracks({ audio: true }).then(function(localTracks) {
         *   return Video.connect('my-token', {
         *     name: 'my-room-name',
         *     tracks: localTracks
         *   });
         * });
         */
        export function createLocalTracks(options?: CreateLocalTracksOptions): Promise<Array<LocalAudioTrack|LocalVideoTrack>>;

        /**
         * {@link createLocalTracks} options
         * @typedef {object} CreateLocalTracksOptions
         * @property {boolean} [audio=true] - Whether or not to get local audio
         *   with <code>getUserMedia</code> when <code>tracks</code> are not
         *   provided.
         * @property {LogLevel|LogLevels} [logLevel='warn'] - Set the log verbosity
         *   of logging to console. Passing a {@link LogLevel} string will use the same
         *   level for all components. Pass a {@link LogLevels} to set specific log
         *   levels.
         * @property {boolean} [video=true] - Whether or not to get local video
         *   with <code>getUserMedia</code> when <code>tracks</code> are not
         *   provided.
         */
        export interface CreateLocalTracksOptions {
            audio?: boolean | MediaTrackConstraints;
            logLevel?: LogLevel | LogLevels;
            video?: boolean | MediaTrackConstraints;
        }

        /**
         * Request a {@link LocalAudioTrack}.
         * @param {CreateLocalTrackOptions} [options] - Options for requesting a {@link LocalAudioTrack}
         * @returns {Promise<LocalAudioTrack>}
         * @example
         * var Video = require('twilio-video');
         *
         * // Connect to the Room with just video
         * Video.connect('my-token', {
         *   name: 'my-room-name',
         *   video: true
         * }).then(function(room) {
         *   // Add audio after connecting to the Room
         *   Video.createLocalAudioTrack().then(function(localTrack) {
         *     room.localParticipant.addTrack(localTrack);
         *   });
         * });
         */
        export function createLocalAudioTrack(options?: CreateLocalTrackOptions): Promise<LocalAudioTrack>;

        /**
         * Request a {@link LocalVideoTrack}.
         * @param {CreateLocalTrackOptions} [options] - Options for requesting a {@link LocalVideoTrack}
         * @returns {Promise<LocalVideoTrack>}
         * @example
         * var Video = require('twilio-video');
         *
         * // Connect to the Room with just audio
         * Video.connect('my-token', {
         *   name: 'my-room-name',
         *   audio: true
         * }).then(function(room) {
         *   // Add video after connecting to the Room
         *   Video.createLocalVideoTrack().then(function(localTrack) {
         *     room.localParticipant.addTrack(localTrack);
         *   });
         * });
         */
        export function createLocalVideoTrack(options?: CreateLocalTrackOptions): Promise<LocalVideoTrack>;

        /**
         * Create {@link LocalTrack} options.
         * @typedef {MediaTrackConstraints} CreateLocalTrackOptions
         * @property {LogLevel|LogLevels} logLevel
         */
        export interface CreateLocalTrackOptions extends MediaTrackConstraints {
            logLevel?: LogLevel | LogLevels;
        }

        /**
         * Construct a {@link LocalAudioTrack} from a MediaStreamTrack.
         * @class
         * @classdesc A {@link LocalAudioTrack} is an {@link AudioTrack} representing
         * audio that your {@link LocalParticipant} sends to a {@link Room}.
         * @extends {AudioTrack}
         * @extends {LocalTrack}
         * @param {MediaStreamTrack} mediaStreamTrack - The underlying MediaStreamTrack
         * @param {LocalTrackOptions} options - {@link LocalTrack} options
         */
        export class LocalAudioTrack extends AudioTrack implements LocalTrack<AudioTrack> {
            isStopped: boolean;            
            constructor(mediaStreamTrack: MediaStreamTrack, options: any);
            /**
             * Disable the {@link LocalAudioTrack}. This is effectively "mute".
             * @method
             * @returns {this}
             * @fires Track#disabled
             */
            disable(): this;
            /**
             * Enable the {@link LocalAudioTrack}. This is effectively "unmute".
             * @method
             * @returns {this}
             * @fires Track#enabled
             */
            enable(): this;
            /**
             * Enable or disable the {@link LocalAudioTrack}. This is effectively "unmute" or
             * "mute".
             * @method
             * @param {boolean} [enabled] - Specify false to mute the {@link LocalAudioTrack}
             * @returns {this}
             * @fires Track#disabled
             * @fires Track#enabled
             */
            enable(enabled: boolean): this;
            /**
             * See {@link LocalTrack#stop}.
             */
            stop(): this;
        }
        /**
         * Construct a {@link LocalVideoTrack} from MediaStreamTrack.
         * @class
         * @classdesc A {@link LocalVideoTrack} is a {@link VideoTrack} representing
         * audio that your {@link LocalParticipant} sends to a {@link Room}.
         * @extends {VideoTrack}
         * @extends {LocalTrack}
         * @param {MediaStreamTrack} mediaStreamTrack - The underlying MediaStreamTrack
         * @param {LocalTrackOptions} options - {@link LocalTrack} options
         */
        export class LocalVideoTrack extends VideoTrack implements LocalTrack<VideoTrack> {
            isStopped: boolean;
            constructor(mediaStreamTrack: MediaStreamTrack, options: any);
            /**
             * Disable the {@link LocalVideoTrack}. This is effectively "pause".
             * @method
             * @returns {this}
             * @fires Track#disabled
             */
            disable(): this;
            /**
             * Enable the {@link LocalVideoTrack}. This is effectively "unpause".
             * @method
             * @returns {this}
             * @fires Track#enabled
            */
            enable(): this;
            /**
             * Enable or disable the {@link LocalVideoTrack}. This is effectively "unpause" or
             * "pause".
             * @method
             * @param {boolean} [enabled] - Specify false to pause the {@link LocalVideoTrack}
             * @returns {this}
             * @fires Track#disabled
             * @fires Track#enabled
             */
            enable(enabled: boolean): this;
            /**
             * See {@link LocalTrack#stop}.
             */
            stop(): this;
        }

        /*******************************  PRIVATE  *******************************/

        /**
         * Levels for logging verbosity.
         * @typedef {String} LogLevel - One of ['debug', 'info', 'warn', 'error', 'off']
         */
        export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';

        /**
         * You may pass these levels to {@link ConnectOptions} to override
         *   log levels for individual components.
         * @typedef {object} LogLevels
         * @property {LogLevel} [default='warn'] - Override the log level for 'default' modules.
         * @property {LogLevel} [media='warn'] - Override the log level for 'media' modules.
         * @property {LogLevel} [signaling='warn'] - Override the log level for 'signaling' module.
         * @property {LogLevel} [webrtc='warn'] - Override the log level for 'webrtc' module.
         */
        export interface LogLevels {
            default?: LogLevel;
            media?: LogLevel;
            signaling?: LogLevel;
            webrtc?: LogLevel;
        }

        export type GeneralSID< T > = string;

        /**
         * Construct a {@link Room}.
         * @class
         * @classdesc A {@link Room} represents communication between your
         *   {@link Client} and one or more {@link Participant}s sharing
         *   {@link AudioTrack}s and {@link VideoTrack}s.
         *   <br><br>
         *   You can connect to a {@link Room} by calling {@link Client#connect}.
         * @param {RoomSignaling} signaling
         * @param {?object} [options={}]
         * @property {boolean} isRecording - Whether or not the {@link Room} is being
         *   recorded
         * @property {LocalParticipant} localParticipant - Your {@link Client}'s
         *   {@link LocalParticipant} in the {@link Room}.
         * @property {string} name - The {@link Room}'s name
         * @property {Map<Participant.SID, Participant>} participants - The {@link Participant}s
         *   participating in this {@link Room}
         * @property {Room.SID} sid - The {@link Room}'s SID
         * @property {Room.State} state - "connected" or "disconnected"
         * @throws {SignalingConnectionDisconnectedError}
         * @fires Room#disconnected
         * @fires Room#participantConnected
         * @fires Room#participantDisconnected
         * @fires Room#recordingStarted
         * @fires Room#recordingStopped
         * @fires Room#trackAdded
         * @fires Room#trackDimensionsChanged
         * @fires Room#trackDisabled
         * @fires Room#trackEnabled
         * @fires Room#trackRemoved
         * @fires Room#trackStarted
         */
        export class Room extends EventEmitter {
            isRecording: boolean;
            localParticipant: LocalParticipant;
            name: string;
            participants: Map<Participant.SID, Participant>;
            sid: Room.SID;
            state: Room.State;
            constructor(localParticipant: LocalParticipant, signaling: any, options?: any);
            /**
             * Get the {@link Room}'s media statistics.
             * @returns {Promise.<Array<StatsReport>>}
             */
            getStats(): Promise<any[]>;
            /**
             * Disconnect from the {@link Room}.
             * @returns {this}
             */
            disconnect(): this;
            toString(): string;
        }
        export namespace Room {
            /**
             * A {@link Room.SID} is a 34-character string starting with "RM"
             * that uniquely identifies a {@link Room}.
             * @type string
             * @typedef Room.SID
             */
            export type SID = GeneralSID<Room>;
            /**
             * A {@link Room.State} is a string representing the current state
             * of the Room, either "connected" or "disconnected".
             * @type string
             * @typedef Room.State
             */
            export type State = 'connected' | 'disconnected';
        }
        /**
         * Construct a {@link Participant}.
         * @class
         * @classdesc A {@link Participant} represents a remote {@link Client} in a
         * {@link Room}.
         * @param {ParticipantSignaling} signaling
         * @param {object} [options]
         * @property {Map<Track.ID, AudioTrack>} audioTracks - The {@link Participant}'s {@link AudioTrack}s.
         * @property {Participant.Identity} identity - The identity of the {@link Participant}
         * @property {Participant.SID} sid - The {@link Participant}'s SID
         * @property {Participant.State} state - "connected", "disconnected" or "failed"
         * @property {Map<Track.ID, Track>} tracks - The {@link Participant}'s {@link Track}s
         * @property {Map<Track.ID, VideoTrack>} videoTracks - The {@link Participant}'s {@link VideoTrack}s.
         * @fires Participant#connected
         * @fires Participant#disconnected
         * @fires Participant#trackAdded
         * @fires Participant#trackDimensionsChanged
         * @fires Participant#trackDisabled
         * @fires Participant#trackEnabled
         * @fires Participant#trackRemoved
         * @fires Participant#trackStarted
         */
        export class Participant extends EventEmitter {
            identity: Participant.Identity;
            tracks: Map<Track.ID, Track>;
            audioTracks: Map<Track.ID, AudioTrack>;
            videoTracks: Map<Track.ID, VideoTrack>;
            sid: Participant.SID;
            state: Participant.State;
            constructor(signaling: any, options?: any);
            toString(): string;
            _addTrack(track: Track): this;
            _removeTrack(track: Track): this;
        }
        export namespace Participant {
            /**
             * A {@link Participant.SID} is a 34-character string starting with "PA"
             * that uniquely identifies a {@link Participant}.
             * @type string
             * @typedef Participant.SID
             */
            export type SID = GeneralSID<Participant>;
            /**
             * A {@link Participant.Identity} is a string that identifies a
             * {@link Participant}. You can think of it like a name.
             * @type string
             * @typedef Participant.Identity
             */
            export type Identity = string;
            /**
             * A {@link Participant.State} is a string representing the current state
             * of the Participant, either "connected", "disconnected" or "failed".
             * @type string
             * @typedef Participant.State
             */
            export type State = 'connected' | 'disconnected' | 'failed';
        }

        /**
         * Construct a {@link LocalParticipant}.
         * @class
         * @classdesc A {@link LocalParticipant} represents the local {@link Client} in a
         * {@link Room}.
         * @extends Participant
         * @param {ParticipantSignaling} signaling
         * @param {Array<LocalTrack>} localTracks
         * @param {Object} options
         * @fires LocalParticipant#trackStopped
         */
        export class LocalParticipant extends Participant {
            tracks: Map<Track.ID, LocalAudioTrack | LocalVideoTrack>;
            constructor(signaling: any, localTracks: Array<LocalTrack<any>>, options: any);
            /**
             * Adds a {@link LocalTrack} to the {@link LocalParticipant}.
             * @param {LocalTrack} track - The {@link LocalTrack} to be added
             * @returns {?LocalTrack} - The {@link LocalTrack} if added, null if already present
             * @fires Participant#trackAdded
             * @throws {TypeError}
             */
            addTrack(track: LocalAudioTrack): LocalAudioTrack;
            addTrack(track: LocalVideoTrack): LocalVideoTrack;
            /**
             * Adds a MediaStreamTrack to the {@link LocalParticipant}.
             * @param {MediaStreamTrack} track - The MediaStreamTrack to be added
             * @returns {?LocalTrack} - The corresponding {@link LocalTrack} if added, null if already present
             * @fires Participant#trackAdded
             * @throws {TypeError}
             */
            addTrack(track: MediaStreamTrack): LocalAudioTrack | LocalVideoTrack;
            /**
             * Adds multiple {@link LocalTrack}s to the {@link LocalParticipant}.
             * @param {Array<LocalTrack>} tracks - The {@link LocalTrack}s to be added
             * @returns {Array<LocalTrack>} - The {@link LocalTrack}s that were successfully
             *    added; If the {@link LocalParticipant} already has a {@link LocalTrack},
             *    it won't be included in the Array
             * @fires Participant#trackAdded
             * @throws {TypeError}
             */
            addTracks(tracks: Array<LocalAudioTrack | LocalVideoTrack>): Array<LocalAudioTrack | LocalVideoTrack>;            
            /**
             * Adds multiple MediaStreamTracks to the {@link LocalParticipant}.
             * @param {Array<MediaStreamTrack>} tracks - The MediaStreamTracks to be added
             * @returns {Array<LocalTrack>} - The corresponding {@link LocalTrack}s that
             *    were successfully added; If the {@link LocalParticipant} already has a
             *    corresponding {@link LocalTrack} for a MediaStreamTrack, it won't be
             *    included in the Array
             * @fires Participant#trackAdded
             * @throws {TypeError}
             */
            addTracks(tracks: Array<MediaStreamTrack>): Array<LocalAudioTrack | LocalVideoTrack>;
            /**
             * Removes a {@link LocalTrack} from the {@link LocalParticipant}.
             * @param {LocalTrack} track - The {@link LocalTrack} to be removed
             * @param {?boolean} [stop=true] - Whether or not to call {@link LocalTrack#stop}
             * @returns {?LocalTrack} - The corresponding {@link LocalTrack} if removed,
             *    null if the {@link LocalTrack} doesn't exist
             * @fires Participant#trackRemoved
             * @throws {TypeError}
             */
            removeTrack(track: LocalAudioTrack, stop?: boolean): LocalAudioTrack;
            removeTrack(track: LocalVideoTrack, stop?: boolean): LocalVideoTrack;
            /**
             * Removes a MediaStreamTrack from the {@link LocalParticipant}.
             * @param {MediaStreamTrack} track - The MediaStreamTrack to be removed
             * @param {?boolean} [stop=true] - Whether or not to call {@link LocalTrack#stop}
             * @returns {?LocalTrack} - The corresponding {@link LocalTrack} if removed,
             *    null if the corresponding {@link LocalTrack} for MediaStreamTrack
             *    doesn't exist
             * @fires Participant#trackRemoved
             * @throws {TypeError}
             */
            removeTrack(track: MediaStreamTrack, stop?: boolean): LocalAudioTrack | LocalVideoTrack;
            /**
             * Removes multiple {@link LocalTrack}s from the {@link LocalParticipant}.
             * @param {Array<LocalTrack>} tracks - The {@link LocalTrack}s to be removed
             * @returns {Array<LocalTrack>} - The {@link LocalTrack}s that were successfully
             *    removed; If the {@link LocalParticipant} doesn't have a {@link LocalTrack}
             *    that is to be removed, it won't be included in the Array
             * @fires Participant#trackRemoved
             * @throws {TypeError}
             */
            removeTracks(tracks: Array<LocalAudioTrack | LocalVideoTrack>): Array<LocalAudioTrack | LocalVideoTrack>;            
            /**
             * Removes multiple MediaStreamTracks from the {@link LocalParticipant}.
             * @param {Array<MediaStreamTrack>} tracks - The MediaStreamTracks to be removed
             * @returns {Array<LocalTrack>} - The corresponding {@link LocalTrack}s that
             *    were successfully removed; If the {@link LocalParticipant} doesn't have
             *    the corresponding {@link LocalTrack} for a MediaStreamTrack that is to
             *    be removed, it won't be included in the Array
             * @fires Participant#trackRemoved
             * @throws {TypeError}
             */
            removeTracks(tracks: Array<MediaStreamTrack>): Array<LocalAudioTrack | LocalVideoTrack>;
        }

        export class QueueingEventEmitter extends EventEmitter {
            /**
             * Construct a {@link QueueingEventEmitter}
             * @class
             * @classdesc A {@link QueueingEventEmitter} can queue events until a listener
             *   has been added.
             * @extends EventEmitter
             */
            constructor();
            /**
             * Emit any queued events.
             * @returns {boolean} true if every event had listeners, false otherwise
             */
            dequeue(): boolean;
            /**
             * Emit any queued events matching the event name.
             * @param {string} event
             * @returns {boolean} true if every event had listeners, false otherwise
             */
            dequeue(event: string): boolean;
            /**
             * If the event has listeners, emit the event; otherwise, queue the event.
             * @param {string} event
             * @param {...*} args
             * @returns {boolean} true if the event had listeners, false if the event was queued
             */
            queue(event: string, ...args): boolean;
        }

        /********************************  UTILS  ********************************/

        /**
         * Construct a new {@link CancelablePromise}.
         * @class
         * @classdesc A Promise that can be canceled with {@link CancelablePromise#cancel}.
         * @extends Promise
         * @param {CancelablePromise.OnCreate} onCreate
         * @param {CancelablePromise.OnCancel} onCancel
        */
        export interface CancelablePromise<T> extends Promise<T> {
            isCanceled: boolean;
            constructor<T>(onCreate: CancelablePromise.OnCreate, onCancel: CancelablePromise.OnCancel);
            /**
             * Attempt to cancel the {@link CancelablePromise}.
             * @returns {this}
             */
            cancel(): this;
        }
        export namespace CancelablePromise {
            /**
             * A function to be called on {@link CancelablePromise} creation
             * @typedef {function} CancelablePromise.OnCreate
             * @param {function(*)} resolve
             * @param {function(*)} reject
             * @param {function(): boolean} isCanceled
             */
            export type OnCreate = (resolve: (a: any) => void, reject: (a: any) => void, isCanceled: () => boolean ) => void;

            /**
             * A function to be called when {@link CancelablePromise#cancel} is called
             * @typedef {function} CancelablePromise.OnCancel
             */
            export type OnCancel = (resolve: (a: any) => any, reject: (a: any) => any, isCanceled: () => boolean) => void;
            
        }

        /**
         * Construct a new {@link Log} object.
         * @class
         * @classdesc Selectively outputs messages to console.log
         *   based on specified minimum module specific log levels.
         * NOTE: The values in the logLevels object passed to the constructor is changed
         *       by subsequent calls to {@link Log#setLevels}.
         * @param {String} moduleName - Name of the logging module (webrtc/media/signaling)
         * @param {object} component - Component owning this instance of {@link Log}
         * @param {LogLevels} logLevels - Logging levels. See {@link LogLevels}
         */
        export class Log {
            /**
             * Get the log level (number) by its name (string)
             * @param {String} name - Name of the log level
             * @returns {Number} Requested log level
             * @throws {TwilioError} INVALID_LOG_LEVEL (32056)
             * @public
             */
            static getLevelByName(name: string): number;

            constructor(moduleName: string, component: any, logLevels: LogLevels);

            /**
             * Create a child {@link Log} instance with this._logLevels
             * @param {string} moduleName - Name of the logging module
             * @param {object} component - Component owning this instance of {@link Log}
             * @returns {Log} this
             */
            createLog(moduleName: string, component: any): this;

            /**
             * Set new log levels.
             * This changes the levels for all its ancestors,
             * siblings, and children and descendants instances of {@link Log}.
             * @param {LogLevels} levels - New log levels
             * @throws {TwilioError} INVALID_ARGUMENT
             * @returns {Log} this
             */
            setLevels(levels: LogLevels): this;

            /**
             * Log a message using the console method appropriate for the specified logLevel
             * @param {Number} logLevel - Log level of the message being logged
             * @param {String} message - Message(s) to log
             * @returns {Log} This instance of {@link Log}
             * @public
             */
            log(logLevel: number, message: string): this;

            /**
             * Log a debug message using console.log
             * @param {...String[]} messages - Message(s) to pass to console.log
             * @returns {Log} This instance of {@link Log}
             * @public
             */
            debug(...messages: string[]): this;

            /**
             * Log an info message using console.info
             * @param {...String[]} messages - Message(s) to pass to console.info
             * @returns {Log} This instance of {@link Log}
             * @public
             */
            info(...messages: string[]): this;

            /**
             * Log a warn message using console.warn
             * @param {...String[]} messages - Message(s) to pass to console.warn
             * @returns {Log} This instance of {@link Log}
             * @public
             */
            warn(...messages: string[]): this;

            /**
             * Log an error message using console.error
             * @param {...String[]} messages - Message(s) to pass to console.error
             * @returns {Log} This instance of {@link Log}
             * @public
             */
            error(...messages: string[]): this;

            /**
             * Log an error message using console.error and throw an exception
             * @param {TwilioError} error - Error to throw
             * @param {String} customMessage - Custom message for the error
             * @public
             */
            throw(error: any, customMessage: string): void;

        }

        /********************************  TRACKS  ********************************/

        /**
         * Construct an {@link AudioTrack} from a MediaStreamTrack.
         * @class
         * @classdesc An {@link AudioTrack} is a {@link Track} representing audio.
         * @extends Track
         * @param {MediaStreamTrack} mediaStreamTrack
         * @param {TrackSignaling} signaling
         * @param {{log: Log}} options
         */
        export class AudioTrack extends Track {}
        
        /**
         * Construct a {@link VideoTrack} from MediaStreamTrack.
         * @class
         * @classdesc A {@link VideoTrack} is a {@link Track} representing video.
         * @extends Track
         * @param {MediaStreamTrack} mediaStreamTrack
         * @param {TrackSignaling} signaling
         * @param {{log: Log}} options
         * @property {VideoTrack#Dimensions} dimensions - The {@link VideoTrack}'s {@link VideoTrack#Dimensions}
         * @fires VideoTrack#dimensionsChanged
         */
        export class VideoTrack extends Track {
            dimensions: VideoTrack.Dimensions;
        }
        export namespace VideoTrack {
            /**
             * A {@link VideoTrack}'s width and height.
             * @typedef VideoTrack#Dimensions
             * @type {Object}
             * @property {?number} width - The {@link VideoTrack}'s width or null if the
             *   {@link VideoTrack} has not yet started
             * @property {?number} height - The {@link VideoTrack}'s height or null if the
             *   {@link VideoTrack} has not yet started
             */
            export interface Dimensions {
                width?: number;
                height?: number;
            }
        }

        /**
         * Construct a {@link Track} from a MediaStreamTrack.
         * @class
         * @classdesc A {@link Track} represents audio or video that can be sent to or
         * received from a {@link Room}.
         * @param {MediaStreamTrack} mediaStreamTrack
         * @param {TrackSignaling} signaling
         * @param {{log: Log}} options
         * @property {Track.ID} id - This {@link Track}'s ID
         * @property {boolean} isStarted - Whether or not the {@link Track} has started
         * @property {boolean} isEnabled - Whether or not the {@link Track} is enabled
         *  (i.e., whether it is paused or muted)
         * @property {string} kind - The kind of the underlying
         *   {@link MediaStreamTrack}; e.g. "audio" or "video"
         * @property {MediaStreamTrack} mediaStreamTrack - The underlying
         *   MediaStreamTrack
         * @fires Track#disabled
         * @fires Track#enabled
         * @fires Track#started
         */
        export abstract class Track extends EventEmitter {
            id: Track.ID;
            isEnabled: boolean;
            isStarted: boolean;
            kind: Track.Kind;
            mediaStreamTrack: MediaStreamTrack;
            constructor(mediaStreamTrack: MediaStreamTrack, signaling: TrackSignaling, options: {log: Log});
            /**
             * Attach the {@link Track} to a newly created HTMLMediaElement.
             *
             * The HTMLMediaElement's <code>srcObject</code> will be set to a new
             * MediaStream containing the {@link Track}'s MediaStreamTrack.
             *
             * @method
             * @returns {HTMLMediaElement} Either an HTMLAudioElement or HTMLVideoElement,
             *    depending on the {@link Track}'s kind
             * @example
             * var Video = require('twilio-video');
             *
             * Video.createLocalVideoTrack().then(function(track) {
             *   var videoElement = track.attach();
             *   document.getElementById('my-container').appendChild(videoElement);
             * });
             */
            attach(): HTMLElement;
            /**
             * Attach the {@link Track} to an existing HTMLMediaElement.
             *
             * If the HTMLMediaElement's <code>srcObject</code> is not set to a MediaStream,
             * this method sets it to a new MediaStream containing the {@link Track}'s
             * MediaStreamTrack; otherwise, it adds the {@link Track}'s MediaStreamTrack to
             * the existing MediaStream. Finally, if there are any other MediaStreamTracks
             * of the same kind on the MediaStream, this method removes them.

             * @method
             * @param {HTMLMediaElement} el - The HTMLMediaElement to attach to
             * @returns {HTMLMediaElement}
             * @example
             * var Video = require('twilio-video');
             * var videoElement;
             *
             * Video.createLocalVideoTrack().then(function(track) {
             *   videoElement = track.attach();
             *   document.getElementById('my-container').appendChild(videoElement);
             *   return Video.createLocalAudioTrack();
             * }).then(function(track) {
             *   track.attach(videoElement);
             * });
             */
            attach(el: HTMLElement): HTMLElement;
            /**
             * Attach the {@link Track} to an HTMLMediaElement selected by
             * <code>document.querySelector</code>.
             *
             * If the HTMLMediaElement's <code>srcObject</code> is not set to a MediaStream, this
             * method sets it to a new MediaStream containing the {@link Track}'s
             * MediaStreamTrack; otherwise, it adds the {@link Track}'s MediaStreamTrack to
             * the existing MediaStream. Finally, if there are any other MediaStreamTracks
             * of the same kind on the MediaStream, this method removes them.
             *
             * @method
             * @param {string} selector - A query selector for the HTMLMediaElement to attach to
             * @returns {HTMLMediaElement}
             * @example
             * var Video = require('twilio-video');
             *
             * Video.createLocalAudioTrack().then(function(track) {
             *   track.attach('#my-existing-video-element-id');
             * });
             */
            attach(selector: string): HTMLElement;
            /**
             * Detach a {@link Track} from all previously attached HTMLMediaElements.
             * @method
             * @returns {Array<HTMLMediaElement>} The detachedHTMLMediaElements
             * @example
             * var detachedElements = track.detach();
             * detachedElements.forEach(function(el) {
             *   el.remove();
             * });
             */
            detach(): HTMLElement[];
            /**
             * Detach a {@link Track} from a previously attached HTMLMediaElement.
             * @method
             * @param {HTMLMediaElement} el - One of the HTMLMediaElements to which the
             *    {@link Track} is attached
             * @returns {HTMLMediaElement} The detached HTMLMediaElement
             * @example
             * var videoElement = document.getElementById('my-video-element');
             * track.detach(videoElement).remove();
             */
            detach(el: HTMLElement): HTMLElement;
            /**
             * Detach a {@link Track} from a previously attached HTMLMediaElement specified
             * by <code>document.querySelector</code>.
             * @method
             * @param {string} selector - The query selector of HTMLMediaElement to which
             *    the {@link Track} is attached
             * @returns {HTMLMediaElement} The detached HTMLMediaElement
             * @example
             * track.detach('#my-video-element').remove();
             */
            detach(selector: string): HTMLElement;
        }
        export namespace Track {
            /**
             * The {@link Track} ID is a string identifier for the {@link Track}.
             * @type string
             * @typedef Track.ID
             */
            export type ID = string;
            /**
             * The {@link Track} kind of track, one of "audio" or "video".
             * @type string
             * @typedef Track.Kind
             */
            export type Kind = 'audio' | 'video';
        }
        
        /**
         * @class
         * @classdesc A {@link LocalTrack} represents audio or video that your
         * {@link Client} is sending to a {@link Room}. As such, it can be
         * enabled and disabled with {@link LocalTrack#enable} and
         * {@link LocalTrack#disable} or stopped completely with
         * {@link LocalTrack#stop}.
         * @extends Track
         * @param {function(MediaStreamTrack, TrackSignaling): Track} track
         * @param {MediaStream} mediaStreamTrack - The underlying MediaStreamTrack
         * @param {LocalTrackOptions} options
         * @property {boolean} isStopped - Whether or not the {@link LocalTrack} is stopped
         * @fires LocalTrack#stopped
         */
        export abstract class LocalTrack<T>  {
            isStopped: boolean;
            constructor(track: any, mediaStreamTrack: MediaStreamTrack, options: any);
            
            /**
             * Enable the {@link LocalTrack}.
             * @returns {this}
             * @fires Track#enabled
             */
            enable(): this;

            /**
             * Enable or disable the {@link LocalTrack}.
             * @param {boolean} [enabled] - Specify false to disable the {@link LocalTrack}
             * @returns {this}
             * @fires Track#disabled
             * @fires Track#enabled
             */
            enable(enabled: boolean): this;

            /**
             * Disable the {@link LocalTrack}.
             * @returns {this}
             * @fires Track#disabled
             */
            disable(): this;

            /**
             * Calls stop on the underlying MediaStreamTrack. If you choose to stop a
             * {@link LocalTrack}, you should use {@link LocalMedia#removeTrack} to remove
             * it after stopping. You do not need to stop a track before using
             * {@link LocalTrack#disable} or {@link LocalMedia#removeTrack}.
             * @returns {this}
             * @fires Track#ended
             */
            stop(): this;
        }

        /********************************  SIGNALING  ********************************/

        /**
         * Construct a {@link StateMachine}.
         * @class
         * @classdesc {@link StateMachine} represents a state machine. The state
         * machine supports a reentrant locking mechanism to allow asynchronous state
         * transitions to ensure they have not been preempted. Calls to
         * {@link StateMachine#takeLock} are guaranteed to be resolved in FIFO order.
         * @extends {EventEmitter}
         * @param {string} initialState - the intiial state
         * @param {object} states
         * @property {boolean} isLocked - whether or not the {@link StateMachine} is
         * locked performing asynchronous state transition
         * @property {string} state - the current state
         * @emits {@link StateMachine#stateChanged}
         */
        export class StateMachine<T extends string> extends EventEmitter {
            isLocked: boolean;
            state: T;
            constructor(initialState: string, states: { [key: string]: Iterable<T> });

            /**
             * This method takes a lock and passes the {@link StateMachine#Key} to your
             * transition function. You may perform zero or more state transitions in your
             * transition function, but you should check for preemption in each tick. You
             * may also reenter the lock. Once the Promise returned by your transition
             * function resolves or rejects, this method releases the lock it acquired for
             * you.
             * @param {string} name - a name for the lock
             * @param {function(StateMachine#Key): Promise} transitionFunction
             * @returns {Promise}
             * NOTE(mroberts): This method is named after a Haskell function:
             * https://hackage.haskell.org/package/base-4.8.2.0/docs/Control-Exception.html#v:bracket
             */
            bracket(name: string, transitionFunction: (key: any) => Promise<any>): any;

            /**
             * Check whether or not a {@link StateMachine#Key} matches the lock.
             * @param {StateMachine#Key} key
             * @returns {boolean}
             */
            hasLock(key: any): boolean;

            /**
             * Preempt any pending state transitions and immediately transition to the new
             * state. If a lock name is specified, take the lock and return the
             * {@link StateMachine#Key}.
             * @param {string} newState
             * @param {?string} [name=null] - a name for the lock
             * @param {Array<*>} [payload=[]]
             * @returns {?StateMachine#Key}
             */
            preempt(newState: string, name?: string, payload?: any[]): any;

            /**
             * Release a lock. This method succeeds only if the {@link StateMachine} is
             * still locked and has not been preempted.
             * @param {StateMachine#Key} key
             * @throws Error
             */
            releaseLock(key: any): void;

            /**
             * Release a lock completely, even if it has been reentered. This method
             * succeeds only if the {@link StateMachine} is still locked and has not been
             * preempted.
             * @param {StateMachine#Key} key
             * @throws Error
             */
            releaseLockCompletely(key: any): void;

            /**
             * Take a lock, returning a Promise for the {@link StateMachine#Key}. You should
             * take a lock anytime you intend to perform asynchronous transitions. Calls to
             * this method are guaranteed to be resolved in FIFO order. You may reenter
             * a lock by passing its {@link StateMachine#Key}.
             * @param {string|StateMachine#Key} nameOrKey - a name for the lock or an
             * existing {@link StateMachine#Key}
             * @returns {Promise<object>}
             */
            takeLock(nameOrKey: string | any): Promise<any>;

            /**
             * Take a lock, returning the {@Link StateMachine#Key}. This method throws if
             * the {@link StateMachine} is locked or the wrong {@link StateMachine#Key} is
             * provided. You may reenter a lock by passing its {@link StateMachine#Key}.
             * @param {string|StateMachine#Key} nameOrKey - a name for the lock or an
             * existing {@link StateMachine#Key}
             * @returns {object}
             * @throws Error
             */
            takeLockSync(nameOrKey: string | any): any;

            /**
             * Transition to a new state. If the {@link StateMachine} is locked, you must
             * provide the {@link StateMachine#Key}. An invalid state or the wrong
             * {@link StateMachine#Key} will throw an error.
             * @param {string} newState
             * @param {?StateMachine#Key} [key=null]
             * @param {Array<*>} [payload=[]]
             * @throws {Error}
             */
            transition(newState: string, key?: any, payload?: any[]): void;

            /**
             * Attempt to transition to a new state. Unlike {@link StateMachine#transition},
             * this method does not throw.
             * @param {string} newState
             * @param {?StateMachine#Key} [key=null]
             * @param {Array<*>} [payload=[]]
             * @returns {boolean}
             */
            tryTransition(newState: string, key?: any, payload?: any[]): boolean;

            /**
             * Return a Promise that resolves when the {@link StateMachine} transitions to
             * the specified state. If the {@link StateMachine} transitions such that the
             * requested state becomes unreachable, the Promise rejects.
             * @param {string} state
             * @returns {Promise<this>}
             */
            when(state: string): Promise<this>;

        }
        export namespace StateMachine {
            /**
             * @typedef {any} StateMachine#Key
             */
            export type Key = any;
        }

        /**
         * Construct a {@link TrackSignaling}.
         * @class
         * @classdesc A {@link Track} implementation
         * @param {string} id
         * @param {string} kind - one of "audio" or "video"
         * @param {boolean} isEnabled
         * @property {string} id
         * @property {boolean} isEnabled
         * @property {string} kind
         * @property {?MediaStreamTrack} mediaStreamTrack
         */
        export class TrackSignaling extends EventEmitter {
            id: Track.ID;
            isEnabled: boolean;
            kind: Track.Kind;
            mediaStreamTrack: MediaStreamTrack;
            constructor(id: Track.ID, kind: Track.Kind, isEnabled: boolean);
            /**
             * Disable the {@link TrackSignaling} if it is not already disabled.
             * @return {this}
             */
            disable(): this;

            /**
             * Enable (or disable) the {@link TrackSignaling} if it is not already enabled
             * (or disabled).
             * @param {boolean} [enabled=true]
             * @return {this}
             */
            enable(enabled?: boolean): this;

            /**
             * Get the MediaStreamTrack on the {@link TrackSignaling}.
             * @returns {Promise<MediaStreamTrack>}
             */
            getMediaStreamTrack(): Promise<MediaStreamTrack>;

            /**
             * Set the MediaStreamTrack on the {@link TrackSignaling}.
             * @param {MediaStreamTrack} mediaStreamTrack
             * @returns {this}
             */
            setMediaStreamTrack(mediaStreamTrack: MediaStreamTrack): this;
        }

        /**
         * Construct a {@link RoomSignaling}.
         * @class
         * @classdesc A {@link Room} implementation
         * @extends StateMachine
         * @param {ParticipantSignaling} localParticipant
         * @param {Room.SID} sid
         * @param {string} name
         * @property {ParticipantSignaling} localParticipant
         * @property {string} name
         * @property {Map<string, RemoteParticipantSignaling>} participants
         * @property {RecordingSignaling} recording
         * @property {Room.SID} sid
         * @property {Room.State} state - "connected" or "disconnected"
         */
        export class RoomSignaling extends StateMachine<RoomSignaling.State> {
            localParticipant: ParticipantSignaling;
            name: string;
            participants: Map<string, RemoteParticipantSignaling>;
            recording: RecordingSignaling;
            sid: Room.SID;
            state: Room.State;
            constructor(localParticipant: ParticipantSignaling, sid: Room.SID, name: string);
            /**
             * Disconnect, possibly with an Error.
             * @param {Error} [error]
             * @returns {boolean}
             */
            _disconnect(error?: any): boolean;

            /**
             * Connect {@link RemoteParticipantSignaling} to the {@link RoomSignaling}.
             * @param {RemoteParticipantSignaling} participant
             * @returns {boolean}
             */
            connectParticipant(participant: RemoteParticipantSignaling): boolean;

            /**
             * Disconnect.
             * @returns {boolean}
             */
            disconnect(): boolean;

        }
        export namespace RoomSignaling {
            /**
             * A {@link RoomSignaling.State} is a string representing the current state
             * of the RoomSignaling, moves from "connecting"->"connected"->"disconnected".
             * @type string
             * @typedef RoomSignaling.State
             * RoomSignaling States
             * ----------------------
             * 
             *     +-----------+     +--------------+
             *     |           |     |              |
             *     | connected |---->| disconnected |
             *     |           |     |              |
             *     +-----------+     +--------------+
             *
             */
            export type State = 'connected' | 'disconnected';
        }

        /**
         * Construct a {@link ParticipantSignaling}.
         * @class
         * @classdesc A {@link Participant} implementation
         * @extends StateMachine
         * @property {?Participant.Identity} identity
         * @property {?Participant.SID} sid
         * @property {ParticipantSignaling.State} state - "connecting", "connected", or "disconnected"
         * @property {Map<string, TrackSignaling>} tracks
         * @emits ParticipantSignaling#trackAdded
         * @emits ParticipantSignaling#trackRemoved
         */
        export class ParticipantSignaling extends StateMachine<ParticipantSignaling.State> {
            identity?: Participant.Identity;
            sid?: Participant.SID;
            state: ParticipantSignaling.State;
            tracks: Map<string, TrackSignaling>;
            constructor();

            /**
             * Add {@link TrackSignaling} to the {@link ParticipantSignaling}.
             * @param {TrackSignaling} track
             * @returns {this}
             */
            addTrack(track: any): this;

            /**
             * Disconnect the {@link ParticipantSignaling}.
             * @returns {boolean}
             */
            disconnect(): boolean;

            /**
             * Remove {@link TrackSignaling} from the {@link ParticipantSignaling}.
             * @param {TrackSignaling} track
             * @returns {boolean}
             */
            removeTrack(track: any): boolean;

            /**
             * Connect the {@link ParticipantSignaling}.
             * @param {Participant.SID} sid
             * @param {string} identity
             * @returns {boolean}
             */
            connect(sid: any, identity: string): boolean;

        }
        export namespace ParticipantSignaling {
            /**
             * A {@link ParticipantSignaling.State} is a string representing the current state
             * of the ParticipantSignaling, moves from "connecting"->"connected"->"disconnected".
             * @type string
             * @typedef ParticipantSignaling.State
             * 
             * ParticipantSignaling States
             * ----------------------
             * 
             *     +------------+     +-----------+     +--------------+
             *     |            |     |           |     |              |
             *     | connecting |---->| connected |---->| disconnected |
             *     |            |     |           |     |              |
             *     +------------+     +-----------+     +--------------+
             */
            export type State = 'connecting' | 'connected' | 'disconnected';
        }

        /**
         * Construct a {@link RemoteParticipantSignaling}.
         * @class
         * @classdesc A {@link Participant} implementation
         * @extends ParticipantSignaling
         * @param {Participant.SID} sid
         * @param {Participant.Identity} identity
         * @property {Participant.Identity} identity
         * @property {Participant.SID} sid
         */
        export class RemoteParticipantSignaling {
            identity: Participant.Identity;
            sid: Participant.SID;
            constructor(sid: any, identity: Participant.Identity);
        }

        /**
         * Construct a {@link RecordingSignaling}.
         * @class
         * @classdesc Represents recording state
         * @property {?boolean} isEnabled
         */
        export class RecordingSignaling extends EventEmitter {
            isEnabled: any;
            constructor();
            /**
             * Disable the {@link RecordingSignaling} if it is not already disabled.
             * @return {this}
             */
            disable(): this;

            /**
             * Enable (or disable) the {@link RecordingSignaling} if it is not already enabled
             * (or disabled).
             * @param {boolean} [enabled=true]
             * @return {this}
             */
            enable(enabled?: boolean): this;

        }

        /**
         * Construct a {@link TrackV2}.
         * @class
         * @extends TrackSignaling
         * @param {TrackV2#Representation} track
         */
        export class TrackV2 extends TrackSignaling {
            /**
             * Get the {@link TrackV2#Representation} of a given {@link TrackSignaling}.
             * @param {TrackSignaling} track
             * @returns {TrackV2#Representation}
             */
            static getState(track: TrackSignaling): any;
            constructor(track: TrackV2.Representation);
            /**
             * Compare the {@link TrackV2} to a {@link TrackV2#Representation} of itself
             * and perform any updates necessary.
             * @param {TrackV2#Representation} track
             * @returns {this}
             * @fires TrackSignaling#updated
             */
            update(track: TrackV2.Representation): this;
        }

        export namespace TrackV2 {
            /**
             * The Room Signaling Protocol (RSP) representation of a {@link TrackV2}
             * @typedef {object} TrackV2#Representation
             * @property {boolean} enabled
             * @property {string} id
             * @property {string} kind
             */
            export interface Representation {
                enabled: boolean;
                id: string;
                kind: string;
            }
        }

        /**
         * Construct a {@link LocalParticipantV2}.
         * @class
         * @extends ParticipantSignaling
         */
        export class LocalParticipantV2 extends ParticipantSignaling {}

        /**
         * Construct a {@link RemoteParticipantV2}.
         * @class
         * @extends RemoteParticipantSignaling
         * @param {object} participantState
         * @param {function(Track.ID): Promise<MediaStreamTrack>} getMediaStreamTrack
         * @property {?number} revision
         */
        export class RemoteParticipantV2 extends RemoteParticipantSignaling {
            revision: number;
            constructor(participantState: any, getMediaStreamTrack: (trackId: Track.ID) => Promise<MediaStreamTrack>);
        }
    }
}