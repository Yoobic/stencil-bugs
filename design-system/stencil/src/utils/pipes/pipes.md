---
name: Pipes
category: Developers
---

Pipes are used to transform data. All available pipe are exported in the pipes object. Utilization example: 

```tsx

import { pipes } from 'utils/pipes';

pipes.pipeName.transform(value, options);

```

See all available pipes below.

|Pipe name|param|options| Description|
|---------|-----|-------|------------|
|`round`|`number`|     |Return the nearest integer|
|`currency`|`number`|tag: `string` default `'EUR'`|Return the amount of money in the currency selected|
|`fileSize`|`number`|     |Return the formatted filesize based on the size of the file|
|`dateFormat`|`string | number | Date`|`string`     |Return the date formatted|
|`orderBy`|`Array<any>`|`string[]` |Return the array ordered following the options|
|`timeAgo`|`string`|     |Return the time passed since the given value|
|`timer`|`number`|  `'seconds' | 'minutes'  | 'hours'`   |Return the time formatted according to the options|
|`userInitial`|`IUser`|   |Return the initials of the IUser |
|`number`|`number`|   |Return a string with the number and an indicator (ex: 23456 -> 23 K; 3999999 -> 4K )|


export const pipes = {
    timeAgo: new TimeAgoPipe(),
    currency: new CurrencyPipe(),
    dateFormat: new DateFormatPipe(),
    fileSize: new FileSizePipe(),
    orderBy: new OrderByPipe(),
    round: new RoundPipe(),
    timer: new TimerPipe(),
    userInitial: new UserInitialPipe(),
    number: new NumberPipe()
};
## OrderBy

`keysWithOrder` is an array which contains the keys and orders. i.e. ['-name', 'age']
The key with `'-'` in the front is sorted by descending order. 
The key without `'-'` in the front is sorted by ascending order.

 
```tsx
 
users: Array<any> = [
     { 'user': 'fred',   'age': 48 },
     { 'user': 'barney', 'age': 34 },
     { 'user': 'fred',   'age': 40 },
     { 'user': 'barney', 'age': 36 }
   ];
   keysWithOrder: Array<any> = ['-name', 'age']
 
}
```
