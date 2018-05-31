---
name: Avatar
category: Core Components
---

## Attributes

By default, icons will not appear if not specified.

|Name|Type|Default|Description|
|---|---|---|---|
|`imgSrc`|string|   |Image to display in the avatar|
|`user`|IUser|   |interface representing a user|
|`topRightIcon`|string|   |Icon to display at the top right|
|`topLeftIcon`|string|   |Icon to display at the top left|
|`bottomRightIcon`|string|   |Icon to display at the bottom right|
|`bottomLeftIcon`|string|   |Icon to display at the bottom left|

```yoo-avatar.html
<div style="padding:10px;">
    <yoo-avatar class="xlarge" img-src="https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png" top-right-icon="yo-fire" bottom-right-icon="yo-fire" top-left-icon="yo-number" bottom-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="large" img-src="https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar  img-src="https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png" bottom-left-icon="yo-fire" top-right-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="medium" img-src="https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png" bottom-left-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="small" img-src="https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png" bottom-right-icon="yo-fire" top-right-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="xsmall" img-src="https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
</div>
```

```yoo-avatar.css hidden
    yoo-avatar {
        padding-right: 10px;
    }
```

```yoo-avatar-user.html
<div style="padding:10px;">
    <yoo-avatar class="xlarge" top-right-icon="yo-fire" bottom-right-icon="yo-fire" top-left-icon="yo-number" bottom-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="large" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar  bottom-left-icon="yo-fire" top-right-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="medium" bottom-left-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="small" bottom-right-icon="yo-fire" top-right-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="xsmall" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
</div>
```
```yoo-avatar-user.js 

    var avatars = document.querySelectorAll('yoo-avatar');
    user = {firstName: "James", lastName: "Bond"};
    avatars.forEach(a => a.user = user);
```

```yoo-avatar-user.css hidden
    yoo-avatar {
        padding-right: 10px;
    }
```

## CSS

Default size is 40px. It is a circle by default.

|Type|Name|Description|
|---|---|---|
|Squared|`squared`|avatar squared|
|XLarge|`xlarge`|Extra large avatar (128px)|
|Large|`large`|Large avatar (96px)|
|Medium|`medium`|Medium avatar (32px)|
|Small|`small`|Small avatar (24px)|
|XSmall|`x-small`|Extra small avatar (16px)|
|Accent|`accent`|<%=dasherize(name)%> accent|
|Dark|`dark`|<%=dasherize(name)%> dark|
|Success|`success`|<%=dasherize(name)%> success|
|Danger|`danger`|<%=dasherize(name)%> danger|
|Info|`info`|<%=dasherize(name)%> info|
|Warning|`warning`|<%=dasherize(name)%> warning|
|Gradient Accent|`gradient-accent`|<%=dasherize(name)%> gradient-accent|
|Gradient Dark|`gradient-dark`|<%=dasherize(name)%> gradient-dark|
|Gradient Success|`gradient-success`|<%=dasherize(name)%> gradient-success|
|Gradient Danger|`gradient-danger`|<%=dasherize(name)%> gradient-danger|
|Gradient Info|`gradient-info`|<%=dasherize(name)%> gradient-info|
|Gradient Warning|`gradient-warning`|<%=dasherize(name)%> gradient-warning|

```yoo-avatar-squared.html
<div style="padding:10px;">
    <yoo-avatar class="xlarge" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar  img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="medium" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="small" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="xsmall" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <br/>
    <br/>
    <br/>
    <yoo-avatar class="xlarge squared" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large squared"  img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="squared" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="medium squared" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="small squared" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="xsmall squared" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <br/>
    <br/>
    <yoo-avatar class="xlarge top-left-icon" img-src="./assets/grid/empty-state-1.svg" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="large top-left-icon" img-src="./assets/grid/empty-state-1.svg" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="squared top-left-icon bottom-right-left" img-src="./assets/grid/empty-state-1.svg" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="medium  top-left-icon" img-src="./assets/grid/empty-state-1.svg" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="small bottom-right-icon" img-src="./assets/grid/empty-state-1.svg" bottom-right-icon="yo-fire" top-left-icon="yo-fire"></yoo-avatar>
    <yoo-avatar class="xsmall top-left-icon" img-src="./assets/grid/empty-state-1.svg" bottom-right-icon="yo-fire" top-left-icon="yo-number"></yoo-avatar>
    <br/>
    <br/>
    <yoo-avatar class="xlarge squared" top-right-icon="yo-fire" bottom-left-icon="yo-fire" bottom-right-icon="yo-fire" top-left-icon="yo-fire" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large squared" bottom-left-icon="yo-fire" top-right-icon="yo-fire" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="squared" bottom-right-icon="yo-fire" top-left-icon="yo-fire" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="medium squared" bottom-right-icon="yo-fire" top-left-icon="yo-fire" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="small squared"  bottom-right-icon="yo-fire" top-left-icon="yo-fire" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="xsmall squared"  bottom-right-icon="yo-fire" top-left-icon="yo-fire" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <br/>
    <br/>
    <yoo-avatar class="large accent" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large dark" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large success" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large danger" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large info" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large warning" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large gradient-accent" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large gradient-dark" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large gradient-success" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large gradient-danger" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large gradient-info" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
    <yoo-avatar class="large gradient-warning" img-src="./assets/grid/empty-state-1.svg"></yoo-avatar>
</div>
```

```yoo-avatar-squared.css hidden
    yoo-avatar {
        padding-right: 10px;
    }
```

## Events
|Attr|Description|
|---|---|---|
|`topRightClicked`|event emitted when the icon top right is clicked|
|`topLeftClicked`|event emitted when the icon top left is clicked|
|`bottomRightClicked`|event emitted when the icon bottom right is clicked|
|`bottomLeftClicked`|event emitted when the icon bottom left is clicked|