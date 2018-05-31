---
name: Card Feed
category: Entities Components
---

```yoo-card-feed.html
    <yoo-card-feed></yoo-card-feed>
```
```yoo-card-feed.js
    
    var card = document.querySelector('yoo-card-feed');
    var entry = {
    heading: "Jerome barber",
    description: "New photo shooting. This is extremely cool ! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    topLeftBadge:"PDF",
    bottomLeftIcon:"yo-trophy",
    imgSrc:"https://blog.shelvingdesignsystems.com/hs-fs/hub/218229/file-22618644-jpg/images/make_the_most_of_retail_displays.jpg?t=1523455671276",
    icon:"https://resources.stuff.co.nz/content/dam/images/1/i/o/a/a/c/image.related.StuffLandscapeSixteenByNine.620x349.1ioalf.png/1492902717643.jpg",
    subheadings: ['32 min ago'],
    tags: ['London', 'shouting', 'photo', 'business'],
    icons: [{icon: 'yo-heart', value: 45, handler: () => {}},
                                {icon: 'yo-comment', value: 5645, handler: () => {}},
                                {icon: 'yo-eye', value: 45}],
    actions:[{text: 'action1', icon:'yo-fire'}],
    bottomAction: {name: "Add a comment...", handler: () => console.log('comment') },
    groups: ['sportscene_storessportscene_regional-', 'sportscene_storessportscene_regional-'],
    sharedIn: 'Shared in'
  };
  card.entry = entry;
```
## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`entry`|ICardEntry|   |entry to the feed card|

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-card-feed accent|
|Dark|`dark`|yoo-card-feed dark|
|Success|`success`|yoo-card-feed success|
|Danger|`danger`|yoo-card-feed danger|
|Info|`info`|yoo-card-feed info|
|Warning|`warning`|yoo-card-feed warning|
|Gradient Accent|`gradient-accent`|yoo-card-feed gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-card-feed gradient-grey|
|Gradient Success|`gradient-success`|yoo-card-feed gradient-success|
|Gradient Danger|`gradient-danger`|yoo-card-feed gradient-danger|
|Gradient Info|`gradient-info`|yoo-card-feed gradient-info|
|Gradient Warning|`gradient-warning`|yoo-card-feed gradient-warning|
