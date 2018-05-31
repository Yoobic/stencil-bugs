---
name: Fab List
category: Core Components
---

A `yoo-fab-list` is used inside a `yoo-fab-container` and it's children should only consist of `yoo-fab-button`'s and their respective properties.

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`side`|string|`top`|the side to which the list will be displayed|
|`mini`|boolean|`false`|reduce the size of all buttons inside the list|
|`activated`|boolean|`false`||
|`animated`|boolean|`false`|will animate fab button transition on activation|

### Side

`yoo-fab-lists` can be activated and opened onto any size.

```yoo-fab-list.html
<yoo-fab-container middle center animated="true">
    <yoo-fab-button id="btn1"></yoo-fab-button>
    <yoo-fab-list id="list1" side="left">
      <yoo-fab-button class="gradient-success"></yoo-fab-button>
      <yoo-fab-button class="info"></yoo-fab-button>
      <yoo-fab-button class="warning"></yoo-fab-button>
    </yoo-fab-list>
    <yoo-fab-list id="list2" side="right">
        <yoo-fab-button class="accent"></yoo-fab-button>
        <yoo-fab-button class="danger"></yoo-fab-button>
        <yoo-fab-button class="success"></yoo-fab-button>
    </yoo-fab-list>
    <yoo-fab-list id="list3" side="top">
        <yoo-fab-button label="Label1" class="accent"></yoo-fab-button></yoo-fab-button>
        <yoo-fab-button label="Label2" class="danger"></yoo-fab-button>
        <yoo-fab-button label="Label3" class="success"></yoo-fab-button>
    </yoo-fab-list>
    <yoo-fab-list id="list4" side="bottom">
        <yoo-fab-button label="Label1" class="accent"></yoo-fab-button>
        <yoo-fab-button label="Label2" class="danger"></yoo-fab-button>
        <yoo-fab-button label="Label3" class="success"></yoo-fab-button>
    </yoo-fab-list>
</yoo-fab-container>
```

```yoo-fab-list.js
var btn1 = document.querySelector('#btn1');
  btn1.fabEntry = {
    icon: 'yo-more'
  }

var list1 = document.querySelector('#list1');
  var btns1 = list1.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns1.length; i++){
    btns1[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }

  var list2 = document.querySelector('#list2');
  var btns2 = list2.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns2.length; i++){
    btns2[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }

 var list3 = document.querySelector('#list3');
  var btns3 = list3.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns3.length; i++){
    btns3[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }

 var list4 = document.querySelector('#list4');
  var btns4 = list4.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns4.length; i++){
    btns4[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }
```

### Mini

Buttons inside the list will be of smaller size than the main `yoo-fab-button`.

```yoo-fab-list-mini.html
<yoo-fab-container middle center animated="true">
    <yoo-fab-button id="btn1"></yoo-fab-button>
    <yoo-fab-list id="list1" side="left" mini="true">
      <yoo-fab-button class="gradient-success"></yoo-fab-button>
      <yoo-fab-button class="info"></yoo-fab-button>
      <yoo-fab-button class="warning"></yoo-fab-button>
    </yoo-fab-list>
    <yoo-fab-list id="list2" side="right" mini="true">
        <yoo-fab-button class="accent"></yoo-fab-button>
        <yoo-fab-button class="danger"></yoo-fab-button>
        <yoo-fab-button class="success"></yoo-fab-button>
    </yoo-fab-list>
    <yoo-fab-list id="list3" side="top" mini="true">
        <yoo-fab-button class="accent"></yoo-fab-button></yoo-fab-button>
        <yoo-fab-button class="danger"></yoo-fab-button>
        <yoo-fab-button class="success"></yoo-fab-button>
    </yoo-fab-list>
    <yoo-fab-list id="list4" side="bottom" mini="true">
        <yoo-fab-button class="accent"></yoo-fab-button>
        <yoo-fab-button class="danger"></yoo-fab-button>
        <yoo-fab-button class="success"></yoo-fab-button>
    </yoo-fab-list>
</yoo-fab-container>
```

```yoo-fab-list-mini.js
var btn1 = document.querySelector('#btn1');
  btn1.fabEntry = {
    icon: 'yo-fire'
  }

var list1 = document.querySelector('#list1');
  var btns1 = list1.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns1.length; i++){
    btns1[i].fabEntry = {
      icon: 'yo-more',
      handler: () => console.log('calling handler')
    }
  }

  var list2 = document.querySelector('#list2');
  var btns2 = list2.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns2.length; i++){
    btns2[i].fabEntry = {
      icon: 'yo-fire',
      handler: () => console.log('calling handler')
    }
  }

 var list3 = document.querySelector('#list3');
  var btns3 = list3.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns3.length; i++){
    btns3[i].fabEntry = {
      icon: 'yo-check',
      handler: () => console.log('calling handler')
    }
  }

 var list4 = document.querySelector('#list4');
  var btns4 = list4.querySelectorAll('yoo-fab-button')
  for(var i =0; i < btns4.length; i++){
    btns4[i].fabEntry = {
      icon: 'yo-fire',
      handler: () => console.log('calling handler')
    }
  }
```
