---
name: Game
category: Form Components
---

```yoo-form-input-game.html
    <yoo-form-input-game></yoo-form-input-game>
```

```yoo-form-input-game.js
    var comp = document.querySelector('yoo-form-input-game');
    comp.name = 'Runner';
    comp.phaser = Phaser;
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`name`|`string`|   |Name of the game you want to play (See the section below for a list of all available games)|
|`phaser`|`any`|   |Phaser instance imported by the framework|
|`fieldId`|`string`|`game-div`|Id of the div where the phaser game will be set up. Leave default value if you don't need a custom value|



## Events
|Attr|Description|
|---|---|
|`gameOver`|Triggered when the game is over|

## Available Game

|Game name| Description|
|---------|--------|
|`Runner`|Game example of Mario|
|`Card`|Card Game|
|`Example`|Example game description|