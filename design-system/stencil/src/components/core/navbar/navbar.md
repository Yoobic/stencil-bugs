---
name: Navbar
category: Core Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`titles`|string[]|   |the titles of the navbar|
|`selectedTitle`|string|  |the title that will be selected on loading the component|
|`activeLine`|boolean|`false`|toggle line under active item|
|`actionBtnText`|string||show an action button to the right of the navbar|

```yoo-navbar.html
    <yoo-navbar class="success" id="navbar1"></yoo-navbar>
    <br>
    <yoo-navbar class="success" action-btn-text="post" id="navbar3"></yoo-navbar>
    <br>
    <yoo-navbar with-line="true" selected-title="Section 5" id="navbar2"></yoo-navbar>
```

```yoo-navbar.js
    var comp1 = document.querySelector('#navbar1');
    comp1.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp2 = document.querySelector('#navbar2');
    comp2.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3', hasNotification: true },
    { title: 'Section 4', value: 'section4' }
  ];
  var comp3 = document.querySelector('#navbar3');
    comp3.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-navbar accent|
|Dark|`dark`|yoo-navbar dark|
|Success|`success`|yoo-navbar success|
|Danger|`danger`|yoo-navbar danger|
|Info|`info`|yoo-navbar info|
|Warning|`warning`|yoo-navbar warning|
|Negative Accent|`negative-accent`|yoo-navbar negative-accent|
|Negative Dark|`negative-dark`|yoo-navbar negative-grey|
|Negative Success|`negative-success`|yoo-navbar negative-success|
|Negative Danger|`negative-danger`|yoo-navbar negative-danger|
|Negative Info|`negative-info`|yoo-navbar negative-info|
|Negative Warning|`negative-warning`|yoo-navbar negative-warning|

```yoo-navbar-styles.html
    <yoo-navbar class="accent" selected-title="Section 1" id="navbar1"></yoo-navbar>
    <br>
    <yoo-navbar class="danger" selected-title="Section 1" id="navbar2"></yoo-navbar>
    <br>
    <yoo-navbar class="success" selected-title="Section 1" id="navbar3"></yoo-navbar>
    <br>
    <yoo-navbar class="info" selected-title="Section 1" id="navbar4"></yoo-navbar>
    <br>
    <yoo-navbar class="warning" selected-title="Section 1" id="navbar5"></yoo-navbar>
    <br>
    <yoo-navbar class="dark" selected-title="Section 1" id="navbar6"></yoo-navbar>
    <br>
    <yoo-navbar class="negative-accent" selected-title="Section 1" id="navbar7"></yoo-navbar>
    <br>
    <yoo-navbar class="negative-danger" selected-title="Section 1" id="navbar8"></yoo-navbar>
    <br>
    <yoo-navbar class="negative-success" selected-title="Section 1" id="navbar9"></yoo-navbar>
    <br>
    <yoo-navbar class="negative-info" selected-title="Section 1" id="navbar10"></yoo-navbar>
    <br>
    <yoo-navbar class="negative-warning" selected-title="Section 1" id="navbar11"></yoo-navbar>
    <br>
    <yoo-navbar class="negative-dark" selected-title="Section 1" id="navbar12"></yoo-navbar>
```

```yoo-navbar-styles.js hidden
    var comp1 = document.querySelector('#navbar1');
    comp1.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp2 = document.querySelector('#navbar2');
    comp2.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp3 = document.querySelector('#navbar3');
    comp3.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp4 = document.querySelector('#navbar4');
    comp4.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp5 = document.querySelector('#navbar5');
    comp5.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp6 = document.querySelector('#navbar6');
    comp6.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp7 = document.querySelector('#navbar7');
    comp7.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp8 = document.querySelector('#navbar8');
    comp8.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp9 = document.querySelector('#navbar9');
    comp9.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp10 = document.querySelector('#navbar10');
    comp10.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp11 = document.querySelector('#navbar11');
    comp11.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
    var comp12 = document.querySelector('#navbar12');
    comp12.tabs = [
    { title: 'Section 1', value: 'section1' },
    { title: 'Section 2', value: 'section2' },
    { title: 'Section 3', value: 'section3' },
    { title: 'Section 4', value: 'section4' }
  ];
```

## Events
|Attr|Description|
|---|---|---|
|`titleClicked`|emit title string when a title is clicked|
|`actionBtnClicked`|emit true if the button is clicked|