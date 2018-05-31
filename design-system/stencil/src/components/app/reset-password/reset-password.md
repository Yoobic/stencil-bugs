---
name: Reset Password
category: App Components
---

```yoo-reset-password.html
    <yoo-reset-password heading="Reset Password" subheading="sub-title" border-class="success" button-class="gradient-success" input-label="Email Address" button-text="Submit"></yoo-reset-password>
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`heading`|string|   |the heading|
|`subheading`|string|   |the sub heading|
|`borderClass`|string|  |the color of the input border on focus|
|`buttonClass`|string|  |the class of the submit button|
|`inputLabel`|string|    |the label of the email input|
|`isMagicLink`|boolean|`false`|a boolean emitted on email submit|

## Events
|Attr|Description|
|---|---|---|
|`passwordResetRequestSubmitted`|the event trigged on the submit button being clicked|