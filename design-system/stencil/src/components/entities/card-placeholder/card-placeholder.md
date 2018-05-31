---
name: Card Placeholder
category: Entities Components
---

```
export type CardType = 'card-feed' | 'card-list' | 'card-default' | 'card-sticky';
export type EntityType = 'missions' | 'channel' | 'channels' | 'environnement' | 'feeds' | 'feedsComments' | 'blog' | 'users' | 'notifications' | 'files' | 'folders' | 'filesFolders';
```

|Name|Type|Default|Description|
|---|---|---|---|
|`displayType`|CardType|   |the type of card|
|`entityType`|EntityType|   |the type entity of the card|

```card-placeholder.html
<yoo-card-placeholder></yoo-card-placeholder> 
<br/>
<yoo-card-placeholder display-type='card-sticky' entity-type="feeds"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-feed' entity-type="feeds"></yoo-card-placeholder>
<br/>
<!-- <yoo-card-placeholder display-type='card-feed' entity-type="blog"></yoo-card-placeholder>
<br/> -->
<yoo-card-placeholder display-type='card-list' entity-type="missions"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-list' entity-type="users"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-list' entity-type="feedsComments"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-list' entity-type="folders"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-list' entity-type="notifications"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-list' entity-type="channel"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-list' entity-type="channels"></yoo-card-placeholder>
<br/>
<yoo-card-placeholder display-type='card-list' entity-type="environnement"></yoo-card-placeholder>

```