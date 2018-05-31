---
name: Button Group
category: Core Components
---

`<yoo-button>`'s groups can be organized with `<yoo-button-group>` HTML tag.

## Attributes

|Name|Type|Default|Description|
|---|---|---|----|
|isDropdown|boolean|`false`|True creates a dropdown button group|
|dropdownTitle|string||Specifies the text to display in the dropdown button|

```yoo-button-group.html
    <yoo-button-group is-dropdown="true" dropdown-title="Button Dropdown">
        <yoo-button text="button 1" class="accent"></yoo-button>
        <yoo-button text="button 2 long text" class="dark"></yoo-button>
        <yoo-button text="button 3"></yoo-button>
        <yoo-button class="icon-only"  class="accent" icon="yo-fire"></yoo-button>
        <yoo-button text="button 4" class="dark"></yoo-button> 
    </yoo-button-group>
```

### CSS

|Type|Name|Description|
|---|---|---|
|Horizontal| default| The default groups buttons horizontally|
|Vertical| `vertical`| Group buttons vertically|
|Justified|`justified`| Evenly separates the buttons in the group

```yoo-button-group-class.html
    <yoo-button-group>
        <yoo-button text="button 1" class="accent"></yoo-button>
        <yoo-button text="button 2 long text" class="dark"></yoo-button>
        <yoo-button text="button 3"></yoo-button>
        <yoo-button class="icon-only"  class="accent" icon="yo-fire"></yoo-button>
        <yoo-button text="button 4" class="dark"></yoo-button> 
    </yoo-button-group>
    <br/>
     <yoo-button-group class="vertical">
        <yoo-button text="button 1"></yoo-button>
        <yoo-button text="button 2"></yoo-button>
        <yoo-button text="fire" class="accent" icon="yo-fire"></yoo-button>
    </yoo-button-group>
    <br/>
    <yoo-button-group class="justified">
        <yoo-button text="button 1"></yoo-button>
        <yoo-button text="button 2 long text" class="secondary"></yoo-button>
        <yoo-button text="button 4"></yoo-button>
    </yoo-button-group>
```