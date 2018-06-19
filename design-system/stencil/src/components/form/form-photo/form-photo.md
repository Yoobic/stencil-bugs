---
name: Photo
category: Form Components
---

```yoo-form-photo.html
    <yoo-form-photo></yoo-form-photo>

    <h3>With a value</h3>
    <yoo-form-photo value="linkPhoto"></yoo-form-photo>
```

### Required
```yoo-form-photo-required.html
    <h3>Required</h3>
    <yoo-form-photo required="true"></yoo-form-photo>
```

### Read Only
```yoo-form-photo-readonly.html
    <h3>Read Only</h3>
    <yoo-form-photo readonly="true" value="linkPhoto"></yoo-form-photo>
```

## Interface
```tsx
export declare class IAlgorithm extends IEntity {
    channel: string;
    name: string;
    server: string;
}
```

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`value`| `string or Array<string>` | `none` | mutable prop, the value of the form |
|`extraData`| `any` | `{}` |  |
|`validators`| `Array<Validator<string> or ValidatorEntry>` | `[]` | `` |
|`asyncValidators `| `Array<AsyncValidator<string>>` | `` | `` |
|`placeholder`| `string` | `none` | the placeholder text |
|`required`| `boolean` | `false` | if the form is required or not |
|`readonly`| `boolean` | `false` | render as readonly, `false` to render as editable |
|`type`| `'video' or 'audio' or 'photo'` | `` |  the type of file to capture|
|`multiple`|`boolean`| `false` |if you can pick different value or not|
|`min`|`number`|`1`|minimum number of file to upload|
|`max`|`number`|`1`|maximum number of file to upload|
|`maxWidth`|`number`|`none`| the maximum width of photo|
|`duration`|`number`|`none`|duration of the capture video / audio|
|`saveGeoloc`|`boolean`|`false`|whether it saves the location in the picture taken or not|
|`allowLibrary`|`boolean`|`false`|whether it allows to import from librabry or not|
|`allowAnnotate`|`boolean`|`false`|whether it allows to annotate to the photo view dialog or not|
|`isImageRecognition`|`boolean`|`false`|whether it show the button image recognition or not|
|`algorithm`|`IAlgorithm`|`none`|the algorithm used for the image recognition|
|`isBackgroundProcess`|`boolean`|`false`|hide the recognition button when `true` |
|`label`|`string`|`none`| the value of the photo preview label|

## Methods
|Name|Parameters|Description|
|---|---|---|
|`isValid`|`none`| return validity (`boolean`)|

## Events
|Attr|Type|Description|
|---|---|---|
|`validityChanged`|`boolean`|event emitted when the validity changes|
|`inputBlurred`|`any`|event emitted when the input is blurred|
|`inputFocused`|`boolean`|event emitted when the form input is focused|
|`inputChanged`|`any`|event emitted when the form input changes|
|`imageRecognition`|`any`|event emitted when clicking on the recognition button|