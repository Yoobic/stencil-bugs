---
name: Card
category: Entities Components
---

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`heading`|string|   |heading of the card|
|`subheadings`|string[ ]|`[ ]`|subheadings of the card|
|`imgSrc`|string|   |source of the image of the card|
|`top-left-badge`|string| |sets the content for the top left badge, will display nothing if undefined|
|`top-right-badge`|string| |sets the content for the top right badge, will display nothing if undefined|
|`bottom-left-badge`|string| |sets the content for the bottom left badge, will display nothing if undefined|
|`bottom-right-badge`|string| |sets the content for the bottom right badge, will display nothing if undefined|
|`avatarImgs`|string[ ]|`[ ]`|source of the avatar image displayed in the card|
|`isActivable`|boolean|`false`|display a checkbox at the top and allow the card to be activated|
|`isUserCard`|boolean|`false`|displays an avatar instead of an image with the specified `imgSrc`|
|`date`|string||date displayed on the top right of the card|
|`tags`|IBadgeEntry[]||Tags displays after the content of the card|
|`avatarShape`|string|`'rectangle'`|You can set this to `'circle'`|
|`actionButtonTitle`|string||Tags displays after the content of the card|
|`animationName`|string||Displays a custom animation on load, see animation docs for all options|
|`hasMenu`|boolean|`false`|Displays a context menu on the card, with slot name `menu-slot`|
|`type`|string: `default`, `list`| `default`| sets the type of the card|

### Basic Card Example

```yoo-card-heading.html
    <yoo-card heading="My Heading">
    </yoo-card>
    <br>
    <yoo-card heading="My Heading" class="horizontal">
    </yoo-card>
```

### With Custom animation

```yoo-card-animation.html
    <yoo-card heading="Animation: flip_3d_vertical" animation-name="flip_3d_vertical">
    </yoo-card>
    <br>
    <yoo-card heading="Animation: super_scaled" animation-name="super_scaled" class="horizontal">
    </yoo-card>
```

### List Type
```yoo-card-list.html
    <yoo-card title="List Mode" type="list" sticker="Yoo" avatar-shape="circle" img-src="http://www.twitrcovers.com/wp-content/uploads/2012/10/Star-Wars-l.jpg" id="list">
    </yoo-card>
```
```yoo-card-list.js hidden
    var listMode = document.querySelector('#list');
    var tags = [{text: 'Finished', icon:'yo-flag'},{text: 'Fire Account', icon:'yo-fire'}];
    listMode.tags = tags;
    listMode.subtitles = ["subtitle 1", "subtitle 2"];
```

### With Custom Image

```yoo-card-image.html
    <yoo-card heading="My heading" img-src="http://www.twitrcovers.com/wp-content/uploads/2012/10/Star-Wars-l.jpg">
    </yoo-card>

     <yoo-card heading="My heading" class="horizontal" img-src="https://images-na.ssl-images-amazon.com/images/I/51q8Jb98R4L.jpg">
    </yoo-card>
```


### Badge

```yoo-card-badge.html
    <yoo-card class="accent" top-left-badge="TL" top-right-badge="TR" bottom-left-badge="BL" bottom-right-badge="BR"></yoo-card>

    <yoo-card class="accent horizontal" top-left-badge="TL" top-right-badge="TR" bottom-left-badge="BL" bottom-right-badge="BR"></yoo-card>
```

### Date

```yoo-card-date.html
    <yoo-card class="accent" heading="My heading" date="25/03/1995"></yoo-card>

    <yoo-card class="accent horizontal" heading="My heading" date="25/03/1995"></yoo-card>
```

### Tags

```yoo-card-tags.html
    <yoo-card class="accent" heading="My heading"></yoo-card>

    <yoo-card class="accent horizontal" heading="My heading"></yoo-card>
```

```yoo-card-tags.js
    var comps = [...document.querySelectorAll('yoo-card')];
    var tags = [{text: 'Finished', icon:'yo-flag'},{text: 'Fire Account', icon:'yo-fire'}];
    comps.map((comp) => {comp.tags = tags});
```


### With slotted content

```yoo-card-slotted.html
    <yoo-card>
        <div slot="content-slot">
            I am the slotted content
            <div attr-layout="row">
                <yoo-badge text="789" class="accent"></yoo-badge>
                <yoo-badge text="897" class="danger"></yoo-badge>
                <yoo-badge text="978" class="gradient-info"></yoo-badge>
            </div>
        </div>
    </yoo-card>

    <yoo-card class="horizontal">
        <div slot="content-slot">
            I am the slotted content
            <div attr-layout="row">
                <yoo-badge text="789" class="accent"></yoo-badge>
                <yoo-badge text="897" class="danger"></yoo-badge>
                <yoo-badge text="978" class="gradient-info"></yoo-badge>
            </div>
        </div>
    </yoo-card>
```

```yoo-card-slotted.css hidden
    yoo-badge{
        margin-left: 0.15rem;
        margin-right: 0.15rem;
    }
```

### User Card

```yoo-user-card.html
    <yoo-card heading="My heading" avatar-shape="circle" img-src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/84/84210f8488cf340005271ab03092659fd3e972f0_full.jpg">
    </yoo-card>

    <yoo-card heading="My heading" class="horizontal" avatar-shape="circle" img-src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/84/84210f8488cf340005271ab03092659fd3e972f0_full.jpg">
    </yoo-card>
```

### With Bottom Avatar

```yoo-card-avatar.html
    <yoo-card heading="With Avatars">
        <div slot="content-slot">
            I am the slotted content
            <div attr-layout="row">
                <yoo-badge text="789" class="accent"></yoo-badge>
                <yoo-badge text="897" class="danger"></yoo-badge>
                <yoo-badge text="978" class="gradient-info"></yoo-badge>
            </div>
        </div>
    </yoo-card>
```
```yoo-card-avatar.js hidden
    var comp = document.querySelector('yoo-card');
    comp.avatarImgs = ["./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg"];
```

### With Bottom Avatar Horizontal

```yoo-card-avatar-horizontal.html
    <yoo-card class="horizontal" heading="With Avatars">
        <div slot="content-slot">
            I am the slotted content
            <div attr-layout="row">
                <yoo-badge text="789" class="accent"></yoo-badge>
                <yoo-badge text="897" class="danger"></yoo-badge>
                <yoo-badge text="978" class="gradient-info"></yoo-badge>
            </div>
        </div>
    </yoo-card>
```

```yoo-card-avatar-horizontal.js
    var comp = document.querySelector('yoo-card');
    comp.avatarImgs = ["./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg"];
```
### Activable

```yoo-card-activable.html
    <yoo-card class="accent" heading="Activable Card" is-activable="true">
    </yoo-card>
    <br>
    <yoo-card class="accent" class="horizontal" heading="Activable Card" is-activable="true">
    </yoo-card>
```

### Full Card example

```yoo-card-full-card.html


     <yoo-card class="danger hoverable" heading="My First Card" top-left-badge="TL" top-right-badge="TR" bottom-left-badge="BL" bottom-right-badge="BR" action-button-title="action button"  is-activable="true" sticker="Yoo" has-menu="true" >
        <div slot="menu-slot">This is a full card</div>
        <div slot="content-slot">
            I am the slotted content and doesn't this card look great?
            <div attr-layout="row">
                <yoo-badge text="789" class="accent"></yoo-badge>
                <yoo-badge text="897" class="danger"></yoo-badge>
                <yoo-badge text="978" class="gradient-info"></yoo-badge>
            </div>
        </div>
    </yoo-card>
```

```yoo-card-full-card.css hidden
    yoo-badge {
        margin-left: 0.15rem;
        margin-right: 0.15rem;
    }
```

```yoo-card-full-card.js
    var comp = document.querySelector('yoo-card');
    comp.avatarImgs = ["./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg"];
    comp.subheadings = ["subtitle 1", "subtitle 2"];
```

### Full Card Horizontal example

```yoo-card-full-card-horizontal.html


     <yoo-card class="danger hoverable horizontal" heading="My First Card" top-left-badge="TL" top-right-badge="TR" bottom-left-badge="BL" bottom-right-badge="BR" action-button-title="action button"  is-activable="true" has-menu="true"  >
        <div slot="menu-slot">This is a full card</div>
        <div slot="content-slot">
            I am the slotted content
            <div attr-layout="row">
                <yoo-badge text="789" class="accent"></yoo-badge>
                <yoo-badge text="897" class="danger"></yoo-badge>
                <yoo-badge text="978" class="gradient-info"></yoo-badge>
            </div>
            i love content
            <br>
            i love content
            <br>
            i love content
            <br>
            i love content
        </div>
    </yoo-card>
```

```yoo-card-full-card-horizontal.css hidden
    yoo-badge {
        margin-left: 0.15rem;
        margin-right: 0.15rem;
    }
```

```yoo-card-full-card-horizontal.js
    var comp = document.querySelector('yoo-card');
    comp.avatarImgs = ["./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg"];
    comp.subheadings = ["subtitle 1", "subtitle 2"];
```

## CSS

|Type|Name|Description|
|---|---|---|
|Hoverable|`hoverable`|yoo-card with added hover effect|
|No Status|`no-status`|yoo-card with no status bar|
|Horizontal|`horizontal`|yoo-card displayed in horizontal|
|Accent|`accent`|yoo-card accent|
|Dark|`dark`|yoo-card dark|
|Success|`success`|yoo-card success|
|Danger|`danger`|yoo-card danger|
|Info|`info`|yoo-card info|
|Warning|`warning`|yoo-card warning|
|Gradient Accent|`gradient-accent`|yoo-card gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-card gradient-dark|
|Gradient Success|`gradient-success`|yoo-card gradient-success|
|Gradient Danger|`gradient-danger`|yoo-card gradient-danger|
|Gradient Info|`gradient-info`|yoo-card gradient-info|
|Gradient Warning|`gradient-warning`|yoo-card gradient-warning|

### Style Variation

```yoo-card-style.html
    <yoo-card class="hoverable" sticker="Yoo">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br>
    <br>
    <yoo-card class="accent no-status" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br>
    <br>
    <yoo-card class="accent hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="success hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="danger hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="info hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="warning hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="dark hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="gradient-accent hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="gradient-success hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="gradient-danger hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="gradient-info hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="gradient-warning hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
    <br/>
    <br/>
    <yoo-card class="gradient-dark hoverable" sticker="Yoo" is-activable="true">
        <div slot="content-slot">I am the slotted content</div>
    </yoo-card>
```

```yoo-card-style.js
    var comps = document.querySelectorAll('yoo-card');
    var i;
    for(i=0;i<comps.length;i++){
        comps[i].avatarImg = ["./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg", "./assets/grid/empty-state-1.svg"];
    }
```

## Events
|Attr|Description|
|---|---|---|
|`yooXXXX`|small label|