---
name: Pagination
category: Core Components
---
The pagination element is responsible for showing a pager object that allows browsing between pages. The pagination element is stateless. It is up to the containing element to store the current page that is being displayed and send it as a parameter 

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`totalItems`|number|   |The total number of items that exist and should be paginated upon|
|`itemsPerPage`|number| |Number of items that should be displayed per page|
|`currentPage`|number|0|the index of the current page being displayed. i.e. start with 0 will be page 1|
|`showTotal`|boolean|false|Should the show total be displayed. Show total is only displayed subject to screen real estate availability, if maximum pager size was reached |
|`maxPagerSize`|number| 11 |The maximum pager size to be displayed. Pager size will attempt to allocate real estate up to the maxPagerSize|

```yoo-pagination-variations.html
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" class="dark"></yoo-pagination>
    <br>
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" max-pager-size="5" class="dark"></yoo-pagination>
    <br>
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" class="dark" show-total="true"></yoo-pagination>    
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|pagination accent|
|Danger|`danger`|pagination danger|
|Success|`success`|pagination success|
|Info|`info` |pagination info|
|Warning|`warning`|pagination warning|
|dark|`dark`|pagination dark|

```yoo-pagination.html
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" show-total="true", max-page-size="7" class="dark"></yoo-pagination>
    <br>
    <br>
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" show-total="true", max-page-size="7" class="accent"></yoo-pagination>
    <br>
    <br>
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" show-total="true", max-page-size="7" class="danger"></yoo-pagination>
    <br>
    <br>
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" show-total="true", max-page-size="7" class="success"></yoo-pagination>
    <br>
    <br>
    <yoo-pagination total-items="100" current-page="3" items-per-page="10" show-total="true", max-page-size="7" class="info"></yoo-pagination>
    <br>
    <br>
        <yoo-pagination total-items="100" current-page="3" items-per-page="10" show-total="true", max-page-size="7" class="warning"></yoo-pagination>
    <br>
    <br>
```

## Events

|Attr|Description|
|---|---|
|`pageChanged`|This event will be emitted when the user has clicked a request to change the page. This can be a clicking the next and prev arrows, or selecting a specific page. The event will be raised with the new page index|
|`itemsPerPageChanged`|This event will be emitted when the user has clicked a request to change the number of items per page.
