---
name: Animations
category: Overview
---

Animations are available for components as properties. These animations are created with animejs.
Here is the list of available animations: 

## Animations List

|Name|Options|Description|
|----|-------|-----------|
|`background_fade`|`{open: boolean}`|fades the background in and out for modals|
|`fade`|`{open: boolean; duration: number}`|fade an element in or out, duration is an optional value (default to 200)|
|`fade_in_scale`|`{open: boolean}`|Fade in and Scale|
|`slide_right`|`{open: boolean}`|Slide and appear from the right|
|`slide_down`|`{open: boolean}`|Slide down|
|`newspaper`|`{open: boolean}`|Classic newspaper animation|
|`fall`|`{open: boolean}`|Fall and appear|
|`slide_fall`|`{open: boolean}`|Slide from the top and appear|
|`super_scaled`|`{open: boolean}`|Huge downsize|
|`blur`|`{open: boolean}`|Blur|
|`flip_3d_horizontal`|`{open: boolean}`|Flip and appear, 3D rotation X axis|
|`flip_3d_vertical`|`{open: boolean}`|Flip and appear, 3D rotation Y axis|
|`sign_3d`|`{open: boolean}`|Flip down like a sign|
|`sticky_up`|`{open: boolean; distance: number; modalHeight:number}`|For Modal only, transition that will sldie down from the top and 'stick' to the top of the window|
|`slit_3d`|`{open: boolean}`|Slit 3D|
|`rotate_bottom_3d`|`{open: boolean}`|Rotate a bit and translate down|
|`rotate_left_3d`|`{open: boolean}`|Rotate a bit and translate left|
|`wooble`|`{duration: number}`|Wooble, duration in ms|
|`shake`|`{duration: number}`|Shake, duration in ms|
|`fab`|`{distance: number; direction: string; open: boolean}`|Only used in the Fab Component|
|`slide_id_staggered`|`{duration: number}`|Slide Id staggered, duration in ms|
|`slide_vertical`|`{up: boolean; distance: number}`|Slide an element vertically, `up` option determines if the element slides up or down, `distance` in pixels|

```animations.html
 <yoo-modal-controller></yoo-modal-controller>
    <yoo-tabs>
      <div slot="Card">
          <div class="button-wrapper" attr-layout="flex">
            <div class="button-column" attr-layout="flex">
              <div class="animation" onclick="generateCard('fade_in_scale')">Fade In Scale</div>
              <div class="animation" onclick="generateCard('slide_right')">Slide Right</div>
              <div class="animation" onclick="generateCard('flip_3d_horizontal')">Flip Horizontal 3D</div>
              <div class="animation" onclick="generateCard('sign_3d')">Sign 3D</div>                            
            </div>
            <div class="button-column" attr-layout="flex">
              <div class="animation" onclick="generateCard('super_scaled')">Super Scaled</div>
              <div class="animation" onclick="generateCard('slide_down')">Slide In Bottom</div>
              <div class="animation" onclick="generateCard('flip_3d_vertical')">Flip Vertical 3D</div>
              <div class="animation" onclick="generateCard('slit_3d')">Slit 3D</div>
            </div>
            <div class="button-column" attr-layout="flex">
              <div class="animation" onclick="generateCard('fall')">Fall</div>
              <div class="animation" onclick="generateCard('blur')">Blur</div>
              <div class="animation" onclick="generateCard('rotate_bottom_3d')">Rotate Bottom 3D</div>
              <div class="animation" onclick="generateCard('shake')">Shake</div>
            </div>
            <div class="button-column" attr-layout="flex">
              <div class="animation" onclick="generateCard('slide_fall')">Slide Fall</div>    
              <div class="animation" onclick="generateCard('newspaper')">Newspaper</div>
              <div class="animation" onclick="generateCard('rotate_left_3d')">Rotate Left 3D</div>  
              <div class="animation" onclick="generateCard('wooble')">Wooble</div>                                  
            </div>
            <div class="card-column" attr-layout="flex">
            </div>
          </div>
      </div>
      <div slot="Modal">
          <div class="button-wrapper" attr-layout="flex">
            <div class="button-column" attr-layout="flex">
              <div class="animation" onclick="generate1()">Fade In Scale</div>
              <div class="animation" onclick="generate2()">Slide Right</div>
              <div class="animation" onclick="generate9()">Flip Horizontal 3D</div>
              <div class="animation" onclick="generate11()">Sign 3D</div>
            </div>             
            <div class="button-column" attr-layout="flex">
              <div class="animation" onclick="generate7()">Super Scaled</div>
              <div class="animation" onclick="generate3()">Slide In Bottom</div>
              <div class="animation" onclick="generate10()">Flip Vertical 3D</div>
              <div class="animation" onclick="generate13()">Slit 3D</div>
            </div>     
            <div class="button-column" attr-layout="flex">                     
              <div class="animation" onclick="generate5()">Fall</div>
              <div class="animation" onclick="generate8()">Blur</div>
              <div class="animation" onclick="generate14()">Rotate Bottom 3D</div>
              <div class="animation" onclick="generate12()">Sticky Up</div>
            </div>
            <div class="button-column" attr-layout="flex">
              <div class="animation" onclick="generate6()">Slide Fall</div>
              <div class="animation" onclick="generate4()">Newspaper</div>
              <div class="animation" onclick="generate15()">Rotate Left 3D</div>
            </div>
          </div>
      </div>
  </yoo-tabs>
```
```animations.css hidden

.button-wrapper {
  flex-wrap: wrap;
}

.card-column {
  padding: 16px;
}

.animation {
  display: flex;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 5px 9px #888888;
  padding: 0 8px;
}

.button-column {
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.button-column > * {
  margin: 0.3rem 0;
}

```

```animations.js hidden

    var comp = document.querySelector('yoo-tabs');
    comp.titles = ["Card", "Modal"];

function generateCard(animation) {
  let card = document.querySelector("yoo-card");
    if(card) {
      card.remove();
    }
  let newCard = document.createElement("yoo-card");
  newCard.setAttribute("style","width:400px;");
  newCard.setAttribute("animation-name", animation);
  document.querySelector(".card-column").appendChild(newCard);
  document.querySelectorAll(".animation")[0].classList.add("active");
  }

  var modalCtrl = document.querySelector('yoo-modal-controller');
    var modalProps1 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "fade_in_scale"};
    var modalProps2 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "slide_right"};
    var modalProps3 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "slide_down"};
    var modalProps4 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "newspaper"};
    var modalProps5 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "fall"};
    var modalProps6 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "slide_fall"};
    var modalProps7 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "super_scaled"};
    var modalProps8 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "blur"};
    var modalProps9 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "flip_3d_horizontal"};
    var modalProps10 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "flip_3d_vertical"};
    var modalProps11 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "sign_3d"};
    var modalProps12 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "sticky_up"};
    var modalProps13 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "slit_3d"};
    var modalProps14 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "rotate_bottom_3d"};
    var modalProps15 = {title: "Animation", hasFooter : true ,primaryButtonText: "Confirm", secondaryButtonText: "Cancel", animationName: "rotate_left_3d"};

function generate1() {
    modalCtrl.generateModal(modalProps1);
    modalCtrl.show();
  }

  function generate2() {
    modalCtrl.generateModal(modalProps2);
    modalCtrl.show();
  }

  function generate3() {
    modalCtrl.generateModal(modalProps3);
    modalCtrl.show();
  }

  function generate4() {
    modalCtrl.generateModal(modalProps4);
    modalCtrl.show();
  }

  function generate5() {
    modalCtrl.generateModal(modalProps5);
    modalCtrl.show();
  }

   function generate6() {
    modalCtrl.generateModal(modalProps6);
    modalCtrl.show();
  }

  function generate7() {
    modalCtrl.generateModal(modalProps7);
    modalCtrl.show();
  }

  function generate8() {
    modalCtrl.generateModal(modalProps8);
    modalCtrl.show();
  }

  function generate9() {
    modalCtrl.generateModal(modalProps9);
    modalCtrl.show();
  }

  function generate10() {
    modalCtrl.generateModal(modalProps10);
    modalCtrl.show();
  }
   function generate11() {
    modalCtrl.generateModal(modalProps11);
    modalCtrl.show();
  }

  function generate12() {
    modalCtrl.generateModal(modalProps12);
    modalCtrl.show();
  }

  function generate13() {
    modalCtrl.generateModal(modalProps13);
    modalCtrl.show();
  }

  function generate14() {
    modalCtrl.generateModal(modalProps14);
    modalCtrl.show();
  }

  function generate15() {
    modalCtrl.generateModal(modalProps15);
    modalCtrl.show();
  }

  
```
