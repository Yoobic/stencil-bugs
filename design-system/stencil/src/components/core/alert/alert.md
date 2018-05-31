---
name: Alert
category: Core Components
---

Alerts can be used with `<yoo-alert>` elements.

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`text`|string|   |the text inside the alert|
|`heading`|string|    |the heading of the alert|
|`icon`|string|   |the icon in the alert|
|`closeable`|boolean|   |the alert is closable (default = false)|

## Variations

```yoo-alert-variations.html
    <yoo-alert class="accent toast" heading="Heading" text="text"></yoo-alert>
    <br>
    <yoo-alert class="accent toast" heading="Closeable" text="accent toast and closeable" closeable="true"></yoo-alert>
    <br>
    <yoo-alert class="accent toast" heading="Icon" text="accent toast with icon" icon="yo-check-tick" closeable="true"></yoo-alert>
```

```yoo-alert-variations.css hidden
    yoo-alert {
        margin-bottom:5px;
    }
```

## CSS Classes

|Type|Name|Description|
|---|---|---|
|Toast|`toast`|alert of type toast, placed on the top right corner of the screen|
|Embedded|`embedded`|alert of type embedded, placed inside forms|
|Stripe|`stripe`|alert of type stripe, placed below the last navigation element, either the header or the navigation bar|
|Card|`card`|alert of type card|
|Round|`round`|round alert|
|Accent|`accent`|alert accent|
|Danger|`danger`|alert danger|
|Success|`success`|alert success|
|Info|`info` |alert info|
|Warning|`warning`|alert warning|
|Accent Gradient|`accent-gradient`|alert accent-gradient|
|Accent Gradient Card|`accent-gradient-card`|alert accent-gradient to be used with card class|
|Danger Gradient|`danger-gradient`|alert danger-gradient|
|Danger Gradient Card|`danger-gradient-card`|alert danger-gradient to be used with card class|
|Success Gradient|`success-gradient`|alert success-gradient|
|Success Gradient Card|`success-gradient-card`|alert success-gradient to be used with card class|
|Info Gradient|`info-gradient` |alert info-gradient|
|Info Gradient Card|`info-gradient-card` |alert info-gradient to be used with card class|
|Warning Gradient|`warning-gradient`|alert warning-gradient|
|Warning Gradient Card|`warning-gradient-card`|alert warning-gradient to be used with card class|

```yoo-alert-types.html
    <yoo-alert class="accent toast" heading="Toast" text="accent toast"></yoo-alert>
    <br>
    <yoo-alert class="accent round toast" heading="Toast" text="accent round toast"></yoo-alert>
    <br>
    <yoo-alert class="accent embedded" heading="Embedded" text="accent embedded"></yoo-alert>
    <br>
    <yoo-alert class="accent round embedded" heading="Embedded" text="accent round embedded"></yoo-alert>
    <br>
    <yoo-alert class="accent stripe" heading="Stripe" text="accent stripe"></yoo-alert>
    <br>
    <yoo-alert class="accent card" heading="Card" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
" closeable="true" icon="yo-check-tick"></yoo-alert>
    <br>
     <yoo-alert class="accent-gradient-card card" heading="Card" text="accent gradient card" closeable="true" icon="yo-check-tick"></yoo-alert>
    <br>
    <yoo-alert class="danger-gradient-card card" heading="Card" text="danger gradient card" closeable="true" icon="yo-check-tick"></yoo-alert>
    <br>
    <yoo-alert class="success-gradient-card card" heading="Card" text="success gradient card" closeable="true" icon="yo-check-tick"></yoo-alert>
    <br>
    <yoo-alert class="info-gradient-card card" heading="Card" text="info gradient card" closeable="true" icon="yo-check-tick"></yoo-alert>
    <br>
    <yoo-alert class="warning-gradient-card card" heading="Card" text="warning gradient card" closeable="true" icon="yo-check-tick"></yoo-alert>
    <br>
    <yoo-alert class="accent embedded" heading="Class" text="accent embedded"></yoo-alert>
    <br>
    <yoo-alert class="danger embedded" heading="Class" text="danger embedded"></yoo-alert>
    <br>
    <yoo-alert class="success embedded" heading="Class" text="success embedded"></yoo-alert>
    <br>
    <yoo-alert class="info embedded" heading="Class" text="info embedded"></yoo-alert>
    <br>
    <yoo-alert class="warning embedded" heading="Class" text="warning embedded"></yoo-alert>
    <br>
    <yoo-alert class="accent-gradient embedded" heading="Class" text="accent-gradient embedded"></yoo-alert>
    <br>
    <yoo-alert class="danger-gradient embedded" heading="Class" text="danger-gradient embedded"></yoo-alert>
    <br>
    <yoo-alert class="success-gradient embedded" heading="Class" text="success-gradient embedded"></yoo-alert>
    <br>
    <yoo-alert class="info-gradient embedded" heading="Class" text="gradient-info embedded"></yoo-alert>
    <br>
    <yoo-alert class="warning-gradient embedded" heading="Class" text="warning-gradient embedded"></yoo-alert>
```

```yoo-alert-types.css hidden
    yoo-alert {
        margin-bottom:5px;
    }
```

## Events

|Attr|Description|
|---|---|---|
|`alertClosed`|event emitted when the alert is closed|
|`alertActionSelected`|event emitted when the action text is pressed|