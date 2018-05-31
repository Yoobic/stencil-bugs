---
name: Modal Controller
category: Core Components
---

The Modal Controller acts as a placeholder for a modal to be inserted. Different modals may be inserted into the same controller. The controller provides the backdrop for that modal so that the content behind it is greyed out. It has no attributes.

The modal is constructed by calling the `generateModal(props: IModalEntry)` method which receives a Modal Entry as an argument.

### Displaying Modals with the ModalController

```yoo-modal-controller.html
    <p>This is a random text in a random page</p>
    <p> Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....</p>

    <yoo-modal-controller></yoo-modal-controller>
    <yoo-button text="Trigger Modal" class="accent squared" onclick="generate(modalProps1)"></yoo-button>
    <yoo-button text="Trigger Fullscreen Modal" class="accent squared" onclick="generate(modalProps2)"></yoo-button>
    <yoo-button text="Trigger Drawer Modal" class="accent squared" onclick="generate(modalProps3)"></yoo-button>
    <yoo-button text="Trigger Action Sheet" class="accent squared" onclick="generateActionSheet()"></yoo-button>
    <br/>
    <yoo-button text="Confirm Method" onclick="confirm()"></yoo-button>
    <yoo-button text="Populate Method" onclick="populateShow()"></yoo-button>
```

```yoo-modal-controller.js

  var modalCtrl = document.querySelector('yoo-modal-controller');

  var htmlElement = document.createElement('div');

  var modalProps1 = {heading: "Aligato ?", hasFooter : true, content: htmlElement,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "rotate_bottom_3d", withYooCtrl: "true"};
  var modalProps2 = {heading: "Aligato ?", hasFooter : true, content: htmlElement,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", cssClass: "fullscreen", animationName: "fade_in_scale", withYooCtrl: "true"};
  var modalProps3 = {heading: "Aligato ?", hasFooter : true, content: htmlElement,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", cssClass: "drawer", animationName: "slide_right", withYooCtrl: "true"};
  var actionSheetProps = { heading: 'Action sheet', buttons: [{text: 'Action 1', cssClass: "accent"}, {text: 'Action 2', icon: 'yo-fire', cssClass: "success"}, {text: 'Action 3', icon: 'yo-fire', cssClass: "info"}, {text: 'Disabled Action 4', icon: 'yo-fire', cssClass: "accent", disabled: "true"}] };

  function generate(modalProps) {
    modalCtrl.generateModal(modalProps);
    modalCtrl.show();
  }

  function confirm() {
    modalCtrl.confirm(true);
    modalCtrl.show();
  }

  function generateActionSheet() {
    modalCtrl.generateActionSheet(actionSheetProps);
    modalCtrl.showActionSheet();
  }

  function populateShow() {
    var modal = document.createElement('yoo-modal');

    htmlElement.innerHTML = `<div class="test">This text is added from populate Method</div>`;

    modal.heading = "Gutten Morgen";
    modal.hasFooter = true;
    modal.content = htmlElement;
    modal.classList.add("info");
    modal.withYooCtrl = true;

    modalCtrl.populateModal(modal);

    modalCtrl.show();
  }

```

### Displaying Alerts with the ModalController

```yoo-modal-controller-alert.html
    <p>This is a random text in a random page</p>
    <p> Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....</p>

    <yoo-modal-controller></yoo-modal-controller>
    <yoo-button text="Trigger Toast Alert" class="accent squared" onclick="generate(alertProps1)"></yoo-button>
    <yoo-button text="Trigger Toast Alert" class="success squared" onclick="generate(alertProps2)"></yoo-button>
    <yoo-button text="Trigger Toast Alert" class="gradient-warning squared" onclick="generate(alertProps3)"></yoo-button>
```

```yoo-modal-controller-alert.js

  var modalCtrl = document.querySelector('yoo-modal-controller');
  var alertProps1 = {heading: "Toast Alert", text: "An alert has been launched !", closeable: true, cssClass: "toast accent", animationName: "slide_right", withYooCtrl: "true"};
  var alertProps2 = {heading: "Toast Alert", text: "An alert has been launched !", closeable: true, cssClass: "toast success", animationName: "slide_down", withYooCtrl: "true"};
  var alertProps3 = {heading: "Toast Alert", text: "An alert has been launched !", closeable: true, cssClass: "toast warning", animationName: "shake", withYooCtrl: "true"};

  function generate(alertProps) {
    modalCtrl.generateAlert(alertProps);
    modalCtrl.showAlert();
  }

```

## Methods

|Name|Parameters|Description|
|---|---|---|
|`populateModal`|`modal: HTMLElement`| Set the content to be displayed|
|`generateModal`|`props: IModalEntry`| Set the content to be displayed to a Modal created using the ModalEntry parameter|
|`generateActionSheet`|`props: ActionSheet`| Set the content to be displayed to a ActionSheet created using the ActionSheet parameter|
|`generateAlert`|`props: IAlertEntry`| Set the content to be displayed to an Alert created using the AlertEntry parameter|
|`confirm`|none| Set a confirm content to be displayed to a Modal created|
|`show`|none| Interrupt the current page and display content above|
|`showAlert`|none| Interrupt the current page and display content above|
|`closeModal`|none| Close the modal and placeholder|
|`closeAlert`|none| Close the alert|
|`closeActionSheet`|none| Close the action sheet|

### Vue JS Example, creating a modal with a vue component in it

```yoo-modal-controller-vue.html
    <p>This is a random text in a random page</p>
    <p> Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....</p>

    <yoo-modal-controller></yoo-modal-controller>
    <yoo-button text="Modal With Vue Component" class="accent squared" onclick="generate1()"></yoo-button>
      <div id="hello-vue">
        <h1>{{ msg }}</h1>
      </div>
```

```yoo-modal-controller-vue.js

  //this is a vue instance
  let vueElem = new Vue({
      //this targets the div id app
      el: '#hello-vue',
      data: {
          msg: 'This is a view component !' //this stores data values for 'name'
      }
  })

  var modalCtrl = document.querySelector('yoo-modal-controller');
  let htmlElement = vueElem.$el;

  var modalProps1 = {heading: "Aligato ?", hasFooter : true, content: htmlElement,primaryButtonText: "Confirm", secondaryButtonText: "Cancel"};

  function generate1() {
    modalCtrl.generateModal(modalProps1);
    modalCtrl.show();
  }
```