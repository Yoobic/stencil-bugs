---
name: Result Dialog
category: Core Components
---

```result-dialog.html
  <div style="height: 260px; width: 271px;">
    <yoo-result-dialog></yoo-result-dialog>
    </div>
```

```result-dialog.js
    var comp = document.querySelector('yoo-result-dialog');
    comp.heading = 'You’ve Approved this Mission';
    comp.subheading = 'We will notify the Author as soon as possible';
    comp.success = true;
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`heading`|string| undefined | the heading inside the dialog|
|`subheading`|string| undefined | the subheading inside the dialog|
|`success`|boolean| false |whether if the mission is a success or has been rejected |
|`buttonText`|string| OK |the text displayed on the button footer |

|Attr|Description|
|---|---|
|`close`| emit when we click on the buttonText|
