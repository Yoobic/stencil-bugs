---
name: Device
category: Core Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`heading`|string|   |heading of the top bar|
|`hideBar`|boolean|`false`|hide/show the top bar in the device|

### Heading

```yoo-device-heading.html
    <yoo-device heading="Yoobic"></yoo-device>
```

### HideBar

```yoo-device-hide-bar.html
    <yoo-device heading="Yoobic" hide-bar="true"></yoo-device>
```

### With Slot

```yoo-device-slot-content.html
    <yoo-device heading="Yoobic">
        <div >
            <span>Device Content Slot</span>
            <yoo-badge text="DEVICE" class="danger"></yoo-badge>
            <yoo-badge text="CONTENT" class="info"></yoo-badge>
            <yoo-badge text="SLOT" class="success"></yoo-badge>
            <p>
            Lorem ipsum dolor amet pork belly man braid PBR&B stumptown prism drinking vinegar lomo neutra organic keffiyeh. Taiyaki VHS pug, snackwave cliche polaroid subway tile jean shorts typewriter small batch. Unicorn synth slow-carb bitters, hashtag retro butcher DIY vape austin cliche hoodie semiotics. Brooklyn disrupt cliche green juice, unicorn meditation flexitarian palo santo pop-up. Quinoa air plant post-ironic 8-bit. 8-bit flexitarian blue bottle, try-hard aesthetic biodiesel forage. Cliche raw denim pop-up, blue bottle sartorial meggings farm-to-table ethical four loko polaroid bicycle rights disrupt af mixtape artisan.
            </p>
        </div>
    </yoo-device>
```