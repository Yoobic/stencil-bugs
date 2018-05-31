---
name: Badge
category: Core Components
---

Tags can be used with `<yoo-badge>` elements.

## Interface

```tsx
    export interface IBadgeEntry {
        text?: string;
        closable?: boolean;
        iconLeft?: string;
        iconRight?: string;
}
```
s
## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`text`|string|""|the text inside the badge|
|`closable`|boolean|false|make the badge is closable |
|`iconLeft`|string||icon to add to on the left-hand-side of the badge|
|`iconRight`|string||icon to add to on the right-hand-side of the badge|

```yoo-badge-new.html
    <yoo-badge text="Sat 29 Jun" closable="true" icon-left="yo-home" class="large outline"></yoo-badge>
    <br>
    <br>    
    <yoo-badge text="Sat 29 Jun" icon-right="yo-home" icon-left="yo-close" class="outline"></yoo-badge>
    <br>
    <br>
    <yoo-badge text="Sat 29 Jun" icon-right="yo-home" icon-left="yo-close" class="small outline"></yoo-badge>
    <br>
    <yoo-badge text="Sat 29 Jun" icon-right="yo-home" icon-left="yo-close" class="small outline success"></yoo-badge>
     <br>
    <yoo-badge text="Sat 29 Jun" closable="true" icon-left="yo-home" class="large outline success"></yoo-badge>
```

```yoo-label.html
<div style="padding:10px;">
    <yoo-badge text="Mission" class="round medium gradient-accent"></yoo-badge>
    <yoo-badge text="Approved" class="round medium gradient-dark"></yoo-badge>
    <yoo-badge text="Mission" class="round medium gradient-success"></yoo-badge>
    <yoo-badge text="Rejected" class="round medium gradient-danger"></yoo-badge>
    <yoo-badge text="Ongoing" class="round medium gradient-info"></yoo-badge>
    <yoo-badge text="Pending" class="round medium gradient-warning"></yoo-badge>
</div>
```
### Text Attribute

```yoo-label-text.html
<div style="padding:10px;">
    <yoo-badge text="Tag" class="accent"></yoo-badge>
</div>
```

### Icon Attribute

```yoo-label-text.html
<div style="padding:10px;">
    <yoo-badge icon="yo-fire" text="Fire" class="danger"></yoo-badge>
</div>
```

### Closeable Attribute

```yoo-label-closeable.html
<div style="padding:10px;">
    <yoo-badge text="Tag success closable outline small" closable="true" class="success outline small"></yoo-badge>
    <yoo-badge text="Tag success closable outline" closable="true" class="success outline"></yoo-badge>
    <yoo-badge text="Tag success closable" closable="true" class="success"></yoo-badge>
    <br>
    <yoo-badge text="London HQ" closable="true" class="outline large"></yoo-badge>
    
</div>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|label accent|
|Dark|`dark`|label dark|
|Success|`success`|label success|
|Danger|`danger`|label danger|
|Info|`info`|label info|
|Warning|`warning`|label warning|
|Gradient Accent|`gradient-accent`|label gradient accent|
|Gradient Danger|`gradient-danger`|label gradient danger|
|Gradient Info|`gradient-info`|label gradient info|
|Gradient Warning|`gradient-warning`|label gradient warning|
|Gradient Success|`gradient-success`|label gradient success|
|Gradient Dark|`gradient-dark`|label gradient dark|
|Link|`link`|label for link with underline on hover|
|Outline|`outline`|label outlined|
|Medium|`medium`|medium label (18px)|
|Small|`small`|small label (14px)|
|Round|`round`|round label|
|Transparent|`transparent`|transparent label|



### Outline Class

```yoo-badge-outline.html
<div style="padding:10px;">
    <yoo-badge text="Tag accent outline" class="accent outline"></yoo-badge>
    <yoo-badge text="Tag dark outline" class="dark outline"></yoo-badge>
    <yoo-badge text="Tag success outline" class="success outline"></yoo-badge>
    <yoo-badge text="Tag danger outline" class="danger outline"></yoo-badge>
    <yoo-badge text="Tag info outline" class="info outline"></yoo-badge>
    <yoo-badge text="Tag warning outline" class="warning outline"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag accent" class="accent"></yoo-badge>
    <yoo-badge text="Tag dark" class="dark"></yoo-badge>
    <yoo-badge text="Tag success" class="success"></yoo-badge>
    <yoo-badge text="Tag danger" class="danger"></yoo-badge>
    <yoo-badge text="Tag info" class="info"></yoo-badge>
    <yoo-badge text="Tag warning" class="warning"></yoo-badge>
</div>
```


### Size Variations

```yoo-badge.html
<div style="padding:10px;">
    <yoo-badge text="Tag small accent outline" class="small accent outline"></yoo-badge>
    <yoo-badge text="Tag accent outline" class="accent outline"></yoo-badge>
</div>
```

```yoo-badge.css hidden
    yoo-badge {
        margin-bottom: 5px;
        display: inline-block;
    }
```

### Style Variations

```yoo-badge-style.html
<div style="padding:10px;">
    <yoo-badge text="Tag accent outline" class="accent outline"></yoo-badge>
    <yoo-badge text="Tag dark outline" class="dark outline"></yoo-badge>
    <yoo-badge text="Tag success outline" class="success outline"></yoo-badge>
    <yoo-badge text="Tag danger outline" class="danger outline"></yoo-badge>
    <yoo-badge text="Tag info outline" class="info outline"></yoo-badge>
    <yoo-badge text="Tag warning outline" class="warning outline"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag gradient-accent outline" class="gradient-accent outline"></yoo-badge>
    <yoo-badge text="Tag gradient-dark outline" class="gradient-dark outline"></yoo-badge>
    <yoo-badge text="Tag gradient-success outline" class="gradient-success outline"></yoo-badge>
    <yoo-badge text="Tag gradient-danger outline" class="gradient-danger outline"></yoo-badge>
    <yoo-badge text="Tag gradient-info outline" class="gradient-info outline"></yoo-badge>
    <yoo-badge text="Tag gradient-warning outline" class="gradient-warning outline"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag gradient-accent" class="gradient-accent"></yoo-badge>
    <yoo-badge text="Tag gradient-dark" class="gradient-dark"></yoo-badge>
    <yoo-badge text="Tag gradient-success" class="gradient-success"></yoo-badge>
    <yoo-badge text="Tag gradient-danger" class="gradient-danger"></yoo-badge>
    <yoo-badge text="Tag gradient-info" class="gradient-info"></yoo-badge>
    <yoo-badge text="Tag gradient-warning" class="gradient-warning"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag danger link outline small" class="danger link outline small"></yoo-badge>
    <yoo-badge text="Tag danger link outline" class="danger link outline"></yoo-badge>
    <yoo-badge text="Tag danger link" class="danger link"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag gradient-accent" class="round gradient-accent"></yoo-badge>
    <yoo-badge text="Tag gradient-dark" class="round gradient-dark"></yoo-badge>
    <yoo-badge text="Tag gradient-success" class="round gradient-success"></yoo-badge>
    <yoo-badge text="Tag gradient-danger" class="round gradient-danger"></yoo-badge>
    <yoo-badge text="Tag gradient-info" class="round gradient-info"></yoo-badge>
    <yoo-badge text="Tag gradient-warning" class="round gradient-warning"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag gradient-accent" class="round medium gradient-accent"></yoo-badge>
    <yoo-badge text="Tag gradient-dark" class="round medium gradient-dark"></yoo-badge>
    <yoo-badge text="Tag gradient-success" class="round medium gradient-success"></yoo-badge>
    <yoo-badge text="Tag gradient-danger" class="round medium gradient-danger"></yoo-badge>
    <yoo-badge text="Tag gradient-info" class="round medium gradient-info"></yoo-badge>
    <yoo-badge text="Tag gradient-warning" class="round medium gradient-warning"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag gradient-accent" class="round small gradient-accent"></yoo-badge>
    <yoo-badge text="Tag gradient-dark" class="round small gradient-dark"></yoo-badge>
    <yoo-badge text="Tag gradient-success" class="round small gradient-success"></yoo-badge>
    <yoo-badge text="Tag gradient-danger" class="round small gradient-danger"></yoo-badge>
    <yoo-badge text="Tag gradient-info" class="round small gradient-info"></yoo-badge>
    <yoo-badge text="Tag gradient-warning" class="round small gradient-warning"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="Tag outline accent" class="round outline accent"></yoo-badge>
    <yoo-badge text="Tag outline dark" class="round outline dark"></yoo-badge>
    <yoo-badge text="Tag outline success" class="round outline success"></yoo-badge>
    <yoo-badge text="Tag outline danger" class="round outline danger"></yoo-badge>
    <yoo-badge text="Tag outline info" class="round outline info"></yoo-badge>
    <yoo-badge text="Tag outline warning" class="round outline warning"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge icon="yo-fire" text="Tag outline accent" class="round outline accent"></yoo-badge>
    <yoo-badge icon="yo-fire" text="Tag outline dark" class="round outline dark"></yoo-badge>
    <yoo-badge icon="yo-fire" text="Tag outline success" class="round outline success"></yoo-badge>
    <yoo-badge icon="yo-fire" text="Tag outline danger" class="round outline danger"></yoo-badge>
    <yoo-badge icon="yo-fire" text="Tag outline info" class="round outline info"></yoo-badge>
    <yoo-badge icon="yo-fire" text="Tag outline warning" class="round outline warning"></yoo-badge>
    <br/>
    <br/>
    <yoo-badge text="TRANSPARENT" class="transparent"></yoo-badge>
    <yoo-badge icon="yo-fire" text="TRANSPARENT" class="transparent"></yoo-badge>
    <yoo-badge icon="yo-fire" text="ROUND TRANSPARENT" class="round transparent"></yoo-badge>
</div>
```

## Events

|Attr|Description|
|---|---|---|
|`tagClosed`|event emitted when the tag is closed|