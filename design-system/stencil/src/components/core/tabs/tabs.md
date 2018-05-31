---
name: Tabs
category: Core Components
---

Tabs are used to distribute content, forms, etc, of a same nature. This tabs are in-page tabs, therefore they don't produce any kind of navigation.

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`titles`|string[]|*required|title of the different tabs|
|`selected`|number|0|number of the selected default tab (in the array of title)|
|`numberTabsDisplayed`|number|4|number of tab displayed before going to the other section|


### Tabs example

Use the slot attribute to specify the different tabs to display.

```yoo-tabs.html
    <yoo-tabs>
        <div slot="Tab1">
            <div><span>I am the tab 1 content, there is a tag here !</span></div>
            <div>
                <yoo-badge text="Tag gradient-danger" class="gradient-danger"></yoo-badge>
            </div>
        </div>
        <div slot="Tab2">
            <div><span>I am the tab 2 content, there is a circle progress bar here !</span></div>
            <div>
                <yoo-progress-bar progress="84" class="gradient-info" circle="true"></yoo-progress-bar>
            </div>
        </div>
        <div slot="Tab3">
            <div><span>Tab 3 content without component </span></div>
        </div>
    </yoo-tabs>
```

```yoo-tabs.js
    var comp = document.querySelector('yoo-tabs');
    comp.titles = ["Tab1", "Tab2","Tab3"];
```

### Many Tabs 

```yoo-tabs-many.html
    <yoo-tabs>
        <div slot="Tab1">
            <div><span>I am the tab 1 content</span></div>
        </div>
        <div slot="Tab2">
            <div><span>I am the tab 2 content</span></div>
        </div>
        <div slot="Tab3">
            <div><span>I am the tab 3 content</span></div>
        </div>
        <div slot="Tab4">
            <div><span>I am the tab 4 content</span></div>
        </div>
        <div slot="Tab5">
            <div><span>I am the tab 5 content</span></div>
        </div>
        <div slot="Tab6">
            <div><span>I am the tab 6 content</span></div>
        </div>
        <div slot="Tab7">
            <div><span>I am the tab 7 content</span></div>
        </div>
        <div slot="Tab8">
            <div><span>I am the tab 8 content</span></div>
        </div>
        <div slot="Tab9">
            <div><span>I am the tab 9 content</span></div>
        </div>
    </yoo-tabs>
```

```yoo-tabs-many.js
    var comp = document.querySelector('yoo-tabs');
    comp.titles = ["Tab1", "Tab2","Tab3","Tab4", "Tab5","Tab6","Tab7", "Tab8","Tab9"];
```

```yoo-tabs-many-vertical.html
<div class="container-with-height">
    <yoo-tabs class="vertical">
        <div slot="Tab1">
            <div><span>I am the tab 1 content</span></div>
        </div>
        <div slot="Tab2">
            <div><span>I am the tab 2 content</span></div>
        </div>
        <div slot="Tab3">
            <div><span>I am the tab 3 content</span></div>
        </div>
        <div slot="Tab4">
            <div><span>I am the tab 4 content</span></div>
        </div>
        <div slot="Tab5">
            <div><span>I am the tab 5 content</span></div>
        </div>
        <div slot="Tab6">
            <div><span>I am the tab 6 content</span></div>
        </div>
        <div slot="Tab7">
            <div><span>I am the tab 7 content</span></div>
        </div>
        <div slot="Tab8">
            <div><span>I am the tab 8 content</span></div>
        </div>
        <div slot="Tab9">
            <div><span>I am the tab 9 content</span></div>
        </div>
    </yoo-tabs>
    <div>
```

```yoo-tabs-many-vertical.js
    var comp = document.querySelector('yoo-tabs');
    comp.titles = ["Tab1", "Tab2","Tab3","Tab4", "Tab5","Tab6","Tab7", "Tab8","Tab9"];
```

```yoo-tabs-many-vertical.css 
    div.container-with-height{
        height: 400px;
    }

```

### Many Tabs With Display Control

```yoo-tabs-many-resize.html
    <yoo-tabs class="accent" number-tabs-displayed=14>
        <div slot="Tab1">
            <div><span>I am the tab 1 content</span></div>
        </div>
        <div slot="Tab2">
            <div><span>I am the tab 2 content</span></div>
        </div>
        <div slot="Tab3">
            <div><span>I am the tab 3 content</span></div>
        </div>
        <div slot="Tab4">
            <div><span>I am the tab 4 content</span></div>
        </div>
        <div slot="Tab5">
            <div><span>I am the tab 5 content</span></div>
        </div>
        <div slot="Tab6">
            <div><span>I am the tab 6 content</span></div>
        </div>
        <div slot="Tab7">
            <div><span>I am the tab 7 content</span></div>
        </div>
        <div slot="Tab8">
            <div><span>I am the tab 8 content</span></div>
        </div>
        <div slot="Tab9">
            <div><span>I am the tab 9 content</span></div>
        </div>
        <div slot="Tab10">
            <div><span>I am the tab 10 content</span></div>
        </div>
        <div slot="Tab11">
            <div><span>I am the tab 11 content</span></div>
        </div>
        <div slot="Tab12">
            <div><span>I am the tab 12 content</span></div>
        </div>
        <div slot="Tab13">
            <div><span>I am the tab 13 content</span></div>
        </div>
        <div slot="Tab14">
            <div><span>I am the tab 14 content</span></div>
        </div>
        <div slot="Tab15">
            <div><span>I am the tab 15 content</span></div>
        </div>
        <div slot="Tab16">
            <div><span>I am the tab 16 content</span></div>
        </div>
    </yoo-tabs>
```

```yoo-tabs-many-resize.js
    var comp = document.querySelector('yoo-tabs');
    comp.titles = ["Tab1", "Tab2","Tab3","Tab4", "Tab5","Tab6","Tab7", "Tab8","Tab9","Tab10","Tab11", "Tab12","Tab13","Tab14", "Tab15","Tab16"];
```

## CSS

|Type|Name|Description|
|---|---|---|
|vertical|`vertical`|yoo-tabs titles are displayed verticaly|

### Style Variations

```yoo-tabs-style.html
<div class="container-with-height">
    <yoo-tabs class="vertical danger">
        <div slot="Tab1">
            <div><span>I am the tab 1 content, there is a tag here !</span></div>
            <div>
                <yoo-badge text="Tag gradient-danger" class="gradient-danger"></yoo-badge>
            </div>
        </div>
        <div slot="Tab2">
            <div><span>I am the tab 2 content, there is a circle progress bar here !</span></div>
            <div>
                <yoo-progress-bar progress="84" class="gradient-info" circle="true"></yoo-progress-bar>
            </div>
        </div>
        <div slot="Tab3">
            <div><span>Tab 3 content without component </span></div>
        </div>
    </yoo-tabs>
</div>
```

```yoo-tabs-style.js
    var comp = document.querySelector('yoo-tabs');
    comp.titles = ["Tab1", "Tab2","Tab3"];
```

```yoo-tabs-style.css hidden
    div.container-with-height{
        height: 400px;
    }

```

## Events

|Attr|Description|
|---|---|---|
|`tabChanged`|tab displayed has changed|