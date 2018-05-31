---
name: Card File
category: Entities Components
---

```card-file.html
<div style="padding:1rem;">
<yoo-card-file heading="My long title document.docx" subheading="3.3 Mb" icon="yo-file-word" icon-class="accent"></yoo-card-file>
<br/>

<yoo-card-file heading="My long title document.docx" subheading="3.3 Mb" icon="yo-file-word" icon-class="accent" is-closable="true" id="card1"></yoo-card-file>

<br/>
<yoo-card-file heading="My long title document.pdf" subheading="2.5 Mb" icon="yo-file-pdf" icon-class="warning"></yoo-card-file>
<br/>
<yoo-card-file heading="My long title document.pdf" subheading="2.5 Mb" icon="yo-file-pdf" icon-class="warning" is-closable="true" id="card2"></yoo-card-file>
</div>
```

```card-file.js hidden
var comp1 = querySelector('#card1');
var comp2 = querySelector('#card2');

comp1.isClosable = true;
comp2.isClosable = true;
```


## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`icon`|string|   |the icon of the file|
|`iconClass`|string|   |the class of the icon|
|`heading`|string|   |the content in the heading|
|`subheading`|string|   |the content in the sub heading|
|`isClosable`|boolean|   |if it's closable, a cross will be displayed on the top right|
