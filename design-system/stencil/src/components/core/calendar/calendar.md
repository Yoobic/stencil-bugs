---
name: Calendar
category: Core Components
---

```calendar.html
    <yoo-calendar></yoo-calendar>
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`activeDay`|Date|   |the currently active day|
|`displayMode`|`'month' | 'week'`|`month`   |the calendar's display mode|
|`markers`|ICalendarMarker|   |markers to display in the calendar|
|`extraMarkers`|ICalendarMarker|   |additional markers to display in the calendar (different color)|
|`markersNoCount`|`Array<{ _id: string}>`|   |markers with no count to display in the calendar (different color)|

## Relevant interfaces

```typescript
export interface ICalendarMarker {
    _id: string;
    count: number;
}
```

## Events
|Attr|Description|
|---|---|
|`dateChanged`|fired when the active day of the calendar is changed|