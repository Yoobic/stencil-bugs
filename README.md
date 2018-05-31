# ngIf - IonModal - ion-content Bug

## Steps to reproduce the bug:

### Build the repo and serve
1) git clone https://github.com/miguelyoobic95/ngIfModalBug.git
2) npm install
3) npm run build:interfaces (build all necessary interfaces)
4) npm run build:stencil (build stencil libs)
5) ionic serve

### Reproduce the bug:

This bug seems to have three main side effects:
1) It prevents normal functionality of *ngIf-controlled statements inside a component which is used to create a modal with Ionic's `ModalController`.
2) Breaks navigation and content of the pages when doing a `hard reload` of the page on Chrome
3) An intermittent error on the console when trying to open a modal from stencil using Ionic's `ion-modal-controller`

After building and serving the repo for the first time the app should land in the `Home` page. This page has two clickable components:
1) 'Open Angular Modal' --> opens a modal from the Angular using the Ionic's modal controller
2) 'Open stencil modal' --> opens a modal from a stencil component also using Ionic's modal controller

Two behaviors are observed upon the first serve:
1) The page does not render at all until refreshed
2) The page renders normally or after refreshing and shows the content, however, upon pressing the 'Open Angular Modal' button, the modal opens but none of the content controlled by `*ngIf` statements is visible

If we then trigger a `hard reload` of the page, the entire content disappears and the navigation does not work correctly on the first click. The content of the pages may be recovered by clicking back and forth between the tabs. However, the tab that the user was in before the `hard reload` never actually renders any content, only the header.

Lastly, clicking the 'Open stencil modal' will intermittently throw an error in the console:

```
ERROR Error: Uncaught (in promise): TypeError: Cannot read property 'componentOnReady' of null
TypeError: Cannot read property 'componentOnReady' of null
    at Promise (chunk-75914b41.js:3244)
    at new ZoneAwarePromise (zone.js:891)
    at chunk-75914b41.js:3241
    at Generator.next (<anonymous>)
    at chunk-75914b41.js:3090
    at new ZoneAwarePromise (zone.js:891)
    at __awaiter (chunk-75914b41.js:3086)
    at showModal (chunk-75914b41.js:3240)
    at ModalTriggerComponent.openModal (modal-content.sc.js:44)
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:421)
    at Promise (chunk-75914b41.js:3244)
    at new ZoneAwarePromise (zone.js:891)
    at chunk-75914b41.js:3241
    at Generator.next (<anonymous>)
    at chunk-75914b41.js:3090
    at new ZoneAwarePromise (zone.js:891)
    at __awaiter (chunk-75914b41.js:3086)
    at showModal (chunk-75914b41.js:3240)
    at ModalTriggerComponent.openModal (modal-content.sc.js:44)
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:421)
    at resolvePromise (zone.js:814)
    at resolvePromise (zone.js:771)
    at zone.js:873
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:421)
    at Object.onInvokeTask (core.js:4053)
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:420)
    at Zone.push../node_modules/zone.js/dist/zone.js.Zone.runTask (zone.js:188)
    at drainMicroTaskQueue (zone.js:595)
    at ZoneTask.push../node_modules/zone.js/dist/zone.js.ZoneTask.invokeTask [as invoke] (zone.js:500)
    at invokeTask (zone.js:1540)
```


