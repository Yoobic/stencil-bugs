---
name: Fab Button
category: Core Components
---

A `yoo-fab-button` can be pressed to perform an action or to open other related actions inside a `yoo-fab-list`. A `yoo-fab-button` will scroll with the content if used in isolation but can be fixed to a specific location in the content by being used inside a `yoo-fab-container`.

An icon, title and handler fuction may be specified as a `FabButtonEntry`.

```typescript
    export interface FabButtonEntry {
        icon?: string;
        title?: string;
        handler?: Function;
    }
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`fabEntry`|FabButtonEntry|`{ }`   |an object containing the icon and/or title to show inside the fab button as well as a handler function|
|`text`|string||the text of the fab|
|`label`|string| |a label to attach next to the button inside the list|
|`disabled`|boolean|`false`|if true, the yoo-fab-button will be disable|
|`icon`|string||icon for the fab|
|`toggleActive`|fucniton|||
|`parentHasList`|boolean|`false`||
|`activated`|boolean|`false`||

```yoo-fab-button.html
    <yoo-fab-container top right>
        <yoo-fab-button class="accent"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container top left>
        <yoo-fab-button class="danger"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container bottom right>
        <yoo-fab-button disabled="true" class="warning"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container bottom left>
        <yoo-fab-button class="success"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container center middle>
        <yoo-fab-button class="gradient-danger"></yoo-fab-button>
    </yoo-fab-container>
```

```yoo-fab-button.js
 var btns = document.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns.length; i++){
    btns[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }
```

```yoo-fab-button.css hidden
    .present-fabs {
        display: flex;
        justify-content: space-between;
        position: relative;
        width: 85%;
        height: 300px;
    }
```

## CSS

|Type|Name|Description|
|---|---|---|
|Large|`large`|yoo-fab-button large (56px)|
|Accent|`accent`|yoo-fab-button accent|
|Stable|`stable`|yoo-fab-button stable|
|Success|`success`|yoo-fab-button success|
|Danger|`danger`|yoo-fab-button danger|
|Info|`info`|yoo-fab-button info|
|Warning|`warning`|yoo-fab-button warning|
|Gradient Accent|`gradient-accent`|yoo-fab-button gradient-accent|
|Gradient Stable|`gradient-grey`|yoo-fab-button gradient-grey|
|Gradient Success|`gradient-success`|yoo-fab-button gradient-success|
|Gradient Danger|`gradient-danger`|yoo-fab-button gradient-danger|
|Gradient Info|`gradient-info`|yoo-fab-button gradient-info|
|Gradient Warning|`gradient-warning`|yoo-fab-button gradient-warning|

```yoo-fab-button-large.html
<div class="present-fabs">
        <yoo-fab-container top right>
            <yoo-fab-button class="large accent"></yoo-fab-button>
        </yoo-fab-container>
        <yoo-fab-container top left>
            <yoo-fab-button class="large danger"></yoo-fab-button>
        </yoo-fab-container>
        <yoo-fab-container bottom right>
            <yoo-fab-button class="large warning"></yoo-fab-button>
        </yoo-fab-container>
        <yoo-fab-container bottom left>
            <yoo-fab-button class="large success"></yoo-fab-button>
        </yoo-fab-container>
        <yoo-fab-container center middle>
            <yoo-fab-button class="gradient-danger"></yoo-fab-button>
        </yoo-fab-container>
</div>
```

```yoo-fab-button-large.js
 var btns = document.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns.length; i++){
    btns[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }
```

```yoo-fab-button-large.css hidden
    .present-fabs {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 85%;
        height: 200px;
    }
```