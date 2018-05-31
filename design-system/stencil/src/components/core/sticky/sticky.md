---
name: Sticky
category: Core Components
---

Sticky components are used to for elements which remain at the top of the viewport, like a sticky navigation.

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`top`|string|`null`|Set the offset top of the sticky Element. Set it to 0 if you don't want any offset|
|`bottom`|string|`null`|Set the offset bottom of the sticky Element. Set it to 0 if you don't want any offset|

## Top Attribute

```yoo-sticky-top.html

    <div class="container">
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
        <yoo-sticky top="0">
            <div >
                <span>Bonjour</span>
            </div>
        </yoo-sticky>
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
    <div>
```
```yoo-sticky-top.css

.container {
    overflow: auto;
    height: 200px;
}

span {
    background: green;
    color: red;
}

```

## Bottom Attribute

```yoo-sticky-bottom.html

    <div class="container">
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
        <yoo-sticky bottom="10%">
            <div >
                <span>Bonjour</span>
            </div>
        </yoo-sticky>
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
        <p>
            This is a random container in a page 
            <br/>
            to test the sticky element.
            <br/>
            I hop it is working as expected.
            <br/>
            Call me if it doesn't
        </p>
    <div>
```
```yoo-sticky-bottom.css

.container {
    overflow: auto;
    height: 200px;
}

span {
    background: green;
    color: red;
}

```

