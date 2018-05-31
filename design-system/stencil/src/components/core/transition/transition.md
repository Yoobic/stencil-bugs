---
name: Transition
category: Core Components
---
## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`type`|string|`fade`|the transition type: fade, bottom, scale-up, icon, image, heading|
|`heading`|string|  |The main text in a transition, only to be used for type: fade, bottom, heading|
|`subHeading`|string|   |The sub heading of a transition, only to be used for type: heading|
|`icon`|string|   |The icon of a  icon transition, only to be used for type: icon|
|`image`|string|   |The image of a image transition, only to be used for type: image|

```yoo-transition.html
    <div class="column">
        <div class="wrapper">
            <div class="spacer">
                <yoo-transition type="fade" heading="FADE" class="accent">
                    <div >
                        <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                    </div>
                </yoo-transition>
            </div>
            <div class="spacer">
                <yoo-transition type="bottom" heading="BOTTOM">
                    <div >
                        <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                    </div>
                </yoo-transition>
            </div>
            <div class="spacer">
                <yoo-transition type="scale-up">
                    <div >
                        <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                    </div>
                </yoo-transition>
            </div>
        </div>
    <div class="wrapper">
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="light">
                <div >
                    <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
        <div class="spacer">
            <yoo-transition type="image" image="http://www.intrawallpaper.com/static/images/hd-wallpaper-download-old-car.jpg">
                <div >
                    <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
        <div class="spacer">
            <yoo-transition type="heading" heading="HEADING" sub-heading="Sub Heading" class="light">
                <div >
                    <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
    </div>
    </div>
```

```yoo-transition.css hidden
    .wrapper {
        display: flex;
        flex-direction: row;
        padding: 10px;
    }
    .spacer {
        padding: 0 10px;
    }
```

## CSS
|Type|Name|Description|
|---|---|---|
|Light|`light`|transition light|
|Accent|`accent`|transition accent|
|Danger|`danger`|transition danger|
|Success|`success`|transition success|
|Info|`info` |transition info|
|Warning|`warning`|transition warning|
|dark|`dark`|transition dark|

```yoo-transition-styles.html
    <div class="column">
        <div class="wrapper">
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="light">
                <div >
                    <img src="https://i.imgur.com/uomkVIL.png" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="accent">
                <div >
                    <img src="https://i.imgur.com/uomkVIL.png" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="danger">
                <div >
                    <img src="https://i.imgur.com/uomkVIL.png" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
        </div>
    <div class="wrapper">
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="success">
                <div >
                    <img src="https://i.imgur.com/uomkVIL.png" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="info">
                <div >
                    <img src="https://i.imgur.com/uomkVIL.png" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="warning">
                <div >
                    <img src="https://i.imgur.com/uomkVIL.png" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
    </div>
    <div class="wrapper">
        <div class="spacer">
            <yoo-transition type="icon" icon="yo-plus" class="dark">
                <div >
                    <img src="https://i.imgur.com/uomkVIL.png" alt="Image" height="200"/>
                </div>
            </yoo-transition>
        </div>
    </div>
    </div>
```

```yoo-transition-styles.css hidden
    .wrapper {
        display: flex;
        flex-direction: row;
        padding: 10px;
    }
    .spacer {
        padding: 0 10px;
    }
```