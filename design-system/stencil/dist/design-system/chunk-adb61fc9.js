/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as commonjsGlobal, b as commonjsRequire, c as unwrapExports, d as createCommonjsModule } from './chunk-a7525511.js';

var anime_min = createCommonjsModule(function (module) {
/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(e,r,p){if(p.get||p.set)throw new TypeError("ES3 does not support getters and setters.");e!=Array.prototype&&e!=Object.prototype&&(e[r]=p.value);};$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof commonjsGlobal&&null!=commonjsGlobal?commonjsGlobal:e};$jscomp.global=$jscomp.getGlobal(commonjsGlobal);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol);};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var e=$jscomp.global.Symbol.iterator;e||(e=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[e]&&$jscomp.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){};};$jscomp.arrayIterator=function(e){var r=0;return $jscomp.iteratorPrototype(function(){return r<e.length?{done:!1,value:e[r++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(e){$jscomp.initSymbolIterator();e={next:e};e[$jscomp.global.Symbol.iterator]=function(){return this};return e};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(e,r){$jscomp.initSymbolIterator();e instanceof String&&(e+="");var p=0,m={next:function(){if(p<e.length){var u=p++;return{value:r(u,e[u]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
$jscomp.polyfill=function(e,r,p,m){if(r){p=$jscomp.global;e=e.split(".");for(m=0;m<e.length-1;m++){var u=e[m];u in p||(p[u]={});p=p[u];}e=e[e.length-1];m=p[e];r=r(m);r!=m&&null!=r&&$jscomp.defineProperty(p,e,{configurable:!0,writable:!0,value:r});}};$jscomp.polyfill("Array.prototype.keys",function(e){return e?e:function(){return $jscomp.iteratorFromArray(this,function(e){return e})}},"es6-impl","es3");var $jscomp$this=commonjsGlobal;
(function(e,r){"function"===typeof undefined&&undefined.amd?undefined([],r):module.exports?module.exports=r():e.anime=r();})(commonjsGlobal,function(){function e(a){if(!h.col(a))try{return document.querySelectorAll(a)}catch(c){}}function r(a,c){for(var d=a.length,b=2<=arguments.length?arguments[1]:void 0,f=[],n=0;n<d;n++)if(n in a){var k=a[n];c.call(b,k,n,a)&&f.push(k);}return f}function p(a){return a.reduce(function(a,d){return a.concat(h.arr(d)?p(d):d)},[])}function m(a){if(h.arr(a))return a;
h.str(a)&&(a=e(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function u(a,c){return a.some(function(a){return a===c})}function C(a){var c={},d;for(d in a)c[d]=a[d];return c}function D(a,c){var d=C(a),b;for(b in a)d[b]=c.hasOwnProperty(b)?c[b]:a[b];return d}function z(a,c){var d=C(a),b;for(b in c)d[b]=h.und(a[b])?c[b]:a[b];return d}function T(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,c,d,k){return c+c+d+d+k+k});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
a=parseInt(c[1],16);var d=parseInt(c[2],16),c=parseInt(c[3],16);return"rgba("+a+","+d+","+c+",1)"}function U(a){function c(a,c,b){0>b&&(b+=1);1<b&&--b;return b<1/6?a+6*(c-a)*b:.5>b?c:b<2/3?a+(c-a)*(2/3-b)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a=parseInt(d[1])/360;var b=parseInt(d[2])/100,f=parseInt(d[3])/100,d=d[4]||1;if(0==b)f=b=a=f;else{var n=.5>f?f*(1+b):f+b-f*b,k=2*f-n,f=c(k,n,a+1/3),b=c(k,n,a);a=c(k,n,a-1/3);}return"rgba("+
255*f+","+255*b+","+255*a+","+d+")"}function y(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a))return a[2]}function V(a){if(-1<a.indexOf("translate")||"perspective"===a)return"px";if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function I(a,c){return h.fnc(a)?a(c.target,c.id,c.total):a}function E(a,c){if(c in a.style)return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function J(a,c){if(h.dom(a)&&
u(W,c))return"transform";if(h.dom(a)&&(a.getAttribute(c)||h.svg(a)&&a[c]))return"attribute";if(h.dom(a)&&"transform"!==c&&E(a,c))return"css";if(null!=a[c])return"object"}function X(a,c){var d=V(c),d=-1<c.indexOf("scale")?1:0+d;a=a.style.transform;if(!a)return d;for(var b=[],f=[],n=[],k=/(\w+)\((.+?)\)/g;b=k.exec(a);)f.push(b[1]),n.push(b[2]);a=r(n,function(a,b){return f[b]===c});return a.length?a[0]:d}function K(a,c){switch(J(a,c)){case "transform":return X(a,c);case "css":return E(a,c);case "attribute":return a.getAttribute(c)}return a[c]||
0}function L(a,c){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;var b=y(a)||0;c=parseFloat(c);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return c+a+b;case "-":return c-a+b;case "*":return c*a+b}}function F(a,c){return Math.sqrt(Math.pow(c.x-a.x,2)+Math.pow(c.y-a.y,2))}function M(a){a=a.points;for(var c=0,d,b=0;b<a.numberOfItems;b++){var f=a.getItem(b);0<b&&(c+=F(d,f));d=f;}return c}function N(a){if(a.getTotalLength)return a.getTotalLength();switch(a.tagName.toLowerCase()){case "circle":return 2*
Math.PI*a.getAttribute("r");case "rect":return 2*a.getAttribute("width")+2*a.getAttribute("height");case "line":return F({x:a.getAttribute("x1"),y:a.getAttribute("y1")},{x:a.getAttribute("x2"),y:a.getAttribute("y2")});case "polyline":return M(a);case "polygon":var c=a.points;return M(a)+F(c.getItem(c.numberOfItems-1),c.getItem(0))}}function Y(a,c){function d(b){b=void 0===b?0:b;return a.el.getPointAtLength(1<=c+b?c+b:0)}var b=d(),f=d(-1),n=d(1);switch(a.property){case "x":return b.x;case "y":return b.y;
case "angle":return 180*Math.atan2(n.y-f.y,n.x-f.x)/Math.PI}}function O(a,c){var d=/-?\d*\.?\d+/g,b;b=h.pth(a)?a.totalLength:a;if(h.col(b))if(h.rgb(b)){var f=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b=f?"rgba("+f[1]+",1)":b;}else b=h.hex(b)?T(b):h.hsl(b)?U(b):void 0;else f=(f=y(b))?b.substr(0,b.length-f.length):b,b=c&&!/\s/g.test(b)?f+c:f;b+="";return{original:b,numbers:b.match(d)?b.match(d).map(Number):[0],strings:h.str(a)||c?b.split(d):[]}}function P(a){a=a?p(h.arr(a)?a.map(m):m(a)):[];return r(a,
function(a,d,b){return b.indexOf(a)===d})}function Z(a){var c=P(a);return c.map(function(a,b){return{target:a,id:b,total:c.length}})}function aa(a,c){var d=C(c);if(h.arr(a)){var b=a.length;2!==b||h.obj(a[0])?h.fnc(c.duration)||(d.duration=c.duration/b):a={value:a};}return m(a).map(function(a,b){b=b?0:c.delay;a=h.obj(a)&&!h.pth(a)?a:{value:a};h.und(a.delay)&&(a.delay=b);return a}).map(function(a){return z(a,d)})}function ba(a,c){var d={},b;for(b in a){var f=I(a[b],c);h.arr(f)&&(f=f.map(function(a){return I(a,
c)}),1===f.length&&(f=f[0]));d[b]=f;}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return h.arr(a)?A.apply(this,a):Q[a]}function da(a,c){var d;return a.tweens.map(function(b){b=ba(b,c);var f=b.value,e=K(c.target,a.name),k=d?d.to.original:e,k=h.arr(f)?f[0]:k,w=L(h.arr(f)?f[1]:f,k),e=y(w)||y(k)||y(e);b.from=O(k,e);b.to=O(w,e);b.start=d?d.end:a.offset;b.end=b.start+b.delay+b.duration;b.easing=ca(b.easing);b.elasticity=(1E3-Math.min(Math.max(b.elasticity,1),999))/
1E3;b.isPath=h.pth(f);b.isColor=h.col(b.from.original);b.isColor&&(b.round=1);return d=b})}function ea(a,c){return r(p(a.map(function(a){return c.map(function(b){var c=J(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay};}else b=void 0;return b})})),function(a){return!h.und(a)})}function R(a,c,d,b){var f="delay"===a;return c.length?(f?Math.min:Math.max).apply(Math,c.map(function(b){return b[a]})):f?b.delay:d.offset+b.delay+
b.duration}function fa(a){var c=D(ga,a),d=D(S,a),b=Z(a.targets),f=[],e=z(c,d),k;for(k in a)e.hasOwnProperty(k)||"targets"===k||f.push({name:k,offset:e.offset,tweens:aa(a[k],d)});a=ea(b,f);return z(c,{children:[],animatables:b,animations:a,duration:R("duration",a,c,d),delay:R("delay",a,c,d)})}function q(a){function c(){return window.Promise&&new Promise(function(a){return p=a})}function d(a){return g.reversed?g.duration-a:a}function b(a){for(var b=0,c={},d=g.animations,f=d.length;b<f;){var e=d[b],
k=e.animatable,h=e.tweens,n=h.length-1,l=h[n];n&&(l=r(h,function(b){return a<b.end})[0]||l);for(var h=Math.min(Math.max(a-l.start-l.delay,0),l.duration)/l.duration,w=isNaN(h)?1:l.easing(h,l.elasticity),h=l.to.strings,p=l.round,n=[],m=void 0,m=l.to.numbers.length,t=0;t<m;t++){var x=void 0,x=l.to.numbers[t],q=l.from.numbers[t],x=l.isPath?Y(l.value,w*x):q+w*(x-q);p&&(l.isColor&&2<t||(x=Math.round(x*p)/p));n.push(x);}if(l=h.length)for(m=h[0],w=0;w<l;w++)p=h[w+1],t=n[w],isNaN(t)||(m=p?m+(t+p):m+(t+" "));
else m=n[0];ha[e.type](k.target,e.property,m,c,k.id);e.currentValue=m;b++;}if(b=Object.keys(c).length)for(d=0;d<b;d++)H||(H=E(document.body,"transform")?"transform":"-webkit-transform"),g.animatables[d].target.style[H]=c[d].join(" ");g.currentTime=a;g.progress=a/g.duration*100;}function f(a){if(g[a])g[a](g);}function e(){g.remaining&&!0!==g.remaining&&g.remaining--;}function k(a){var k=g.duration,n=g.offset,w=n+g.delay,r=g.currentTime,x=g.reversed,q=d(a);if(g.children.length){var u=g.children,v=u.length;
if(q>=g.currentTime)for(var G=0;G<v;G++)u[G].seek(q);else for(;v--;)u[v].seek(q);}if(q>=w||!k)g.began||(g.began=!0,f("begin")),f("run");if(q>n&&q<k)b(q);else if(q<=n&&0!==r&&(b(0),x&&e()),q>=k&&r!==k||!k)b(k),x||e();f("update");a>=k&&(g.remaining?(t=h,"alternate"===g.direction&&(g.reversed=!g.reversed)):(g.pause(),g.completed||(g.completed=!0,f("complete"),"Promise"in window&&(p(),m=c()))),l=0);}a=void 0===a?{}:a;var h,t,l=0,p=null,m=c(),g=fa(a);g.reset=function(){var a=g.direction,c=g.loop;g.currentTime=
0;g.progress=0;g.paused=!0;g.began=!1;g.completed=!1;g.reversed="reverse"===a;g.remaining="alternate"===a&&1===c?2:c;b(0);for(a=g.children.length;a--;)g.children[a].reset();};g.tick=function(a){h=a;t||(t=h);k((l+h-t)*q.speed);};g.seek=function(a){k(d(a));};g.pause=function(){var a=v.indexOf(g);-1<a&&v.splice(a,1);g.paused=!0;};g.play=function(){g.paused&&(g.paused=!1,t=0,l=d(g.currentTime),v.push(g),B||ia());};g.reverse=function(){g.reversed=!g.reversed;t=0;l=d(g.currentTime);};g.restart=function(){g.pause();
g.reset();g.play();};g.finished=m;g.reset();g.autoplay&&g.play();return g}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},S={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},W="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),H,h={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},
pth:function(a){return h.obj(a)&&a.hasOwnProperty("totalLength")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||h.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return h.hex(a)||h.rgb(a)||h.hsl(a)}},A=function(){function a(a,
d,b){return(((1-3*b+3*d)*a+(3*b-6*d))*a+3*d)*a}return function(c,d,b,f){if(0<=c&&1>=c&&0<=b&&1>=b){var e=new Float32Array(11);if(c!==d||b!==f)for(var k=0;11>k;++k)e[k]=a(.1*k,c,b);return function(k){if(c===d&&b===f)return k;if(0===k)return 0;if(1===k)return 1;for(var h=0,l=1;10!==l&&e[l]<=k;++l)h+=.1;--l;var l=h+(k-e[l])/(e[l+1]-e[l])*.1,n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(.001<=n){for(h=0;4>h;++h){n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(0===n)break;var m=a(l,c,b)-k,l=l-m/n;}k=l;}else if(0===
n)k=l;else{var l=h,h=h+.1,g=0;do m=l+(h-l)/2,n=a(m,c,b)-k,0<n?h=m:l=m;while(1e-7<Math.abs(n)&&10>++g);k=m;}return a(k,d,f)}}}}(),Q=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var c="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],a],Out:[[.25,
.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},b={linear:A(.25,.25,.75,.75)},f={},e;for(e in d)f.type=e,d[f.type].forEach(function(a){return function(d,f){b["ease"+a.type+c[f]]=h.fnc(d)?
d:A.apply($jscomp$this,d);}}(f)),f={type:f.type};return b}(),ha={css:function(a,c,d){return a.style[c]=d},attribute:function(a,c,d){return a.setAttribute(c,d)},object:function(a,c,d){return a[c]=d},transform:function(a,c,d,b,f){b[f]||(b[f]=[]);b[f].push(c+"("+d+")");}},v=[],B=0,ia=function(){function a(){B=requestAnimationFrame(c);}function c(c){var b=v.length;if(b){for(var d=0;d<b;)v[d]&&v[d].tick(c),d++;a();}else cancelAnimationFrame(B),B=0;}return a}();q.version="2.2.0";q.speed=1;q.running=v;q.remove=
function(a){a=P(a);for(var c=v.length;c--;)for(var d=v[c],b=d.animations,f=b.length;f--;)u(a,b[f].animatable.target)&&(b.splice(f,1),b.length||d.pause());};q.getValue=K;q.path=function(a,c){var d=h.str(a)?e(a)[0]:a,b=c||100;return function(a){return{el:d,property:a,totalLength:N(d)*(b/100)}}};q.setDashoffset=function(a){var c=N(a);a.setAttribute("stroke-dasharray",c);return c};q.bezier=A;q.easings=Q;q.timeline=function(a){var c=q(a);c.pause();c.duration=0;c.add=function(d){c.children.forEach(function(a){a.began=
!0;a.completed=!0;});m(d).forEach(function(b){var d=z(b,D(S,a||{}));d.targets=d.targets||a.targets;b=c.duration;var e=d.offset;d.autoplay=!1;d.direction=c.direction;d.offset=h.und(e)?b:L(e,b);c.began=!0;c.completed=!0;c.seek(d.offset);d=q(d);d.began=!0;d.completed=!0;d.duration>b&&(c.duration=d.duration);c.children.push(d);});c.seek(0);c.reset();c.autoplay&&c.restart();return c};return c};q.random=function(a,c){return Math.floor(Math.random()*(c-a+1))+a};return q});
});

function setAnimation(animationName, targets, options = {}) {
    return anime_min(Object.assign({}, animationFactory(animationName, options), { targets: targets }, options));
}
const BACKGROUND_FADE = 'background_fade';
function backgroundFade(options = {}) {
    return {
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        easing: 'linear',
        duration: 150
    };
}
const FADE_IN_AND_SCALE = 'fade_in_scale';
function fadeInAndScale(options = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        opacity: [start, end],
        scale: [start, end],
        easing: 'linear',
        duration: 200
    };
}
const FADE = 'fade';
function fade(options = {}) {
    let opacityValue = options.opacityValue ? options.opacityValue : 1;
    const start = options.open ? 0 : opacityValue;
    const end = options.open ? opacityValue : 0;
    const duration = options.duration ? options.duration : 200;
    return {
        opacity: [start, end],
        easing: 'linear',
        duration: duration
    };
}
const SLIDE_IN_RIGHT = 'slide_right';
function slideInRight(options = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        translateX: [(1 * (options.open ? 300 : 0)), (1 * (options.open ? 0 : 300))],
        opacity: [start, end],
        easing: 'linear',
        duration: 200
    };
}
const SLIDE_IN_BOTTOM = 'slide_down';
function slideInBottom(options = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        translateY: [(1 * (options.open ? 200 : 0)), (1 * (options.open ? 0 : 200))],
        opacity: [start, end],
        easing: 'linear',
        duration: 200
    };
}
const NEWSPAPER = 'newspaper';
function newspaper(options = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        opacity: [start, end],
        rotate: {
            value: (720 * (options.open ? 1 : -1)),
            easing: options.open ? 'easeOutCubic' : 'easeInCubic'
        },
        scale: [start, end],
        easing: options.open ? 'easeOutCubic' : 'easeInCubic',
        duration: 200
    };
}
const FALL = 'fall';
function fall(options = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        scale: [options.open ? 1.5 : 1, options.open ? 1 : 1.5],
        opacity: [start, end],
        easing: 'linear',
        duration: 400
    };
}
const SLIDE_FALL = 'slide_fall';
function slideFall(options = {}) {
    return {
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        translateX: [options.open ? 300 : 0, options.open ? 0 : 300],
        rotate: [options.open ? 45 : 0, options.open ? 0 : 45],
        easing: 'linear',
        duration: 200
    };
}
const SUPER_SCALED = 'super_scaled';
function superScaled(options = {}) {
    return {
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        scale: [options.open ? 4 : 1, options.open ? 1 : 4],
        easing: 'linear',
        duration: 200
    };
}
const BLUR = 'blur';
function blur(options = {}) {
    return {
        translateY: [options.open ? -50 : 0, options.open ? 0 : -50],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0]
    };
}
const FLIP_HORIZONTAL_3D = 'flip_3d_horizontal';
function flip3dHorizontal(options = {}) {
    return {
        perspective: 1300,
        translateX: [options.open ? 100 : 0, options.open ? 0 : 100],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        rotateY: [options.open ? -90 : 0, options.open ? 0 : -90],
        duration: 400,
        easing: 'linear'
    };
}
const FLIP_VERTICAL_3D = 'flip_3d_vertical';
function flip3dVertical(options = {}) {
    return {
        perspective: 1300,
        translateY: [options.open ? -100 : 0, options.open ? 0 : -100],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        rotateX: [options.open ? -90 : 0, options.open ? 0 : -90],
        duration: 400,
        easing: 'linear'
    };
}
const SIGN_3D = 'sign_3d';
function sign3d(options = {}) {
    return {
        perspective: 1300,
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        rotateX: [options.open ? -90 : 0, options.open ? 0 : -90],
        duration: 200,
        easing: 'linear'
    };
}
const STICKY_UP = 'sticky_up';
function stickyUp(options = {}) {
    const startPosition = options.open ? ((options.distance + options.modalHeight) * -1) : (options.distance * -1);
    const endPosition = options.open ? (options.distance * -1) : ((options.distance + options.modalHeight) * -1);
    return {
        translateY: [startPosition, endPosition],
        duration: 200,
        easing: 'linear'
    };
}
const SLIT_3D = 'slit_3d';
function slit3d(options = {}) {
    return {
        rotateY: [options.open ? -89 : 0, options.open ? 0 : -89],
        scale: [options.open ? 0.8 : 1, options.open ? 1 : 0.8],
        duration: 250,
        delay: options.open ? 50 : 0,
        easing: 'linear'
    };
}
const ROTATE_BOTTOM_3D = 'rotate_bottom_3d';
function rotateBottom3d(options = {}) {
    return {
        perspective: 1300,
        rotateX: [options.open ? -70 : 0, options.open ? 0 : -70],
        translateY: [options.open ? 300 : 0, options.open ? 0 : 300],
        scale: [options.open ? 0.8 : 1, options.open ? 1 : 0.8],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        easing: 'linear',
        duration: 200
    };
}
const ROTATE_IN_LEFT_3D = 'rotate_left_3d';
function rotateInLeft3d(options = {}) {
    return {
        perspective: 1300,
        rotateY: [options.open ? -70 : 0, options.open ? 0 : -70],
        translateX: [options.open ? -300 : 0, options.open ? 0 : -300],
        scale: [options.open ? 0.8 : 1, options.open ? 1 : 0.8],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        easing: 'linear',
        duration: 200
    };
}
const WOOBLE = 'wooble';
function wooble(options = {}) {
    let totalDuration = options.duration || 500;
    return Object.assign({ offset: 300, translateX: [
            { value: '-15%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '20%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-7%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '5%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-3%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '0%', duration: totalDuration * 0.15, easing: 'easeInQuad' }
        ], rotateZ: [
            { value: '-5deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '3deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-3deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '2deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-1deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '0', duration: totalDuration * 0.15, easing: 'easeInQuad' }
        ] }, options);
}
const SHAKE = 'shake';
function shake(options = {}) {
    let totalDuration = options.duration || 500;
    return Object.assign({ offset: 300, translateX: [
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '0', duration: totalDuration * 0.1, easing: 'easeInQuad' }
        ] }, options);
}
const FAB = 'fab';
function fab(options = {}) {
    const startingPosition = options.open ? options.distance : 0;
    const finishingPosition = options.open ? 0 : options.distance;
    switch (options.direction) {
        case 'top':
            return Object.assign({ translateY: [startingPosition, finishingPosition], easing: 'linear', duration: 100 }, options);
        case 'bottom':
            return Object.assign({ translateY: [(startingPosition * -1), (finishingPosition * -1)], easing: 'linear', duration: 100 }, options);
        case 'left':
            return Object.assign({ translateX: [startingPosition, finishingPosition], easing: 'linear', duration: 100 }, options);
        case 'right':
            return Object.assign({ translateX: [(startingPosition * -1), (finishingPosition * -1)], easing: 'linear', duration: 100 }, options);
        default:
            return {};
    }
}
const SLIDE_IN_STAGGERED = 'slide_id_staggered';
function slideInStaggered(options = {}) {
    return Object.assign({ translateX: [-300, 0], opacity: [0, 1], delay: (el, i) => { if (el) {
            return i * 100;
        } return 0; } }, options);
}
const SLIDE_VERTICAL = 'slide_vertical';
function slideVertical(options = {}) {
    let duration = options.duration ? options.duration : 100;
    let distance = options.distance ? options.distance : 100;
    return {
        translateY: [options.open ? ((options.up ? 1 : -1) * (distance)) : 0, options.open ? 0 : ((options.up ? 1 : -1) * (distance))],
        easing: 'linear',
        duration: duration
    };
}
const SLIDE_HORIZONTAL = 'slide_horizontal';
function slideHorizontal(options = {}) {
    return {
        translateX: [(options.open ? 0 : options.distance), (options.open ? options.distance : 0)],
        easing: 'linear',
        duration: 100
    };
}
const TRANSITION_SCALE = 'transition_scale';
function transitionScale(options = {}) {
    return {
        scale: [options.open ? 1 : 1.1, options.open ? 1.1 : 1],
        easing: 'linear',
        duration: 200
    };
}
const animations = {
    backgroundFade: BACKGROUND_FADE,
    wooble: WOOBLE,
    shake: SHAKE,
    slideInStaggered: SLIDE_IN_STAGGERED,
    rotateInLeft3d: ROTATE_IN_LEFT_3D,
    rotateBottom3d: ROTATE_BOTTOM_3D,
    slit3d: SLIT_3D,
    stickyUp: STICKY_UP,
    sign3d: SIGN_3D,
    flip3dVertical: FLIP_VERTICAL_3D,
    flip3dHorizontal: FLIP_HORIZONTAL_3D,
    blur: BLUR,
    superScaled: SUPER_SCALED,
    slideFall: SLIDE_FALL,
    fall: FALL,
    newspaper: NEWSPAPER,
    slideInBottom: SLIDE_IN_BOTTOM,
    slideInRight: SLIDE_IN_RIGHT,
    fadeInAndScale: FADE_IN_AND_SCALE,
    fade: FADE,
    fab: FAB,
    slideVertical: SLIDE_VERTICAL,
    slideHorizontal: SLIDE_HORIZONTAL,
    transitionScale: TRANSITION_SCALE
};
function animationFactory(animationName, options = {}) {
    switch (animationName) {
        case BACKGROUND_FADE:
            return backgroundFade(options);
        case FADE:
            return fade(options);
        case FADE_IN_AND_SCALE:
            return fadeInAndScale(options);
        case SLIDE_IN_RIGHT:
            return slideInRight(options);
        case SLIDE_IN_BOTTOM:
            return slideInBottom(options);
        case NEWSPAPER:
            return newspaper(options);
        case FALL:
            return fall(options);
        case SLIDE_FALL:
            return slideFall(options);
        case STICKY_UP:
            return stickyUp(options);
        case FLIP_HORIZONTAL_3D:
            return flip3dHorizontal(options);
        case FLIP_VERTICAL_3D:
            return flip3dVertical(options);
        case SIGN_3D:
            return sign3d(options);
        case SUPER_SCALED:
            return superScaled(options);
        case SLIT_3D:
            return slit3d(options);
        case ROTATE_BOTTOM_3D:
            return rotateBottom3d(options);
        case ROTATE_IN_LEFT_3D:
            return rotateInLeft3d(options);
        case BLUR:
            return blur(options);
        case FAB:
            return fab(options);
        case WOOBLE:
            return wooble(options);
        case SHAKE:
            return shake(options);
        case SLIDE_IN_STAGGERED:
            return slideInStaggered(options);
        case SLIDE_VERTICAL:
            return slideVertical(options);
        case SLIDE_HORIZONTAL:
            return slideHorizontal(options);
        case TRANSITION_SCALE:
            return transitionScale(options);
        default:
            return {};
    }
}

export { setAnimation as a, animations as b };
