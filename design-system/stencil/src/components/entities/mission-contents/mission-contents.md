---
name: Mission Contents
category: Entities Components
---

```mission-contents.html
    <yoo-mission-contents></yoo-mission-contents>
```

```mission-contents.js
    var comp = document.querySelector('yoo-mission-contents');
    comp.slidesNumber = 3;
    comp.photosNumber = 4;
    comp.questionsNumber = 5;
```
## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`slidesNumber`|string|undefined|the number of steps|
|`photosNumber`|string|undefined|the number of photos|
|`questionsNumber`|string|undefined|the number of question|