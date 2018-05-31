---
name: Card Sticky
category: Entities Components
---

```card-top.html
    <yoo-card-sticky></yoo-card-sticky>
```
```card-top.js 

var card = document.querySelector('yoo-card-sticky');
  var entry = {
    category: "CAREERS",
    title: "Job Interview? Here's what to do",
    buttonText: "Read More",
    handler: () => {console.log('handled');},
    imgSrc: "https://images.unsplash.com/photo-1481905997796-447b27c82b80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c29ff4b605cdb0ab24fd7346ab440a5&auto=format&fit=crop&w=1050&q=80"
  };
  card.entry = entry;

``` 

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`entry`|ICardStickyEntry|   |entry with props for the component|

