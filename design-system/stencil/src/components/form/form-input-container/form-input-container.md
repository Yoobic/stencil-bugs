---
name: Container
category: Form Components
---

The container should be used to wrap a form component.

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`field`|IFormField|   -|the form container data|
|`readonly`|boolean|  -|will set the form container commetns to readonly|
|`comments`|string| -|the form container comments|

```yoo-form-input-container.html
        <yoo-form-input-container comments="This is a comment">
            <div >
                <yoo-form-input></yoo-form-input>
            </div>
        </yoo-form-input-container>
        
```

```yoo-form-input-container.js hidden
    var comp = document.querySelector('yoo-form-input-container');
    comp.field = {
        description: 'This is a description',
        title: 'This is a Title',
        required: true,
        name: 'my name',
        allowComments: true
    };
```
## CSS
|Type|Name|Description|
|---|---|---|
|Dark|`dark`|Form input container dark|
|Accent|`accent`|Form input container accent|
|Danger|`danger`|Form input container danger|
|Success|`success`|Form input container success|
|Dark|`dark`|Form input container dark|
|Info|`info`|Form input container info|
|Warning|`warning`|Form input container warning|

## Events
|Attr|Description|
|---|---|
|`commented`|Triggered when the form input container is commented|