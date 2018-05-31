---
name: Chat
category: Core Components
---
The Chat component is a component designed to display conversation between two or more people.

## Message Interface

``` typescript
    export interface IChatMessage {
        content: string;
        author?: string;
        time?: string;
        isAlternate?: boolean;
        img?: string;
    }
```
|Name|Description|
|---|---|
|`content`|Content of the message|
|`author`|Author of the message|
|`time`|Time of the message|
|`isAlternate`|set to true if the message has been send by the current user|
|`img`|Source of the image displayed in the Chat|

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`heading`|string|   |Heading of the Chat|
|`messages`|IChatMessage[]|null|Messages of the Chat|

```yoo-chat.html
    <yoo-chat heading="Chat Title"></yoo-chat>
```

```yoo-chat.js
    var chat = document.querySelector('yoo-chat');
    chat.messages = [{content: "First message",author:"Seb",time:"2/05/18 8:47am"},
      {content: "2nd message: It seems to work fine but I'm sure there is a bug somewhere !",author:"Seb",
      img: "https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png", time:"2/05/18 8:51am"},
      {content: "Third message, it is a very very very very long message. Not so long after all !",author:"Mike",isAlternate: true, time:"2/05/18 9:34am"}];
```

## CSS

|Type|Name|Description|
|---|---|---|

## Events
|Attr|Description|
|---|---|---|
