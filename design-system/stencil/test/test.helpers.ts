/**
 * Creates an event on window with the passed name.
 * @param win Window
 * @param name name of the event to generate
 * @param noBubble by default the event bubbles. Send true not to bubble
 */
export function generateEvent(win: Window, name: string, noBubble?: boolean): Event {
    let event = win.document.createEvent('Event');
    event.initEvent(name, !noBubble, false);
    return event;
}

/**
 * Change the input value to value and dispatch an input event
 * @param el        an input element to put value and trigger input event
 * @param value     The value to put
 */
export function inputFieldValue(el: HTMLInputElement, value: any): void {
    if (!el) { return; }
    let event = generateEvent(el.ownerDocument.defaultView, 'input');
    el.value = value;
    el.dispatchEvent(event);
}