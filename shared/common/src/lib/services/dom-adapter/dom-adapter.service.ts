import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';

@Injectable()
export class DomAdapter {

    constructor(protected coreConfig: CoreConfig) { }

    query(selector) {
        if (this.coreConfig.isUniversal()) {
            return null;
        } else {
            return document.querySelector(selector);
        }
    }

    querySelector(el, selector) {
        return el.querySelector(selector);
    }

    querySelectorAll(el, selector) {
        return el.querySelectorAll(selector);
    }

    getElementsByClassName(element, name) {
        return element.getElementsByClassName(name);
    }

    getElementsByTagName(element, name) {
        return element.getElementsByTagName(name);
    }

    classList(element) {
        return Array.prototype.slice.call(element.classList, 0);
    }

    addClass(element, className) {
        element.classList.add(className);
    }

    removeClass(element, className) {
        element.classList.remove(className);
    }

    hasClass(element, className) {
        return element.classList.contains(className);
    }

    setStyle(element, styleName, styleValue) {
        element.style[styleName] = styleValue;
    }

    removeStyle(element, stylename) {
        element.style[stylename] = null;
    }

    getStyle(element, stylename) {
        return element.style[stylename];
    }

    hasStyle(element, styleName, styleValue) {
        if (styleValue === void 0) { styleValue = null; }
        let value = this.getStyle(element, styleName) || '';
        return styleValue ? value === styleValue : value.length > 0;
    }

    hasAttribute(element, attribute) {
        return element.hasAttribute(attribute);
    }

    hasProperty(element, name) {
        return name in element;
    }

    setProperty(el, name, value) {
        el[name] = value;
    }

    getProperty(el, name) {
        return el[name];
    }

    getBoundingClientRect(el) {
        try {
            return el.getBoundingClientRect();
        } catch (e) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    }

    parentElement(el) {
        return el.parentNode;
    }

    getComputedStyle(element) {
        return getComputedStyle(element);
    }

    createElement(tagName, doc?) {
        if (doc === void 0) { doc = document; }
        return doc.createElement(tagName);
    }

    setInnerHTML(el, value) {
        el.innerHTML = value;
    }

    firstChild(el) {
        return el.firstChild;
    }

    nextSibling(el) {
        return el.nextSibling;
    }

    childNodes(el) {
        return el.childNodes;
    }

    clearNodes(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    appendChild(el, node) {
        el.appendChild(node);
    }

    removeChild(el, node) {
        el.removeChild(node);
    }

    replaceChild(el, newChild, oldChild) {
        el.replaceChild(newChild, oldChild);
    }

    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }

    insertBefore(el, node) {
        el.parentNode.insertBefore(node, el);
    }

    insertAllBefore(el, nodes) {
        nodes.forEach(function (n) {
            return el.parentNode.insertBefore(n, el);
        });
    }

    insertAfter(el, node) {
        el.parentNode.insertBefore(node, el.nextSibling);
    }

    tagName(element) {
        return element.tagName;
    }

    onAndCancel(el: any, evt: any, listener: any): Function {
        el.addEventListener(evt, listener, false);
        return () => { el.removeEventListener(evt, listener, false); };
    }

    setAttribute(element: any, name: string, value: string) {
        element.setAttribute(name, value);
    }

}
