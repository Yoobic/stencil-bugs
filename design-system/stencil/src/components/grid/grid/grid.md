---
name: Grid
category: Grid Components
---

```yoo-grid-empty.html
    <yoo-grid class="bordered"></yoo-grid>
```

```
export type CardType = 'card-feed' | 'card-list' | 'card-default' | 'card-sticky';
export type EntityType = 'missions' | 'channel' | 'channels' | 'environnement' | 'feeds' | 'feedsComments' | 'blog' | 'users' | 'notifications' | 'files' | 'folders' | 'filesFolders';
```

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`direction`|'vertical' 'horizontal'|   ||
|`items`|Array < IEntity>|   |An array of items to be displayed in the grid|
|`selection`|IEntity|   ||
|`isLocal`|boolean|false||
|`columnDefs`|Array < IColumnDefinition>|[]|An array of definitions for the columns in the grid|
|`total`|number|0|the total number of items in the grid|
|`looseCount`|boolean|false||
|`emptyState`|string|||
|`displayType`|CardType|||
|`entityType`|EntityType|||
|`hideHeader`|boolean|false|Hide the grid header completly|
|`hideFooter`|boolean|false|Hide the grid footer completly|
|`showFilters`|boolean|false|Show the advanced search button and the search input|
|`showFiltersSimple`|boolean|true|Show only the search input (if showFilters is turned off)|
|`showCreate`|boolean|true|Show the create button|
|`pageSize`|number|`20`|the number of items per page|
|`type`|'grid'  'card'  'tree' = 'card'||Display type of the grid: list, grid, card, tree|
|`headerFn?`|(item, index, records) => string|||
|`isLoading`|boolean| | |
|`icons`|Array < IEntityAction>| | |
|`topActions`|Array < IEntityAction>| | |
|`bottomActions`|Array < IEntityAction>| | |
|`secondaryActions`|Array < IEntityAction>| | |

```yoo-grid.html
    <yoo-grid class="bordered"></yoo-grid>
```

```yoo-grid:grid-example.js hidden
```

## CSS

|Type|Name|Description|
|---|---|---|
|Bordered|`bordered`|adds a border around the grid|

## Events

|Attr|Description|
|---|---|---|
|`fetchData`|event emitted when a user triggers something that needs to request new data|
