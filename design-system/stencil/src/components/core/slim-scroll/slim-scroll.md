---
name: Slim Scroll
category: Core Components
---


## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`height`|string|`null`|Height of the component if you want to specify it (css string). Otherwise it will take all available space in the parent container|
|`width`|string|`null`|Width of the component if you want to specify it (css string). Otherwise it will take all available space in the parent container|
|`showScrollbar`|boolean|`true`|Show/hide scrollbar|


```yoo-slim-scroll.html
    <div class="div-out">
    <yoo-slim-scroll>
          <div>
            <p>Hola this is a scrollable content in a Slim Scroll</p>
            <yoo-badge text="SLIM" class="danger"></yoo-badge>
            <yoo-badge text="SLIM" class="info"></yoo-badge>
            <yoo-badge text="SLIM" class="success"></yoo-badge>
            <yoo-badge text="SLIM" class="warning"></yoo-badge>
            <yoo-badge text="SLIM" class="accent"></yoo-badge>
            <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
            <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
            <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
            <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
            <br/>
            <yoo-badge text="SCROLL" class="danger"></yoo-badge>
            <br/>
            <yoo-badge text="SCROLL" class="success"></yoo-badge>
            <br/>
            <yoo-badge text="SLIM" class="success"></yoo-badge>
            <br/>
            <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
            <p>
            Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
            </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
     <p>
        Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
    </p>
  </div>
```

```yoo-slim-scroll.css hidden
  .div-out {
    height: 200px;
  }
```

### Height & Width

```yoo-slim-scroll-height-and-width.html
    <yoo-slim-scroll height="150px" width="300px">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <yoo-badge text="SLIM" class="danger"></yoo-badge>
          <yoo-badge text="SLIM" class="info"></yoo-badge>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <yoo-badge text="SLIM" class="warning"></yoo-badge>
          <yoo-badge text="SLIM" class="accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="danger"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="success"></yoo-badge>
          <br/>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <br/>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Horizontal|`horizontal`|Content does not automatically fit in the width, and a horizontal scroll bar is added if needed|
|Accent|`accent`|label accent|
|Dark|`dark`|label dark|
|Success|`success`|label success|
|Danger|`danger`|label danger|
|Info|`info`|label info|
|Warning|`warning`|label warning|

### Style Variations

```yoo-slim-scroll-style.html
  <h2>Horizontal Scroll</h2>
    <yoo-slim-scroll height="150px" width="300px" class="horizontal">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
    <br/>
    <yoo-slim-scroll height="150px" width="300px" class="accent">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <yoo-badge text="SLIM" class="danger"></yoo-badge>
          <yoo-badge text="SLIM" class="info"></yoo-badge>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <yoo-badge text="SLIM" class="warning"></yoo-badge>
          <yoo-badge text="SLIM" class="accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="danger"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="success"></yoo-badge>
          <br/>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <br/>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
    <br/>
    <yoo-slim-scroll height="150px" width="300px" class="danger">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <yoo-badge text="SLIM" class="danger"></yoo-badge>
          <yoo-badge text="SLIM" class="info"></yoo-badge>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <yoo-badge text="SLIM" class="warning"></yoo-badge>
          <yoo-badge text="SLIM" class="accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="danger"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="success"></yoo-badge>
          <br/>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <br/>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
    <br/>
    <yoo-slim-scroll height="150px" width="300px" class="dark">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <yoo-badge text="SLIM" class="danger"></yoo-badge>
          <yoo-badge text="SLIM" class="info"></yoo-badge>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <yoo-badge text="SLIM" class="warning"></yoo-badge>
          <yoo-badge text="SLIM" class="accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="danger"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="success"></yoo-badge>
          <br/>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <br/>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
    <br/>
    <yoo-slim-scroll height="150px" width="300px" class="success">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <yoo-badge text="SLIM" class="danger"></yoo-badge>
          <yoo-badge text="SLIM" class="info"></yoo-badge>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <yoo-badge text="SLIM" class="warning"></yoo-badge>
          <yoo-badge text="SLIM" class="accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="danger"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="success"></yoo-badge>
          <br/>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <br/>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
    <br/>
    <yoo-slim-scroll height="150px" width="300px" class="info">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <yoo-badge text="SLIM" class="danger"></yoo-badge>
          <yoo-badge text="SLIM" class="info"></yoo-badge>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <yoo-badge text="SLIM" class="warning"></yoo-badge>
          <yoo-badge text="SLIM" class="accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="danger"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="success"></yoo-badge>
          <br/>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <br/>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
    <br/>
    <yoo-slim-scroll height="150px" width="300px" class="warning">
      <div>
          <p>Hola this is a scrollable content in a Slim Scroll</p>
          <yoo-badge text="SLIM" class="danger"></yoo-badge>
          <yoo-badge text="SLIM" class="info"></yoo-badge>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <yoo-badge text="SLIM" class="warning"></yoo-badge>
          <yoo-badge text="SLIM" class="accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
          <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="danger"></yoo-badge>
          <br/>
          <yoo-badge text="SCROLL" class="success"></yoo-badge>
          <br/>
          <yoo-badge text="SLIM" class="success"></yoo-badge>
          <br/>
          <p>This is the enddddddddd.... Well not exactly there is a text block after</p>
          <p>
          Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
          </p>
      </div>
    </yoo-slim-scroll>
    <h3>This is not the Slimscroll anymore</h3>
```

## Methods

|Name|Parameters|Description|
|---|---|---|
|`refresh`|none| Refresh the Iscroll, needed if height or width are updated after initialization|
|`disable`|none| Disable scrolling|
|`enable`|none| Enable scrolling|
|`scrollToTop`|none| Scroll to the top|
|`scrollToBottom`|none| Scroll to the bottom|
|`scrollToElement`|`element: HTMLElement`| Scroll to the element|
|`scrollBy`|`(x: number, y: number, time?: number, easing?: string)`| Scroll of x and y, duration, iscroll ease|

```yoo-slim-scroll-method.html

    <yoo-button class="squared" text="Disable" onclick="disable()"></yoo-button>
    <yoo-button class="squared" text="Enable" onclick="enable()"></yoo-button>
    <yoo-button class="squared" text="To Top" onclick="toTop()"></yoo-button>
    <yoo-button class="squared" text="To Bot" onclick="toBot()"></yoo-button>
    <yoo-button class="squared" text="To Elem" onclick="toElem()"></yoo-button>

    <yoo-slim-scroll height="200px" width="300px">
          <div>
              <p>Hola this is a scrollable content in a Slim Scroll</p>
              <yoo-badge text="SLIM" class="danger"></yoo-badge>
              <yoo-badge text="SLIM" class="info"></yoo-badge>
              <yoo-badge text="SLIM" class="success"></yoo-badge>
              <yoo-badge text="SLIM" class="warning"></yoo-badge>
              <yoo-badge text="SLIM" class="accent"></yoo-badge>
              <yoo-badge text="SLIM" class="gradient-danger"></yoo-badge>
              <yoo-badge text="SLIM" class="gradient-info"></yoo-badge>
              <yoo-badge text="SLIM" class="gradient-accent"></yoo-badge>
              <yoo-badge text="SLIM" class="gradient-warning"></yoo-badge>
              <br/>
              <yoo-badge text="SCROLL" class="danger"></yoo-badge>
              <br/>
              <yoo-badge text="SCROLL" class="success"></yoo-badge>
              <br/>
              <yoo-badge text="SLIM" class="success"></yoo-badge>
              <br/>
              <p id="end-p">This is the enddddddddd.... Well not exactly there is a text block after</p>
              <p>
              Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
              </p>
          </div>
        </yoo-slim-scroll>

```

```yoo-slim-scroll-method.js
    var slimScroll = document.querySelector('yoo-slim-scroll');

    function enable () {
      slimScroll.enable();
    }

    function disable () {
      slimScroll.disable();
    }

    function toTop() {
      slimScroll.scrollToTop();
    }

    function toBot() {
      slimScroll.scrollToBottom();
    }

    function toElem() {
      let elem = document.querySelector('#end-p');
      slimScroll.scrollToElement(elem);
    }

```

## Events

|Attr|Description|
|---|---|---|
|`scrollStart`|Emitted at the begining of the scroll |
|`scrollEnd`|Emitted at the end of the scroll |
|`atBottom`|Emitted when the content has been scrolled to the bottom|
|`atLeft`|Emitted when the content has been scrolled to the left|