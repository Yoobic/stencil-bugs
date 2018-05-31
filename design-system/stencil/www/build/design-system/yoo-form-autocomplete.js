/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setValidator, b as setAsyncValidator, d as setValueAndValidateInput, c as onInputBlurred, e as onInputFocused } from './chunk-03ff812d.js';
import { f as debounce, j as isBlank, k as isPresent, a as showModal, b as getBackImageStyle, c as cloudinary } from './chunk-75914b41.js';
import { i as findIndex, j as isEqual, k as isArray, l as indexOf, m as get, b as isString, n as isNull, o as isUndefined, p as isObject, q as isEmpty, c as map, r as clone, s as isNumber, t as isBoolean, u as concat, v as intersection, w as result, x as set, e as sortBy } from './chunk-cdfb4b5d.js';
import { a as commonjsGlobal, b as commonjsRequire, c as unwrapExports, d as createCommonjsModule } from './chunk-a7525511.js';
import { b as FormFieldType } from './chunk-b8bd1aac.js';
import { a as setAnimation, b as animations } from './chunk-d3f1c80d.js';
import './chunk-acfcbd22.js';
import './chunk-e9552ef3.js';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const AUTOCOMPLETE_DROPDOWN_HEIGHT = 177;
class YooFormAutocompleteComponent {
    constructor() {
        this.multiple = false;
        this.values = [];
        this.displayType = 'card-list';
        this.pageSize = 20;
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter(this, void 0, void 0, function* () { return true; });
    }
    isValid() {
        return this.validity;
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
        if (this.values && this.values.length > 0) {
            this.isLocal = true;
        }
    }
    componentDidLoad() {
        this.formDynamic = document.querySelector('yoo-form-dynamic') ? document.querySelector('yoo-form-dynamic') : null;
        let formDynamicToolbar = this.formDynamic ? this.formDynamic.querySelector('.slide-container > .toolbar') : null;
        this.formDynamicBottom = this.formDynamic ? (formDynamicToolbar ? formDynamicToolbar.getBoundingClientRect().top : this.formDynamic.getBoundingClientRect().bottom) : 0;
    }
    get dropdownOpenUp() {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return (inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT > this.formDynamicBottom);
    }
    get scrollDistance() {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return (inputBottom > this.formDynamicBottom) ? ((inputBottom) - this.formDynamicBottom) : 0;
    }
    onItemSelect(ev) {
        ev.stopPropagation();
        setValueAndValidateInput(ev.detail, this);
    }
    onFetchData(ev) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }
    onInputFocused() {
        this.showContainer();
    }
    onInputBlurred() {
    }
    onSearchIconClicked() {
        this.hideContainer();
    }
    onSearchInputChanged(ev) {
        ev.stopPropagation();
        this.fetchData.emit({ search: ev.detail, appendData: false, currentPage: 0, pageSize: this.pageSize });
    }
    hideContainer() {
        let container = this.host.querySelector('.items-container');
        container.setAttribute('style', 'display: none;');
    }
    showContainer() {
        if (this.dropdownOpenUp) {
            this.host.querySelector('.outer-container').setAttribute('style', 'flex-direction: column-reverse;');
        }
        let container = this.host.querySelector('.items-container');
        container.setAttribute('style', 'display: block;');
        if (this.scrollDistance !== 0 && this.formDynamic) {
            let ionScroll = this.formDynamic.querySelector('ion-scroll');
            ionScroll.scrollToPoint(0, this.scrollDistance, 0);
        }
    }
    renderEditable() {
        return h("div", { class: "outer-container", "attr-layout": "column" },
            h("yoo-form-input", { class: "stable simple-icon", placeholder: this.placeholder, "icon-suffix": "yo-down", onInputFocused: () => this.onInputFocused(), onInputBlurred: () => this.onInputBlurred(), onIconClicked: () => this.onSearchIconClicked(), onInputChanged: (ev) => debounce(this.onSearchInputChanged, 500)(ev) }),
            h("div", { class: "items-container" },
                h("ion-scroll", { forceOverscroll: false },
                    h("yoo-grid", { items: this.values, keepSelection: true, multiple: this.multiple, displayType: this.displayType, onSelect: (ev) => this.onItemSelect(ev), entityType: this.entityType, onFetchData: (ev) => this.onFetchData(ev), hideHeader: true, hideFooter: true, isLocal: this.isLocal, useTranslate: this.useTranslate, initialSelection: this.value }))));
    }
    renderReadonly() {
        return this.value ? [].concat(this.value).map(v => h("div", { innerHTML: v })) : null;
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-autocomplete"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "displayType": {
            "type": String,
            "attr": "display-type"
        },
        "entityType": {
            "type": String,
            "attr": "entity-type"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "pageSize": {
            "type": Number,
            "attr": "page-size",
            "mutable": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "state": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container .items-container {\n  display: none;\n  height: 177px;\n  overflow: auto;\n  border: 1px solid var(--stable-30, rgba(173, 173, 173, 0.3));\n  position: relative; }"; }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class YooFormButtonChoiceComponent {
    constructor() {
        this.multiple = false;
        this.values = [];
        this.validators = [];
        this.selection = [];
        this.translate = window.translateService;
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter$1(this, void 0, void 0, function* () { return true; });
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }
    componentDidLoad() {
        if (this.value) {
            this.selection = [].concat(this.value || []);
        }
    }
    hasFewItems() {
        return this.values.length < 5;
    }
    onItemSelect(item) {
        let index = this.selection.indexOf(item);
        if (this.multiple) {
            if (index >= 0) {
                this.selection.splice(index, 1);
                this.selection = [...this.selection];
            }
            else {
                this.selection = [...this.selection, item];
            }
        }
        else {
            if (index >= 0) {
                this.selection = [];
            }
            else {
                this.selection = [item];
            }
        }
        setValueAndValidateInput(this.multiple ? this.selection : (this.selection.length > 0 ? this.selection[0] : null), this);
    }
    isSelected(item) {
        let selection = [].concat(this.selection);
        let index = findIndex(selection, (s) => isEqual(item, s));
        return index >= 0;
    }
    renderItem(item) {
        return (h("div", { class: 'choice-container ' + (this.isSelected(item) ? 'selected' : ''), onClick: () => this.onItemSelect(item) },
            h("span", null, this.useTranslate ? this.translate.get(item.toUpperCase()) : item)));
    }
    renderReadonly() {
        return this.value ? [].concat(this.value).map(v => h("div", { innerHTML: v })) : null;
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            h("div", { class: 'grid-container ' + (this.hasFewItems() ? 'few-items' : '') }, this.values.map((item) => {
                return this.renderItem(item);
            }))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-button-choice"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "selection": {
            "state": true
        },
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "state": true
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container .grid-container {\n  display: grid;\n  grid-template-columns: 30% 30% 30%;\n  grid-gap: 0.5rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host .outer-container .grid-container .choice-container {\n    background: var(--light, #FFFFFF);\n    border: 1px solid var(--dark-20, #dadada);\n    padding: 0.1rem 0.5rem;\n    text-align: center;\n    color: var(--dark, #444);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n    :host .outer-container .grid-container .choice-container.selected {\n      background: var(--success, #2EDBB7);\n      border: 1px solid var(--success-110, #23cba8);\n      color: var(--light, #FFFFFF); }\n  :host .outer-container .grid-container.few-items {\n    grid-template-columns: 45% 45%; }\n\n:host(.round) .outer-container .grid-container .choice-container {\n  border-radius: 5px; }\n\n:host(.warning) .outer-container .grid-container .choice-container.selected {\n  background: var(--warning, #ff6402);\n  border: 1px solid var(--warning-110, #e75a00); }\n\n:host(.danger) .outer-container .grid-container .choice-container.selected {\n  background: var(--danger, #ff625f);\n  border: 1px solid var(--danger-110, #ff403c); }\n\n:host(.info) .outer-container .grid-container .choice-container.selected {\n  background: var(--info, #fc459e);\n  border: 1px solid var(--info-110, #c7367c); }\n\n:host(.accent) .outer-container .grid-container .choice-container.selected {\n  background: var(--accent, #1FB6FF);\n  border: 1px solid var(--accent-110, #02adff); }\n\n:host(.dark) .outer-container .grid-container .choice-container.selected {\n  background: var(--dark, #444);\n  border: 1px solid var(--dark-110, #3d3d3d); }"; }
}

var filtrex = createCommonjsModule(function (module, exports) {
!function(e){module.exports=e();}(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,_dereq_("FWaASH"));
},{"FWaASH":3}],3:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],4:[function(_dereq_,module,exports){
/**
 * Filtrex provides compileExpression() to compile user expressions to JavaScript.
 *
 * See https://github.com/joewalnes/filtrex for tutorial, reference and examples.
 * MIT License.
 *
 * Includes Jison by Zachary Carter. See http://jison.org/
 *
 * -Joe Walnes
 */
module.exports = function compileExpression(expression, extraFunctions /* optional */) {

    var parser = _dereq_('./parser');

    var functions = {
        abs: Math.abs,
        ceil: Math.ceil,
        floor: Math.floor,
        log: Math.log,
        max: Math.max,
        min: Math.min,
        random: Math.random,
        round: Math.round,
        sqrt: Math.sqrt,
    };
    if (extraFunctions) {
        for (var name in extraFunctions) {
            if (extraFunctions.hasOwnProperty(name)) {
                functions[name] = extraFunctions[name];
            }
        }
    }
    var tree = parser.parse(expression);

    var js = [];
    js.push('return ');
    function toJs(node) {
        if (Array.isArray(node)) {
            node.forEach(toJs);
        } else {
            js.push(node);
        }
    }
    tree.forEach(toJs);
    js.push(';');

    var func = new Function('functions', 'data', js.join(''));
    return function(data) {
        return func(functions, data);
    };
};

},{"./parser":5}],5:[function(_dereq_,module,exports){
(function (process){
/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"+":6,"-":7,"*":8,"/":9,"%":10,"^":11,"and":12,"or":13,"not":14,"==":15,"!=":16,"<":17,"<=":18,">":19,">=":20,"?":21,":":22,"(":23,")":24,"NUMBER":25,"STRING":26,"SYMBOL":27,"argsList":28,"in":29,"inSet":30,",":31,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"+",7:"-",8:"*",9:"/",10:"%",11:"^",12:"and",13:"or",14:"not",15:"==",16:"!=",17:"<",18:"<=",19:">",20:">=",21:"?",22:":",23:"(",24:")",25:"NUMBER",26:"STRING",27:"SYMBOL",29:"in",31:","},
productions_: [0,[3,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,3],[4,3],[4,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,5],[4,3],[4,1],[4,1],[4,1],[4,4],[4,5],[4,6],[28,1],[28,3],[30,1],[30,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:return $$[$0-1];
break;
case 2:this.$ = ["(", $$[$0-2],"+",$$[$0], ")"];
break;
case 3:this.$ = ["(", $$[$0-2],"-",$$[$0], ")"];
break;
case 4:this.$ = ["(", $$[$0-2],"*",$$[$0], ")"];
break;
case 5:this.$ = ["(", $$[$0-2],"/",$$[$0], ")"];
break;
case 6:this.$ = ["(", $$[$0-2],"%",$$[$0], ")"];
break;
case 7:this.$ = ["(", "Math.pow(",$$[$0-2],",",$$[$0],")", ")"];
break;
case 8:this.$ = ["(", "-",$$[$0], ")"];
break;
case 9:this.$ = ["(", "Number(",$$[$0-2],"&&",$$[$0],")", ")"];
break;
case 10:this.$ = ["(", "Number(",$$[$0-2],"||",$$[$0],")", ")"];
break;
case 11:this.$ = ["(", "Number(!",$$[$0],")", ")"];
break;
case 12:this.$ = ["(", "Number(",$$[$0-2],"==",$$[$0],")", ")"];
break;
case 13:this.$ = ["(", "Number(",$$[$0-2],"!=",$$[$0],")", ")"];
break;
case 14:this.$ = ["(", "Number(",$$[$0-2],"<",$$[$0],")", ")"];
break;
case 15:this.$ = ["(", "Number(",$$[$0-2],"<=",$$[$0],")", ")"];
break;
case 16:this.$ = ["(", "Number(",$$[$0-2],"> ",$$[$0],")", ")"];
break;
case 17:this.$ = ["(", "Number(",$$[$0-2],">=",$$[$0],")", ")"];
break;
case 18:this.$ = ["(", $$[$0-4],"?",$$[$0-2],":",$$[$0], ")"];
break;
case 19:this.$ = ["(", $$[$0-1], ")"];
break;
case 20:this.$ = ["(", $$[$0], ")"];
break;
case 21:this.$ = ["(", "\"",$$[$0],"\"", ")"];
break;
case 22:this.$ = ["(", "data[\"",$$[$0],"\"]", ")"];
break;
case 23:this.$ = ["(", "functions.",$$[$0-3],"(",$$[$0-1],")", ")"];
break;
case 24:this.$ = ["(", $$[$0-4]," in (function(o) { ",$$[$0-1],"return o; })({})", ")"];
break;
case 25:this.$ = ["(", "!(",$$[$0-5]," in (function(o) { ",$$[$0-1],"return o; })({}))", ")"];
break;
case 26:this.$ = [$$[$0]];
break;
case 27:this.$ = [$$[$0-2],",",$$[$0]];
break;
case 28:this.$ = ["o[",$$[$0],"] = true; "];
break;
case 29:this.$ = [$$[$0-2],"o[",$$[$0],"] = true; "];
break;
}
},
table: [{3:1,4:2,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{1:[3]},{5:[1,9],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[1,24],29:[1,25]},{4:27,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:28,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:29,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{5:[2,20],6:[2,20],7:[2,20],8:[2,20],9:[2,20],10:[2,20],11:[2,20],12:[2,20],13:[2,20],14:[2,20],15:[2,20],16:[2,20],17:[2,20],18:[2,20],19:[2,20],20:[2,20],21:[2,20],22:[2,20],24:[2,20],29:[2,20],31:[2,20]},{5:[2,21],6:[2,21],7:[2,21],8:[2,21],9:[2,21],10:[2,21],11:[2,21],12:[2,21],13:[2,21],14:[2,21],15:[2,21],16:[2,21],17:[2,21],18:[2,21],19:[2,21],20:[2,21],21:[2,21],22:[2,21],24:[2,21],29:[2,21],31:[2,21]},{5:[2,22],6:[2,22],7:[2,22],8:[2,22],9:[2,22],10:[2,22],11:[2,22],12:[2,22],13:[2,22],14:[2,22],15:[2,22],16:[2,22],17:[2,22],18:[2,22],19:[2,22],20:[2,22],21:[2,22],22:[2,22],23:[1,30],24:[2,22],29:[2,22],31:[2,22]},{1:[2,1]},{4:31,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:32,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:33,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:34,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:35,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:36,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:37,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:38,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:39,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:40,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:41,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:42,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:43,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:44,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{4:45,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{23:[1,46]},{29:[1,47]},{5:[2,8],6:[2,8],7:[2,8],8:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],16:[2,8],17:[2,8],18:[2,8],19:[2,8],20:[2,8],21:[2,8],22:[2,8],24:[2,8],29:[2,8],31:[2,8]},{5:[2,11],6:[2,11],7:[2,11],8:[2,11],9:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11],17:[2,11],18:[2,11],19:[2,11],20:[2,11],21:[2,11],22:[2,11],24:[2,11],29:[2,11],31:[2,11]},{6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[1,24],24:[1,48],29:[1,25]},{4:50,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8],28:49},{5:[2,2],6:[2,2],7:[2,2],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,2],13:[2,2],14:[1,26],15:[2,2],16:[2,2],17:[2,2],18:[2,2],19:[2,2],20:[2,2],21:[2,2],22:[2,2],24:[2,2],29:[2,2],31:[2,2]},{5:[2,3],6:[2,3],7:[2,3],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,3],13:[2,3],14:[1,26],15:[2,3],16:[2,3],17:[2,3],18:[2,3],19:[2,3],20:[2,3],21:[2,3],22:[2,3],24:[2,3],29:[2,3],31:[2,3]},{5:[2,4],6:[2,4],7:[2,4],8:[2,4],9:[2,4],10:[2,4],11:[1,15],12:[2,4],13:[2,4],14:[1,26],15:[2,4],16:[2,4],17:[2,4],18:[2,4],19:[2,4],20:[2,4],21:[2,4],22:[2,4],24:[2,4],29:[2,4],31:[2,4]},{5:[2,5],6:[2,5],7:[2,5],8:[2,5],9:[2,5],10:[2,5],11:[1,15],12:[2,5],13:[2,5],14:[1,26],15:[2,5],16:[2,5],17:[2,5],18:[2,5],19:[2,5],20:[2,5],21:[2,5],22:[2,5],24:[2,5],29:[2,5],31:[2,5]},{5:[2,6],6:[2,6],7:[2,6],8:[2,6],9:[2,6],10:[2,6],11:[1,15],12:[2,6],13:[2,6],14:[1,26],15:[2,6],16:[2,6],17:[2,6],18:[2,6],19:[2,6],20:[2,6],21:[2,6],22:[2,6],24:[2,6],29:[2,6],31:[2,6]},{5:[2,7],6:[2,7],7:[2,7],8:[2,7],9:[2,7],10:[2,7],11:[2,7],12:[2,7],13:[2,7],14:[1,26],15:[2,7],16:[2,7],17:[2,7],18:[2,7],19:[2,7],20:[2,7],21:[2,7],22:[2,7],24:[2,7],29:[2,7],31:[2,7]},{5:[2,9],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,9],13:[2,9],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[2,9],22:[2,9],24:[2,9],29:[1,25],31:[2,9]},{5:[2,10],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[2,10],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[2,10],22:[2,10],24:[2,10],29:[1,25],31:[2,10]},{5:[2,12],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,12],13:[2,12],14:[1,26],15:[2,12],16:[2,12],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[2,12],22:[2,12],24:[2,12],29:[2,12],31:[2,12]},{5:[2,13],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,13],13:[2,13],14:[1,26],15:[2,13],16:[2,13],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[2,13],22:[2,13],24:[2,13],29:[2,13],31:[2,13]},{5:[2,14],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,14],13:[2,14],14:[1,26],15:[2,14],16:[2,14],17:[2,14],18:[2,14],19:[2,14],20:[2,14],21:[2,14],22:[2,14],24:[2,14],29:[2,14],31:[2,14]},{5:[2,15],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,15],13:[2,15],14:[1,26],15:[2,15],16:[2,15],17:[2,15],18:[2,15],19:[2,15],20:[2,15],21:[2,15],22:[2,15],24:[2,15],29:[2,15],31:[2,15]},{5:[2,16],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,16],13:[2,16],14:[1,26],15:[2,16],16:[2,16],17:[2,16],18:[2,16],19:[2,16],20:[2,16],21:[2,16],22:[2,16],24:[2,16],29:[2,16],31:[2,16]},{5:[2,17],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[2,17],13:[2,17],14:[1,26],15:[2,17],16:[2,17],17:[2,17],18:[2,17],19:[2,17],20:[2,17],21:[2,17],22:[2,17],24:[2,17],29:[2,17],31:[2,17]},{6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[1,24],22:[1,51],29:[1,25]},{4:53,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8],30:52},{23:[1,54]},{5:[2,19],6:[2,19],7:[2,19],8:[2,19],9:[2,19],10:[2,19],11:[2,19],12:[2,19],13:[2,19],14:[2,19],15:[2,19],16:[2,19],17:[2,19],18:[2,19],19:[2,19],20:[2,19],21:[2,19],22:[2,19],24:[2,19],29:[2,19],31:[2,19]},{24:[1,55],31:[1,56]},{6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[1,24],24:[2,26],29:[1,25],31:[2,26]},{4:57,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{24:[1,58],31:[1,59]},{6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[1,24],24:[2,28],29:[1,25],31:[2,28]},{4:53,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8],30:60},{5:[2,23],6:[2,23],7:[2,23],8:[2,23],9:[2,23],10:[2,23],11:[2,23],12:[2,23],13:[2,23],14:[2,23],15:[2,23],16:[2,23],17:[2,23],18:[2,23],19:[2,23],20:[2,23],21:[2,23],22:[2,23],24:[2,23],29:[2,23],31:[2,23]},{4:61,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{5:[2,18],6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[2,18],22:[2,18],24:[2,18],29:[1,25],31:[2,18]},{5:[2,24],6:[2,24],7:[2,24],8:[2,24],9:[2,24],10:[2,24],11:[2,24],12:[2,24],13:[2,24],14:[2,24],15:[2,24],16:[2,24],17:[2,24],18:[2,24],19:[2,24],20:[2,24],21:[2,24],22:[2,24],24:[2,24],29:[2,24],31:[2,24]},{4:62,7:[1,3],14:[1,4],23:[1,5],25:[1,6],26:[1,7],27:[1,8]},{24:[1,63],31:[1,59]},{6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[1,24],24:[2,27],29:[1,25],31:[2,27]},{6:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,26],15:[1,18],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,23],21:[1,24],24:[2,29],29:[1,25],31:[2,29]},{5:[2,25],6:[2,25],7:[2,25],8:[2,25],9:[2,25],10:[2,25],11:[2,25],12:[2,25],13:[2,25],14:[2,25],15:[2,25],16:[2,25],17:[2,25],18:[2,25],19:[2,25],20:[2,25],21:[2,25],22:[2,25],24:[2,25],29:[2,25],31:[2,25]}],
defaultActions: {9:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
switch($avoiding_name_collisions) {
case 0:return "*";
break;
case 1:return "/";
break;
case 2:return "-";
break;
case 3:return "+";
break;
case 4:return "^";
break;
case 5:return "%";
break;
case 6:return "(";
break;
case 7:return ")";
break;
case 8:return ",";
break;
case 9:return "==";
break;
case 10:return "!=";
break;
case 11:return ">=";
break;
case 12:return "<=";
break;
case 13:return "<";
break;
case 14:return ">";
break;
case 15:return "?";
break;
case 16:return ":";
break;
case 17:return "and";
break;
case 18:return "or";
break;
case 19:return "not";
break;
case 20:return "in";
break;
case 21:
break;
case 22:return "NUMBER";
break;
case 23:return "SYMBOL";
break;
case 24:yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return "STRING";
break;
case 25:return "EOF";
break;
}
},
rules: [/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:\%)/,/^(?:\()/,/^(?:\))/,/^(?:\,)/,/^(?:==)/,/^(?:\!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:<)/,/^(?:>)/,/^(?:\?)/,/^(?:\:)/,/^(?:and[^\w])/,/^(?:or[^\w])/,/^(?:not[^\w])/,/^(?:in[^\w])/,/^(?:\s+)/,/^(?:[0-9]+(?:\.[0-9]+)?\b)/,/^(?:[a-zA-Z][\.a-zA-Z0-9_]*)/,/^(?:"(?:[^"])*")/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof _dereq_ !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = _dereq_('fs').readFileSync(_dereq_('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && _dereq_.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this,_dereq_("FWaASH"));
},{"FWaASH":3,"fs":1,"path":2}]},{},[4])
(4)
});
});

//import { uuid } from 'uuid';
const filtrex$1 = filtrex;
function isVisible(field, readonly = false, data, suffix = '', session = {}) {
    let retVal = !(field.visible === false);
    if (field.visible === false && !field.condition) {
        retVal = false;
        //TODO: fix this
    }
    else if (field.hideMobile) { // && this.coreConfig.isIonic()
        retVal = false;
    }
    else {
        if ((readonly || field.readonly === true) && !field.condition) {
            retVal = hasValue(field, data, suffix);
        }
        else if ((readonly || field.readonly === true) && field.condition) {
            retVal = hasValue(field, data, suffix);
            retVal = retVal && (isString(field.condition) ? evalInContext(field.condition, data, suffix) : evalConditionsInContext(concat(field.condition, []), data, suffix));
        }
        else if (field.condition && isString(field.condition)) {
            retVal = evalInContext(field.condition, data, suffix);
        }
        else if (field.condition && (isArray(field.condition) && field.condition.length > 0 || isObject(field.condition))) {
            retVal = evalConditionsInContext(concat(field.condition, []), data, suffix, session);
        }
    }
    if (retVal === 0) {
        retVal = false;
    }
    return retVal;
}
function isReadonly(field, data, suffix = '', session = {}) {
    let retVal = false;
    if (field.readonly === true) {
        retVal = true;
    }
    else if (field.readonly === false) {
        retVal = false;
    }
    else if (!isBlank(field.readonly) && isString(field.readonly)) {
        retVal = evalInContext(field.readonly, data, suffix);
    }
    else if (!isBlank(field.readonly) && (isArray(field.readonly) && field.readonly.length > 0 || isObject(field.readonly))) {
        retVal = evalConditionsInContext(concat(field.readonly, []), data, suffix, session);
    }
    return retVal;
}
function hasValue(field, data, suffix = '') {
    if (field.type === FormFieldType.image || field.type === FormFieldType.document || field.type === FormFieldType.videoplayer) { //field.type === FormFieldType.information ||
        return true;
    }
    let options = getNameAndData(field, data, suffix);
    let retVal = false;
    if (isPresent(options.data) && options.data !== '') {
        retVal = true;
        // if (isArray(options.data) && (<Array<any>>options.data).length === 0) {
        //     retVal = false;
        // };
        // Check whether options.data is an object or array; Then check whether it is empty
        if (isObject(options.data) && isEmpty(options.data)) {
            retVal = false;
        }
        if (field.type === FormFieldType.todo && (!options.data || !options.data.values || options.data.values.length <= 0)) {
            retVal = false;
        }
    }
    return retVal;
}
function evalConditionsInContext(conditions, data, suffix = '', session = {}) {
    let valid = true;
    for (let condition of conditions) {
        if (isString(condition)) {
            valid = valid && evalInContext(condition, data, suffix);
        }
        else if (condition.type === 'field') {
            let expression;
            if (condition.field.type === FormFieldType.selectmulti || condition.field.type === FormFieldType.selectbuttonsmulti) {
                expression = 'contains(getAttributeValue(' + '"' + condition.field.name + suffix + '"), "' + condition.values + '", "' + condition.operator + '")';
            }
            else if (condition.field.type === FormFieldType.select || condition.field.type === FormFieldType.selectbuttons || condition.field.type === FormFieldType.autocomplete) {
                expression = 'contains(getAttributeValue(' + '"' + condition.field.name + suffix + '"), "' + condition.values + '", "' + condition.operator + '")';
            }
            else {
                let value = condition.value;
                if (!value && value !== false && value !== 0) {
                    value = condition.values;
                }
                if (condition.operator === '>=' || condition.operator === '<=' || condition.operator === 'greaterthan' || condition.operator === 'lessthan') {
                    let op = condition.operator === 'greaterthan' ? '>=' : (condition.operator === 'lessthan') ? '<=' : condition.operator;
                    let separator = '';
                    if (condition.field.type === FormFieldType.date || condition.field.type === FormFieldType.datetime || condition.field.type === FormFieldType.time) {
                        separator = '"';
                    }
                    expression = 'getAttributeValue(' + '"' + condition.field.name + suffix + '")' + op + separator + value + separator;
                }
                else {
                    let op = (condition.operator === 'equals' || condition.operator === '===') ? '==' : (condition.operator === 'notequals' || condition.operator === '!==') ? '!=' : '==';
                    expression = 'toStringAndUppercase(getAttributeValue(' + '"' + condition.field.name + suffix + '"))' + op + 'toStringAndUppercase(' + '"' + value + '"' + ')';
                }
            }
            let retVal = evalInContext(expression, data, suffix);
            valid = valid && retVal;
        }
        else if (condition.type === 'tags') {
            if (!session.selectedMission || !session.selectedMission.location) {
                valid = valid && true;
            }
            else {
                let retVal = condition.operator === 'in' || !condition.operator ? intersection(session.selectedMission.location.tags, condition.tags).length > 0 : intersection(session.selectedMission.location.tags, condition.tags).length === 0;
                valid = valid && retVal;
            }
        }
        else if (condition.type === 'groups' || condition.type === 'roles') {
            let groups = condition.type === 'groups' ? session.groups : session.roles;
            let retVal = condition.operator === 'in' ? intersection(groups, condition.group).length > 0 : intersection(groups, condition.group).length === 0;
            valid = valid && retVal;
        }
        else if (condition.type === 'missionDescriptionAttribute') {
            if (!session.selectedMissionDescription) {
                valid = valid && true;
            }
            else {
                let retVal = isEqual(session.selectedMissionDescription[condition.key], condition.value);
                valid = valid && retVal;
            }
        }
        else if (isString(condition)) {
            let retVal = evalInContext(condition, data, suffix);
            valid = valid && retVal;
        }
    }
    return valid;
}
function updateFormulas(slides, data, suffix = '') {
    let fields = [];
    let didUpdate = false;
    slides.forEach(slide => {
        if (slide && slide.items) {
            fields = fields.concat(slide.items);
        }
    });
    if (fields && fields.length > 0) {
        fields.forEach(field => {
            if (field.type === FormFieldType.formula) {
                let formula = field.formula;
                if (formula) {
                    let toReplace = [];
                    for (let name in fields) {
                        let f = fields[name];
                        if (formula.indexOf(f.title) >= 0) {
                            toReplace.push({ original: f.title, replacement: f.name });
                            //formula = formula.replace(new RegExp(f.title, 'g'), 'getAttributeValue("' + f.name + '")');
                        }
                    }
                    toReplace = sortBy(toReplace, o => -o.original.length);
                    toReplace.forEach(o => {
                        formula = formula.replace(new RegExp(o.original, 'g'), 'getAttributeValue("' + o.replacement + '")');
                    });
                    let value = evalInContext(formula, data, suffix, true);
                    if (isNumber(value) && !isNaN(value) && isFinite(value)) {
                        value = Math.round(value * 100) / 100;
                    }
                    else {
                        value = null;
                    }
                    setFieldData(field, value, data, suffix);
                }
            }
        });
    }
    return didUpdate;
}
function setFieldData(field, value, data, suffix) {
    let nameAndData = getNameAndData(field, data, suffix);
    set(data, nameAndData.name, value);
}
function evalInContext(js, data, suffix = '', rawValue = false) {
    let flattenContext = data;
    let extraFunctions = {
        getAttributeValue: filtrexGetAttributeValue(data),
        contains: filtrexContains,
        isNullOrEmpty: filtrexIsNullOrEmpty,
        toStringAndUppercase: filtrexToStringAndUppercase,
        endsWith: filtrexEndsWith,
        indexOf: filtrexIndexOf(data),
        length: filtrexLength(data)
    };
    if (typeof js !== 'string') {
        return true;
    }
    if (js.indexOf('.') > 0) {
        flattenContext = slenderizeObject(data);
    }
    try {
        let expression = filtrex$1(js, extraFunctions);
        let retVal = expression(flattenContext || {});
        if (rawValue) {
            return retVal;
        }
        return !!retVal;
    }
    catch (err) {
        window['console'].log(err);
    }
    return true;
}
function filtrexContains(array, values, contains) {
    if (!array || (isArray(array) && array.length === 0)) {
        array = [];
    }
    if (!isArray(array)) {
        array = [array];
    }
    let val = values.split(',');
    let found = 0;
    for (let v of val) {
        if (indexOf(array, v) >= 0) {
            found++;
        }
    }
    switch (contains) {
        case 'in':
        case 'contains':
            return found >= 1;
        case 'notin':
        case 'notcontains':
            return found === 0;
        case 'containsall':
            return found === val.length;
        case 'equals':
        case '===':
            return val.length === array.length && found === val.length;
        case 'notequals':
        case '!==':
            return val.length === array.length && found === 0;
    }
}
function filtrexIsNullOrEmpty(value) {
    if (isBlank(value) || value.length === 0) {
        return true;
    }
    return false;
}
function filtrexGetAttributeValue(data) {
    let f = (key) => {
        return get(data, key);
    };
    return f;
}
function filtrexToStringAndUppercase(value) {
    if (value) {
        return value.toString().toUpperCase();
    }
    return value;
}
function filtrexIndexOf(data) {
    return (path, value) => {
        let array = get(data, path);
        if (array && array.indexOf) {
            return array.indexOf(value);
        }
        return -1;
    };
}
function filtrexEndsWith(value, searchString) {
    if (value && value.endsWith) {
        return value.endsWith(searchString);
    }
    return false;
}
function filtrexLength(data) {
    return (path) => {
        let temp = get(data, path);
        if (isArray(temp)) {
            let array = temp;
            if (array && array.indexOf) {
                return array.length;
            }
        }
        else if (isString(temp) && !isNull(temp) && !isUndefined(temp)) {
            return temp.length;
        }
        else if (isObject(temp) && !isEmpty(temp)) {
            return 1;
        }
        return 0;
    };
}
function slenderizeObject(fatObject) {
    let propertyIdentifiers = [];
    let slenderObject = {};
    function processNode(theNode, _propertyIdentifiers, _slenderObject) {
        theNode = theNode || {};
        _propertyIdentifiers = _propertyIdentifiers || [];
        let retVal = map(theNode, (value, key) => {
            let myKeys = clone(_propertyIdentifiers);
            let ret = {};
            myKeys.push(key);
            // if value is a string, number or boolean
            if (isString(value) || isNumber(value) || isBoolean(value)) {
                // build a keyString to use as a property identifier
                let keyString = myKeys.join('.');
                // add a property with that identifier and childNode as the value to our return object
                ret[keyString] = _slenderObject[keyString] = value;
            }
            else {
                // Call processNode recursively if value isn't a leaf node type (string, number or boolean)
                processNode(value, myKeys, _slenderObject);
                ret = value;
            }
            return ret;
        });
        return retVal;
    }
    processNode(fatObject, propertyIdentifiers, slenderObject);
    return slenderObject;
}
function getFieldPath(field, suffix) {
    return field.name + (suffix ? suffix : '');
}
function getFieldValue(field, initialData, suffix) {
    let name = getFieldPath(field, suffix);
    let data = result(initialData, name);
    return data;
}
function getNameAndData(field, initialData, suffix) {
    let name = getFieldPath(field, suffix);
    let data = getFieldValue(field, initialData, suffix);
    return { name: name, data: data };
}

//import { YooFormDynamicModalComponent } from './form-dynamic-dialog';
const TABBAR_HEIGHT = 52;
const KEYBOARD_TOP_PADDING = 100;
class YooFormDynamicComponent {
    constructor() {
        this.activeIndex = 0;
        this.progress = 0;
        this.validity = false;
        this.coreConfig = window.coreConfigService;
        this.translate = window.translateService;
        this.slidesOptions = {
            //slidesPerView: 1.1,
            //centeredSlides: true,
            noSwipingSelector: 'input',
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            }
        };
    }
    onIonScroll(event) {
        this.currentScrollPositions[this.activeIndex] = event.detail.currentY;
    }
    componentWillLoad() {
        this.currentData = this.data || {};
        this.fieldsState = {};
        this.slidesState = new Array(this.slides ? this.slides.length : 0);
        this.updateState();
    }
    componentDidLoad() {
        this.ionSlides = this.host.querySelector('ion-slides');
        let slideLength = this.slides ? this.slides.length + 1 : 0;
        this.currentScrollPositions = new Array(slideLength).fill(0);
        if (this.coreConfig.isIonic()) {
            this.fullWindowHeight = window.innerHeight;
            window.addEventListener('resize', () => this.onKeyboardChange());
        }
        if (!this.showTabs) {
            setTimeout(() => {
                if (this.ionSlides) {
                    this.ionSlides.lockSwipes(true);
                }
            }, 300);
        }
    }
    getFieldState(field) {
        return this.fieldsState[field.name] || {};
    }
    setFieldState(field, state) {
        this.fieldsState[field.name] = state;
    }
    getSlideState(slideIndex) {
        return this.slidesState[slideIndex] || {};
    }
    onInputChanged(event, field) {
        setFieldData(field, event.detail, this.currentData, this.suffix);
        this.updateState();
        this.dataChanged.emit(this.currentData);
    }
    onInputValidityChanged(event, field, slideIndex) {
        this.fieldsState = this.fieldsState || {};
        this.fieldsState[field.name] = this.fieldsState[field.name] || {};
        this.fieldsState[field.name].validity = event.detail;
        this.fieldsState = Object.assign({}, this.fieldsState);
    }
    onInputFocused(inputIndex) {
        if (this.coreConfig.isCordova()) {
            let currentSlide = this.host.querySelectorAll('ion-slide')[this.activeIndex];
            let inputDimensions = currentSlide.querySelectorAll('yoo-form-input-container')[inputIndex].getBoundingClientRect();
            this.inputBottomYPosition = inputDimensions.top + inputDimensions.height;
            this.onKeyboardChange();
        }
    }
    onIonSlideDidChange(ev) {
        this.activeIndex = ev.detail.activeIndex;
        this.blurInput();
    }
    goToRecap() {
        if (this.ionSlides) {
            this.ionSlides.slideTo(0);
        }
    }
    forceFieldUpdate(field) {
        let el = this.host.querySelector('[attr-name=' + field.name + ']');
        if (el) {
            switch (field.type) {
                case FormFieldType.autocomplete:
                    el.values = field.values;
                    break;
            }
        }
    }
    isValid() {
        return this.validity;
    }
    blurInput() {
        let activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
        }
    }
    goToSlide(index) {
        if (this.ionSlides) {
            this.ionSlides.slideTo(this.showRecap !== false ? index + 1 : index);
        }
    }
    onSlidePrevious() {
        if (this.ionSlides) {
            this.ionSlides.slidePrev();
        }
    }
    onSlideNext() {
        if (this.ionSlides) {
            this.ionSlides.slideNext();
        }
    }
    isFirstSlide() {
        return this.activeIndex === 0;
    }
    slideHasAdvancedFields(slide) {
        return slide.items.some((field) => {
            return field.advanced && this.getFieldState(field).visible !== false;
        });
    }
    onToggleSlideZoom(slideIndex) {
        let state = this.getSlideState(slideIndex);
        state.zoomed = state.zoomed ? false : true;
        this.slidesState = [...this.slidesState];
        let content = this.host.closest('ion-content');
        if (content && state.zoomed) {
            content.classList.add('absolute');
            if (this.ionSlides) {
                this.ionSlides.lockSwipes(true);
            }
        }
        else if (content && !state.zoomed) {
            content.classList.remove('absolute');
            if (this.ionSlides) {
                this.ionSlides.lockSwipes(false);
            }
        }
        // let slides = this.host.querySelector('ion-slides');
    }
    onShowAdvancedFields(slide) {
        let fields = slide.items.filter(field => field.advanced && this.getFieldState(field).visible !== false);
        if (fields.length > 0) {
            fields = fields.map(field => {
                let retVal = Object.assign({}, field);
                retVal.advanced = false;
                return retVal;
            });
            let slides = [{ items: fields, title: this.translate.get('ADVANCED') }];
            let form = document.createElement('yoo-form-dynamic-dialog');
            form.slides = slides;
            form.showTabs = false;
            form.showRecap = false;
            form.forceReadonly = this.forceReadonly;
            form.data = this.currentData;
            showModal(form).then(ret => {
                if (ret && ret.data) {
                    this.currentData = ret.data;
                    window['console'].log(this.currentData);
                }
            });
        }
    }
    fieldHasValue(field) {
        return hasValue(field, this.currentData, this.suffix);
    }
    updateState() {
        this.progress = 0;
        let total = 0;
        let filed = 0;
        updateFormulas(this.slides, this.currentData, this.suffix);
        this.slides.forEach((slide, i) => {
            let isValid = true;
            let slideHasValue = false;
            slide.items.forEach(field => {
                if (!field.advanced) {
                    if (field.readonly || field.type === FormFieldType.information) ;
                    else {
                        total += 1;
                        if (this.fieldHasValue(field)) {
                            filed += 1;
                        }
                    }
                    let fieldState = this.getFieldState(field);
                    fieldState.readonly = isReadonly(field, this.currentData, this.suffix);
                    fieldState.visible = isVisible(field, fieldState.readonly, this.currentData, this.suffix);
                    this.setFieldState(field, fieldState);
                    isValid = isValid && (field.required ? fieldState.validity === true : fieldState.validity !== false);
                    slideHasValue = slideHasValue || this.fieldHasValue(field);
                    this.slidesState[i] = this.slidesState[i] || {};
                    this.slidesState[i].hasValue = slideHasValue;
                    this.slidesState[i].validity = slideHasValue ? isValid : null;
                }
            });
        });
        this.progress = filed / total * 100;
        this.slidesState = [...this.slidesState];
        this.fieldsState = Object.assign({}, this.fieldsState);
        this.validity = this.slidesState.every(state => state.validity);
    }
    getInputType(field) {
        switch (field.type) {
            case FormFieldType.text:
            case FormFieldType.number:
            case FormFieldType.tel:
            case FormFieldType.password:
                return field.type;
        }
        return FormFieldType.text;
    }
    onKeyboardChange() {
        let windowHeightWithKeyboard = window.innerHeight;
        if (windowHeightWithKeyboard < this.fullWindowHeight) {
            let maximumYPosition = windowHeightWithKeyboard - TABBAR_HEIGHT - KEYBOARD_TOP_PADDING;
            let scrollDistance = this.inputBottomYPosition > maximumYPosition ? (this.inputBottomYPosition - maximumYPosition) : 0;
            let currentSlide = this.host.querySelectorAll('ion-slide')[this.activeIndex];
            let ionScroll = currentSlide.querySelector('ion-scroll');
            ionScroll.scrollToPoint(0, (this.currentScrollPositions[this.activeIndex] + scrollDistance), 0);
        }
    }
    onFetchData(field, ev) {
        ev.stopPropagation();
        this.fieldFetchData.emit({ field, search: ev.detail });
    }
    renderHeader() {
        return null;
    }
    renderRecap() {
        return this.showRecap !== false ?
            h("ion-slide", { class: "recap" },
                h("ion-scroll", { forceOverscroll: false },
                    h("div", { class: "header" },
                        h("yoo-progress-bar", { percentage: true, progress: this.progress, class: "success" })),
                    h("div", { "attr-flex": true, "attr-layout": "column" }, this.slides.map((s, slideIndex) => h("yoo-form-recap-step", { onClick: () => this.goToSlide(slideIndex), stepNumber: slideIndex + 1, mainTitle: s.title, subTitle: s.description, validity: this.getSlideState(slideIndex).validity })))),
                h("div", { class: "footer", "attr-layout": "row", "attr-layout-align": "center center" },
                    h("yoo-button", { onClick: () => this.onSlideNext(), text: this.translate.get('START'), class: "large gradient-success" }))) : null;
    }
    renderSlideHeader(slide, slideIndex) {
        return this.showTabs ? h("div", { "attr-layout": "row", class: 'header ' + (this.getSlideState(slideIndex).validity ? 'success' : '') },
            this.activeIndex > 0 ? h("i", { class: "yo-left", onClick: () => this.onSlidePrevious() }) : null,
            h("div", { class: "title", "attr-flex": true }, this.translate.polyglot(slide.title)),
            this.activeIndex < (this.slides.length - 1 + (this.showRecap ? 1 : 0)) ? h("i", { class: "yo-right", onClick: () => this.onSlideNext() }) : null) : null;
    }
    renderZoomButton(slideIndex) {
        return this.showTabs ? h("div", { class: "zoom-button-container", "attr-layout": "row" },
            h("div", { "attr-flex": true }),
            h("div", { class: "zoom-button", onClick: () => this.onToggleSlideZoom(slideIndex) },
                h("i", { class: this.getSlideState(slideIndex).zoomed ? 'yo-close' : 'yo-maximize' }))) : null;
    }
    renderBody() {
        if (this.slides && this.slides.length > 0) {
            return (h("ion-slides", { pager: false, options: this.slidesOptions, onIonSlideDidChange: ev => this.onIonSlideDidChange(ev) },
                this.renderRecap(),
                this.slides.map((slide, slideIndex) => h("ion-slide", { class: (this.showTabs ? 'dynamic ' : '') + (this.getSlideState(slideIndex).zoomed ? 'zoomed ' : ''), "attr-layout": "column" },
                    this.renderSlideHeader(slide, slideIndex),
                    h("div", { class: (this.showTabs ? 'slide-container ' : 'slide-container no-shadow'), "attr-flex": true },
                        h("ion-scroll", { forceOverscroll: false, scrollEvents: true, onIonScroll: (event) => this.onIonScroll(event) },
                            this.renderZoomButton(slideIndex),
                            slideIndex === 0 ? h("slot", null) : null,
                            slide.items.map((field, inputIndex) => {
                                return this.getFieldState(field).visible !== false && !field.advanced ?
                                    h("yoo-form-input-container", { label: (field.required ? '* ' : '') + this.translate.polyglot(field.title || field.name.toUpperCase()), description: this.translate.polyglot(field.description) }, this.renderInput(field, slideIndex, inputIndex)) : null;
                            }),
                            this.slideHasAdvancedFields(slide) ? h("div", { class: "toolbar-spacer" }) : null),
                        this.slideHasAdvancedFields(slide) ?
                            h("div", { class: "toolbar" },
                                h("i", { class: "yo-settings", onClick: (ev) => this.onShowAdvancedFields(slide) })) : null)))));
        }
        return null;
    }
    renderInput(field, slideIndex, inputIndex) {
        let validators = field.required ? [{ name: 'required' }] : null;
        let value = getFieldValue(field, this.currentData, this.suffix);
        switch (field.type) {
            case FormFieldType.text:
            case FormFieldType.number:
            case FormFieldType.tel:
            case FormFieldType.password:
                return h("yoo-form-input", { "attr-name": field.name, value: value, readonly: this.getFieldState(field).readonly || this.forceReadonly, type: this.getInputType(field), validators: validators, onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex), onInputFocused: () => this.onInputFocused(inputIndex) });
            case FormFieldType.date:
            case FormFieldType.datetime:
            case FormFieldType.time:
                return h("yoo-form-date-time", { "attr-name": field.name, value: value, validators: validators, type: field.type, onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex), onInputFocused: () => this.onInputFocused(inputIndex) });
            case FormFieldType.toggle:
                return h("yoo-form-toggle", { "attr-name": field.name, validators: validators, type: 'normal', onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex) });
            case FormFieldType.checkbox:
                return h("yoo-form-checkbox", { "attr-name": field.name });
            case FormFieldType.range:
                return h("yoo-form-range", { "attr-name": field.name, min: field.min, max: field.max, value: { inf: 0, sup: value }, readonly: this.getFieldState(field).readonly || this.forceReadonly, double: false, validators: validators, onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex) });
            case FormFieldType.autocomplete:
                return h("yoo-form-autocomplete", { "attr-name": field.name, value: value, readonly: this.getFieldState(field).readonly || this.forceReadonly, multiple: field.multiple, useTranslate: field.translate, validators: validators, entityType: field.collectionName, values: field.values, onFetchData: (ev) => this.onFetchData(field, ev), onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex) });
            case FormFieldType.textarea:
                return h("yoo-form-text-area", { "attr-name": field.name, value: value, readonly: this.getFieldState(field).readonly || this.forceReadonly, validators: validators, onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex), onInputFocused: () => this.onInputFocused(inputIndex) });
            case FormFieldType.starrating:
                return h("yoo-form-star-rating", { class: "success", "attr-name": field.name, value: value, readonly: this.getFieldState(field).readonly || this.forceReadonly, validators: validators, onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex) });
            case FormFieldType.signature:
                return h("yoo-form-signature-pad", { "attr-name": field.name, value: value, readonly: this.getFieldState(field).readonly || this.forceReadonly, validators: validators, onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex) });
            case FormFieldType.select:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.selectmulti:
                return h("yoo-form-button-choice", { "attr-name": field.name, value: value, readonly: this.getFieldState(field).readonly || this.forceReadonly, values: field.values, validators: validators, onInputChanged: (event) => this.onInputChanged(event, field), onValidityChanged: (event) => this.onInputValidityChanged(event, field, slideIndex) });
            default:
                return h("div", null,
                    " FormFieldType.",
                    field.type,
                    " is not supported");
        }
    }
    renderFooter() {
        return null;
    }
    render() {
        return (h("form", null,
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter()));
    }
    static get is() { return "yoo-form-dynamic"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activeIndex": {
            "state": true
        },
        "currentData": {
            "state": true
        },
        "data": {
            "type": "Any",
            "attr": "data"
        },
        "fieldsState": {
            "state": true
        },
        "forceFieldUpdate": {
            "method": true
        },
        "forceReadonly": {
            "type": Boolean,
            "attr": "force-readonly"
        },
        "goToRecap": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
        },
        "progress": {
            "state": true
        },
        "showRecap": {
            "type": Boolean,
            "attr": "show-recap"
        },
        "showTabs": {
            "type": Boolean,
            "attr": "show-tabs"
        },
        "slides": {
            "type": "Any",
            "attr": "slides"
        },
        "slidesState": {
            "state": true
        },
        "suffix": {
            "type": String,
            "attr": "suffix"
        },
        "validity": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "dataChanged",
            "method": "dataChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fieldFetchData",
            "method": "fieldFetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  background-color: var(--light, #FFFFFF);\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n  :host ion-slides {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n    :host ion-slides ion-slide.recap /deep/ ion-scroll {\n      bottom: 4.5rem; }\n    :host ion-slides ion-slide.dynamic .header {\n      padding-top: 1rem;\n      padding-bottom: 1rem;\n      line-height: 18px; }\n    :host ion-slides ion-slide.zoomed .slide-container {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      margin: 0;\n      margin-bottom: 0;\n      width: 100%;\n      border-radius: 0; }\n  :host .slide-zoom {\n    height: 100%;\n    overflow: hidden; }\n  :host .slide-container {\n    -webkit-transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);\n    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);\n    margin: 1rem;\n    margin-top: 0;\n    margin-bottom: 0;\n    text-align: left;\n    position: relative; }\n    :host .slide-container:not(.no-shadow) {\n      -webkit-box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n      box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n      border-radius: 8px;\n      width: 90%;\n      margin-bottom: 1rem; }\n    :host .slide-container.no-shadow {\n      width: 100%; }\n    :host .slide-container > ion-scroll {\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      padding-right: 0.5rem;\n      padding-left: 1rem;\n      padding-top: 0.5rem;\n      padding-bottom: 1rem; }\n    :host .slide-container .toolbar {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      z-index: 1;\n      background: var(--light, #FFFFFF);\n      border-top: 1px solid var(--dark-20, #dadada);\n      text-align: left;\n      padding: 5px 10px; }\n    :host .slide-container .toolbar-spacer {\n      height: 50px; }\n  :host /deep/ .swiper-container {\n    height: 100%; }\n  :host /deep/ .swiper-pagination-bullet-active {\n    background-color: var(--success, #2EDBB7) !important; }\n  :host .footer {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 90px;\n    background: var(--light, #FFFFFF);\n    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.4);\n    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.4);\n    z-index: 10; }\n  :host .header {\n    padding-left: 1rem;\n    padding-right: 1rem;\n    background: var(--light, #FFFFFF);\n    font-weight: 400;\n    width: 100%; }\n    :host .header i {\n      font-size: 0.8rem;\n      padding-top: 4px; }\n  :host .zoom-button-container .zoom-button {\n    background: var(--stable, #adadad);\n    font-size: 0.7rem;\n    border-radius: 50%;\n    width: 1.5rem;\n    height: 1.5rem;\n    line-height: 1.5rem;\n    text-align: center; }"; }
}

class YooFormDynamicModalComponent {
    constructor() {
        this.validity = false;
        this.translate = window.translateService;
    }
    componentWillLoad() {
        this.currentData = this.data || {};
    }
    onCancel() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(null);
    }
    onSave() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(this.currentData);
    }
    onDataChange(ev) {
        this.currentData = ev.detail;
        let form = this.host.querySelector('yoo-form-dynamic');
        if (form) {
            this.validity = form.isValid();
        }
    }
    isValid() {
        return this.validity;
    }
    render() {
        return [
            //<ion-header class="shadow" no-border>
            h("div", { class: "shadow header" },
                h("ion-toolbar", { color: "light" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { class: "close", color: "dark", onClick: () => this.onCancel() },
                            h("i", { slot: "icon-only", class: "yo-close" }))),
                    h("ion-title", null, this.translate.get('ADVANCED')),
                    h("ion-buttons", { slot: "end", onClick: () => this.onSave() },
                        h("ion-button", { color: "success", disabled: !this.isValid() }, this.translate.get('SAVE'))))),
            //</ion-header>,
            //
            //<ion-content>
            h("div", { class: "content" },
                h("yoo-form-dynamic", { slides: this.slides, data: this.data, "show-recap": this.showRecap, suffix: this.suffix, forceReadonly: this.forceReadonly, onDataChanged: ev => this.onDataChange(ev) }))
            //</ion-content>
        ];
    }
    static get is() { return "yoo-form-dynamic-dialog"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "currentData": {
            "state": true
        },
        "data": {
            "type": "Any",
            "attr": "data"
        },
        "forceReadonly": {
            "type": Boolean,
            "attr": "force-readonly"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
        },
        "showRecap": {
            "type": Boolean,
            "attr": "show-recap"
        },
        "showTabs": {
            "type": Boolean,
            "attr": "show-tabs"
        },
        "slides": {
            "type": "Any",
            "attr": "slides"
        },
        "suffix": {
            "type": String,
            "attr": "suffix"
        },
        "validity": {
            "state": true
        }
    }; }
    static get style() { return ":host .header {\n  position: relative;\n  z-index: 10;\n  display: block;\n  -webkit-box-ordinal-group: 0;\n  -webkit-order: -1;\n  -ms-flex-order: -1;\n  order: -1;\n  width: 100%; }\n\n:host .content {\n  position: relative;\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  contain: layout size style;\n  margin: 0 !important;\n  padding: 0 !important; }"; }
}

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { setValidator, setAsyncValidator, onInputBlurred, onInputChanged, onInputFocused, onFocus } from '../../../utils/helpers/form-input-helpers';
class YooFormRangeComponent {
    constructor() {
        this.validators = [];
        // private coreConfig: ICoreConfig = (window as any).coreConfigService;
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter$2(this, void 0, void 0, function* () { return true; });
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }
    componentDidLoad() {
        this.value = Object.assign({}, this.value);
    }
    isValid() {
        return this.validity;
    }
    onInputClear() {
        this.iconClicked.emit('clear');
    }
    onSliderChange(ev) {
        let oldValue = this.value;
        if (ev && ev.detail) {
            if (ev.detail.lowValue || ev.detail.lowValue === 0) {
                this.value.inf = ev.detail.lowValue;
            }
            if (ev.detail.highValue || ev.detail.highValue === 0) {
                this.value.sup = ev.detail.highValue;
            }
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput({ target: { value: this.value } }, this);
        }
        this.value = Object.assign({}, this.value);
    }
    onSingleSliderChange(ev) {
        let oldValue = this.value;
        if (ev && ev.detail) {
            this.value.sup = ev.detail;
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput(this.value, this);
        }
        this.value = Object.assign({}, this.value);
    }
    onInputInfChanged(ev) {
        let oldValue = this.value;
        this.value.inf = this.value.sup >= ev.target.valueAsNumber ? ev.target.valueAsNumber : this.value.sup;
        this.value.sup = this.value.sup >= ev.target.valueAsNumber ? this.value.sup : ev.target.valueAsNumber;
        if (oldValue !== this.value) {
            setValueAndValidateInput([this.value.inf, this.value.sup], this);
        }
        this.value = Object.assign({}, this.value);
    }
    onInputSupChanged(ev) {
        let oldValue = this.value;
        if (this.double) {
            this.value.sup = this.value.inf <= ev.target.valueAsNumber ? ev.target.valueAsNumber : this.value.inf;
            this.value.inf = this.value.inf <= ev.target.valueAsNumber ? this.value.inf : ev.target.valueAsNumber;
        }
        else {
            this.value.sup = ev.target.valueAsNumber;
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput([this.value.inf, this.value.sup], this);
        }
        this.value = Object.assign({}, this.value);
    }
    renderReadonly() {
        return (h("div", { class: "readonly" },
            h("div", null, this.value ? this.value.inf : null),
            h("div", null, this.value ? this.value.inf : null)));
    }
    renderEditable() {
        return (h("div", { class: "outer-container", "attr-layout": "column" },
            h("div", { class: "inputs-container", "attr-layout": "row" },
                this.double ?
                    [h("div", { class: "input" },
                            h("input", { type: "number", value: this.value && this.value.inf ? this.value.inf.toString() || null : null, onChange: (ev) => this.onInputInfChanged(ev) })),
                        h("div", { class: "separator" })]
                    : null,
                h("div", { class: 'input ' + (this.double ? '' : 'single') },
                    h("input", { type: "number", value: this.value && this.value.sup ? this.value.sup || null : null, onChange: (ev) => this.onInputSupChanged(ev) }))),
            h("div", { class: "slider-container" },
                h("yoo-form-slider", { class: "gradient-success", hideLabel: true, hideReferences: true, doubleSlider: this.double, initialLowValue: this.value ? this.value.inf : 0, initialValue: this.value ? this.value.sup : 0, minimum: this.min ? this.min : null, maximum: this.max ? this.max : null, onDoubleSliderChanged: (ev) => this.onSliderChange(ev), onSingleSliderChanged: (ev) => this.onSingleSliderChange(ev) }))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-range"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "double": {
            "type": Boolean,
            "attr": "double"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "min": {
            "type": Number,
            "attr": "min"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "state": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "iconClicked",
            "method": "iconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .inputs-container {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 0 0.3rem; }\n  :host .inputs-container .separator {\n    margin: 0 0.875rem;\n    width: 0.75rem;\n    height: 0.125rem;\n    border-radius: 1px;\n    background: var(--stable, #adadad); }\n  :host .inputs-container .input {\n    height: 2.5rem;\n    border-radius: 5px;\n    border: 1px solid var(--stable, #adadad);\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    padding-left: 1rem; }\n    :host .inputs-container .input.single {\n      width: 100%; }\n    :host .inputs-container .input input[type=number] {\n      -webkit-appearance: none;\n      background: transparent;\n      font-size: 0.875rem;\n      width: 100%;\n      outline: none;\n      border-color: transparent; }\n    :host .inputs-container .input input[type=number]::-webkit-inner-spin-button,\n    :host .inputs-container .input input[type=number]::-webkit-outer-spin-button {\n      -webkit-appearance: none; }\n    :host .inputs-container .input input[type=number] {\n      -moz-appearance: textfield; }\n\n:host .slider-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host .slider-container yoo-form-slider {\n    width: 100%; }\n    :host .slider-container yoo-form-slider /deep/ .wrapper {\n      width: 100%; }\n      :host .slider-container yoo-form-slider /deep/ .wrapper .outer-container {\n        width: 100%; }\n        :host .slider-container yoo-form-slider /deep/ .wrapper .outer-container .slider-container {\n          width: 100%; }\n          :host .slider-container yoo-form-slider /deep/ .wrapper .outer-container .slider-container .range-container {\n            width: 100%; }\n            :host .slider-container yoo-form-slider /deep/ .wrapper .outer-container .slider-container .range-container input {\n              width: 100% !important; }"; }
}

class YooFormRecapStepComponent {
    constructor() {
        this.translate = window.translateService;
    }
    render() {
        return (h("div", { class: 'container ' + (this.validity === true ? 'valid' : (this.validity === false ? 'invalid' : '')) },
            h("div", { class: "step" }, this.translate.get('STEP') + ' ' + this.stepNumber),
            h("div", { class: "title" }, this.translate.get(this.mainTitle)),
            h("div", { class: "subtitle" }, this.translate.get(this.subTitle))));
    }
    static get is() { return "yoo-form-recap-step"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "mainTitle": {
            "type": String,
            "attr": "main-title"
        },
        "stepNumber": {
            "type": Number,
            "attr": "step-number"
        },
        "subTitle": {
            "type": String,
            "attr": "sub-title"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity"
        }
    }; }
    static get style() { return ":host .container {\n  margin: 15px;\n  padding: 20px;\n  border-radius: 6px;\n  background-color: var(--light, #FFFFFF);\n  -webkit-box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n  box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n  text-align: left; }\n  :host .container.valid {\n    background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n    color: var(--light, #FFFFFF); }\n    :host .container.valid .step,\n    :host .container.valid .title,\n    :host .container.valid .subtitle {\n      color: var(--light, #FFFFFF); }\n  :host .container.invalid {\n    background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n    color: var(--light, #FFFFFF); }\n    :host .container.invalid .step,\n    :host .container.invalid .title,\n    :host .container.invalid .subtitle {\n      color: var(--light, #FFFFFF); }\n  :host .container .step {\n    font-size: 9px;\n    color: var(--success, #2EDBB7);\n    line-height: 1.31;\n    letter-spacing: 1px; }\n  :host .container .title {\n    font-size: 15px;\n    font-weight: bold; }\n  :host .container .subtitle {\n    font-size: 11px;\n    color: var(--text-color, #807f83); }"; }
}

/*!
 * Signature Pad v2.3.2
 * https://github.com/szimek/signature_pad
 *
 * Copyright 2017 Szymon Nowak
 * Released under the MIT license
 *
 * The main idea and some parts of the code (e.g. drawing variable width Bézier curve) are taken from:
 * http://corner.squareup.com/2012/07/smoother-signatures.html
 *
 * Implementation of interpolation using cubic Bézier curves is taken from:
 * http://benknowscode.wordpress.com/2012/09/14/path-interpolation-using-cubic-bezier-and-control-point-estimation-in-javascript
 *
 * Algorithm for approximated length of a Bézier curve is taken from:
 * http://www.lemoda.net/maths/bezier-length/index.html
 *
 */

function Point(x, y, time) {
  this.x = x;
  this.y = y;
  this.time = time || new Date().getTime();
}

Point.prototype.velocityFrom = function (start) {
  return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 1;
};

Point.prototype.distanceTo = function (start) {
  return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
};

Point.prototype.equals = function (other) {
  return this.x === other.x && this.y === other.y && this.time === other.time;
};

function Bezier(startPoint, control1, control2, endPoint) {
  this.startPoint = startPoint;
  this.control1 = control1;
  this.control2 = control2;
  this.endPoint = endPoint;
}

// Returns approximated length.
Bezier.prototype.length = function () {
  var steps = 10;
  var length = 0;
  var px = void 0;
  var py = void 0;

  for (var i = 0; i <= steps; i += 1) {
    var t = i / steps;
    var cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
    var cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
    if (i > 0) {
      var xdiff = cx - px;
      var ydiff = cy - py;
      length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
    }
    px = cx;
    py = cy;
  }

  return length;
};

/* eslint-disable no-multi-spaces, space-in-parens */
Bezier.prototype._point = function (t, start, c1, c2, end) {
  return start * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t + 3.0 * c2 * (1.0 - t) * t * t + end * t * t * t;
};

/* eslint-disable */

// http://stackoverflow.com/a/27078401/815507
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

function SignaturePad(canvas, options) {
  var self = this;
  var opts = options || {};

  this.velocityFilterWeight = opts.velocityFilterWeight || 0.7;
  this.minWidth = opts.minWidth || 0.5;
  this.maxWidth = opts.maxWidth || 2.5;
  this.throttle = 'throttle' in opts ? opts.throttle : 16; // in miliseconds
  this.minDistance = 'minDistance' in opts ? opts.minDistance : 5;

  if (this.throttle) {
    this._strokeMoveUpdate = throttle(SignaturePad.prototype._strokeUpdate, this.throttle);
  } else {
    this._strokeMoveUpdate = SignaturePad.prototype._strokeUpdate;
  }

  this.dotSize = opts.dotSize || function () {
    return (this.minWidth + this.maxWidth) / 2;
  };
  this.penColor = opts.penColor || 'black';
  this.backgroundColor = opts.backgroundColor || 'rgba(0,0,0,0)';
  this.onBegin = opts.onBegin;
  this.onEnd = opts.onEnd;

  this._canvas = canvas;
  this._ctx = canvas.getContext('2d');
  this.clear();

  // We need add these inline so they are available to unbind while still having
  // access to 'self' we could use _.bind but it's not worth adding a dependency.
  this._handleMouseDown = function (event) {
    if (event.which === 1) {
      self._mouseButtonDown = true;
      self._strokeBegin(event);
    }
  };

  this._handleMouseMove = function (event) {
    if (self._mouseButtonDown) {
      self._strokeMoveUpdate(event);
    }
  };

  this._handleMouseUp = function (event) {
    if (event.which === 1 && self._mouseButtonDown) {
      self._mouseButtonDown = false;
      self._strokeEnd(event);
    }
  };

  this._handleTouchStart = function (event) {
    if (event.targetTouches.length === 1) {
      var touch = event.changedTouches[0];
      self._strokeBegin(touch);
    }
  };

  this._handleTouchMove = function (event) {
    // Prevent scrolling.
    event.preventDefault();

    var touch = event.targetTouches[0];
    self._strokeMoveUpdate(touch);
  };

  this._handleTouchEnd = function (event) {
    var wasCanvasTouched = event.target === self._canvas;
    if (wasCanvasTouched) {
      event.preventDefault();
      self._strokeEnd(event);
    }
  };

  // Enable mouse and touch event handlers
  this.on();
}

// Public methods
SignaturePad.prototype.clear = function () {
  var ctx = this._ctx;
  var canvas = this._canvas;

  ctx.fillStyle = this.backgroundColor;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  this._data = [];
  this._reset();
  this._isEmpty = true;
};

SignaturePad.prototype.fromDataURL = function (dataUrl) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var image = new Image();
  var ratio = options.ratio || window.devicePixelRatio || 1;
  var width = options.width || this._canvas.width / ratio;
  var height = options.height || this._canvas.height / ratio;

  this._reset();
  image.src = dataUrl;
  image.onload = function () {
    _this._ctx.drawImage(image, 0, 0, width, height);
  };
  this._isEmpty = false;
};

SignaturePad.prototype.toDataURL = function (type) {
  var _canvas;

  switch (type) {
    case 'image/svg+xml':
      return this._toSVG();
    default:
      for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        options[_key - 1] = arguments[_key];
      }

      return (_canvas = this._canvas).toDataURL.apply(_canvas, [type].concat(options));
  }
};

SignaturePad.prototype.on = function () {
  this._handleMouseEvents();
  this._handleTouchEvents();
};

SignaturePad.prototype.off = function () {
  this._canvas.removeEventListener('mousedown', this._handleMouseDown);
  this._canvas.removeEventListener('mousemove', this._handleMouseMove);
  document.removeEventListener('mouseup', this._handleMouseUp);

  this._canvas.removeEventListener('touchstart', this._handleTouchStart);
  this._canvas.removeEventListener('touchmove', this._handleTouchMove);
  this._canvas.removeEventListener('touchend', this._handleTouchEnd);
};

SignaturePad.prototype.isEmpty = function () {
  return this._isEmpty;
};

// Private methods
SignaturePad.prototype._strokeBegin = function (event) {
  this._data.push([]);
  this._reset();
  this._strokeUpdate(event);

  if (typeof this.onBegin === 'function') {
    this.onBegin(event);
  }
};

SignaturePad.prototype._strokeUpdate = function (event) {
  var x = event.clientX;
  var y = event.clientY;

  var point = this._createPoint(x, y);
  var lastPointGroup = this._data[this._data.length - 1];
  var lastPoint = lastPointGroup && lastPointGroup[lastPointGroup.length - 1];
  var isLastPointTooClose = lastPoint && point.distanceTo(lastPoint) < this.minDistance;

  // Skip this point if it's too close to the previous one
  if (!(lastPoint && isLastPointTooClose)) {
    var _addPoint = this._addPoint(point),
        curve = _addPoint.curve,
        widths = _addPoint.widths;

    if (curve && widths) {
      this._drawCurve(curve, widths.start, widths.end);
    }

    this._data[this._data.length - 1].push({
      x: point.x,
      y: point.y,
      time: point.time,
      color: this.penColor
    });
  }
};

SignaturePad.prototype._strokeEnd = function (event) {
  var canDrawCurve = this.points.length > 2;
  var point = this.points[0]; // Point instance

  if (!canDrawCurve && point) {
    this._drawDot(point);
  }

  if (point) {
    var lastPointGroup = this._data[this._data.length - 1];
    var lastPoint = lastPointGroup[lastPointGroup.length - 1]; // plain object

    // When drawing a dot, there's only one point in a group, so without this check
    // such group would end up with exactly the same 2 points.
    if (!point.equals(lastPoint)) {
      lastPointGroup.push({
        x: point.x,
        y: point.y,
        time: point.time,
        color: this.penColor
      });
    }
  }

  if (typeof this.onEnd === 'function') {
    this.onEnd(event);
  }
};

SignaturePad.prototype._handleMouseEvents = function () {
  this._mouseButtonDown = false;

  this._canvas.addEventListener('mousedown', this._handleMouseDown);
  this._canvas.addEventListener('mousemove', this._handleMouseMove);
  document.addEventListener('mouseup', this._handleMouseUp);
};

SignaturePad.prototype._handleTouchEvents = function () {
  // Pass touch events to canvas element on mobile IE11 and Edge.
  this._canvas.style.msTouchAction = 'none';
  this._canvas.style.touchAction = 'none';

  this._canvas.addEventListener('touchstart', this._handleTouchStart);
  this._canvas.addEventListener('touchmove', this._handleTouchMove);
  this._canvas.addEventListener('touchend', this._handleTouchEnd);
};

SignaturePad.prototype._reset = function () {
  this.points = [];
  this._lastVelocity = 0;
  this._lastWidth = (this.minWidth + this.maxWidth) / 2;
  this._ctx.fillStyle = this.penColor;
};

SignaturePad.prototype._createPoint = function (x, y, time) {
  var rect = this._canvas.getBoundingClientRect();

  return new Point(x - rect.left, y - rect.top, time || new Date().getTime());
};

SignaturePad.prototype._addPoint = function (point) {
  var points = this.points;
  var tmp = void 0;

  points.push(point);

  if (points.length > 2) {
    // To reduce the initial lag make it work with 3 points
    // by copying the first point to the beginning.
    if (points.length === 3) points.unshift(points[0]);

    tmp = this._calculateCurveControlPoints(points[0], points[1], points[2]);
    var c2 = tmp.c2;
    tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);
    var c3 = tmp.c1;
    var curve = new Bezier(points[1], c2, c3, points[2]);
    var widths = this._calculateCurveWidths(curve);

    // Remove the first element from the list,
    // so that we always have no more than 4 points in points array.
    points.shift();

    return { curve: curve, widths: widths };
  }

  return {};
};

SignaturePad.prototype._calculateCurveControlPoints = function (s1, s2, s3) {
  var dx1 = s1.x - s2.x;
  var dy1 = s1.y - s2.y;
  var dx2 = s2.x - s3.x;
  var dy2 = s2.y - s3.y;

  var m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
  var m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };

  var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

  var dxm = m1.x - m2.x;
  var dym = m1.y - m2.y;

  var k = l2 / (l1 + l2);
  var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };

  var tx = s2.x - cm.x;
  var ty = s2.y - cm.y;

  return {
    c1: new Point(m1.x + tx, m1.y + ty),
    c2: new Point(m2.x + tx, m2.y + ty)
  };
};

SignaturePad.prototype._calculateCurveWidths = function (curve) {
  var startPoint = curve.startPoint;
  var endPoint = curve.endPoint;
  var widths = { start: null, end: null };

  var velocity = this.velocityFilterWeight * endPoint.velocityFrom(startPoint) + (1 - this.velocityFilterWeight) * this._lastVelocity;

  var newWidth = this._strokeWidth(velocity);

  widths.start = this._lastWidth;
  widths.end = newWidth;

  this._lastVelocity = velocity;
  this._lastWidth = newWidth;

  return widths;
};

SignaturePad.prototype._strokeWidth = function (velocity) {
  return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
};

SignaturePad.prototype._drawPoint = function (x, y, size) {
  var ctx = this._ctx;

  ctx.moveTo(x, y);
  ctx.arc(x, y, size, 0, 2 * Math.PI, false);
  this._isEmpty = false;
};

SignaturePad.prototype._drawCurve = function (curve, startWidth, endWidth) {
  var ctx = this._ctx;
  var widthDelta = endWidth - startWidth;
  var drawSteps = Math.floor(curve.length());

  ctx.beginPath();

  for (var i = 0; i < drawSteps; i += 1) {
    // Calculate the Bezier (x, y) coordinate for this step.
    var t = i / drawSteps;
    var tt = t * t;
    var ttt = tt * t;
    var u = 1 - t;
    var uu = u * u;
    var uuu = uu * u;

    var x = uuu * curve.startPoint.x;
    x += 3 * uu * t * curve.control1.x;
    x += 3 * u * tt * curve.control2.x;
    x += ttt * curve.endPoint.x;

    var y = uuu * curve.startPoint.y;
    y += 3 * uu * t * curve.control1.y;
    y += 3 * u * tt * curve.control2.y;
    y += ttt * curve.endPoint.y;

    var width = startWidth + ttt * widthDelta;
    this._drawPoint(x, y, width);
  }

  ctx.closePath();
  ctx.fill();
};

SignaturePad.prototype._drawDot = function (point) {
  var ctx = this._ctx;
  var width = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;

  ctx.beginPath();
  this._drawPoint(point.x, point.y, width);
  ctx.closePath();
  ctx.fill();
};

SignaturePad.prototype._fromData = function (pointGroups, drawCurve, drawDot) {
  for (var i = 0; i < pointGroups.length; i += 1) {
    var group = pointGroups[i];

    if (group.length > 1) {
      for (var j = 0; j < group.length; j += 1) {
        var rawPoint = group[j];
        var point = new Point(rawPoint.x, rawPoint.y, rawPoint.time);
        var color = rawPoint.color;

        if (j === 0) {
          // First point in a group. Nothing to draw yet.

          // All points in the group have the same color, so it's enough to set
          // penColor just at the beginning.
          this.penColor = color;
          this._reset();

          this._addPoint(point);
        } else if (j !== group.length - 1) {
          // Middle point in a group.
          var _addPoint2 = this._addPoint(point),
              curve = _addPoint2.curve,
              widths = _addPoint2.widths;

          if (curve && widths) {
            drawCurve(curve, widths, color);
          }
        }
      }
    } else {
      this._reset();
      var _rawPoint = group[0];
      drawDot(_rawPoint);
    }
  }
};

SignaturePad.prototype._toSVG = function () {
  var _this2 = this;

  var pointGroups = this._data;
  var canvas = this._canvas;
  var ratio = Math.max(window.devicePixelRatio || 1, 1);
  var minX = 0;
  var minY = 0;
  var maxX = canvas.width / ratio;
  var maxY = canvas.height / ratio;
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttributeNS(null, 'width', canvas.width);
  svg.setAttributeNS(null, 'height', canvas.height);

  this._fromData(pointGroups, function (curve, widths, color) {
    var path = document.createElement('path');

    // Need to check curve for NaN values, these pop up when drawing
    // lines on the canvas that are not continuous. E.g. Sharp corners
    // or stopping mid-stroke and than continuing without lifting mouse.
    if (!isNaN(curve.control1.x) && !isNaN(curve.control1.y) && !isNaN(curve.control2.x) && !isNaN(curve.control2.y)) {
      var attr = 'M ' + curve.startPoint.x.toFixed(3) + ',' + curve.startPoint.y.toFixed(3) + ' ' + ('C ' + curve.control1.x.toFixed(3) + ',' + curve.control1.y.toFixed(3) + ' ') + (curve.control2.x.toFixed(3) + ',' + curve.control2.y.toFixed(3) + ' ') + (curve.endPoint.x.toFixed(3) + ',' + curve.endPoint.y.toFixed(3));

      path.setAttribute('d', attr);
      path.setAttribute('stroke-width', (widths.end * 2.25).toFixed(3));
      path.setAttribute('stroke', color);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');

      svg.appendChild(path);
    }
  }, function (rawPoint) {
    var circle = document.createElement('circle');
    var dotSize = typeof _this2.dotSize === 'function' ? _this2.dotSize() : _this2.dotSize;
    circle.setAttribute('r', dotSize);
    circle.setAttribute('cx', rawPoint.x);
    circle.setAttribute('cy', rawPoint.y);
    circle.setAttribute('fill', rawPoint.color);

    svg.appendChild(circle);
  });

  var prefix = 'data:image/svg+xml;base64,';
  var header = '<svg' + ' xmlns="http://www.w3.org/2000/svg"' + ' xmlns:xlink="http://www.w3.org/1999/xlink"' + (' viewBox="' + minX + ' ' + minY + ' ' + maxX + ' ' + maxY + '"') + (' width="' + maxX + '"') + (' height="' + maxY + '"') + '>';
  var body = svg.innerHTML;

  // IE hack for missing innerHTML property on SVGElement
  if (body === undefined) {
    var dummy = document.createElement('dummy');
    var nodes = svg.childNodes;
    dummy.innerHTML = '';

    for (var i = 0; i < nodes.length; i += 1) {
      dummy.appendChild(nodes[i].cloneNode(true));
    }

    body = dummy.innerHTML;
  }

  var footer = '</svg>';
  var data = header + body + footer;

  return prefix + btoa(data);
};

SignaturePad.prototype.fromData = function (pointGroups) {
  var _this3 = this;

  this.clear();

  this._fromData(pointGroups, function (curve, widths) {
    return _this3._drawCurve(curve, widths.start, widths.end);
  }, function (rawPoint) {
    return _this3._drawDot(rawPoint);
  });

  this._data = pointGroups;
};

SignaturePad.prototype.toData = function () {
  return this._data;
};

var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class YooFormSignaturePadComponent {
    constructor() {
        this.validators = [];
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter$3(this, void 0, void 0, function* () { return true; });
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }
    componentDidLoad() {
        if (!this.readonly) {
            this.canvasSetup();
        }
    }
    canvasSetup() {
        let canvas = this.host.querySelector('canvas');
        let ratio = 1; //Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = this.host.querySelector('.container').clientWidth;
        canvas.height = this.host.querySelector('.container').clientHeight;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad = new SignaturePad(canvas, { backgroundColor: '#ffffff', penColor: '#000000', onEnd: () => this.onSave() });
        if (this.value) {
            let image = new Image();
            image.onload = function () {
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            image.src = this.value;
        }
    }
    onClear() {
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
        setValueAndValidateInput(null, this);
    }
    onSave() {
        let data;
        if (!this.signaturePad || this.signaturePad.isEmpty()) {
            data = null;
        }
        else {
            data = this.signaturePad.toDataURL();
        }
        setValueAndValidateInput(data, this);
    }
    renderEditable() {
        return [
            h("div", { class: "container" },
                h("canvas", { class: "swiper-no-swiping" })),
            h("div", { class: "link", onClick: this.onClear.bind(this) }, "Clear")
        ];
    }
    renderReadonly() {
        return this.value ? h("div", { class: "image", style: getBackImageStyle(cloudinary(this.value, 500, 500)) }) : null;
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-signature-pad"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  display: block; }\n  :host .container {\n    width: 100%;\n    height: 200px;\n    border: 1px solid var(--stable-30, rgba(173, 173, 173, 0.3)); }\n    :host .container canvas {\n      width: 100%;\n      height: 100%; }\n  :host .link {\n    color: var(--text-color, #807f83);\n    font-size: 0.8rem;\n    padding-top: 0.5rem; }\n  :host .image {\n    height: 200px; }"; }
}

const inlineClass = 'inline';
class YooFormSliderComponent {
    constructor() {
        this.disabled = false;
        this.hideLabel = false;
        this.hideReferences = false;
        this.doubleSlider = false;
        this.triangleColor = 'light';
    }
    componentWillLoad() {
        this.value = this.initialValue;
        this.secondValue = this.initialLowValue || this.minimum;
        if (!isNumber(this.minimum)) {
            this.minimum = 0;
        }
        if (!isNumber(this.maximum)) {
            this.maximum = 100;
        }
    }
    componentDidLoad() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }
    componentWillUpdate() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }
    initialValueChanged(newValue) {
        if (newValue > this.maximum || newValue < this.minimum) {
            this.value = this.minimum;
        }
        else {
            this.value = this.initialValue;
        }
    }
    initialLowValueChanged(newValue) {
        if (newValue > this.maximum || newValue < this.minimum) {
            this.initialLowValue = this.minimum;
        }
        else {
            this.secondValue = this.initialLowValue;
        }
    }
    getProgress() {
        return 100 * (this.value - this.minimum) / (this.maximum - this.minimum);
    }
    onChange(event) {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.value = this.minimum;
        }
        else {
            this.value = event.target.value;
        }
        this.handleEvent();
    }
    onChangeSecond(event) {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.secondValue = this.minimum;
        }
        else {
            this.secondValue = event.target.value;
        }
        this.handleEvent();
    }
    handleEvent() {
        if (this.doubleSlider) {
            let lowValue = Math.min(this.value, this.secondValue);
            let highValue = Math.max(this.value, this.secondValue);
            this.doubleSliderChanged.emit({ lowValue: lowValue, highValue: highValue });
        }
        else {
            this.singleSliderChanged.emit(this.value);
        }
    }
    setDoubleProgressStyle() {
        let width = 100 * Math.abs(this.value - this.secondValue) / (this.maximum - this.minimum);
        let translate = 0;
        if (width !== 0) {
            translate = 100 * (Math.min(this.value, this.secondValue) - this.minimum) / width;
        }
        let bar = this.host.querySelector('div.progress-container');
        if (bar) {
            bar.setAttribute('style', 'width: ' + width + '%; ' + 'transform: translateX(' + translate + '%)');
        }
        // reverse label if inline double
        if (this.host.className.indexOf(inlineClass) !== -1) {
            let sliderContainer = this.host.querySelector('div.slider-container');
            if (sliderContainer) {
                sliderContainer.setAttribute('style', 'flex-direction: row');
            }
        }
    }
    render() {
        return (h("div", { class: "wrapper" },
            this.host.classList.contains('triangle') ? h("yoo-progress-bar", { class: this.host.className, "hide-progress": true, "triangle-background-color": this.triangleColor }) : null,
            h("div", { class: 'outer-container' + ((this.disabled) ? ' disabled' : ''), "attr-layout": "flex" },
                !this.hideReferences ?
                    h("label", null, this.minimum)
                    : null,
                h("div", { class: "slider-container", "attr-layout": "column" },
                    h("div", { class: 'label-value' + ((this.hideLabel) ? ' label-hidden' : '') }, this.disabled ?
                        h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event), disabled: true })
                        :
                            (this.doubleSlider ?
                                [h("input", { type: "number", value: this.secondValue, onChange: (event) => this.onChangeSecond(event) }),
                                    (this.host.className.indexOf(inlineClass) === -1 ?
                                        h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) })
                                        : null)]
                                :
                                    h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) }))),
                    h("div", { class: "range-container", "attr-layout": "row" },
                        this.disabled ?
                            h("input", { class: "swiper-no-swiping", type: "range", min: this.minimum, max: this.maximum, value: this.value, onInput: (event) => this.onChange(event), disabled: true })
                            :
                                [h("input", { class: "swiper-no-swiping", type: "range", min: this.minimum, max: this.maximum, value: this.value, onInput: (event) => this.onChange(event) }),
                                    (this.doubleSlider ?
                                        h("input", { class: "second-slider swiper-no-swiping", type: "range", min: this.minimum, max: this.maximum, value: this.secondValue, onInput: (event) => this.onChangeSecond(event) })
                                        : null)],
                        this.host.classList.contains('triangle') ? null : (this.doubleSlider ?
                            h("yoo-progress-bar", { class: this.host.className, "hide-progress": true })
                            :
                                h("yoo-progress-bar", { class: this.host.className, progress: this.getProgress(), "hide-progress": true }))),
                    this.doubleSlider && this.host.className.indexOf(inlineClass) !== -1 ?
                        h("div", { class: 'label-value' + ((this.hideLabel) ? ' label-hidden' : '') }, this.disabled ?
                            h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event), disabled: true })
                            :
                                h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) }))
                        : null),
                !this.hideReferences ?
                    h("label", null, this.maximum)
                    : null)));
    }
    static get is() { return "yoo-form-slider"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "doubleSlider": {
            "type": Boolean,
            "attr": "double-slider"
        },
        "hideLabel": {
            "type": Boolean,
            "attr": "hide-label"
        },
        "hideReferences": {
            "type": Boolean,
            "attr": "hide-references"
        },
        "host": {
            "elementRef": true
        },
        "initialLowValue": {
            "type": Number,
            "attr": "initial-low-value",
            "watchCallbacks": ["initialLowValueChanged"]
        },
        "initialValue": {
            "type": Number,
            "attr": "initial-value",
            "watchCallbacks": ["initialValueChanged"]
        },
        "maximum": {
            "type": Number,
            "attr": "maximum"
        },
        "minimum": {
            "type": Number,
            "attr": "minimum"
        },
        "secondValue": {
            "state": true
        },
        "triangleColor": {
            "type": String,
            "attr": "triangle-color"
        },
        "value": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "singleSliderChanged",
            "method": "singleSliderChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "doubleSliderChanged",
            "method": "doubleSliderChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  display: inline-block; }\n  :host .outer-container {\n    height: 3rem; }\n    :host .outer-container label {\n      text-align: center;\n      vertical-align: bottom;\n      padding-top: 1.7rem;\n      font-size: 0.7rem;\n      color: var(--dark-20, #dadada); }\n    :host .outer-container .slider-container {\n      padding-right: 0.3rem; }\n      :host .outer-container .slider-container .range-container {\n        position: relative;\n        width: 10rem;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        padding-top: 0.5rem; }\n        :host .outer-container .slider-container .range-container /deep/ yoo-progress-bar {\n          padding-top: 0.2rem;\n          position: absolute;\n          padding-left: 0.5rem;\n          z-index: -400; }\n        :host .outer-container .slider-container .range-container input[type=range] {\n          pointer-events: none;\n          position: absolute;\n          -webkit-appearance: none;\n          position: absolute;\n          width: 10.8rem;\n          background: transparent; }\n          :host .outer-container .slider-container .range-container input[type=range]:focus {\n            outline-width: 0rem; }\n        :host .outer-container .slider-container .range-container input[type=range]::-webkit-slider-runnable-track {\n          -webkit-appearance: none;\n          width: 10.8rem; }\n        :host .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n          pointer-events: all;\n          -webkit-appearance: none;\n          border-radius: 50%;\n          height: 1.2rem;\n          width: 1.2rem;\n          cursor: pointer;\n          border-width: 1px;\n          border-style: solid;\n          border-color: var(--dark-40, #b4b4b4);\n          background: var(--light, #FFFFFF); }\n        :host .outer-container .slider-container .range-container input[type=range] {\n          -moz-appearance: none; }\n        :host .outer-container .slider-container .range-container input[type=range]::-moz-focus-outer {\n          border: 0; }\n        :host .outer-container .slider-container .range-container input[type=range]::-moz-range-track {\n          -moz-appearance: none;\n          width: 10.8rem;\n          background: transparent; }\n        :host .outer-container .slider-container .range-container input[type=range]::-moz-range-thumb {\n          pointer-events: all;\n          -moz-appearance: none;\n          border-radius: 50%;\n          height: 1.2rem;\n          width: 1.2rem;\n          cursor: pointer;\n          border-width: 1px;\n          border-style: solid;\n          border-color: var(--dark-40, #b4b4b4);\n          background: var(--light, #FFFFFF);\n          transform: translateY(0.3rem);\n          z-index: 400; }\n      :host .outer-container .slider-container .label-value {\n        text-align: center;\n        width: 11rem; }\n        :host .outer-container .slider-container .label-value.label-hidden {\n          opacity: 0 !important; }\n        :host .outer-container .slider-container .label-value input[type=number] {\n          -webkit-appearance: none;\n          background: transparent;\n          font-size: 0.8rem;\n          width: 2rem;\n          outline: none;\n          border-color: transparent;\n          text-align: center; }\n        :host .outer-container .slider-container .label-value input[type=number]::-webkit-inner-spin-button,\n        :host .outer-container .slider-container .label-value input[type=number]::-webkit-outer-spin-button {\n          -webkit-appearance: none; }\n        :host .outer-container .slider-container .label-value input[type=number] {\n          -moz-appearance: textfield; }\n\n:host(.inline) .outer-container {\n  height: 2rem; }\n  :host(.inline) .outer-container label {\n    display: none; }\n  :host(.inline) .outer-container .slider-container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: row-reverse;\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse; }\n    :host(.inline) .outer-container .slider-container .label-value {\n      position: relative;\n      width: 2rem;\n      text-align: center;\n      height: 1.5rem;\n      margin-left: 1.3rem;\n      border-radius: 4px;\n      color: var(--light, #FFFFFF); }\n      :host(.inline) .outer-container .slider-container .label-value input[type=number] {\n        color: var(--light, #FFFFFF); }\n\n:host(.simple) .outer-container label {\n  display: none; }\n\n:host(.simple) .outer-container .slider-container .label-value {\n  display: none; }\n\n:host(.vertical) .outer-container {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%; }\n  :host(.vertical) .outer-container label {\n    padding: 0; }\n  :host(.vertical) .outer-container .slider-container {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: row-reverse;\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host(.vertical) .outer-container .slider-container .label-value {\n      width: 100%; }\n    :host(.vertical) .outer-container .slider-container .range-container {\n      display: inline-block;\n      width: 20px;\n      height: 15rem;\n      padding: 0; }\n      :host(.vertical) .outer-container .slider-container .range-container input,\n      :host(.vertical) .outer-container .slider-container .range-container yoo-progress-bar {\n        width: 15rem;\n        height: 20px;\n        margin: 0;\n        -webkit-transform-origin: 7.5rem 7.5rem;\n                transform-origin: 7.5rem 7.5rem;\n        -webkit-transform: rotate(-90deg);\n                transform: rotate(-90deg); }\n      :host(.vertical) .outer-container .slider-container .range-container yoo-progress-bar {\n        margin-left: 0.325rem; }\n\n:host(.triangle) .wrapper {\n  position: relative; }\n  :host(.triangle) .wrapper yoo-progress-bar {\n    position: absolute;\n    bottom: 5%;\n    left: 0;\n    z-index: -1000; }\n  :host(.triangle) .wrapper .outer-container {\n    width: 17rem; }\n    :host(.triangle) .wrapper .outer-container .slider-container {\n      width: 100%; }\n      :host(.triangle) .wrapper .outer-container .slider-container .label-value {\n        width: 100%; }\n      :host(.triangle) .wrapper .outer-container .slider-container .range-container {\n        width: 100%;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center; }\n        :host(.triangle) .wrapper .outer-container .slider-container .range-container input[type='range']::-webkit-slider-thumb {\n          height: 1.4375rem;\n          width: 1.4375rem;\n          border: none;\n          -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);\n          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5); }\n        :host(.triangle) .wrapper .outer-container .slider-container .range-container input[type='range'] {\n          width: 15rem; }\n\n:host(.t-vertical) .wrapper yoo-progress-bar {\n  top: 10%;\n  left: 3.5%;\n  -webkit-transform-origin: 7.5rem 7.5rem;\n          transform-origin: 7.5rem 7.5rem;\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg); }\n\n:host(.t-vertical) .wrapper .outer-container {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  height: 17.5rem;\n  width: 4rem; }\n  :host(.t-vertical) .wrapper .outer-container label {\n    padding: 0;\n    padding-left: 0.5rem; }\n  :host(.t-vertical) .wrapper .outer-container .slider-container {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: row-reverse;\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse;\n    height: 100%;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n    :host(.t-vertical) .wrapper .outer-container .slider-container .label-value {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center; }\n    :host(.t-vertical) .wrapper .outer-container .slider-container .range-container {\n      display: inline-block;\n      padding-bottom: 0.625rem;\n      padding-top: 0; }\n      :host(.t-vertical) .wrapper .outer-container .slider-container .range-container input {\n        -webkit-transform-origin: 7.5rem 7.5rem;\n                transform-origin: 7.5rem 7.5rem;\n        -webkit-transform: rotate(-90deg);\n                transform: rotate(-90deg); }\n\n:host(.accent) .outer-container .label-value {\n  background: var(--accent, #1FB6FF); }\n\n:host(.accent) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.accent) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.dark) .outer-container .label-value {\n  background: var(--dark-40, #b4b4b4); }\n\n:host(.dark) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.dark) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.danger) .outer-container .label-value {\n  background: var(--danger, #ff625f); }\n\n:host(.danger) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.danger) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.success) .outer-container .label-value {\n  background: var(--success, #2EDBB7); }\n\n:host(.success) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.success) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.info) .outer-container .label-value {\n  background: var(--info, #fc459e); }\n\n:host(.info) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.info) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.warning) .outer-container .label-value {\n  background: var(--warning, #ff6402); }\n\n:host(.warning) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.warning) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.gradient-accent) .outer-container .label-value {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n:host(.gradient-accent) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--accent, #1FB6FF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-accent) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--accent, #1FB6FF) !important; }\n\n:host(.gradient-dark) .outer-container .label-value {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n:host(.gradient-dark) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-dark) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.gradient-danger) .outer-container .label-value {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n:host(.gradient-danger) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--danger, #ff625f) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-danger) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--danger, #ff625f) !important; }\n\n:host(.gradient-success) .outer-container .label-value {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n:host(.gradient-success) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--success, #2EDBB7) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-success) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--gradient-success-end, #00ff78) !important; }\n\n:host(.gradient-warning) .outer-container .label-value {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n:host(.gradient-warning) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--warning, #ff6402) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-warning) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--warning, #ff6402) !important; }\n\n:host(.gradient-info) .outer-container .label-value {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n:host(.gradient-info) .outer-container .slider-container .range-container input[type=range]::-webkit-slider-thumb {\n  background: var(--info, #fc459e) !important;\n  border: none;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-info) .outer-container .slider-container .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--info, #fc459e) !important; }"; }
}

var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class YooFormStarRatingComponent {
    constructor() {
        this.stars = 5;
        this.validators = [];
        this.type = 'star';
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter$4(this, void 0, void 0, function* () { return true; });
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
        if (this.type === 'button') {
            this.host.classList.add('button');
        }
    }
    getArray() {
        return new Array(this.stars).fill(0);
    }
    onStarClick(index) {
        if (this.value !== index + 1) {
            this.value = index + 1;
            setValueAndValidateInput(this.value, this);
        }
        else if (this.value === 1 && index === 0) {
            this.value = 0;
            setValueAndValidateInput(this.value, this);
        }
    }
    renderReadonly() {
        return (h("div", { class: "star-rating-container readonly", "attr-layout": "row" }, this.getArray().map((elem, index) => h("div", { class: "star-container" },
            h("i", { class: this.value > index ? 'yo-star-solid solid' : 'yo-star border' })))));
    }
    renderEditable() {
        return (h("div", { class: "star-rating-container", "attr-layout": "row" }, this.getArray().map((elem, index) => h("div", { class: "star-container" }, this.type === 'star' ?
            h("i", { class: this.value > index ? 'yo-star-solid solid' : 'yo-star border', onClick: () => this.onStarClick(index) })
            : this.type === 'button' ?
                h("div", { class: 'button ' + (this.value > index ? 'solid' : 'brder'), onClick: () => this.onStarClick(index) },
                    h("span", { class: "number" }, index + 1))
                : null))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-star-rating"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "stars": {
            "type": Number,
            "attr": "stars"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": Number,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .star-rating-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  :host .star-rating-container .star-container {\n    padding: 0.4rem;\n    color: var(--dark, #444); }\n    :host .star-rating-container .star-container i.solid {\n      color: var(--success, #2EDBB7); }\n    :host .star-rating-container .star-container i.border:hover {\n      color: var(--success, #2EDBB7); }\n  :host .star-rating-container.readonly .star-container i.border:hover {\n    color: unset; }\n\n:host(.button) .star-rating-container .star-container {\n  padding: 0rem;\n  margin: 0 0.1rem;\n  font-weight: 300;\n  font-size: 1rem; }\n  :host(.button) .star-rating-container .star-container .button {\n    padding: 0.2rem 0.4rem;\n    background: var(--light, #FFFFFF);\n    color: var(--dark, #444);\n    border: 1px solid var(--stable, #adadad); }\n    :host(.button) .star-rating-container .star-container .button.solid {\n      background: var(--success, #2EDBB7);\n      color: var(--light, #FFFFFF);\n      border: 1px solid var(--success-120, #1fb596); }\n\n:host(.accent) .star-rating-container .star-container i.solid {\n  color: var(--accent, #1FB6FF); }\n\n:host(.accent) .star-rating-container .star-container i.border:hover {\n  color: var(--accent, #1FB6FF); }\n\n:host(.accent).button .star-rating-container .star-container .button.solid {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF);\n  border: 1px solid var(--accent-120, #009ae5); }\n\n:host(.success) .star-rating-container .star-container i.solid {\n  color: var(--success, #2EDBB7); }\n\n:host(.success) .star-rating-container .star-container i.border:hover {\n  color: var(--success, #2EDBB7); }\n\n:host(.success).button .star-rating-container .star-container .button.solid {\n  background: var(--success, #2EDBB7);\n  color: var(--light, #FFFFFF);\n  border: 1px solid var(--success-120, #1fb596); }\n\n:host(.danger) .star-rating-container .star-container i.solid {\n  color: var(--danger, #ff625f); }\n\n:host(.danger) .star-rating-container .star-container i.border:hover {\n  color: var(--danger, #ff625f); }\n\n:host(.danger).button .star-rating-container .star-container .button.solid {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF);\n  border: 1px solid var(--danger-120, #ff1d19); }\n\n:host(.info) .star-rating-container .star-container i.solid {\n  color: var(--info, #fc459e); }\n\n:host(.info) .star-rating-container .star-container i.border:hover {\n  color: var(--info, #fc459e); }\n\n:host(.info).button .star-rating-container .star-container .button.solid {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF);\n  border: 1px solid var(--info-120, #9c2860); }\n\n:host(.dark) .star-rating-container .star-container i.solid {\n  color: var(--dark, #444); }\n\n:host(.dark) .star-rating-container .star-container i.border:hover {\n  color: var(--dark, #444); }\n\n:host(.dark).button .star-rating-container .star-container .button.solid {\n  background: var(--dark, #444);\n  color: var(--light, #FFFFFF);\n  border: 1px solid var(--, ); }"; }
}

var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class YooFormTextAreaComponent {
    constructor() {
        this.validators = [];
        this.resizable = 'both';
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter$5(this, void 0, void 0, function* () { return true; });
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }
    componentDidLoad() {
        if (this.resizable !== 'both') {
            let textArea = this.host.querySelector('textarea');
            textArea.setAttribute('style', `resize: ${this.resizable};`);
        }
    }
    onInputChanged(ev) {
        let value = ev.target.value;
        setValueAndValidateInput(value, this);
    }
    isValid() {
        return this.validity;
    }
    renderEditable() {
        return (h("textarea", { value: this.value, placeholder: this.placeholder, readonly: this.readonly, onBlur: ev => onInputBlurred(ev, this, 'textarea'), onInput: ev => this.onInputChanged(ev), onFocus: ev => onInputFocused(ev, this, 'textarea') }));
    }
    renderReadonly() {
        return h("div", { innerHTML: this.value });
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-text-area"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "resizable": {
            "type": String,
            "attr": "resizable"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "state": true
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host textarea {\n  width: 100%;\n  height: 100%;\n  min-height: 95px;\n  border: solid 0.0625rem var(--stable-30, rgba(173, 173, 173, 0.3));\n  border-radius: 0.3125rem;\n  color: var(--dark, #444);\n  font-size: 1.0625rem;\n  font-weight: normal;\n  padding: 0.5rem 1rem; }\n  :host textarea.invalid {\n    border-color: var(--danger, #ff625f); }\n  :host textarea.valid {\n    border-color: var(--success, #2EDBB7); }\n  :host textarea:focus {\n    outline: none; }"; }
}

var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class YooFormToggleComponent {
    constructor() {
        this.validators = [];
        this.type = 'normal';
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter$6(this, void 0, void 0, function* () { return true; });
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
        if (this.type === 'line') {
            this.host.classList.add('line');
        }
    }
    onToggle() {
        if (!this.readonly) {
            setAnimation(animations.slideHorizontal, this.host.querySelector('.inner-container'), { open: (this.value ? false : true), distance: 14, start: -1 });
            this.value = !this.value;
            setValueAndValidateInput(this.value, this);
        }
    }
    renderReadonly() {
        return (h("div", { class: "readonly", "attr-layout": "row" }, this.value === true ? h("i", { class: "yo-check-solid success" }) : (this.value === false ? h("i", { class: "yo-cross-danger danger" }) : h("i", { class: "yo-circle" }))));
    }
    renderEditable() {
        return (h("div", { class: "outer-container", "attr-layout": "row" },
            h("div", { class: "text-container" },
                h("span", null, this.text)),
            h("div", { class: 'toggle-container' + (this.value ? ' active' : ''), "attr-layout": "row", onClick: () => this.onToggle() },
                h("div", { class: 'inner-container' + (this.value ? ' active' : '') }))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-toggle"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": Boolean,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  width: 100%; }\n  :host .outer-container .text-container {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1; }\n  :host .outer-container .toggle-container {\n    height: 1.3125rem;\n    width: 2.1875rem;\n    border-radius: 0.96875rem;\n    border: solid 1px rgba(0, 0, 0, 0.1);\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .outer-container .toggle-container.active {\n      border-color: var(--success, #2EDBB7);\n      background-color: var(--success, #2EDBB7); }\n    :host .outer-container .toggle-container:hover {\n      cursor: pointer; }\n    :host .outer-container .toggle-container .inner-container {\n      height: 1.25rem;\n      width: 1.25rem;\n      border-radius: 50%;\n      background-color: var(--light, #FFFFFF);\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box;\n      border: solid 0.5px rgba(0, 0, 0, 0.1);\n      -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.05);\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.05);\n      -webkit-transform: translateX(-1px);\n              transform: translateX(-1px); }\n      :host .outer-container .toggle-container .inner-container:hover {\n        cursor: pointer; }\n      :host .outer-container .toggle-container .inner-container.active {\n        border: solid 1px var(--success, #2EDBB7);\n        height: 1.1875rem;\n        width: 1.1875rem;\n        -webkit-transform: translateX(14px);\n                transform: translateX(14px); }\n\n:host(.line) .outer-container .text-container {\n  -webkit-box-ordinal-group: 2;\n  -webkit-order: 1;\n  -ms-flex-order: 1;\n  order: 1;\n  margin-left: 1rem; }\n\n:host(.accent) .outer-container .toggle-container.active {\n  border-color: var(--accent, #1FB6FF);\n  background-color: var(--accent, #1FB6FF); }\n\n:host(.accent) .outer-container .toggle-container .inner-container.active {\n  border-color: var(--accent, #1FB6FF); }\n\n:host(.success) .outer-container .toggle-container.active {\n  border-color: var(--success, #2EDBB7);\n  background-color: var(--success, #2EDBB7); }\n\n:host(.success) .outer-container .toggle-container .inner-container.active {\n  border-color: var(--success, #2EDBB7); }\n\n:host(.danger) .outer-container .toggle-container.active {\n  border-color: var(--danger, #ff625f);\n  background-color: var(--danger, #ff625f); }\n\n:host(.danger) .outer-container .toggle-container .inner-container.active {\n  border-color: var(--danger, #ff625f); }\n\n:host(.info) .outer-container .toggle-container.active {\n  border-color: var(--info, #fc459e);\n  background-color: var(--info, #fc459e); }\n\n:host(.info) .outer-container .toggle-container .inner-container.active {\n  border-color: var(--info, #fc459e); }\n\n:host(.warning) .outer-container .toggle-container.active {\n  border-color: var(--warning, #ff6402);\n  background-color: var(--warning, #ff6402); }\n\n:host(.warning) .outer-container .toggle-container .inner-container.active {\n  border-color: var(--warning, #ff6402); }\n\n:host(.dark) .outer-container .toggle-container.active {\n  border-color: var(--dark, #444);\n  background-color: var(--dark, #444); }\n\n:host(.dark) .outer-container .toggle-container .inner-container.active {\n  border-color: var(--dark, #444); }"; }
}

export { YooFormAutocompleteComponent as YooFormAutocomplete, YooFormButtonChoiceComponent as YooFormButtonChoice, YooFormDynamicComponent as YooFormDynamic, YooFormDynamicModalComponent as YooFormDynamicDialog, YooFormRangeComponent as YooFormRange, YooFormRecapStepComponent as YooFormRecapStep, YooFormSignaturePadComponent as YooFormSignaturePad, YooFormSliderComponent as YooFormSlider, YooFormStarRatingComponent as YooFormStarRating, YooFormTextAreaComponent as YooFormTextArea, YooFormToggleComponent as YooFormToggle };
