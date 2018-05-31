/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { q as getElementDimensions, r as isNumber } from './chunk-2ae67a58.js';
import './chunk-a7525511.js';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber$1(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber$1(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber$1(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour they want. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return globalLocale;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
        else {
            if ((typeof console !==  'undefined') && console.warn) {
                //warn user if arguments are passed but the locale could not be set
                console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
            }
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var locale, parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                locale = loadLocale(config.parentLocale);
                if (locale != null) {
                    parentConfig = locale._config;
                } else {
                    if (!localeFamilies[config.parentLocale]) {
                        localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                        name: name,
                        config: config
                    });
                    return null;
                }
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber$1(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber$1(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString(keepOffset) {
    if (!this.isValid()) {
        return null;
    }
    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        if (utc) {
            return this.toDate().toISOString();
        } else {
            return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
        }
    }
    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIORITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber$1(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber$1(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber$1(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports

hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports

//! moment.js

hooks.version = '2.22.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

// currently HTML5 input type only supports 24-hour formats
hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',                             // <input type="date" />
    TIME: 'HH:mm',                                  // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
    WEEK: 'YYYY-[W]WW',                             // <input type="week" />
    MONTH: 'YYYY-MM'                                // <input type="month" />
};

class YooFormTimerComponent {
    constructor() {
        this.smallWindowSize = false;
    }
    componentDidLoad() {
        this.resizeComponent();
        parent.addEventListener('resize', () => this.resizeComponent()); //This implementaion must be used otherwise the host element will become undefined on page resize.
    }
    timeChanged(event, position) {
        let hours = Number(event.detail.split(':')[0]);
        let minutes = Number(event.detail.split(':')[1]);
        if (isNumber(hours) && isNumber(minutes)) {
            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                if (position === 'start') {
                    this.startHour = hours;
                    this.startMinute = minutes;
                }
                else {
                    this.endTime = hooks(this.endTime).hours(hours).minutes(minutes);
                }
            }
        }
        if (this.startHour && this.startMinute && this.endTime) {
            this.calculatedTime = this.formatTime(this.calculateTotalTime());
            this.timeCalculated.emit(this.calculatedTime);
        }
    }
    formatTime(time) {
        let removeDateStringFromCalc = time.split(' ')[4];
        return removeDateStringFromCalc.split(':')[0] + ':' + removeDateStringFromCalc.split(':')[1];
    }
    calculateTotalTime() {
        let calcTime = hooks(this.endTime).subtract(this.startHour, 'h');
        return hooks(calcTime).subtract(this.startMinute, 'm').toLocaleString();
    }
    resizeComponent() {
        const MAX_COMPONENT_WIDTH = 350;
        let width = getElementDimensions(this.host).width;
        MAX_COMPONENT_WIDTH > width ? this.smallWindowSize = true : this.smallWindowSize = false;
    }
    render() {
        return (h("div", { class: "outer-container", "attr-layout": "row" },
            h("div", { class: "column-container", "attr-layout": "column" },
                h("div", { class: "text-container" }, "TIME IN"),
                h("yoo-form-input", { type: "time", onInputChanged: (event) => this.timeChanged(event, 'start') }),
                this.smallWindowSize ? [h("div", { class: "text-container" }, "TIME OUT"), h("yoo-form-input", { type: "time", onInputChanged: (event) => this.timeChanged(event, 'end') })] : null),
            h("div", { class: "column-container", "attr-layout": "column" },
                h("div", { class: "text-container" }, "TOTAL TASK"),
                h("div", { class: "text-container" }, this.calculatedTime),
                h("div", { class: "text-container" }, "Hrs Mins")),
            this.smallWindowSize ? null :
                h("div", { class: "column-container", "attr-layout": "column" },
                    h("div", { class: "text-container" }, "TIME OUT"),
                    h("yoo-form-input", { type: "time", onInputChanged: (event) => this.timeChanged(event, 'end') }))));
    }
    static get is() { return "yoo-form-timer"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "calculatedTime": { "state": true }, "host": { "elementRef": true }, "smallWindowSize": { "state": true }, "timeChanged": { "method": true } }; }
    static get events() { return [{ "name": "timeCalculated", "method": "timeCalculated", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/*\n*\n*  Responsive attributes\n*\n*  References:\n*  1) https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties#flex\n*  2) https://css-tricks.com/almanac/properties/f/flex/\n*  3) https://css-tricks.com/snippets/css/a-guide-to-flexbox/\n*  4) https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items\n*  5) http://godban.com.ua/projects/flexgrid\n*\n*/\n\@-moz-document url-prefix() {\n  [attr-layout-fill] {\n    margin: 0;\n    width: 100%;\n    min-height: 100%;\n    height: 100%; } }\n\n/*\n *  Apply Mixins to create Layout/Flexbox styles\n *\n */\n[attr-flex-order] {\n  -webkit-box-ordinal-group: 1;\n  -webkit-order: 0;\n  -ms-flex-order: 0;\n  order: 0; }\n\n[attr-flex-order=\"-20\"] {\n  -webkit-box-ordinal-group: -19;\n  -webkit-order: -20;\n  -ms-flex-order: -20;\n  order: -20; }\n\n[attr-flex-order=\"-19\"] {\n  -webkit-box-ordinal-group: -18;\n  -webkit-order: -19;\n  -ms-flex-order: -19;\n  order: -19; }\n\n[attr-flex-order=\"-18\"] {\n  -webkit-box-ordinal-group: -17;\n  -webkit-order: -18;\n  -ms-flex-order: -18;\n  order: -18; }\n\n[attr-flex-order=\"-17\"] {\n  -webkit-box-ordinal-group: -16;\n  -webkit-order: -17;\n  -ms-flex-order: -17;\n  order: -17; }\n\n[attr-flex-order=\"-16\"] {\n  -webkit-box-ordinal-group: -15;\n  -webkit-order: -16;\n  -ms-flex-order: -16;\n  order: -16; }\n\n[attr-flex-order=\"-15\"] {\n  -webkit-box-ordinal-group: -14;\n  -webkit-order: -15;\n  -ms-flex-order: -15;\n  order: -15; }\n\n[attr-flex-order=\"-14\"] {\n  -webkit-box-ordinal-group: -13;\n  -webkit-order: -14;\n  -ms-flex-order: -14;\n  order: -14; }\n\n[attr-flex-order=\"-13\"] {\n  -webkit-box-ordinal-group: -12;\n  -webkit-order: -13;\n  -ms-flex-order: -13;\n  order: -13; }\n\n[attr-flex-order=\"-12\"] {\n  -webkit-box-ordinal-group: -11;\n  -webkit-order: -12;\n  -ms-flex-order: -12;\n  order: -12; }\n\n[attr-flex-order=\"-11\"] {\n  -webkit-box-ordinal-group: -10;\n  -webkit-order: -11;\n  -ms-flex-order: -11;\n  order: -11; }\n\n[attr-flex-order=\"-10\"] {\n  -webkit-box-ordinal-group: -9;\n  -webkit-order: -10;\n  -ms-flex-order: -10;\n  order: -10; }\n\n[attr-flex-order=\"-9\"] {\n  -webkit-box-ordinal-group: -8;\n  -webkit-order: -9;\n  -ms-flex-order: -9;\n  order: -9; }\n\n[attr-flex-order=\"-8\"] {\n  -webkit-box-ordinal-group: -7;\n  -webkit-order: -8;\n  -ms-flex-order: -8;\n  order: -8; }\n\n[attr-flex-order=\"-7\"] {\n  -webkit-box-ordinal-group: -6;\n  -webkit-order: -7;\n  -ms-flex-order: -7;\n  order: -7; }\n\n[attr-flex-order=\"-6\"] {\n  -webkit-box-ordinal-group: -5;\n  -webkit-order: -6;\n  -ms-flex-order: -6;\n  order: -6; }\n\n[attr-flex-order=\"-5\"] {\n  -webkit-box-ordinal-group: -4;\n  -webkit-order: -5;\n  -ms-flex-order: -5;\n  order: -5; }\n\n[attr-flex-order=\"-4\"] {\n  -webkit-box-ordinal-group: -3;\n  -webkit-order: -4;\n  -ms-flex-order: -4;\n  order: -4; }\n\n[attr-flex-order=\"-3\"] {\n  -webkit-box-ordinal-group: -2;\n  -webkit-order: -3;\n  -ms-flex-order: -3;\n  order: -3; }\n\n[attr-flex-order=\"-2\"] {\n  -webkit-box-ordinal-group: -1;\n  -webkit-order: -2;\n  -ms-flex-order: -2;\n  order: -2; }\n\n[attr-flex-order=\"-1\"] {\n  -webkit-box-ordinal-group: 0;\n  -webkit-order: -1;\n  -ms-flex-order: -1;\n  order: -1; }\n\n[attr-flex-order=\"0\"] {\n  -webkit-box-ordinal-group: 1;\n  -webkit-order: 0;\n  -ms-flex-order: 0;\n  order: 0; }\n\n[attr-flex-order=\"1\"] {\n  -webkit-box-ordinal-group: 2;\n  -webkit-order: 1;\n  -ms-flex-order: 1;\n  order: 1; }\n\n[attr-flex-order=\"2\"] {\n  -webkit-box-ordinal-group: 3;\n  -webkit-order: 2;\n  -ms-flex-order: 2;\n  order: 2; }\n\n[attr-flex-order=\"3\"] {\n  -webkit-box-ordinal-group: 4;\n  -webkit-order: 3;\n  -ms-flex-order: 3;\n  order: 3; }\n\n[attr-flex-order=\"4\"] {\n  -webkit-box-ordinal-group: 5;\n  -webkit-order: 4;\n  -ms-flex-order: 4;\n  order: 4; }\n\n[attr-flex-order=\"5\"] {\n  -webkit-box-ordinal-group: 6;\n  -webkit-order: 5;\n  -ms-flex-order: 5;\n  order: 5; }\n\n[attr-flex-order=\"6\"] {\n  -webkit-box-ordinal-group: 7;\n  -webkit-order: 6;\n  -ms-flex-order: 6;\n  order: 6; }\n\n[attr-flex-order=\"7\"] {\n  -webkit-box-ordinal-group: 8;\n  -webkit-order: 7;\n  -ms-flex-order: 7;\n  order: 7; }\n\n[attr-flex-order=\"8\"] {\n  -webkit-box-ordinal-group: 9;\n  -webkit-order: 8;\n  -ms-flex-order: 8;\n  order: 8; }\n\n[attr-flex-order=\"9\"] {\n  -webkit-box-ordinal-group: 10;\n  -webkit-order: 9;\n  -ms-flex-order: 9;\n  order: 9; }\n\n[attr-flex-order=\"10\"] {\n  -webkit-box-ordinal-group: 11;\n  -webkit-order: 10;\n  -ms-flex-order: 10;\n  order: 10; }\n\n[attr-flex-order=\"11\"] {\n  -webkit-box-ordinal-group: 12;\n  -webkit-order: 11;\n  -ms-flex-order: 11;\n  order: 11; }\n\n[attr-flex-order=\"12\"] {\n  -webkit-box-ordinal-group: 13;\n  -webkit-order: 12;\n  -ms-flex-order: 12;\n  order: 12; }\n\n[attr-flex-order=\"13\"] {\n  -webkit-box-ordinal-group: 14;\n  -webkit-order: 13;\n  -ms-flex-order: 13;\n  order: 13; }\n\n[attr-flex-order=\"14\"] {\n  -webkit-box-ordinal-group: 15;\n  -webkit-order: 14;\n  -ms-flex-order: 14;\n  order: 14; }\n\n[attr-flex-order=\"15\"] {\n  -webkit-box-ordinal-group: 16;\n  -webkit-order: 15;\n  -ms-flex-order: 15;\n  order: 15; }\n\n[attr-flex-order=\"16\"] {\n  -webkit-box-ordinal-group: 17;\n  -webkit-order: 16;\n  -ms-flex-order: 16;\n  order: 16; }\n\n[attr-flex-order=\"17\"] {\n  -webkit-box-ordinal-group: 18;\n  -webkit-order: 17;\n  -ms-flex-order: 17;\n  order: 17; }\n\n[attr-flex-order=\"18\"] {\n  -webkit-box-ordinal-group: 19;\n  -webkit-order: 18;\n  -ms-flex-order: 18;\n  order: 18; }\n\n[attr-flex-order=\"19\"] {\n  -webkit-box-ordinal-group: 20;\n  -webkit-order: 19;\n  -ms-flex-order: 19;\n  order: 19; }\n\n[attr-flex-order=\"20\"] {\n  -webkit-box-ordinal-group: 21;\n  -webkit-order: 20;\n  -ms-flex-order: 20;\n  order: 20; }\n\n[attr-flex-offset=\"0\"] {\n  margin-left: 0%; }\n\n[attr-flex-offset=\"5\"] {\n  margin-left: 5%; }\n\n[attr-flex-offset=\"10\"] {\n  margin-left: 10%; }\n\n[attr-flex-offset=\"15\"] {\n  margin-left: 15%; }\n\n[attr-flex-offset=\"20\"] {\n  margin-left: 20%; }\n\n[attr-flex-offset=\"25\"] {\n  margin-left: 25%; }\n\n[attr-flex-offset=\"30\"] {\n  margin-left: 30%; }\n\n[attr-flex-offset=\"35\"] {\n  margin-left: 35%; }\n\n[attr-flex-offset=\"40\"] {\n  margin-left: 40%; }\n\n[attr-flex-offset=\"45\"] {\n  margin-left: 45%; }\n\n[attr-flex-offset=\"50\"] {\n  margin-left: 50%; }\n\n[attr-flex-offset=\"55\"] {\n  margin-left: 55%; }\n\n[attr-flex-offset=\"60\"] {\n  margin-left: 60%; }\n\n[attr-flex-offset=\"65\"] {\n  margin-left: 65%; }\n\n[attr-flex-offset=\"70\"] {\n  margin-left: 70%; }\n\n[attr-flex-offset=\"75\"] {\n  margin-left: 75%; }\n\n[attr-flex-offset=\"80\"] {\n  margin-left: 80%; }\n\n[attr-flex-offset=\"85\"] {\n  margin-left: 85%; }\n\n[attr-flex-offset=\"90\"] {\n  margin-left: 90%; }\n\n[attr-flex-offset=\"95\"] {\n  margin-left: 95%; }\n\n[attr-flex-offset=\"33\"] {\n  margin-left: calc(100% / 3); }\n\n[attr-flex-offset=\"66\"] {\n  margin-left: calc(200% / 3); }\n\n[attr-layout-align],\n[attr-layout-align=\"start stretch\"] {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -webkit-align-content: stretch;\n  -ms-flex-line-pack: stretch;\n  align-content: stretch;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch; }\n\n[attr-layout-align=\"start\"],\n[attr-layout-align=\"start start\"],\n[attr-layout-align=\"start center\"],\n[attr-layout-align=\"start end\"],\n[attr-layout-align=\"start stretch\"] {\n  -webkit-box-pack: start;\n  -webkit-justify-content: start;\n  -ms-flex-pack: start;\n  justify-content: start; }\n\n[attr-layout-align=\"center\"],\n[attr-layout-align=\"center start\"],\n[attr-layout-align=\"center center\"],\n[attr-layout-align=\"center end\"],\n[attr-layout-align=\"center stretch\"] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n[attr-layout-align=\"end\"],\n[attr-layout-align=\"end center\"],\n[attr-layout-align=\"end start\"],\n[attr-layout-align=\"end end\"],\n[attr-layout-align=\"end stretch\"] {\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  -ms-flex-pack: end;\n  justify-content: flex-end; }\n\n[attr-layout-align=\"space-around\"],\n[attr-layout-align=\"space-around center\"],\n[attr-layout-align=\"space-around start\"],\n[attr-layout-align=\"space-around end\"],\n[attr-layout-align=\"space-around stretch\"] {\n  -webkit-justify-content: space-around;\n  -ms-flex-pack: distribute;\n  justify-content: space-around; }\n\n[attr-layout-align=\"space-between\"],\n[attr-layout-align=\"space-between center\"],\n[attr-layout-align=\"space-between start\"],\n[attr-layout-align=\"space-between end\"],\n[attr-layout-align=\"space-between stretch\"] {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n\n[attr-layout-align=\"start start\"],\n[attr-layout-align=\"center start\"],\n[attr-layout-align=\"end start\"],\n[attr-layout-align=\"space-between start\"],\n[attr-layout-align=\"space-around start\"] {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -webkit-align-content: flex-start;\n  -ms-flex-line-pack: start;\n  align-content: flex-start; }\n\n[attr-layout-align=\"start center\"],\n[attr-layout-align=\"center center\"],\n[attr-layout-align=\"end center\"],\n[attr-layout-align=\"space-between center\"],\n[attr-layout-align=\"space-around center\"] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-align-content: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  max-width: 100%; }\n\n[attr-layout-align=\"start center\"] > *,\n[attr-layout-align=\"center center\"] > *,\n[attr-layout-align=\"end center\"] > *,\n[attr-layout-align=\"space-between center\"] > *,\n[attr-layout-align=\"space-around center\"] > * {\n  max-width: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout-align=\"start end\"],\n[attr-layout-align=\"center end\"],\n[attr-layout-align=\"end end\"],\n[attr-layout-align=\"space-between end\"],\n[attr-layout-align=\"space-around end\"] {\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n  -ms-flex-align: end;\n  align-items: flex-end;\n  -webkit-align-content: flex-end;\n  -ms-flex-line-pack: end;\n  align-content: flex-end; }\n\n[attr-layout-align=\"start stretch\"],\n[attr-layout-align=\"center stretch\"],\n[attr-layout-align=\"end stretch\"],\n[attr-layout-align=\"space-between stretch\"],\n[attr-layout-align=\"space-around stretch\"] {\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  -webkit-align-content: stretch;\n  -ms-flex-line-pack: stretch;\n  align-content: stretch; }\n\n[attr-flex] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n\@media screen\\0 {\n  [attr-flex] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n[attr-flex-grow] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 100%;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex-initial] {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex-auto] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex-none] {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex-noshrink] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 0 auto;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex-nogrow] {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"0\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 0%;\n  -ms-flex: 1 1 0%;\n  flex: 1 1 0%;\n  max-width: 0%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"0\"],\n[attr-layout=\"row\"] > [attr-flex=\"0\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 0%;\n  -ms-flex: 1 1 0%;\n  flex: 1 1 0%;\n  max-width: 0%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"0\"],\n[attr-layout=\"column\"] > [attr-flex=\"0\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 0%;\n  -ms-flex: 1 1 0%;\n  flex: 1 1 0%;\n  max-width: 100%;\n  max-height: 0%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"5\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 5%;\n  -ms-flex: 1 1 5%;\n  flex: 1 1 5%;\n  max-width: 5%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"5\"],\n[attr-layout=\"row\"] > [attr-flex=\"5\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 5%;\n  -ms-flex: 1 1 5%;\n  flex: 1 1 5%;\n  max-width: 5%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"5\"],\n[attr-layout=\"column\"] > [attr-flex=\"5\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 5%;\n  -ms-flex: 1 1 5%;\n  flex: 1 1 5%;\n  max-width: 100%;\n  max-height: 5%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"10\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 10%;\n  -ms-flex: 1 1 10%;\n  flex: 1 1 10%;\n  max-width: 10%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"10\"],\n[attr-layout=\"row\"] > [attr-flex=\"10\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 10%;\n  -ms-flex: 1 1 10%;\n  flex: 1 1 10%;\n  max-width: 10%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"10\"],\n[attr-layout=\"column\"] > [attr-flex=\"10\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 10%;\n  -ms-flex: 1 1 10%;\n  flex: 1 1 10%;\n  max-width: 100%;\n  max-height: 10%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"15\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 15%;\n  -ms-flex: 1 1 15%;\n  flex: 1 1 15%;\n  max-width: 15%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"15\"],\n[attr-layout=\"row\"] > [attr-flex=\"15\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 15%;\n  -ms-flex: 1 1 15%;\n  flex: 1 1 15%;\n  max-width: 15%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"15\"],\n[attr-layout=\"column\"] > [attr-flex=\"15\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 15%;\n  -ms-flex: 1 1 15%;\n  flex: 1 1 15%;\n  max-width: 100%;\n  max-height: 15%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"20\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 20%;\n  -ms-flex: 1 1 20%;\n  flex: 1 1 20%;\n  max-width: 20%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"20\"],\n[attr-layout=\"row\"] > [attr-flex=\"20\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 20%;\n  -ms-flex: 1 1 20%;\n  flex: 1 1 20%;\n  max-width: 20%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"20\"],\n[attr-layout=\"column\"] > [attr-flex=\"20\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 20%;\n  -ms-flex: 1 1 20%;\n  flex: 1 1 20%;\n  max-width: 100%;\n  max-height: 20%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"25\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 25%;\n  -ms-flex: 1 1 25%;\n  flex: 1 1 25%;\n  max-width: 25%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"25\"],\n[attr-layout=\"row\"] > [attr-flex=\"25\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 25%;\n  -ms-flex: 1 1 25%;\n  flex: 1 1 25%;\n  max-width: 25%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"25\"],\n[attr-layout=\"column\"] > [attr-flex=\"25\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 25%;\n  -ms-flex: 1 1 25%;\n  flex: 1 1 25%;\n  max-width: 100%;\n  max-height: 25%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"30\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 30%;\n  -ms-flex: 1 1 30%;\n  flex: 1 1 30%;\n  max-width: 30%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"30\"],\n[attr-layout=\"row\"] > [attr-flex=\"30\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 30%;\n  -ms-flex: 1 1 30%;\n  flex: 1 1 30%;\n  max-width: 30%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"30\"],\n[attr-layout=\"column\"] > [attr-flex=\"30\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 30%;\n  -ms-flex: 1 1 30%;\n  flex: 1 1 30%;\n  max-width: 100%;\n  max-height: 30%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"35\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 35%;\n  -ms-flex: 1 1 35%;\n  flex: 1 1 35%;\n  max-width: 35%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"35\"],\n[attr-layout=\"row\"] > [attr-flex=\"35\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 35%;\n  -ms-flex: 1 1 35%;\n  flex: 1 1 35%;\n  max-width: 35%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"35\"],\n[attr-layout=\"column\"] > [attr-flex=\"35\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 35%;\n  -ms-flex: 1 1 35%;\n  flex: 1 1 35%;\n  max-width: 100%;\n  max-height: 35%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"40\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 40%;\n  -ms-flex: 1 1 40%;\n  flex: 1 1 40%;\n  max-width: 40%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"40\"],\n[attr-layout=\"row\"] > [attr-flex=\"40\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 40%;\n  -ms-flex: 1 1 40%;\n  flex: 1 1 40%;\n  max-width: 40%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"40\"],\n[attr-layout=\"column\"] > [attr-flex=\"40\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 40%;\n  -ms-flex: 1 1 40%;\n  flex: 1 1 40%;\n  max-width: 100%;\n  max-height: 40%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"45\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 45%;\n  -ms-flex: 1 1 45%;\n  flex: 1 1 45%;\n  max-width: 45%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"45\"],\n[attr-layout=\"row\"] > [attr-flex=\"45\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 45%;\n  -ms-flex: 1 1 45%;\n  flex: 1 1 45%;\n  max-width: 45%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"45\"],\n[attr-layout=\"column\"] > [attr-flex=\"45\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 45%;\n  -ms-flex: 1 1 45%;\n  flex: 1 1 45%;\n  max-width: 100%;\n  max-height: 45%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"50\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 50%;\n  -ms-flex: 1 1 50%;\n  flex: 1 1 50%;\n  max-width: 50%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"50\"],\n[attr-layout=\"row\"] > [attr-flex=\"50\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 50%;\n  -ms-flex: 1 1 50%;\n  flex: 1 1 50%;\n  max-width: 50%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"50\"],\n[attr-layout=\"column\"] > [attr-flex=\"50\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 50%;\n  -ms-flex: 1 1 50%;\n  flex: 1 1 50%;\n  max-width: 100%;\n  max-height: 50%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"55\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 55%;\n  -ms-flex: 1 1 55%;\n  flex: 1 1 55%;\n  max-width: 55%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"55\"],\n[attr-layout=\"row\"] > [attr-flex=\"55\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 55%;\n  -ms-flex: 1 1 55%;\n  flex: 1 1 55%;\n  max-width: 55%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"55\"],\n[attr-layout=\"column\"] > [attr-flex=\"55\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 55%;\n  -ms-flex: 1 1 55%;\n  flex: 1 1 55%;\n  max-width: 100%;\n  max-height: 55%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"60\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 60%;\n  -ms-flex: 1 1 60%;\n  flex: 1 1 60%;\n  max-width: 60%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"60\"],\n[attr-layout=\"row\"] > [attr-flex=\"60\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 60%;\n  -ms-flex: 1 1 60%;\n  flex: 1 1 60%;\n  max-width: 60%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"60\"],\n[attr-layout=\"column\"] > [attr-flex=\"60\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 60%;\n  -ms-flex: 1 1 60%;\n  flex: 1 1 60%;\n  max-width: 100%;\n  max-height: 60%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"65\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 65%;\n  -ms-flex: 1 1 65%;\n  flex: 1 1 65%;\n  max-width: 65%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"65\"],\n[attr-layout=\"row\"] > [attr-flex=\"65\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 65%;\n  -ms-flex: 1 1 65%;\n  flex: 1 1 65%;\n  max-width: 65%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"65\"],\n[attr-layout=\"column\"] > [attr-flex=\"65\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 65%;\n  -ms-flex: 1 1 65%;\n  flex: 1 1 65%;\n  max-width: 100%;\n  max-height: 65%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"70\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 70%;\n  -ms-flex: 1 1 70%;\n  flex: 1 1 70%;\n  max-width: 70%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"70\"],\n[attr-layout=\"row\"] > [attr-flex=\"70\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 70%;\n  -ms-flex: 1 1 70%;\n  flex: 1 1 70%;\n  max-width: 70%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"70\"],\n[attr-layout=\"column\"] > [attr-flex=\"70\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 70%;\n  -ms-flex: 1 1 70%;\n  flex: 1 1 70%;\n  max-width: 100%;\n  max-height: 70%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"75\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 75%;\n  -ms-flex: 1 1 75%;\n  flex: 1 1 75%;\n  max-width: 75%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"75\"],\n[attr-layout=\"row\"] > [attr-flex=\"75\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 75%;\n  -ms-flex: 1 1 75%;\n  flex: 1 1 75%;\n  max-width: 75%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"75\"],\n[attr-layout=\"column\"] > [attr-flex=\"75\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 75%;\n  -ms-flex: 1 1 75%;\n  flex: 1 1 75%;\n  max-width: 100%;\n  max-height: 75%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"80\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 80%;\n  -ms-flex: 1 1 80%;\n  flex: 1 1 80%;\n  max-width: 80%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"80\"],\n[attr-layout=\"row\"] > [attr-flex=\"80\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 80%;\n  -ms-flex: 1 1 80%;\n  flex: 1 1 80%;\n  max-width: 80%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"80\"],\n[attr-layout=\"column\"] > [attr-flex=\"80\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 80%;\n  -ms-flex: 1 1 80%;\n  flex: 1 1 80%;\n  max-width: 100%;\n  max-height: 80%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"85\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 85%;\n  -ms-flex: 1 1 85%;\n  flex: 1 1 85%;\n  max-width: 85%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"85\"],\n[attr-layout=\"row\"] > [attr-flex=\"85\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 85%;\n  -ms-flex: 1 1 85%;\n  flex: 1 1 85%;\n  max-width: 85%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"85\"],\n[attr-layout=\"column\"] > [attr-flex=\"85\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 85%;\n  -ms-flex: 1 1 85%;\n  flex: 1 1 85%;\n  max-width: 100%;\n  max-height: 85%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"90\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 90%;\n  -ms-flex: 1 1 90%;\n  flex: 1 1 90%;\n  max-width: 90%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"90\"],\n[attr-layout=\"row\"] > [attr-flex=\"90\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 90%;\n  -ms-flex: 1 1 90%;\n  flex: 1 1 90%;\n  max-width: 90%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"90\"],\n[attr-layout=\"column\"] > [attr-flex=\"90\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 90%;\n  -ms-flex: 1 1 90%;\n  flex: 1 1 90%;\n  max-width: 100%;\n  max-height: 90%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"95\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 95%;\n  -ms-flex: 1 1 95%;\n  flex: 1 1 95%;\n  max-width: 95%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"95\"],\n[attr-layout=\"row\"] > [attr-flex=\"95\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 95%;\n  -ms-flex: 1 1 95%;\n  flex: 1 1 95%;\n  max-width: 95%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"95\"],\n[attr-layout=\"column\"] > [attr-flex=\"95\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 95%;\n  -ms-flex: 1 1 95%;\n  flex: 1 1 95%;\n  max-width: 100%;\n  max-height: 95%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-flex=\"100\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 100%;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  max-width: 100%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"100\"],\n[attr-layout=\"row\"] > [attr-flex=\"100\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 100%;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  max-width: 100%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"100\"],\n[attr-layout=\"column\"] > [attr-flex=\"100\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 100%;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  max-width: 100%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"33\"],\n[attr-layout=\"row\"] > [attr-flex=\"33\"],\n[attr-layout=\"row\"] > [attr-flex=\"33\"],\n[attr-layout=\"row\"] > [attr-flex=\"33\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 33%;\n  -ms-flex: 1 1 33%;\n  flex: 1 1 33%;\n  max-width: calc(100% / 3);\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"34\"],\n[attr-layout=\"row\"] > [attr-flex=\"34\"],\n[attr-layout=\"row\"] > [attr-flex=\"34\"],\n[attr-layout=\"row\"] > [attr-flex=\"34\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 34%;\n  -ms-flex: 1 1 34%;\n  flex: 1 1 34%;\n  max-width: 34%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"66\"],\n[attr-layout=\"row\"] > [attr-flex=\"66\"],\n[attr-layout=\"row\"] > [attr-flex=\"66\"],\n[attr-layout=\"row\"] > [attr-flex=\"66\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 66%;\n  -ms-flex: 1 1 66%;\n  flex: 1 1 66%;\n  max-width: calc(200% / 3);\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"row\"] > [attr-flex=\"67\"],\n[attr-layout=\"row\"] > [attr-flex=\"67\"],\n[attr-layout=\"row\"] > [attr-flex=\"67\"],\n[attr-layout=\"row\"] > [attr-flex=\"67\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 67%;\n  -ms-flex: 1 1 67%;\n  flex: 1 1 67%;\n  max-width: 67%;\n  max-height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"33\"],\n[attr-layout=\"column\"] > [attr-flex=\"33\"],\n[attr-layout=\"column\"] > [attr-flex=\"33\"],\n[attr-layout=\"column\"] > [attr-flex=\"33\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 33%;\n  -ms-flex: 1 1 33%;\n  flex: 1 1 33%;\n  max-width: 100%;\n  max-height: calc(100% / 3);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"34\"],\n[attr-layout=\"column\"] > [attr-flex=\"34\"],\n[attr-layout=\"column\"] > [attr-flex=\"34\"],\n[attr-layout=\"column\"] > [attr-flex=\"34\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 34%;\n  -ms-flex: 1 1 34%;\n  flex: 1 1 34%;\n  max-width: 100%;\n  max-height: 34%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"66\"],\n[attr-layout=\"column\"] > [attr-flex=\"66\"],\n[attr-layout=\"column\"] > [attr-flex=\"66\"],\n[attr-layout=\"column\"] > [attr-flex=\"66\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 66%;\n  -ms-flex: 1 1 66%;\n  flex: 1 1 66%;\n  max-width: 100%;\n  max-height: calc(200% / 3);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout=\"column\"] > [attr-flex=\"67\"],\n[attr-layout=\"column\"] > [attr-flex=\"67\"],\n[attr-layout=\"column\"] > [attr-flex=\"67\"],\n[attr-layout=\"column\"] > [attr-flex=\"67\"] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 67%;\n  -ms-flex: 1 1 67%;\n  flex: 1 1 67%;\n  max-width: 100%;\n  max-height: 67%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n[attr-layout],\n[attr-layout=\"column\"],\n[attr-layout=\"row\"] {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex; }\n\n[attr-layout=\"column\"] {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n[attr-layout=\"row\"] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n\n[attr-layout-padding] > [attr-flex-sm],\n[attr-layout-padding] > [attr-flex-lt-md] {\n  padding: 4px; }\n\n[attr-layout-padding],\n[attr-layout-padding] > [attr-flex],\n[attr-layout-padding] > [attr-flex-gt-sm],\n[attr-layout-padding] > [attr-flex-md],\n[attr-layout-padding] > [attr-flex-lt-lg] {\n  padding: 8px; }\n\n[attr-layout-padding] > [attr-flex-gt-md],\n[attr-layout-padding] > [attr-flex-lg] {\n  padding: 16px; }\n\n[attr-layout-margin] > [attr-flex-sm],\n[attr-layout-margin] > [attr-flex-lt-md] {\n  margin: 4px; }\n\n[attr-layout-margin],\n[attr-layout-margin] > [attr-flex],\n[attr-layout-margin] > [attr-flex-gt-sm],\n[attr-layout-margin] > [attr-flex-md],\n[attr-layout-margin] > [attr-flex-lt-lg] {\n  margin: 8px; }\n\n[attr-layout-margin] > [attr-flex-gt-md],\n[attr-layout-margin] > [attr-flex-lg] {\n  margin: 16px; }\n\n[attr-layout-wrap] {\n  -webkit-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n\n[attr-layout-nowrap] {\n  -webkit-flex-wrap: nowrap;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap; }\n\n[attr-layout-fill] {\n  margin: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100%; }\n\n/**\n * `hide-gt-sm show-gt-lg` should hide from 600px to 1200px\n * `show-md hide-gt-sm` should show from 0px to 960px and hide at >960px\n * `hide-gt-md show-gt-sm` should show everywhere (show overrides hide)`\n *\n *  hide means hide everywhere\n *  Sizes:\n *         $layout-breakpoint-xs:     600px !default;\n *         $layout-breakpoint-sm:     960px !default;\n *         $layout-breakpoint-md:     1280px !default;\n *         $layout-breakpoint-lg:     1920px !default;\n */\n\@media (max-width: 599px) {\n  [attr-hide-xs]:not([attr-show-xs]):not([attr-show]),\n  [attr-hide]:not([attr-show-xs]):not([attr-show]) {\n    display: none; }\n  [attr-flex-order-xs=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-xs=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-xs=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-xs=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-xs=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-xs=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-xs=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-xs=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-xs=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-xs=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-xs=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-xs=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-xs=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-xs=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-xs=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-xs=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-xs=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-xs=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-xs=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-xs=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-xs=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-xs=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-xs=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-xs=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-xs=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-xs=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-xs=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-xs=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-xs=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-xs=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-xs=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-xs=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-xs=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-xs=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-xs=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-xs=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-xs=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-xs=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-xs=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-xs=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-xs=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-xs=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-xs=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-xs=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-xs=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-xs=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-xs=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-xs=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-xs=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-xs=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-xs=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-xs=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-xs=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-xs=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-xs=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-xs=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-xs=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-xs=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-xs=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-xs=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-xs=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-xs=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-xs=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-xs],\n  [attr-layout-align-xs=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-xs=\"start\"],\n  [attr-layout-align-xs=\"start start\"],\n  [attr-layout-align-xs=\"start center\"],\n  [attr-layout-align-xs=\"start end\"],\n  [attr-layout-align-xs=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-xs=\"center\"],\n  [attr-layout-align-xs=\"center start\"],\n  [attr-layout-align-xs=\"center center\"],\n  [attr-layout-align-xs=\"center end\"],\n  [attr-layout-align-xs=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-xs=\"end\"],\n  [attr-layout-align-xs=\"end center\"],\n  [attr-layout-align-xs=\"end start\"],\n  [attr-layout-align-xs=\"end end\"],\n  [attr-layout-align-xs=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-xs=\"space-around\"],\n  [attr-layout-align-xs=\"space-around center\"],\n  [attr-layout-align-xs=\"space-around start\"],\n  [attr-layout-align-xs=\"space-around end\"],\n  [attr-layout-align-xs=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-xs=\"space-between\"],\n  [attr-layout-align-xs=\"space-between center\"],\n  [attr-layout-align-xs=\"space-between start\"],\n  [attr-layout-align-xs=\"space-between end\"],\n  [attr-layout-align-xs=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-xs=\"start start\"],\n  [attr-layout-align-xs=\"center start\"],\n  [attr-layout-align-xs=\"end start\"],\n  [attr-layout-align-xs=\"space-between start\"],\n  [attr-layout-align-xs=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-xs=\"start center\"],\n  [attr-layout-align-xs=\"center center\"],\n  [attr-layout-align-xs=\"end center\"],\n  [attr-layout-align-xs=\"space-between center\"],\n  [attr-layout-align-xs=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-xs=\"start center\"] > *,\n  [attr-layout-align-xs=\"center center\"] > *,\n  [attr-layout-align-xs=\"end center\"] > *,\n  [attr-layout-align-xs=\"space-between center\"] > *,\n  [attr-layout-align-xs=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-xs=\"start end\"],\n  [attr-layout-align-xs=\"center end\"],\n  [attr-layout-align-xs=\"end end\"],\n  [attr-layout-align-xs=\"space-between end\"],\n  [attr-layout-align-xs=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-xs=\"start stretch\"],\n  [attr-layout-align-xs=\"center stretch\"],\n  [attr-layout-align-xs=\"end stretch\"],\n  [attr-layout-align-xs=\"space-between stretch\"],\n  [attr-layout-align-xs=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-xs] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (max-width: 599px) {\n  [attr-flex-xs] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (max-width: 599px) {\n  [attr-flex-xs-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"0\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"0\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"5\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"5\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"10\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"10\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"15\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"15\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"20\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"20\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"25\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"25\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"30\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"30\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"35\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"35\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"40\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"40\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"45\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"45\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"50\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"50\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"55\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"55\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"60\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"60\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"65\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"65\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"70\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"70\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"75\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"75\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"80\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"80\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"85\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"85\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"90\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"90\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"95\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"95\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xs=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"100\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"100\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-xs=\"33\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"33\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-xs=\"34\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"34\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-xs=\"66\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"66\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xs=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-xs=\"67\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"67\"],\n  [attr-layout-xs=\"row\"] > [attr-flex-xs=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-xs=\"33\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"33\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-xs=\"34\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"34\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-xs=\"66\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"66\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xs=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-xs=\"67\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"67\"],\n  [attr-layout-xs=\"column\"] > [attr-flex-xs=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-xs],\n  [attr-layout-xs=\"column\"],\n  [attr-layout-xs=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-xs=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-xs=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; } }\n\n\@media (min-width: 600px) {\n  [attr-flex-order-gt-xs=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-gt-xs=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-gt-xs=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-gt-xs=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-gt-xs=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-gt-xs=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-gt-xs=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-gt-xs=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-gt-xs=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-gt-xs=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-gt-xs=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-gt-xs=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-gt-xs=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-gt-xs=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-gt-xs=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-gt-xs=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-gt-xs=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-gt-xs=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-gt-xs=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-gt-xs=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-gt-xs=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-gt-xs=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-gt-xs=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-gt-xs=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-gt-xs=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-gt-xs=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-gt-xs=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-gt-xs=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-gt-xs=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-gt-xs=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-gt-xs=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-gt-xs=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-gt-xs=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-gt-xs=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-gt-xs=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-gt-xs=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-gt-xs=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-gt-xs=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-gt-xs=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-gt-xs=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-gt-xs=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-gt-xs=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-gt-xs=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-gt-xs=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-gt-xs=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-gt-xs=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-gt-xs=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-gt-xs=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-gt-xs=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-gt-xs=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-gt-xs=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-gt-xs=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-gt-xs=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-gt-xs=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-gt-xs=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-gt-xs=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-gt-xs=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-gt-xs=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-gt-xs=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-gt-xs=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-gt-xs=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-gt-xs=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-gt-xs=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-gt-xs],\n  [attr-layout-align-gt-xs=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-gt-xs=\"start\"],\n  [attr-layout-align-gt-xs=\"start start\"],\n  [attr-layout-align-gt-xs=\"start center\"],\n  [attr-layout-align-gt-xs=\"start end\"],\n  [attr-layout-align-gt-xs=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-gt-xs=\"center\"],\n  [attr-layout-align-gt-xs=\"center start\"],\n  [attr-layout-align-gt-xs=\"center center\"],\n  [attr-layout-align-gt-xs=\"center end\"],\n  [attr-layout-align-gt-xs=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-gt-xs=\"end\"],\n  [attr-layout-align-gt-xs=\"end center\"],\n  [attr-layout-align-gt-xs=\"end start\"],\n  [attr-layout-align-gt-xs=\"end end\"],\n  [attr-layout-align-gt-xs=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-gt-xs=\"space-around\"],\n  [attr-layout-align-gt-xs=\"space-around center\"],\n  [attr-layout-align-gt-xs=\"space-around start\"],\n  [attr-layout-align-gt-xs=\"space-around end\"],\n  [attr-layout-align-gt-xs=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-gt-xs=\"space-between\"],\n  [attr-layout-align-gt-xs=\"space-between center\"],\n  [attr-layout-align-gt-xs=\"space-between start\"],\n  [attr-layout-align-gt-xs=\"space-between end\"],\n  [attr-layout-align-gt-xs=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-gt-xs=\"start start\"],\n  [attr-layout-align-gt-xs=\"center start\"],\n  [attr-layout-align-gt-xs=\"end start\"],\n  [attr-layout-align-gt-xs=\"space-between start\"],\n  [attr-layout-align-gt-xs=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-gt-xs=\"start center\"],\n  [attr-layout-align-gt-xs=\"center center\"],\n  [attr-layout-align-gt-xs=\"end center\"],\n  [attr-layout-align-gt-xs=\"space-between center\"],\n  [attr-layout-align-gt-xs=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-gt-xs=\"start center\"] > *,\n  [attr-layout-align-gt-xs=\"center center\"] > *,\n  [attr-layout-align-gt-xs=\"end center\"] > *,\n  [attr-layout-align-gt-xs=\"space-between center\"] > *,\n  [attr-layout-align-gt-xs=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-gt-xs=\"start end\"],\n  [attr-layout-align-gt-xs=\"center end\"],\n  [attr-layout-align-gt-xs=\"end end\"],\n  [attr-layout-align-gt-xs=\"space-between end\"],\n  [attr-layout-align-gt-xs=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-gt-xs=\"start stretch\"],\n  [attr-layout-align-gt-xs=\"center stretch\"],\n  [attr-layout-align-gt-xs=\"end stretch\"],\n  [attr-layout-align-gt-xs=\"space-between stretch\"],\n  [attr-layout-align-gt-xs=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-gt-xs] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 600px) {\n  [attr-flex-gt-xs] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 600px) {\n  [attr-flex-gt-xs-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"0\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"0\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"5\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"5\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"10\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"10\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"15\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"15\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"20\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"20\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"25\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"25\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"30\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"30\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"35\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"35\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"40\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"40\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"45\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"45\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"50\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"50\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"55\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"55\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"60\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"60\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"65\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"65\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"70\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"70\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"75\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"75\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"80\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"80\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"85\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"85\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"90\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"90\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"95\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"95\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-xs=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"100\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"100\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"33\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"33\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"34\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"34\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"66\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"66\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-xs=\"67\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"67\"],\n  [attr-layout-gt-xs=\"row\"] > [attr-flex-gt-xs=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"33\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"33\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"34\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"34\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"66\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"66\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-xs=\"67\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"67\"],\n  [attr-layout-gt-xs=\"column\"] > [attr-flex-gt-xs=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-gt-xs],\n  [attr-layout-gt-xs=\"column\"],\n  [attr-layout-gt-xs=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-gt-xs=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-gt-xs=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; } }\n\n\@media (min-width: 600px) and (max-width: 959px) {\n  [attr-hide-sm]:not([attr-show-gt-xs]):not([attr-show-sm]):not([attr-show]),\n  [attr-hide-gt-xs]:not([attr-show-gt-xs]):not([attr-show-sm]):not([attr-show]) {\n    display: none; }\n  [attr-hide-sm]:not([attr-show-sm]):not([attr-show]) {\n    display: none; }\n  [attr-flex-order-sm=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-sm=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-sm=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-sm=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-sm=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-sm=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-sm=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-sm=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-sm=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-sm=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-sm=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-sm=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-sm=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-sm=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-sm=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-sm=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-sm=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-sm=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-sm=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-sm=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-sm=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-sm=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-sm=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-sm=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-sm=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-sm=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-sm=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-sm=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-sm=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-sm=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-sm=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-sm=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-sm=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-sm=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-sm=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-sm=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-sm=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-sm=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-sm=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-sm=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-sm=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-sm=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-sm=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-sm=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-sm=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-sm=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-sm=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-sm=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-sm=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-sm=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-sm=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-sm=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-sm=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-sm=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-sm=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-sm=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-sm=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-sm=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-sm=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-sm=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-sm=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-sm=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-sm=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-sm],\n  [attr-layout-align-sm=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-sm=\"start\"],\n  [attr-layout-align-sm=\"start start\"],\n  [attr-layout-align-sm=\"start center\"],\n  [attr-layout-align-sm=\"start end\"],\n  [attr-layout-align-sm=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-sm=\"center\"],\n  [attr-layout-align-sm=\"center start\"],\n  [attr-layout-align-sm=\"center center\"],\n  [attr-layout-align-sm=\"center end\"],\n  [attr-layout-align-sm=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-sm=\"end\"],\n  [attr-layout-align-sm=\"end center\"],\n  [attr-layout-align-sm=\"end start\"],\n  [attr-layout-align-sm=\"end end\"],\n  [attr-layout-align-sm=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-sm=\"space-around\"],\n  [attr-layout-align-sm=\"space-around center\"],\n  [attr-layout-align-sm=\"space-around start\"],\n  [attr-layout-align-sm=\"space-around end\"],\n  [attr-layout-align-sm=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-sm=\"space-between\"],\n  [attr-layout-align-sm=\"space-between center\"],\n  [attr-layout-align-sm=\"space-between start\"],\n  [attr-layout-align-sm=\"space-between end\"],\n  [attr-layout-align-sm=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-sm=\"start start\"],\n  [attr-layout-align-sm=\"center start\"],\n  [attr-layout-align-sm=\"end start\"],\n  [attr-layout-align-sm=\"space-between start\"],\n  [attr-layout-align-sm=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-sm=\"start center\"],\n  [attr-layout-align-sm=\"center center\"],\n  [attr-layout-align-sm=\"end center\"],\n  [attr-layout-align-sm=\"space-between center\"],\n  [attr-layout-align-sm=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-sm=\"start center\"] > *,\n  [attr-layout-align-sm=\"center center\"] > *,\n  [attr-layout-align-sm=\"end center\"] > *,\n  [attr-layout-align-sm=\"space-between center\"] > *,\n  [attr-layout-align-sm=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-sm=\"start end\"],\n  [attr-layout-align-sm=\"center end\"],\n  [attr-layout-align-sm=\"end end\"],\n  [attr-layout-align-sm=\"space-between end\"],\n  [attr-layout-align-sm=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-sm=\"start stretch\"],\n  [attr-layout-align-sm=\"center stretch\"],\n  [attr-layout-align-sm=\"end stretch\"],\n  [attr-layout-align-sm=\"space-between stretch\"],\n  [attr-layout-align-sm=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-sm] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 600px) and (max-width: 959px) {\n  [attr-flex-sm] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 600px) and (max-width: 959px) {\n  [attr-flex-sm-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"0\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"0\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"5\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"5\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"10\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"10\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"15\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"15\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"20\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"20\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"25\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"25\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"30\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"30\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"35\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"35\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"40\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"40\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"45\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"45\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"50\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"50\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"55\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"55\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"60\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"60\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"65\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"65\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"70\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"70\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"75\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"75\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"80\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"80\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"85\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"85\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"90\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"90\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"95\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"95\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-sm=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"100\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"100\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-sm=\"33\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"33\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-sm=\"34\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"34\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-sm=\"66\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"66\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-sm=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-sm=\"67\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"67\"],\n  [attr-layout-sm=\"row\"] > [attr-flex-sm=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-sm=\"33\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"33\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-sm=\"34\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"34\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-sm=\"66\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"66\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-sm=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-sm=\"67\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"67\"],\n  [attr-layout-sm=\"column\"] > [attr-flex-sm=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-sm],\n  [attr-layout-sm=\"column\"],\n  [attr-layout-sm=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-sm=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-sm=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; } }\n\n\@media (min-width: 960px) {\n  [attr-flex-order-gt-sm=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-gt-sm=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-gt-sm=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-gt-sm=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-gt-sm=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-gt-sm=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-gt-sm=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-gt-sm=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-gt-sm=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-gt-sm=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-gt-sm=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-gt-sm=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-gt-sm=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-gt-sm=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-gt-sm=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-gt-sm=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-gt-sm=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-gt-sm=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-gt-sm=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-gt-sm=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-gt-sm=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-gt-sm=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-gt-sm=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-gt-sm=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-gt-sm=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-gt-sm=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-gt-sm=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-gt-sm=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-gt-sm=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-gt-sm=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-gt-sm=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-gt-sm=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-gt-sm=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-gt-sm=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-gt-sm=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-gt-sm=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-gt-sm=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-gt-sm=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-gt-sm=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-gt-sm=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-gt-sm=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-gt-sm=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-gt-sm=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-gt-sm=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-gt-sm=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-gt-sm=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-gt-sm=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-gt-sm=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-gt-sm=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-gt-sm=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-gt-sm=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-gt-sm=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-gt-sm=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-gt-sm=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-gt-sm=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-gt-sm=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-gt-sm=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-gt-sm=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-gt-sm=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-gt-sm=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-gt-sm=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-gt-sm=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-gt-sm=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-gt-sm],\n  [attr-layout-align-gt-sm=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-gt-sm=\"start\"],\n  [attr-layout-align-gt-sm=\"start start\"],\n  [attr-layout-align-gt-sm=\"start center\"],\n  [attr-layout-align-gt-sm=\"start end\"],\n  [attr-layout-align-gt-sm=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-gt-sm=\"center\"],\n  [attr-layout-align-gt-sm=\"center start\"],\n  [attr-layout-align-gt-sm=\"center center\"],\n  [attr-layout-align-gt-sm=\"center end\"],\n  [attr-layout-align-gt-sm=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-gt-sm=\"end\"],\n  [attr-layout-align-gt-sm=\"end center\"],\n  [attr-layout-align-gt-sm=\"end start\"],\n  [attr-layout-align-gt-sm=\"end end\"],\n  [attr-layout-align-gt-sm=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-gt-sm=\"space-around\"],\n  [attr-layout-align-gt-sm=\"space-around center\"],\n  [attr-layout-align-gt-sm=\"space-around start\"],\n  [attr-layout-align-gt-sm=\"space-around end\"],\n  [attr-layout-align-gt-sm=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-gt-sm=\"space-between\"],\n  [attr-layout-align-gt-sm=\"space-between center\"],\n  [attr-layout-align-gt-sm=\"space-between start\"],\n  [attr-layout-align-gt-sm=\"space-between end\"],\n  [attr-layout-align-gt-sm=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-gt-sm=\"start start\"],\n  [attr-layout-align-gt-sm=\"center start\"],\n  [attr-layout-align-gt-sm=\"end start\"],\n  [attr-layout-align-gt-sm=\"space-between start\"],\n  [attr-layout-align-gt-sm=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-gt-sm=\"start center\"],\n  [attr-layout-align-gt-sm=\"center center\"],\n  [attr-layout-align-gt-sm=\"end center\"],\n  [attr-layout-align-gt-sm=\"space-between center\"],\n  [attr-layout-align-gt-sm=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-gt-sm=\"start center\"] > *,\n  [attr-layout-align-gt-sm=\"center center\"] > *,\n  [attr-layout-align-gt-sm=\"end center\"] > *,\n  [attr-layout-align-gt-sm=\"space-between center\"] > *,\n  [attr-layout-align-gt-sm=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-gt-sm=\"start end\"],\n  [attr-layout-align-gt-sm=\"center end\"],\n  [attr-layout-align-gt-sm=\"end end\"],\n  [attr-layout-align-gt-sm=\"space-between end\"],\n  [attr-layout-align-gt-sm=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-gt-sm=\"start stretch\"],\n  [attr-layout-align-gt-sm=\"center stretch\"],\n  [attr-layout-align-gt-sm=\"end stretch\"],\n  [attr-layout-align-gt-sm=\"space-between stretch\"],\n  [attr-layout-align-gt-sm=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-gt-sm] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 960px) {\n  [attr-flex-gt-sm] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 960px) {\n  [attr-flex-gt-sm-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"0\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"0\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"5\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"5\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"10\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"10\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"15\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"15\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"20\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"20\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"25\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"25\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"30\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"30\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"35\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"35\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"40\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"40\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"45\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"45\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"50\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"50\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"55\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"55\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"60\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"60\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"65\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"65\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"70\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"70\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"75\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"75\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"80\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"80\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"85\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"85\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"90\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"90\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"95\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"95\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-sm=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"100\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"100\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"33\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"33\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"34\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"34\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"66\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"66\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-sm=\"67\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"67\"],\n  [attr-layout-gt-sm=\"row\"] > [attr-flex-gt-sm=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"33\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"33\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"34\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"34\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"66\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"66\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-sm=\"67\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"67\"],\n  [attr-layout-gt-sm=\"column\"] > [attr-flex-gt-sm=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-gt-sm],\n  [attr-layout-gt-sm=\"column\"],\n  [attr-layout-gt-sm=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-gt-sm=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-gt-sm=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; } }\n\n\@media (min-width: 960px) and (max-width: 1279px) {\n  [attr-hide]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-md]):not([attr-show]),\n  [attr-hide-gt-xs]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-md]):not([attr-show]),\n  [attr-hide-gt-sm]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-md]):not([attr-show]) {\n    display: none; }\n  [attr-hide-md]:not([attr-show-md]):not([attr-show]) {\n    display: none; }\n  [attr-flex-order-md=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-md=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-md=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-md=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-md=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-md=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-md=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-md=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-md=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-md=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-md=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-md=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-md=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-md=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-md=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-md=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-md=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-md=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-md=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-md=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-md=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-md=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-md=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-md=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-md=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-md=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-md=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-md=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-md=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-md=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-md=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-md=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-md=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-md=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-md=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-md=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-md=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-md=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-md=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-md=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-md=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-md=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-md=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-md=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-md=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-md=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-md=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-md=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-md=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-md=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-md=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-md=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-md=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-md=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-md=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-md=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-md=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-md=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-md=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-md=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-md=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-md=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-md=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-md],\n  [attr-layout-align-md=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-md=\"start\"],\n  [attr-layout-align-md=\"start start\"],\n  [attr-layout-align-md=\"start center\"],\n  [attr-layout-align-md=\"start end\"],\n  [attr-layout-align-md=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-md=\"center\"],\n  [attr-layout-align-md=\"center start\"],\n  [attr-layout-align-md=\"center center\"],\n  [attr-layout-align-md=\"center end\"],\n  [attr-layout-align-md=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-md=\"end\"],\n  [attr-layout-align-md=\"end center\"],\n  [attr-layout-align-md=\"end start\"],\n  [attr-layout-align-md=\"end end\"],\n  [attr-layout-align-md=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-md=\"space-around\"],\n  [attr-layout-align-md=\"space-around center\"],\n  [attr-layout-align-md=\"space-around start\"],\n  [attr-layout-align-md=\"space-around end\"],\n  [attr-layout-align-md=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-md=\"space-between\"],\n  [attr-layout-align-md=\"space-between center\"],\n  [attr-layout-align-md=\"space-between start\"],\n  [attr-layout-align-md=\"space-between end\"],\n  [attr-layout-align-md=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-md=\"start start\"],\n  [attr-layout-align-md=\"center start\"],\n  [attr-layout-align-md=\"end start\"],\n  [attr-layout-align-md=\"space-between start\"],\n  [attr-layout-align-md=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-md=\"start center\"],\n  [attr-layout-align-md=\"center center\"],\n  [attr-layout-align-md=\"end center\"],\n  [attr-layout-align-md=\"space-between center\"],\n  [attr-layout-align-md=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-md=\"start center\"] > *,\n  [attr-layout-align-md=\"center center\"] > *,\n  [attr-layout-align-md=\"end center\"] > *,\n  [attr-layout-align-md=\"space-between center\"] > *,\n  [attr-layout-align-md=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-md=\"start end\"],\n  [attr-layout-align-md=\"center end\"],\n  [attr-layout-align-md=\"end end\"],\n  [attr-layout-align-md=\"space-between end\"],\n  [attr-layout-align-md=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-md=\"start stretch\"],\n  [attr-layout-align-md=\"center stretch\"],\n  [attr-layout-align-md=\"end stretch\"],\n  [attr-layout-align-md=\"space-between stretch\"],\n  [attr-layout-align-md=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-md] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 960px) and (max-width: 1279px) {\n  [attr-flex-md] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 960px) and (max-width: 1279px) {\n  [attr-flex-md-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"0\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"0\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"5\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"5\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"10\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"10\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"15\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"15\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"20\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"20\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"25\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"25\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"30\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"30\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"35\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"35\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"40\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"40\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"45\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"45\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"50\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"50\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"55\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"55\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"60\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"60\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"65\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"65\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"70\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"70\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"75\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"75\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"80\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"80\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"85\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"85\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"90\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"90\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"95\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"95\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-md=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"100\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"100\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-md=\"33\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"33\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-md=\"34\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"34\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-md=\"66\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"66\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-md=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-md=\"67\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"67\"],\n  [attr-layout-md=\"row\"] > [attr-flex-md=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-md=\"33\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"33\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-md=\"34\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"34\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-md=\"66\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"66\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-md=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-md=\"67\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"67\"],\n  [attr-layout-md=\"column\"] > [attr-flex-md=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-md],\n  [attr-layout-md=\"column\"],\n  [attr-layout-md=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-md=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-md=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; } }\n\n\@media (min-width: 1280px) {\n  [attr-flex-order-gt-md=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-gt-md=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-gt-md=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-gt-md=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-gt-md=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-gt-md=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-gt-md=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-gt-md=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-gt-md=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-gt-md=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-gt-md=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-gt-md=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-gt-md=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-gt-md=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-gt-md=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-gt-md=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-gt-md=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-gt-md=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-gt-md=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-gt-md=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-gt-md=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-gt-md=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-gt-md=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-gt-md=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-gt-md=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-gt-md=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-gt-md=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-gt-md=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-gt-md=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-gt-md=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-gt-md=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-gt-md=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-gt-md=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-gt-md=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-gt-md=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-gt-md=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-gt-md=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-gt-md=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-gt-md=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-gt-md=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-gt-md=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-gt-md=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-gt-md=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-gt-md=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-gt-md=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-gt-md=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-gt-md=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-gt-md=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-gt-md=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-gt-md=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-gt-md=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-gt-md=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-gt-md=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-gt-md=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-gt-md=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-gt-md=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-gt-md=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-gt-md=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-gt-md=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-gt-md=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-gt-md=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-gt-md=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-gt-md=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-gt-md],\n  [attr-layout-align-gt-md=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-gt-md=\"start\"],\n  [attr-layout-align-gt-md=\"start start\"],\n  [attr-layout-align-gt-md=\"start center\"],\n  [attr-layout-align-gt-md=\"start end\"],\n  [attr-layout-align-gt-md=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-gt-md=\"center\"],\n  [attr-layout-align-gt-md=\"center start\"],\n  [attr-layout-align-gt-md=\"center center\"],\n  [attr-layout-align-gt-md=\"center end\"],\n  [attr-layout-align-gt-md=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-gt-md=\"end\"],\n  [attr-layout-align-gt-md=\"end center\"],\n  [attr-layout-align-gt-md=\"end start\"],\n  [attr-layout-align-gt-md=\"end end\"],\n  [attr-layout-align-gt-md=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-gt-md=\"space-around\"],\n  [attr-layout-align-gt-md=\"space-around center\"],\n  [attr-layout-align-gt-md=\"space-around start\"],\n  [attr-layout-align-gt-md=\"space-around end\"],\n  [attr-layout-align-gt-md=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-gt-md=\"space-between\"],\n  [attr-layout-align-gt-md=\"space-between center\"],\n  [attr-layout-align-gt-md=\"space-between start\"],\n  [attr-layout-align-gt-md=\"space-between end\"],\n  [attr-layout-align-gt-md=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-gt-md=\"start start\"],\n  [attr-layout-align-gt-md=\"center start\"],\n  [attr-layout-align-gt-md=\"end start\"],\n  [attr-layout-align-gt-md=\"space-between start\"],\n  [attr-layout-align-gt-md=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-gt-md=\"start center\"],\n  [attr-layout-align-gt-md=\"center center\"],\n  [attr-layout-align-gt-md=\"end center\"],\n  [attr-layout-align-gt-md=\"space-between center\"],\n  [attr-layout-align-gt-md=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-gt-md=\"start center\"] > *,\n  [attr-layout-align-gt-md=\"center center\"] > *,\n  [attr-layout-align-gt-md=\"end center\"] > *,\n  [attr-layout-align-gt-md=\"space-between center\"] > *,\n  [attr-layout-align-gt-md=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-gt-md=\"start end\"],\n  [attr-layout-align-gt-md=\"center end\"],\n  [attr-layout-align-gt-md=\"end end\"],\n  [attr-layout-align-gt-md=\"space-between end\"],\n  [attr-layout-align-gt-md=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-gt-md=\"start stretch\"],\n  [attr-layout-align-gt-md=\"center stretch\"],\n  [attr-layout-align-gt-md=\"end stretch\"],\n  [attr-layout-align-gt-md=\"space-between stretch\"],\n  [attr-layout-align-gt-md=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-gt-md] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 1280px) {\n  [attr-flex-gt-md] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 1280px) {\n  [attr-flex-gt-md-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"0\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"0\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"5\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"5\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"10\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"10\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"15\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"15\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"20\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"20\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"25\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"25\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"30\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"30\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"35\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"35\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"40\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"40\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"45\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"45\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"50\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"50\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"55\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"55\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"60\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"60\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"65\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"65\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"70\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"70\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"75\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"75\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"80\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"80\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"85\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"85\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"90\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"90\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"95\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"95\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-md=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"100\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"100\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"33\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"33\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"34\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"34\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"66\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"66\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-md=\"67\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"67\"],\n  [attr-layout-gt-md=\"row\"] > [attr-flex-gt-md=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"33\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"33\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"34\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"34\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"66\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"66\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-md=\"67\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"67\"],\n  [attr-layout-gt-md=\"column\"] > [attr-flex-gt-md=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-gt-md],\n  [attr-layout-gt-md=\"column\"],\n  [attr-layout-gt-md=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-gt-md=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-gt-md=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; } }\n\n\@media (min-width: 1280px) and (max-width: 1919px) {\n  [attr-hide]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-lg]):not([attr-show]),\n  [attr-hide-gt-xs]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-lg]):not([attr-show]),\n  [attr-hide-gt-sm]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-lg]):not([attr-show]),\n  [attr-hide-gt-md]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-lg]):not([attr-show]) {\n    display: none; }\n  [attr-hide-lg]:not([attr-show-lg]):not([attr-show]) {\n    display: none; }\n  [attr-flex-order-lg=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-lg=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-lg=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-lg=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-lg=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-lg=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-lg=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-lg=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-lg=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-lg=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-lg=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-lg=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-lg=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-lg=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-lg=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-lg=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-lg=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-lg=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-lg=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-lg=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-lg=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-lg=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-lg=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-lg=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-lg=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-lg=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-lg=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-lg=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-lg=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-lg=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-lg=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-lg=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-lg=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-lg=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-lg=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-lg=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-lg=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-lg=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-lg=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-lg=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-lg=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-lg=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-lg=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-lg=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-lg=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-lg=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-lg=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-lg=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-lg=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-lg=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-lg=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-lg=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-lg=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-lg=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-lg=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-lg=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-lg=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-lg=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-lg=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-lg=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-lg=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-lg=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-lg=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-lg],\n  [attr-layout-align-lg=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-lg=\"start\"],\n  [attr-layout-align-lg=\"start start\"],\n  [attr-layout-align-lg=\"start center\"],\n  [attr-layout-align-lg=\"start end\"],\n  [attr-layout-align-lg=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-lg=\"center\"],\n  [attr-layout-align-lg=\"center start\"],\n  [attr-layout-align-lg=\"center center\"],\n  [attr-layout-align-lg=\"center end\"],\n  [attr-layout-align-lg=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-lg=\"end\"],\n  [attr-layout-align-lg=\"end center\"],\n  [attr-layout-align-lg=\"end start\"],\n  [attr-layout-align-lg=\"end end\"],\n  [attr-layout-align-lg=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-lg=\"space-around\"],\n  [attr-layout-align-lg=\"space-around center\"],\n  [attr-layout-align-lg=\"space-around start\"],\n  [attr-layout-align-lg=\"space-around end\"],\n  [attr-layout-align-lg=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-lg=\"space-between\"],\n  [attr-layout-align-lg=\"space-between center\"],\n  [attr-layout-align-lg=\"space-between start\"],\n  [attr-layout-align-lg=\"space-between end\"],\n  [attr-layout-align-lg=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-lg=\"start start\"],\n  [attr-layout-align-lg=\"center start\"],\n  [attr-layout-align-lg=\"end start\"],\n  [attr-layout-align-lg=\"space-between start\"],\n  [attr-layout-align-lg=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-lg=\"start center\"],\n  [attr-layout-align-lg=\"center center\"],\n  [attr-layout-align-lg=\"end center\"],\n  [attr-layout-align-lg=\"space-between center\"],\n  [attr-layout-align-lg=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-lg=\"start center\"] > *,\n  [attr-layout-align-lg=\"center center\"] > *,\n  [attr-layout-align-lg=\"end center\"] > *,\n  [attr-layout-align-lg=\"space-between center\"] > *,\n  [attr-layout-align-lg=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-lg=\"start end\"],\n  [attr-layout-align-lg=\"center end\"],\n  [attr-layout-align-lg=\"end end\"],\n  [attr-layout-align-lg=\"space-between end\"],\n  [attr-layout-align-lg=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-lg=\"start stretch\"],\n  [attr-layout-align-lg=\"center stretch\"],\n  [attr-layout-align-lg=\"end stretch\"],\n  [attr-layout-align-lg=\"space-between stretch\"],\n  [attr-layout-align-lg=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-lg] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 1280px) and (max-width: 1919px) {\n  [attr-flex-lg] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 1280px) and (max-width: 1919px) {\n  [attr-flex-lg-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"0\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"0\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"5\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"5\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"10\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"10\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"15\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"15\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"20\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"20\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"25\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"25\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"30\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"30\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"35\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"35\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"40\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"40\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"45\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"45\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"50\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"50\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"55\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"55\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"60\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"60\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"65\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"65\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"70\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"70\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"75\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"75\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"80\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"80\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"85\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"85\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"90\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"90\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"95\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"95\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-lg=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"100\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"100\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-lg=\"33\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"33\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-lg=\"34\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"34\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-lg=\"66\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"66\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-lg=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-lg=\"67\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"67\"],\n  [attr-layout-lg=\"row\"] > [attr-flex-lg=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-lg=\"33\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"33\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-lg=\"34\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"34\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-lg=\"66\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"66\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-lg=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-lg=\"67\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"67\"],\n  [attr-layout-lg=\"column\"] > [attr-flex-lg=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-lg],\n  [attr-layout-lg=\"column\"],\n  [attr-layout-lg=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-lg=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-lg=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; } }\n\n\@media (min-width: 1920px) {\n  [attr-flex-order-gt-lg=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-gt-lg=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-gt-lg=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-gt-lg=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-gt-lg=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-gt-lg=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-gt-lg=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-gt-lg=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-gt-lg=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-gt-lg=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-gt-lg=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-gt-lg=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-gt-lg=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-gt-lg=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-gt-lg=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-gt-lg=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-gt-lg=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-gt-lg=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-gt-lg=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-gt-lg=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-gt-lg=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-gt-lg=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-gt-lg=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-gt-lg=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-gt-lg=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-gt-lg=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-gt-lg=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-gt-lg=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-gt-lg=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-gt-lg=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-gt-lg=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-gt-lg=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-gt-lg=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-gt-lg=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-gt-lg=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-gt-lg=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-gt-lg=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-gt-lg=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-gt-lg=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-gt-lg=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-gt-lg=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-gt-lg=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-gt-lg=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-gt-lg=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-gt-lg=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-gt-lg=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-gt-lg=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-gt-lg=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-gt-lg=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-gt-lg=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-gt-lg=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-gt-lg=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-gt-lg=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-gt-lg=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-gt-lg=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-gt-lg=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-gt-lg=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-gt-lg=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-gt-lg=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-gt-lg=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-gt-lg=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-gt-lg=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-gt-lg=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-gt-lg],\n  [attr-layout-align-gt-lg=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-gt-lg=\"start\"],\n  [attr-layout-align-gt-lg=\"start start\"],\n  [attr-layout-align-gt-lg=\"start center\"],\n  [attr-layout-align-gt-lg=\"start end\"],\n  [attr-layout-align-gt-lg=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-gt-lg=\"center\"],\n  [attr-layout-align-gt-lg=\"center start\"],\n  [attr-layout-align-gt-lg=\"center center\"],\n  [attr-layout-align-gt-lg=\"center end\"],\n  [attr-layout-align-gt-lg=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-gt-lg=\"end\"],\n  [attr-layout-align-gt-lg=\"end center\"],\n  [attr-layout-align-gt-lg=\"end start\"],\n  [attr-layout-align-gt-lg=\"end end\"],\n  [attr-layout-align-gt-lg=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-gt-lg=\"space-around\"],\n  [attr-layout-align-gt-lg=\"space-around center\"],\n  [attr-layout-align-gt-lg=\"space-around start\"],\n  [attr-layout-align-gt-lg=\"space-around end\"],\n  [attr-layout-align-gt-lg=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-gt-lg=\"space-between\"],\n  [attr-layout-align-gt-lg=\"space-between center\"],\n  [attr-layout-align-gt-lg=\"space-between start\"],\n  [attr-layout-align-gt-lg=\"space-between end\"],\n  [attr-layout-align-gt-lg=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-gt-lg=\"start start\"],\n  [attr-layout-align-gt-lg=\"center start\"],\n  [attr-layout-align-gt-lg=\"end start\"],\n  [attr-layout-align-gt-lg=\"space-between start\"],\n  [attr-layout-align-gt-lg=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-gt-lg=\"start center\"],\n  [attr-layout-align-gt-lg=\"center center\"],\n  [attr-layout-align-gt-lg=\"end center\"],\n  [attr-layout-align-gt-lg=\"space-between center\"],\n  [attr-layout-align-gt-lg=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-gt-lg=\"start center\"] > *,\n  [attr-layout-align-gt-lg=\"center center\"] > *,\n  [attr-layout-align-gt-lg=\"end center\"] > *,\n  [attr-layout-align-gt-lg=\"space-between center\"] > *,\n  [attr-layout-align-gt-lg=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-gt-lg=\"start end\"],\n  [attr-layout-align-gt-lg=\"center end\"],\n  [attr-layout-align-gt-lg=\"end end\"],\n  [attr-layout-align-gt-lg=\"space-between end\"],\n  [attr-layout-align-gt-lg=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-gt-lg=\"start stretch\"],\n  [attr-layout-align-gt-lg=\"center stretch\"],\n  [attr-layout-align-gt-lg=\"end stretch\"],\n  [attr-layout-align-gt-lg=\"space-between stretch\"],\n  [attr-layout-align-gt-lg=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-gt-lg] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 1920px) {\n  [attr-flex-gt-lg] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 1920px) {\n  [attr-flex-gt-lg-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"0\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"0\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"5\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"5\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"10\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"10\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"15\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"15\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"20\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"20\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"25\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"25\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"30\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"30\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"35\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"35\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"40\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"40\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"45\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"45\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"50\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"50\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"55\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"55\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"60\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"60\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"65\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"65\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"70\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"70\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"75\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"75\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"80\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"80\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"85\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"85\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"90\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"90\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"95\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"95\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-gt-lg=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"100\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"100\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"33\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"33\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"34\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"34\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"66\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"66\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-gt-lg=\"67\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"67\"],\n  [attr-layout-gt-lg=\"row\"] > [attr-flex-gt-lg=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"33\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"33\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"34\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"34\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"66\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"66\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-gt-lg=\"67\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"67\"],\n  [attr-layout-gt-lg=\"column\"] > [attr-flex-gt-lg=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-gt-lg],\n  [attr-layout-gt-lg=\"column\"],\n  [attr-layout-gt-lg=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-gt-lg=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-gt-lg=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  [attr-flex-order-xl=\"-20\"] {\n    -webkit-box-ordinal-group: -19;\n    -webkit-order: -20;\n    -ms-flex-order: -20;\n    order: -20; }\n  [attr-flex-order-xl=\"-19\"] {\n    -webkit-box-ordinal-group: -18;\n    -webkit-order: -19;\n    -ms-flex-order: -19;\n    order: -19; }\n  [attr-flex-order-xl=\"-18\"] {\n    -webkit-box-ordinal-group: -17;\n    -webkit-order: -18;\n    -ms-flex-order: -18;\n    order: -18; }\n  [attr-flex-order-xl=\"-17\"] {\n    -webkit-box-ordinal-group: -16;\n    -webkit-order: -17;\n    -ms-flex-order: -17;\n    order: -17; }\n  [attr-flex-order-xl=\"-16\"] {\n    -webkit-box-ordinal-group: -15;\n    -webkit-order: -16;\n    -ms-flex-order: -16;\n    order: -16; }\n  [attr-flex-order-xl=\"-15\"] {\n    -webkit-box-ordinal-group: -14;\n    -webkit-order: -15;\n    -ms-flex-order: -15;\n    order: -15; }\n  [attr-flex-order-xl=\"-14\"] {\n    -webkit-box-ordinal-group: -13;\n    -webkit-order: -14;\n    -ms-flex-order: -14;\n    order: -14; }\n  [attr-flex-order-xl=\"-13\"] {\n    -webkit-box-ordinal-group: -12;\n    -webkit-order: -13;\n    -ms-flex-order: -13;\n    order: -13; }\n  [attr-flex-order-xl=\"-12\"] {\n    -webkit-box-ordinal-group: -11;\n    -webkit-order: -12;\n    -ms-flex-order: -12;\n    order: -12; }\n  [attr-flex-order-xl=\"-11\"] {\n    -webkit-box-ordinal-group: -10;\n    -webkit-order: -11;\n    -ms-flex-order: -11;\n    order: -11; }\n  [attr-flex-order-xl=\"-10\"] {\n    -webkit-box-ordinal-group: -9;\n    -webkit-order: -10;\n    -ms-flex-order: -10;\n    order: -10; }\n  [attr-flex-order-xl=\"-9\"] {\n    -webkit-box-ordinal-group: -8;\n    -webkit-order: -9;\n    -ms-flex-order: -9;\n    order: -9; }\n  [attr-flex-order-xl=\"-8\"] {\n    -webkit-box-ordinal-group: -7;\n    -webkit-order: -8;\n    -ms-flex-order: -8;\n    order: -8; }\n  [attr-flex-order-xl=\"-7\"] {\n    -webkit-box-ordinal-group: -6;\n    -webkit-order: -7;\n    -ms-flex-order: -7;\n    order: -7; }\n  [attr-flex-order-xl=\"-6\"] {\n    -webkit-box-ordinal-group: -5;\n    -webkit-order: -6;\n    -ms-flex-order: -6;\n    order: -6; }\n  [attr-flex-order-xl=\"-5\"] {\n    -webkit-box-ordinal-group: -4;\n    -webkit-order: -5;\n    -ms-flex-order: -5;\n    order: -5; }\n  [attr-flex-order-xl=\"-4\"] {\n    -webkit-box-ordinal-group: -3;\n    -webkit-order: -4;\n    -ms-flex-order: -4;\n    order: -4; }\n  [attr-flex-order-xl=\"-3\"] {\n    -webkit-box-ordinal-group: -2;\n    -webkit-order: -3;\n    -ms-flex-order: -3;\n    order: -3; }\n  [attr-flex-order-xl=\"-2\"] {\n    -webkit-box-ordinal-group: -1;\n    -webkit-order: -2;\n    -ms-flex-order: -2;\n    order: -2; }\n  [attr-flex-order-xl=\"-1\"] {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n    -ms-flex-order: -1;\n    order: -1; }\n  [attr-flex-order-xl=\"0\"] {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n    -ms-flex-order: 0;\n    order: 0; }\n  [attr-flex-order-xl=\"1\"] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1; }\n  [attr-flex-order-xl=\"2\"] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2; }\n  [attr-flex-order-xl=\"3\"] {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n  [attr-flex-order-xl=\"4\"] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4; }\n  [attr-flex-order-xl=\"5\"] {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n    -ms-flex-order: 5;\n    order: 5; }\n  [attr-flex-order-xl=\"6\"] {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n    -ms-flex-order: 6;\n    order: 6; }\n  [attr-flex-order-xl=\"7\"] {\n    -webkit-box-ordinal-group: 8;\n    -webkit-order: 7;\n    -ms-flex-order: 7;\n    order: 7; }\n  [attr-flex-order-xl=\"8\"] {\n    -webkit-box-ordinal-group: 9;\n    -webkit-order: 8;\n    -ms-flex-order: 8;\n    order: 8; }\n  [attr-flex-order-xl=\"9\"] {\n    -webkit-box-ordinal-group: 10;\n    -webkit-order: 9;\n    -ms-flex-order: 9;\n    order: 9; }\n  [attr-flex-order-xl=\"10\"] {\n    -webkit-box-ordinal-group: 11;\n    -webkit-order: 10;\n    -ms-flex-order: 10;\n    order: 10; }\n  [attr-flex-order-xl=\"11\"] {\n    -webkit-box-ordinal-group: 12;\n    -webkit-order: 11;\n    -ms-flex-order: 11;\n    order: 11; }\n  [attr-flex-order-xl=\"12\"] {\n    -webkit-box-ordinal-group: 13;\n    -webkit-order: 12;\n    -ms-flex-order: 12;\n    order: 12; }\n  [attr-flex-order-xl=\"13\"] {\n    -webkit-box-ordinal-group: 14;\n    -webkit-order: 13;\n    -ms-flex-order: 13;\n    order: 13; }\n  [attr-flex-order-xl=\"14\"] {\n    -webkit-box-ordinal-group: 15;\n    -webkit-order: 14;\n    -ms-flex-order: 14;\n    order: 14; }\n  [attr-flex-order-xl=\"15\"] {\n    -webkit-box-ordinal-group: 16;\n    -webkit-order: 15;\n    -ms-flex-order: 15;\n    order: 15; }\n  [attr-flex-order-xl=\"16\"] {\n    -webkit-box-ordinal-group: 17;\n    -webkit-order: 16;\n    -ms-flex-order: 16;\n    order: 16; }\n  [attr-flex-order-xl=\"17\"] {\n    -webkit-box-ordinal-group: 18;\n    -webkit-order: 17;\n    -ms-flex-order: 17;\n    order: 17; }\n  [attr-flex-order-xl=\"18\"] {\n    -webkit-box-ordinal-group: 19;\n    -webkit-order: 18;\n    -ms-flex-order: 18;\n    order: 18; }\n  [attr-flex-order-xl=\"19\"] {\n    -webkit-box-ordinal-group: 20;\n    -webkit-order: 19;\n    -ms-flex-order: 19;\n    order: 19; }\n  [attr-flex-order-xl=\"20\"] {\n    -webkit-box-ordinal-group: 21;\n    -webkit-order: 20;\n    -ms-flex-order: 20;\n    order: 20; }\n  [attr-flex-offset-xl=\"0\"] {\n    margin-left: 0%; }\n  [attr-flex-offset-xl=\"5\"] {\n    margin-left: 5%; }\n  [attr-flex-offset-xl=\"10\"] {\n    margin-left: 10%; }\n  [attr-flex-offset-xl=\"15\"] {\n    margin-left: 15%; }\n  [attr-flex-offset-xl=\"20\"] {\n    margin-left: 20%; }\n  [attr-flex-offset-xl=\"25\"] {\n    margin-left: 25%; }\n  [attr-flex-offset-xl=\"30\"] {\n    margin-left: 30%; }\n  [attr-flex-offset-xl=\"35\"] {\n    margin-left: 35%; }\n  [attr-flex-offset-xl=\"40\"] {\n    margin-left: 40%; }\n  [attr-flex-offset-xl=\"45\"] {\n    margin-left: 45%; }\n  [attr-flex-offset-xl=\"50\"] {\n    margin-left: 50%; }\n  [attr-flex-offset-xl=\"55\"] {\n    margin-left: 55%; }\n  [attr-flex-offset-xl=\"60\"] {\n    margin-left: 60%; }\n  [attr-flex-offset-xl=\"65\"] {\n    margin-left: 65%; }\n  [attr-flex-offset-xl=\"70\"] {\n    margin-left: 70%; }\n  [attr-flex-offset-xl=\"75\"] {\n    margin-left: 75%; }\n  [attr-flex-offset-xl=\"80\"] {\n    margin-left: 80%; }\n  [attr-flex-offset-xl=\"85\"] {\n    margin-left: 85%; }\n  [attr-flex-offset-xl=\"90\"] {\n    margin-left: 90%; }\n  [attr-flex-offset-xl=\"95\"] {\n    margin-left: 95%; }\n  [attr-flex-offset-xl=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [attr-flex-offset-xl=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [attr-layout-align-xl],\n  [attr-layout-align-xl=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch; }\n  [attr-layout-align-xl=\"start\"],\n  [attr-layout-align-xl=\"start start\"],\n  [attr-layout-align-xl=\"start center\"],\n  [attr-layout-align-xl=\"start end\"],\n  [attr-layout-align-xl=\"start stretch\"] {\n    -webkit-box-pack: start;\n    -webkit-justify-content: start;\n    -ms-flex-pack: start;\n    justify-content: start; }\n  [attr-layout-align-xl=\"center\"],\n  [attr-layout-align-xl=\"center start\"],\n  [attr-layout-align-xl=\"center center\"],\n  [attr-layout-align-xl=\"center end\"],\n  [attr-layout-align-xl=\"center stretch\"] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [attr-layout-align-xl=\"end\"],\n  [attr-layout-align-xl=\"end center\"],\n  [attr-layout-align-xl=\"end start\"],\n  [attr-layout-align-xl=\"end end\"],\n  [attr-layout-align-xl=\"end stretch\"] {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n  [attr-layout-align-xl=\"space-around\"],\n  [attr-layout-align-xl=\"space-around center\"],\n  [attr-layout-align-xl=\"space-around start\"],\n  [attr-layout-align-xl=\"space-around end\"],\n  [attr-layout-align-xl=\"space-around stretch\"] {\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around; }\n  [attr-layout-align-xl=\"space-between\"],\n  [attr-layout-align-xl=\"space-between center\"],\n  [attr-layout-align-xl=\"space-between start\"],\n  [attr-layout-align-xl=\"space-between end\"],\n  [attr-layout-align-xl=\"space-between stretch\"] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [attr-layout-align-xl=\"start start\"],\n  [attr-layout-align-xl=\"center start\"],\n  [attr-layout-align-xl=\"end start\"],\n  [attr-layout-align-xl=\"space-between start\"],\n  [attr-layout-align-xl=\"space-around start\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start; }\n  [attr-layout-align-xl=\"start center\"],\n  [attr-layout-align-xl=\"center center\"],\n  [attr-layout-align-xl=\"end center\"],\n  [attr-layout-align-xl=\"space-between center\"],\n  [attr-layout-align-xl=\"space-around center\"] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    max-width: 100%; }\n  [attr-layout-align-xl=\"start center\"] > *,\n  [attr-layout-align-xl=\"center center\"] > *,\n  [attr-layout-align-xl=\"end center\"] > *,\n  [attr-layout-align-xl=\"space-between center\"] > *,\n  [attr-layout-align-xl=\"space-around center\"] > * {\n    max-width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-align-xl=\"start end\"],\n  [attr-layout-align-xl=\"center end\"],\n  [attr-layout-align-xl=\"end end\"],\n  [attr-layout-align-xl=\"space-between end\"],\n  [attr-layout-align-xl=\"space-around end\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    -webkit-align-content: flex-end;\n    -ms-flex-line-pack: end;\n    align-content: flex-end; }\n  [attr-layout-align-xl=\"start stretch\"],\n  [attr-layout-align-xl=\"center stretch\"],\n  [attr-layout-align-xl=\"end stretch\"],\n  [attr-layout-align-xl=\"space-between stretch\"],\n  [attr-layout-align-xl=\"space-around stretch\"] {\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch; }\n  [attr-flex-xl] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n\@media screen\\0  and (min-width: 1920px) {\n  [attr-flex-xl] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%; } }\n\n\@media (min-width: 1920px) {\n  [attr-flex-xl-grow] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl-initial] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl-auto] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl-none] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl-noshrink] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n    -ms-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl-nogrow] {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"0\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"0\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"0\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0%;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"5\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"5\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"5\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 5%;\n    -ms-flex: 1 1 5%;\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"10\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"10\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"10\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 10%;\n    -ms-flex: 1 1 10%;\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"15\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"15\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"15\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 15%;\n    -ms-flex: 1 1 15%;\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"20\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"20\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"20\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 20%;\n    -ms-flex: 1 1 20%;\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"25\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"25\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"25\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 25%;\n    -ms-flex: 1 1 25%;\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"30\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"30\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"30\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    -ms-flex: 1 1 30%;\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"35\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"35\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"35\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 35%;\n    -ms-flex: 1 1 35%;\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"40\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"40\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"40\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 40%;\n    -ms-flex: 1 1 40%;\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"45\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"45\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"45\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 45%;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"50\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"50\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"50\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 50%;\n    -ms-flex: 1 1 50%;\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"55\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"55\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"55\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 55%;\n    -ms-flex: 1 1 55%;\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"60\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"60\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"60\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 60%;\n    -ms-flex: 1 1 60%;\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"65\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"65\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"65\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 65%;\n    -ms-flex: 1 1 65%;\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"70\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"70\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"70\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 70%;\n    -ms-flex: 1 1 70%;\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"75\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"75\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"75\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 75%;\n    -ms-flex: 1 1 75%;\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"80\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"80\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"80\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 80%;\n    -ms-flex: 1 1 80%;\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"85\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"85\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"85\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 85%;\n    -ms-flex: 1 1 85%;\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"90\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"90\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"90\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 90%;\n    -ms-flex: 1 1 90%;\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"95\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"95\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"95\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 95%;\n    -ms-flex: 1 1 95%;\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-flex-xl=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"100\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"100\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"100\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 100%;\n    -ms-flex: 1 1 100%;\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"33\"],\n  [attr-layout=\"row\"] > [attr-flex-xl=\"33\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"33\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"34\"],\n  [attr-layout=\"row\"] > [attr-flex-xl=\"34\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"34\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"66\"],\n  [attr-layout=\"row\"] > [attr-flex-xl=\"66\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"66\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"row\"] > [attr-flex-xl=\"67\"],\n  [attr-layout=\"row\"] > [attr-flex-xl=\"67\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"67\"],\n  [attr-layout-xl=\"row\"] > [attr-flex-xl=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"33\"],\n  [attr-layout=\"column\"] > [attr-flex-xl=\"33\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"33\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"33\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 33%;\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"34\"],\n  [attr-layout=\"column\"] > [attr-flex-xl=\"34\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"34\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"34\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 34%;\n    -ms-flex: 1 1 34%;\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"66\"],\n  [attr-layout=\"column\"] > [attr-flex-xl=\"66\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"66\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"66\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 66%;\n    -ms-flex: 1 1 66%;\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout=\"column\"] > [attr-flex-xl=\"67\"],\n  [attr-layout=\"column\"] > [attr-flex-xl=\"67\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"67\"],\n  [attr-layout-xl=\"column\"] > [attr-flex-xl=\"67\"] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 67%;\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  [attr-layout-xl],\n  [attr-layout-xl=\"column\"],\n  [attr-layout-xl=\"row\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [attr-layout-xl=\"column\"] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n  [attr-layout-xl=\"row\"] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  [attr-hide]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-gt-lg]):not([attr-show-xl]):not([attr-show]),\n  [attr-hide-gt-xs]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-gt-lg]):not([attr-show-xl]):not([attr-show]),\n  [attr-hide-gt-sm]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-gt-lg]):not([attr-show-xl]):not([attr-show]),\n  [attr-hide-gt-md]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-gt-lg]):not([attr-show-xl]):not([attr-show]),\n  [attr-hide-gt-lg]:not([attr-show-gt-xs]):not([attr-show-gt-sm]):not([attr-show-gt-md]):not([attr-show-gt-lg]):not([attr-show-xl]):not([attr-show]) {\n    display: none; }\n  [attr-hide-xl]:not([attr-show-xl]):not([attr-show-gt-lg]):not([attr-show]) {\n    display: none; } }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 100;\n  src: url(\"./assets/fonts/lato/Lato-Hairline.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: italic;\n  font-weight: 100;\n  src: url(\"./assets/fonts/lato/Lato-HairlineItalic.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 300;\n  src: url(\"./assets/fonts/lato/Lato-Light.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: italic;\n  font-weight: 300;\n  src: url(\"./assets/fonts/lato/Lato-LightItalic.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/lato/Lato-Regular.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: italic;\n  font-weight: 400;\n  src: url(\"./assets/fonts/lato/Lato-Italic.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 600;\n  src: url(\"./assets/fonts/lato/Lato-Bold.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: italic;\n  font-weight: 600;\n  src: url(\"./assets/fonts/lato/Lato-BoldItalic.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 700;\n  src: url(\"./assets/fonts/lato/Lato-Black.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'Lato';\n  font-style: italic;\n  font-weight: 700;\n  src: url(\"./assets/fonts/lato/Lato-BlackItalic.ttf\") format(\"truetype\"); }\n\n\@font-face {\n  font-family: 'yoobicons';\n  src: url(\"./assets/fonts/yoobicons/yoobicons.ttf\") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal; }\n\n[class^=\"yo-\"],\n[class*=\" yo-\"] {\n  font-family: 'yoobicons';\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.yo-instagram {\n  margin-top: 3px; }\n\n.yo-circle-cross:before {\n  content: \"\\e942\"; }\n\n.yo-hamburger:before {\n  content: \"\\e91e\"; }\n\n.yo-question2:before {\n  content: \"\\e91f\"; }\n\n.yo-block:before {\n  content: \"\\e920\"; }\n\n.yo-fire2:before {\n  content: \"\\e921\"; }\n\n.yo-arrow-right:before {\n  content: \"\\e922\"; }\n\n.yo-arrow-dropdown:before {\n  content: \"\\e923\"; }\n\n.yo-circle-check:before {\n  content: \"\\e924\"; }\n\n.yo-trophy:before {\n  content: \"\\e925\"; }\n\n.yo-survey:before {\n  content: \"\\e926\"; }\n\n.yo-play:before {\n  content: \"\\e927\"; }\n\n.yo-star2:before {\n  content: \"\\e928\"; }\n\n.yo-calendar2:before {\n  content: \"\\e929\"; }\n\n.yo-graduate-hat:before {\n  content: \"\\e92a\"; }\n\n.yo-timer:before {\n  content: \"\\e92b\"; }\n\n.yo-account2:before {\n  content: \"\\e92c\"; }\n\n.yo-lock2:before {\n  content: \"\\e92d\"; }\n\n.yo-trophy3:before {\n  content: \"\\e92e\"; }\n\n.yo-yoobic2:before {\n  content: \"\\e92f\"; }\n\n.yo-language:before {\n  content: \"\\e930\"; }\n\n.yo-account:before {\n  content: \"\\e931\"; }\n\n.yo-todo:before {\n  content: \"\\e932\"; }\n\n.yo-chart-donuts:before {\n  content: \"\\e933\"; }\n\n.yo-book:before {\n  content: \"\\e934\"; }\n\n.yo-close2:before {\n  content: \"\\e935\"; }\n\n.yo-pdf:before {\n  content: \"\\e936\"; }\n\n.yo-video2:before {\n  content: \"\\e937\"; }\n\n.yo-medal2:before {\n  content: \"\\e938\"; }\n\n.yo-arrow-left:before {\n  content: \"\\e939\"; }\n\n.yo-question3:before {\n  content: \"\\e93a\"; }\n\n.yo-trophy2:before {\n  content: \"\\e93b\"; }\n\n.yo-survey2:before {\n  content: \"\\e93c\"; }\n\n.yo-sad-face:before {\n  content: \"\\e93d\"; }\n\n.yo-video3:before {\n  content: \"\\e93f\"; }\n\n.yo-graduate-hat2:before {\n  content: \"\\e940\"; }\n\n.yo-timer2:before {\n  content: \"\\e941\"; }\n\n.yo-diamond:before {\n  content: \"\\e64b\"; }\n\n.yo-walk:before {\n  content: \"\\e650\"; }\n\n.yo-euro:before {\n  content: \"\\e654\"; }\n\n.yo-pound:before {\n  content: \"\\e655\"; }\n\n.yo-tag:before {\n  content: \"\\e66a\"; }\n\n.yo-cash:before {\n  content: \"\\e66d\"; }\n\n.yo-credit-card:before {\n  content: \"\\e673\"; }\n\n.yo-basket:before {\n  content: \"\\e687\"; }\n\n.yo-store:before {\n  content: \"\\e688\"; }\n\n.yo-chevron2-right:before {\n  content: \"\\e6af\"; }\n\n.yo-chevron2-left:before {\n  content: \"\\e6b0\"; }\n\n.yo-settings:before {\n  content: \"\\e6bc\"; }\n\n.yo-eraser:before {\n  content: \"\\e6da\"; }\n\n.yo-support:before {\n  content: \"\\e6db\"; }\n\n.yo-video:before {\n  content: \"\\e6e5\"; }\n\n.yo-imac:before {\n  content: \"\\e6ed\"; }\n\n.yo-mobile:before {\n  content: \"\\e6f3\"; }\n\n.yo-save:before {\n  content: \"\\e6f4\"; }\n\n.yo-camera2:before {\n  content: \"\\e6f8\"; }\n\n.yo-camera:before {\n  content: \"\\e6fc\"; }\n\n.yo-redo:before {\n  content: \"\\e700\"; }\n\n.yo-undo:before {\n  content: \"\\e701\"; }\n\n.yo-draw:before {\n  content: \"\\e702\"; }\n\n.yo-trash:before {\n  content: \"\\e705\"; }\n\n.yo-edit:before {\n  content: \"\\e70a\"; }\n\n.yo-sort-asc:before {\n  content: \"\\e70b\"; }\n\n.yo-sort-desc:before {\n  content: \"\\e70c\"; }\n\n.yo-feed:before {\n  content: \"\\e716\"; }\n\n.yo-key:before {\n  content: \"\\e718\"; }\n\n.yo-password:before {\n  content: \"\\e71f\"; }\n\n.yo-locked:before {\n  content: \"\\e720\"; }\n\n.yo-profile:before {\n  content: \"\\e721\"; }\n\n.yo-people:before {\n  content: \"\\e724\"; }\n\n.yo-user:before {\n  content: \"\\e72c\"; }\n\n.yo-notification:before {\n  content: \"\\e742\"; }\n\n.yo-plane:before {\n  content: \"\\e743\"; }\n\n.yo-cog:before {\n  content: \"\\e74b\"; }\n\n.yo-config:before {\n  content: \"\\e74d\"; }\n\n.yo-share:before {\n  content: \"\\e753\"; }\n\n.yo-code:before {\n  content: \"\\e756\"; }\n\n.yo-flag:before {\n  content: \"\\e75b\"; }\n\n.yo-danger:before {\n  content: \"\\e762\"; }\n\n.yo-import:before {\n  content: \"\\e763\"; }\n\n.yo-upload:before {\n  content: \"\\e764\"; }\n\n.yo-chart-bar:before {\n  content: \"\\e770\"; }\n\n.yo-geoloc:before {\n  content: \"\\e77d\"; }\n\n.yo-list2:before {\n  content: \"\\e789\"; }\n\n.yo-tabs:before {\n  content: \"\\e792\"; }\n\n.yo-grid:before {\n  content: \"\\e79c\"; }\n\n.yo-check-square:before {\n  content: \"\\e79f\"; }\n\n.yo-menu:before {\n  content: \"\\e7aa\"; }\n\n.yo-card:before {\n  content: \"\\e7b1\"; }\n\n.yo-refresh:before {\n  content: \"\\e7b2\"; }\n\n.yo-refresh-a:before {\n  content: \"\\e7b4\"; }\n\n.yo-logout:before {\n  content: \"\\e7b6\"; }\n\n.yo-eye:before {\n  content: \"\\e7b9\"; }\n\n.yo-move:before {\n  content: \"\\e7c6\"; }\n\n.yo-collapse:before {\n  content: \"\\e7c8\"; }\n\n.yo-expand:before {\n  content: \"\\e7c9\"; }\n\n.yo-chevron-bottom:before {\n  content: \"\\e7cc\"; }\n\n.yo-chevron-right:before {\n  content: \"\\e7cd\"; }\n\n.yo-chevron-top:before {\n  content: \"\\e7ce\"; }\n\n.yo-chevron-left:before {\n  content: \"\\e7cf\"; }\n\n.yo-circles:before {\n  content: \"\\e7d0\"; }\n\n.yo-locate-me:before {\n  content: \"\\e7d1\"; }\n\n.yo-circle:before {\n  content: \"\\e7d5\"; }\n\n.yo-check:before {\n  content: \"\\e7d6\"; }\n\n.yo-close:before {\n  content: \"\\e7d7\"; }\n\n.yo-minus:before {\n  content: \"\\e7d8\"; }\n\n.yo-plus:before {\n  content: \"\\e7d9\"; }\n\n.yo-more:before {\n  content: \"\\e7e4\"; }\n\n.yo-bell:before {\n  content: \"\\e7e8\"; }\n\n.yo-google:before {\n  content: \"\\e7e9\"; }\n\n.yo-chart-gauge:before {\n  content: \"\\e7f1\"; }\n\n.yo-check-circle:before {\n  content: \"\\e7f4\"; }\n\n.yo-close-circle:before {\n  content: \"\\e7f5\"; }\n\n.yo-circle-minus:before {\n  content: \"\\e7f6\"; }\n\n.yo-chevron-right-circle:before {\n  content: \"\\e7fd\"; }\n\n.yo-down-arrow:before {\n  content: \"\\e806\"; }\n\n.yo-right-arrow:before {\n  content: \"\\e807\"; }\n\n.yo-up-arrow:before {\n  content: \"\\e808\"; }\n\n.yo-left-arrow:before {\n  content: \"\\e809\"; }\n\n.yo-export:before {\n  content: \"\\e80a\"; }\n\n.yo-medal:before {\n  content: \"\\e80d\"; }\n\n.yo-filter:before {\n  content: \"\\e811\"; }\n\n.yo-degree:before {\n  content: \"\\e81b\"; }\n\n.yo-trophee:before {\n  content: \"\\e81f\"; }\n\n.yo-tetris:before {\n  content: \"\\e822\"; }\n\n.yo-bicycle:before {\n  content: \"\\e832\"; }\n\n.yo-car:before {\n  content: \"\\e837\"; }\n\n.yo-building:before {\n  content: \"\\e85f\"; }\n\n.yo-week:before {\n  content: \"\\e867\"; }\n\n.yo-dashboard:before {\n  content: \"\\e86b\"; }\n\n.yo-alarmclock:before {\n  content: \"\\e86e\"; }\n\n.yo-wait:before {\n  content: \"\\e86f\"; }\n\n.yo-time:before {\n  content: \"\\e873\"; }\n\n.yo-calendar:before {\n  content: \"\\e875\"; }\n\n.yo-info:before {\n  content: \"\\e879\"; }\n\n.yo-map:before {\n  content: \"\\e877\"; }\n\n.yo-map-marker2:before {\n  content: \"\\e878\"; }\n\n.yo-map-marker:before {\n  content: \"\\e87c\"; }\n\n.yo-signature:before {\n  content: \"\\e887\"; }\n\n.yo-male:before {\n  content: \"\\e88a\"; }\n\n.yo-female:before {\n  content: \"\\e88b\"; }\n\n.yo-smiley:before {\n  content: \"\\e893\"; }\n\n.yo-photo:before {\n  content: \"\\e8a1\"; }\n\n.yo-videocall:before {\n  content: \"\\e8a4\"; }\n\n.yo-briefcase:before {\n  content: \"\\e8aa\"; }\n\n.yo-document:before {\n  content: \"\\e8b3\"; }\n\n.yo-clipboard:before {\n  content: \"\\e8b5\"; }\n\n.yo-editform:before {\n  content: \"\\e8bc\"; }\n\n.yo-overview2:before {\n  content: \"\\e8c1\"; }\n\n.yo-chart-pie:before {\n  content: \"\\e8c6\"; }\n\n.yo-mission-list:before {\n  content: \"\\e8c8\"; }\n\n.yo-archive:before {\n  content: \"\\e8d7\"; }\n\n.yo-folder:before {\n  content: \"\\e8dd\"; }\n\n.yo-learn:before {\n  content: \"\\e8e8\"; }\n\n.yo-file:before {\n  content: \"\\e8ee\"; }\n\n.yo-documents2:before {\n  content: \"\\e8f2\"; }\n\n.yo-mission:before {\n  content: \"\\e8f9\"; }\n\n.yo-feed2:before {\n  content: \"\\e8fb\"; }\n\n.yo-gallery:before {\n  content: \"\\e8fe\"; }\n\n.yo-phone:before {\n  content: \"\\e902\"; }\n\n.yo-audio:before {\n  content: \"\\e905\"; }\n\n.yo-enveloppe:before {\n  content: \"\\e909\"; }\n\n.yo-mail:before {\n  content: \"\\e90a\"; }\n\n.yo-question:before {\n  content: \"\\e915\"; }\n\n.yo-chat:before {\n  content: \"\\e917\"; }\n\n.yo-comment:before {\n  content: \"\\e91c\"; }\n\n.yo-paypal:before {\n  content: \"\\e93e\"; }\n\n.yo-two-files2:before {\n  content: \"\\e85b\"; }\n\n.yo-doc-folder-a:before {\n  content: \"\\e874\"; }\n\n.yo-doc-folder-cross-a:before {\n  content: \"\\e876\"; }\n\n.yo-doc-folder-plus-a:before {\n  content: \"\\e87a\"; }\n\n.yo-list:before {\n  content: \"\\e87e\"; }\n\n.yo-image:before {\n  content: \"\\e89c\"; }\n\n.yo-barcode3:before {\n  content: \"\\e8a9\"; }\n\n.yo-ecommerce-creditcard-b:before {\n  content: \"\\e8b1\"; }\n\n.yo-shoppingcart:before {\n  content: \"\\e8c9\"; }\n\n.yo-longtext:before {\n  content: \"\\e8fd\"; }\n\n.yo-shorttext:before {\n  content: \"\\e8ff\"; }\n\n.yo-environment-sign:before {\n  content: \"\\e919\"; }\n\n.yo-fire:before {\n  content: \"\\e954\"; }\n\n.yo-toggle:before {\n  content: \"\\e96e\"; }\n\n.yo-sliders:before {\n  content: \"\\e973\"; }\n\n.yo-tovalidate:before {\n  content: \"\\e979\"; }\n\n.yo-security:before {\n  content: \"\\e9af\"; }\n\n.yo-compass:before {\n  content: \"\\e9b0\"; }\n\n.yo-gameboy:before {\n  content: \"\\e9c4\"; }\n\n.yo-magic:before {\n  content: \"\\e9ca\"; }\n\n.yo-world:before {\n  content: \"\\ea3f\"; }\n\n.yo-instagram:before {\n  content: \"\\ea6f\"; }\n\n.yo-notallowed:before {\n  content: \"\\eac4\"; }\n\n.yo-check-minus:before {\n  content: \"\\eacd\"; }\n\n.yo-check-plus:before {\n  content: \"\\eace\"; }\n\n.yo-check-tick:before {\n  content: \"\\ead1\"; }\n\n.yo-circle-plus:before {\n  content: \"\\ead9\"; }\n\n.yo-check-empty:before {\n  content: \"\\eaf0\"; }\n\n.yo-number:before {\n  content: \"\\eb05\"; }\n\n.yo-star3:before {\n  content: \"\\eb20\"; }\n\n.yo-selectbuttons:before {\n  content: \"\\eb22\"; }\n\n.yo-selectbuttonsmulti:before {\n  content: \"\\eb2f\"; }\n\n.yo-sw-profile .path1:before {\n  content: \"\\e901\";\n  color: #535353; }\n\n.yo-sw-profile .path2:before {\n  content: \"\\e903\";\n  margin-left: -1em;\n  color: #535353; }\n\n.yo-sw-profile .path3:before {\n  content: \"\\e904\";\n  margin-left: -1em;\n  color: #d8d8d8; }\n\n.yo-sw-profile .path4:before {\n  content: \"\\e906\";\n  margin-left: -1em;\n  color: #535353; }\n\n.yo-wide-file:before {\n  content: \"\\e602\"; }\n\n.yo-documents:before {\n  content: \"\\e60c\"; }\n\n.yo-group:before {\n  content: \"\\e60d\"; }\n\n.yo-overview:before {\n  content: \"\\e60e\"; }\n\n.yo-photo2:before {\n  content: \"\\e60f\"; }\n\n.yo-talk-female:before {\n  content: \"\\e610\"; }\n\n.yo-settings-user:before {\n  content: \"\\e611\"; }\n\n.yo-skycrapers:before {\n  content: \"\\e612\"; }\n\n.yo-two-files:before {\n  content: \"\\e613\"; }\n\n.yo-missions:before {\n  content: \"\\e911\"; }\n\n.yo-polls:before {\n  content: \"\\e908\"; }\n\n.yo-services:before {\n  content: \"\\e90b\"; }\n\n.yo-todos:before {\n  content: \"\\e90c\"; }\n\n.yo-deploy:before {\n  content: \"\\e900\"; }\n\n.yo-more-full:before {\n  content: \"\\e60b\"; }\n\n.yo-question-add:before {\n  content: \"\\e60a\"; }\n\n.yo-filter-active:before {\n  content: \"\\e614\"; }\n\n.yo-more-v:before {\n  content: \"\\e609\"; }\n\n.yo-eye-01:before {\n  content: \"\\e605\"; }\n\n.yo-eye-full:before {\n  content: \"\\e606\"; }\n\n.yo-yoobic-line:before {\n  content: \"\\e615\"; }\n\n.yo-yoobic:before {\n  content: \"\\e600\"; }\n\n.yo-invite:before {\n  content: \"\\e912\"; }\n\n.yo-palette:before {\n  content: \"\\e91d\"; }\n\n.yo-svg-play:before {\n  content: \"\\e913\"; }\n\n.yo-airplane:before {\n  content: \"\\e914\"; }\n\n.yo-paperplane2:before {\n  content: \"\\e918\"; }\n\n.yo-workplace:before {\n  content: \"\\e91b\"; }\n\n.yo-servers:before {\n  content: \"\\e91a\"; }\n\n.yo-notification2:before {\n  content: \"\\e916\"; }\n\n.yo-time-history:before {\n  content: \"\\e90d\"; }\n\n.yo-time-timesheet:before {\n  content: \"\\e90e\"; }\n\n.yo-time-overview:before {\n  content: \"\\e90f\"; }\n\n.yo-time-menu:before {\n  content: \"\\e910\"; }\n\n.yo-barcode2:before {\n  content: \"\\e907\"; }\n\n.yo-like:before {\n  content: \"\\e604\"; }\n\n.yo-study:before {\n  content: \"\\e603\"; }\n\n.yo-star-full:before {\n  content: \"\\f005\"; }\n\n.yo-star:before {\n  content: \"\\f006\"; }\n\n.yo-file-pdf:before {\n  content: \"\\f1c1\"; }\n\n.yo-file-word:before {\n  content: \"\\f1c2\"; }\n\n.yo-file-excel:before {\n  content: \"\\f1c3\"; }\n\n.yo-file-powerpoint:before {\n  content: \"\\f1c4\"; }\n\n.yo-target:before {\n  content: \"\\e608\"; }\n\n.yo-barcode:before {\n  content: \"\\e607\"; }\n\n.yo-coin:before {\n  content: \"\\e601\"; }\n\nbody {\n  font-family: \"Lato\";\n  font-size: 16px;\n  line-height: 1.5; }\n\n:root {\n  --font-size: 16px;\n  --backdrop: rgba(49, 44, 87, 0.6);\n  --light: #FFFFFF;\n  --stable: #EBECEF;\n  --text-color: #3A3569;\n  --dark: #3A3569;\n  --dark-110: #34305f;\n  --dark-120: #2e2a54;\n  --dark-80: #544d98;\n  --dark-60: #7973b8;\n  --dark-40: #a6a1d0;\n  --dark-20: #d2d0e7;\n  --dark-10: #e9e8f3;\n  --dark-05: #f4f3f9;\n  --accent: #1C76FC;\n  --accent-110: #0366f9;\n  --accent-120: #035bdd;\n  --accent-20: #d2e4fe;\n  --accent-10: #e8f1ff;\n  --accent-05: #f4f8ff;\n  --danger: #ef6e7f;\n  --danger-110: #ec4f63;\n  --danger-120: #e82f48;\n  --danger-20: #fce2e5;\n  --danger-10: #fdf1f2;\n  --danger-05: #fef8f9;\n  --success: #07ccc0;\n  --success-110: #06b8ad;\n  --success-120: #06a39a;\n  --success-20: #c5fdfa;\n  --success-10: #e2fefc;\n  --success-05: #f1fffe;\n  --warning: #F2C83A;\n  --warning-110: #f0c01e;\n  --warning-120: #e1b10f;\n  --warning-20: #fcf4d8;\n  --warning-10: #fefaeb;\n  --warning-05: #fefcf5;\n  --info: #6A61FF;\n  --info-110: #5a52da;\n  --info-120: #4b44b7;\n  --info-20: #e1dfff;\n  --info-10: #f0efff;\n  --info-05: #f8f7ff;\n  --transparent: transparent;\n  --gradient-accent: linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%);\n  --gradient-danger: linear-gradient(264deg, #febd3c, #f76c6c);\n  --gradient-info: linear-gradient(264deg, #f564b6, #6f3cfe);\n  --gradient-success: linear-gradient(to top, #09f094, #07cac2);\n  --gradient-warning: linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%);\n  --gradient-dark: linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%);\n  --ion-color-primary: #1C76FC;\n  --ion-color-secondary: #07ccc0;\n  --ion-color-tertiary: #6A61FF;\n  --ion-color-success: #07ccc0;\n  --ion-color-warning: #F2C83A;\n  --ion-color-danger: #ef6e7f;\n  --ion-color-light: #FFFFFF;\n  --ion-color-medium: #EBECEF;\n  --ion-color-dark: #3A3569; }\n\n.bg-backdrop {\n  background: var(--backdrop, rgba(49, 44, 87, 0.6)); }\n\n.backdrop {\n  color: var(--backdrop, rgba(49, 44, 87, 0.6)); }\n\n.bg-light {\n  background: var(--light, #FFFFFF); }\n\n.light {\n  color: var(--light, #FFFFFF); }\n\n.bg-stable {\n  background: var(--stable, #EBECEF); }\n\n.stable {\n  color: var(--stable, #EBECEF); }\n\n.bg-text-color {\n  background: var(--text-color, #3A3569); }\n\n.text-color {\n  color: var(--text-color, #3A3569); }\n\n.bg-dark {\n  background: var(--dark, #3A3569); }\n\n.dark {\n  color: var(--dark, #3A3569); }\n\n.bg-dark-110 {\n  background: var(--dark-110, #34305f); }\n\n.dark-110 {\n  color: var(--dark-110, #34305f); }\n\n.bg-dark-120 {\n  background: var(--dark-120, #2e2a54); }\n\n.dark-120 {\n  color: var(--dark-120, #2e2a54); }\n\n.bg-dark-80 {\n  background: var(--dark-80, #544d98); }\n\n.dark-80 {\n  color: var(--dark-80, #544d98); }\n\n.bg-dark-60 {\n  background: var(--dark-60, #7973b8); }\n\n.dark-60 {\n  color: var(--dark-60, #7973b8); }\n\n.bg-dark-40 {\n  background: var(--dark-40, #a6a1d0); }\n\n.dark-40 {\n  color: var(--dark-40, #a6a1d0); }\n\n.bg-dark-20 {\n  background: var(--dark-20, #d2d0e7); }\n\n.dark-20 {\n  color: var(--dark-20, #d2d0e7); }\n\n.bg-dark-10 {\n  background: var(--dark-10, #e9e8f3); }\n\n.dark-10 {\n  color: var(--dark-10, #e9e8f3); }\n\n.bg-dark-05 {\n  background: var(--dark-05, #f4f3f9); }\n\n.dark-05 {\n  color: var(--dark-05, #f4f3f9); }\n\n.bg-accent {\n  background: var(--accent, #1C76FC); }\n\n.accent {\n  color: var(--accent, #1C76FC); }\n\n.bg-accent-110 {\n  background: var(--accent-110, #0366f9); }\n\n.accent-110 {\n  color: var(--accent-110, #0366f9); }\n\n.bg-accent-120 {\n  background: var(--accent-120, #035bdd); }\n\n.accent-120 {\n  color: var(--accent-120, #035bdd); }\n\n.bg-accent-20 {\n  background: var(--accent-20, #d2e4fe); }\n\n.accent-20 {\n  color: var(--accent-20, #d2e4fe); }\n\n.bg-accent-10 {\n  background: var(--accent-10, #e8f1ff); }\n\n.accent-10 {\n  color: var(--accent-10, #e8f1ff); }\n\n.bg-accent-05 {\n  background: var(--accent-05, #f4f8ff); }\n\n.accent-05 {\n  color: var(--accent-05, #f4f8ff); }\n\n.bg-danger {\n  background: var(--danger, #ef6e7f); }\n\n.danger {\n  color: var(--danger, #ef6e7f); }\n\n.bg-danger-110 {\n  background: var(--danger-110, #ec4f63); }\n\n.danger-110 {\n  color: var(--danger-110, #ec4f63); }\n\n.bg-danger-120 {\n  background: var(--danger-120, #e82f48); }\n\n.danger-120 {\n  color: var(--danger-120, #e82f48); }\n\n.bg-danger-20 {\n  background: var(--danger-20, #fce2e5); }\n\n.danger-20 {\n  color: var(--danger-20, #fce2e5); }\n\n.bg-danger-10 {\n  background: var(--danger-10, #fdf1f2); }\n\n.danger-10 {\n  color: var(--danger-10, #fdf1f2); }\n\n.bg-danger-05 {\n  background: var(--danger-05, #fef8f9); }\n\n.danger-05 {\n  color: var(--danger-05, #fef8f9); }\n\n.bg-success {\n  background: var(--success, #07ccc0); }\n\n.success {\n  color: var(--success, #07ccc0); }\n\n.bg-success-110 {\n  background: var(--success-110, #06b8ad); }\n\n.success-110 {\n  color: var(--success-110, #06b8ad); }\n\n.bg-success-120 {\n  background: var(--success-120, #06a39a); }\n\n.success-120 {\n  color: var(--success-120, #06a39a); }\n\n.bg-success-20 {\n  background: var(--success-20, #c5fdfa); }\n\n.success-20 {\n  color: var(--success-20, #c5fdfa); }\n\n.bg-success-10 {\n  background: var(--success-10, #e2fefc); }\n\n.success-10 {\n  color: var(--success-10, #e2fefc); }\n\n.bg-success-05 {\n  background: var(--success-05, #f1fffe); }\n\n.success-05 {\n  color: var(--success-05, #f1fffe); }\n\n.bg-warning {\n  background: var(--warning, #F2C83A); }\n\n.warning {\n  color: var(--warning, #F2C83A); }\n\n.bg-warning-110 {\n  background: var(--warning-110, #f0c01e); }\n\n.warning-110 {\n  color: var(--warning-110, #f0c01e); }\n\n.bg-warning-120 {\n  background: var(--warning-120, #e1b10f); }\n\n.warning-120 {\n  color: var(--warning-120, #e1b10f); }\n\n.bg-warning-20 {\n  background: var(--warning-20, #fcf4d8); }\n\n.warning-20 {\n  color: var(--warning-20, #fcf4d8); }\n\n.bg-warning-10 {\n  background: var(--warning-10, #fefaeb); }\n\n.warning-10 {\n  color: var(--warning-10, #fefaeb); }\n\n.bg-warning-05 {\n  background: var(--warning-05, #fefcf5); }\n\n.warning-05 {\n  color: var(--warning-05, #fefcf5); }\n\n.bg-info {\n  background: var(--info, #6A61FF); }\n\n.info {\n  color: var(--info, #6A61FF); }\n\n.bg-info-110 {\n  background: var(--info-110, #5a52da); }\n\n.info-110 {\n  color: var(--info-110, #5a52da); }\n\n.bg-info-120 {\n  background: var(--info-120, #4b44b7); }\n\n.info-120 {\n  color: var(--info-120, #4b44b7); }\n\n.bg-info-20 {\n  background: var(--info-20, #e1dfff); }\n\n.info-20 {\n  color: var(--info-20, #e1dfff); }\n\n.bg-info-10 {\n  background: var(--info-10, #f0efff); }\n\n.info-10 {\n  color: var(--info-10, #f0efff); }\n\n.bg-info-05 {\n  background: var(--info-05, #f8f7ff); }\n\n.info-05 {\n  color: var(--info-05, #f8f7ff); }\n\n.bg-transparent {\n  background: var(--transparent, transparent); }\n\n.transparent {\n  color: var(--transparent, transparent); }\n\n.bg-gradient-accent {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent {\n  color: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.bg-gradient-danger {\n  background: var(--gradient-danger, linear-gradient(264deg, #febd3c, #f76c6c)); }\n\n.gradient-danger {\n  color: var(--gradient-danger, linear-gradient(264deg, #febd3c, #f76c6c)); }\n\n.bg-gradient-info {\n  background: var(--gradient-info, linear-gradient(264deg, #f564b6, #6f3cfe)); }\n\n.gradient-info {\n  color: var(--gradient-info, linear-gradient(264deg, #f564b6, #6f3cfe)); }\n\n.bg-gradient-success {\n  background: var(--gradient-success, linear-gradient(to top, #09f094, #07cac2)); }\n\n.gradient-success {\n  color: var(--gradient-success, linear-gradient(to top, #09f094, #07cac2)); }\n\n.bg-gradient-warning {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning {\n  color: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.bg-gradient-dark {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark {\n  color: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.bg-ion-color-primary {\n  background: var(--ion-color-primary, #1C76FC); }\n\n.ion-color-primary {\n  color: var(--ion-color-primary, #1C76FC); }\n\n.bg-ion-color-secondary {\n  background: var(--ion-color-secondary, #07ccc0); }\n\n.ion-color-secondary {\n  color: var(--ion-color-secondary, #07ccc0); }\n\n.bg-ion-color-tertiary {\n  background: var(--ion-color-tertiary, #6A61FF); }\n\n.ion-color-tertiary {\n  color: var(--ion-color-tertiary, #6A61FF); }\n\n.bg-ion-color-success {\n  background: var(--ion-color-success, #07ccc0); }\n\n.ion-color-success {\n  color: var(--ion-color-success, #07ccc0); }\n\n.bg-ion-color-warning {\n  background: var(--ion-color-warning, #F2C83A); }\n\n.ion-color-warning {\n  color: var(--ion-color-warning, #F2C83A); }\n\n.bg-ion-color-danger {\n  background: var(--ion-color-danger, #ef6e7f); }\n\n.ion-color-danger {\n  color: var(--ion-color-danger, #ef6e7f); }\n\n.bg-ion-color-light {\n  background: var(--ion-color-light, #FFFFFF); }\n\n.ion-color-light {\n  color: var(--ion-color-light, #FFFFFF); }\n\n.bg-ion-color-medium {\n  background: var(--ion-color-medium, #EBECEF); }\n\n.ion-color-medium {\n  color: var(--ion-color-medium, #EBECEF); }\n\n.bg-ion-color-dark {\n  background: var(--ion-color-dark, #3A3569); }\n\n.ion-color-dark {\n  color: var(--ion-color-dark, #3A3569); }\n\nh1 {\n  font-size: 1.75rem;\n  font-weight: bold;\n  line-height: 1.29;\n  letter-spacing: -0.5px; }\n\nh2 {\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1.33;\n  letter-spacing: -0.3px; }\n\nh3 {\n  font-size: 1.125rem;\n  font-weight: bold;\n  line-height: 1.33;\n  letter-spacing: -0.2px; }\n\n.caption {\n  font-size: 0.875rem;\n  line-height: 1.71; }\n\n.tiny {\n  font-size: 0.75rem;\n  line-height: 1.33; }\n\n.label {\n  font-size: 0.75rem;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  line-height: 1.33;\n  font-weight: bold; }\n\n*,\n*:after,\n*:before {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host .outer-container {\n  padding: 0.5rem;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n  :host .outer-container .column-container {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }"; }
}

export { YooFormTimerComponent as YooFormTimer };
