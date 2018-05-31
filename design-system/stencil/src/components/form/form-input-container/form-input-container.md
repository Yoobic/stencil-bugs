---
name: Container
category: Form Components
---

The container should be used to wrap a form component.

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`label`|string|   |the input label|
|`description`|string|   |the form input description|
|`required`|boolean|`false` |`true` adds required red star to label|
|`hint`|string|   |adds hint text under the form input|

```yoo-form-input-container.html
        <yoo-form-input-container label="my label" description="A form container with a form input as content." hint="this is a hint" required="true">
            <div >
                <yoo-form-input></yoo-form-input>
            </div>
        </yoo-form-input-container>
        <br><br>
         <yoo-form-input-container label="this is a form container with a checkbox">
            <div >
                <yoo-form-checkbox text="this is a checkbox" class="accent"></yoo-form-checkbox>
            </div>
        </yoo-form-input-container>
        <br><br>
         <yoo-form-input-container>
            <div >
                 <yoo-form-input label="my label" placeholder="my place holder" description="A form container with a form input as content." placeholdertolabel="true"></yoo-form-input> 
            </div>
        </yoo-form-input-container>
```