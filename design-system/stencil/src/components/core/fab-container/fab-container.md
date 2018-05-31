---
name: Fab Container
category: Core Components
---

A `yoo-fab-container` is used to create `yoo-fab-button`s in a fixed absolute position. They may also contain `yoo-fab-list`s that contain buttons that are shown when the main `yoo-fab-button` in the `yoo-fab-container` is clicked. A single `yoo-fab-container` may hold multiple `yoo-fab-lists`.


## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`animated`|boolean|   |determines if the fab container animates on animation|


```yoo-fab-container.html
    <yoo-fab-container top right>
        <yoo-fab-button class="accent"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container top center>
        <yoo-fab-button class="gradient-accent"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container top left>
        <yoo-fab-button class="danger"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container left middle>
        <yoo-fab-button class="danger"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container bottom right>
        <yoo-fab-button class="warning"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container bottom left>
        <yoo-fab-button class="success"></yoo-fab-button>
    </yoo-fab-container>
    <yoo-fab-container center middle>
        <yoo-fab-button class="gradient-danger"></yoo-fab-button>
    </yoo-fab-container>
```

```yoo-fab-container.js
 var btns = document.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns.length; i++){
    btns[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }
```