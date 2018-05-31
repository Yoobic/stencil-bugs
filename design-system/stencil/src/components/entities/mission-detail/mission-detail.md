---
name: Mission Detail
category: Entities Components
---

### New

```mission-detail-new.html
    <yoo-mission-detail></yoo-mission-detail>
```

```mission-detail-new.js hidden
  var comp = document.querySelector('yoo-mission-detail');
  comp.mission = {
    'title': 'Store Visit Report',
    'type': 'mission',
    'priority': 4,
    'duedate': '2017-06-28T13:25:10.384Z',
    'originalUnvalidatedReason': 'Lorem ipsum dolor sit amet, consectetur adipe',
    'progress': {
      'value': 20,
      'totalPhotos': 2
    },
    'icon': 'http://res.cloudinary.com/www-yoobic-com/image/upload/v1458059035/nv6zlofgiaajrrlnxppu.jpg',
    '_geoloc': [-0.23755030000006627, 51.5314998],
    'address': '2 Bayfront Avenue B1-39A/40 & B2-38/39 The Shoppes at Marina Bay Sands, 18972, Singapore',
    'location': {
      '_id': '5836c051a501dc00176549f5',
      'clientid': 'YOOBIC_PROJECT',
      'title': 'Chandelier Building',
      'address': 'Chandelier Bldg, 8 Scrubs Ln, White City, London NW10 6RB, Royaume-Uni',
      'contactname': 'Singapore - Marina Bay Sands',
      'contactphone': '604-938-3954',
      'tags': ['test', 'CELIO_V0'],
      'info': 'Lorem ipsum dolor sit amet, consectetur adipe'
    },
    'description': {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipe elit, sed do eiusmod tempor incididunt ut mare labore et dolore magna aliqua. Ut enim ad alor minim veniam, quis nostrud exercitation nerde ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'slides': [{}, {}, {}, {}, {}]
    }
  };
```
### Ongoing

```mission-detail-ongoing.html
    <yoo-mission-detail></yoo-mission-detail>
```

```mission-detail-ongoing.js hidden
  var comp = document.querySelector('yoo-mission-detail');
  comp.mission = {
    'title': 'Store Visit Report',
    'type': 'mission',
    'priority': 4,
    'duedate': '2017-06-28T13:25:10.384Z',
    'status': 'booked',
    'originalUnvalidatedReason': 'Lorem ipsum dolor sit amet, consectetur adipe',
    'progress': {
      'value': 20,
      'totalPhotos': 2
    },
    'icon': 'http://res.cloudinary.com/www-yoobic-com/image/upload/v1458059035/nv6zlofgiaajrrlnxppu.jpg',
    '_geoloc': [-0.23755030000006627, 51.5314998],
    'address': '2 Bayfront Avenue B1-39A/40 & B2-38/39 The Shoppes at Marina Bay Sands, 18972, Singapore',
    'location': {
      '_id': '5836c051a501dc00176549f5',
      'clientid': 'YOOBIC_PROJECT',
      'title': 'Chandelier Building',
      'address': 'Chandelier Bldg, 8 Scrubs Ln, White City, London NW10 6RB, Royaume-Uni',
      'contactname': 'Singapore - Marina Bay Sands',
      'contactphone': '604-938-3954',
      'tags': ['test', 'CELIO_V0'],
      'info': 'Lorem ipsum dolor sit amet, consectetur adipe'
    },
    'description': {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipe elit, sed do eiusmod tempor incididunt ut mare labore et dolore magna aliqua. Ut enim ad alor minim veniam, quis nostrud exercitation nerde ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'slides': [{}, {}, {}, {}, {}]
    }
  };
```
### Pending

```mission-detail-pending.html
    <yoo-mission-detail></yoo-mission-detail>
```

```mission-detail-pending.js hidden
  var comp = document.querySelector('yoo-mission-detail');
  comp.mission = {
    'title': 'Store Visit Report',
    'type': 'mission',
    'priority': 4,
    'validatedDate': '2017-06-28T13:25:10.384Z',
    'status': 'finished',
    'originalUnvalidatedReason': 'Lorem ipsum dolor sit amet, consectetur adipe',
    'progress': {
      'value': 100,
      'totalPhotos': 2
    },
    'icon': 'http://res.cloudinary.com/www-yoobic-com/image/upload/v1458059035/nv6zlofgiaajrrlnxppu.jpg',
    '_geoloc': [-0.23755030000006627, 51.5314998],
    'address': '2 Bayfront Avenue B1-39A/40 & B2-38/39 The Shoppes at Marina Bay Sands, 18972, Singapore',
    'location': {
      '_id': '5836c051a501dc00176549f5',
      'clientid': 'YOOBIC_PROJECT',
      'title': 'Chandelier Building',
      'address': 'Chandelier Bldg, 8 Scrubs Ln, White City, London NW10 6RB, Royaume-Uni',
      'contactname': 'Singapore - Marina Bay Sands',
      'contactphone': '604-938-3954',
      'tags': ['test', 'CELIO_V0'],
      'info': 'Lorem ipsum dolor sit amet, consectetur adipe'
    },
    'description': {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipe elit, sed do eiusmod tempor incididunt ut mare labore et dolore magna aliqua. Ut enim ad alor minim veniam, quis nostrud exercitation nerde ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'slides': [{}, {}, {}, {}, {}]
    }
  };
```
### Approved

```mission-detail-approved.html
    <yoo-mission-detail></yoo-mission-detail>
```

```mission-detail-approved.js hidden
  var comp = document.querySelector('yoo-mission-detail');
  comp.mission = {
    'title': 'Store Visit Report',
    'type': 'mission',
    'priority': 4,
    'validatedDate': '2017-06-28T13:25:10.384Z',
    'validated': true,
    'originalUnvalidatedReason': 'Lorem ipsum dolor sit amet, consectetur adipe',
    'progress': {
      'value': 20,
      'totalPhotos': 2
    },
    'icon': 'http://res.cloudinary.com/www-yoobic-com/image/upload/v1458059035/nv6zlofgiaajrrlnxppu.jpg',
    '_geoloc': [-0.23755030000006627, 51.5314998],
    'address': '2 Bayfront Avenue B1-39A/40 & B2-38/39 The Shoppes at Marina Bay Sands, 18972, Singapore',
    'location': {
      '_id': '5836c051a501dc00176549f5',
      'clientid': 'YOOBIC_PROJECT',
      'title': 'Chandelier Building',
      'address': 'Chandelier Bldg, 8 Scrubs Ln, White City, London NW10 6RB, Royaume-Uni',
      'contactname': 'Singapore - Marina Bay Sands',
      'contactphone': '604-938-3954',
      'tags': ['test', 'CELIO_V0'],
      'info': 'Lorem ipsum dolor sit amet, consectetur adipe'
    },
    'description': {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipe elit, sed do eiusmod tempor incididunt ut mare labore et dolore magna aliqua. Ut enim ad alor minim veniam, quis nostrud exercitation nerde ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'slides': [{}, {}, {}, {}, {}]
    }
  };
```

### Rejected

```mission-detail-rejected.html
    <yoo-mission-detail></yoo-mission-detail>
```

```mission-detail-rejected.js hidden
  var comp = document.querySelector('yoo-mission-detail');
  comp.mission = {
    'title': 'Store Visit Report',
    'type': 'mission',
    'priority': 4,
    'validatedDate': '2017-06-28T13:25:10.384Z',
    'validated': false,
    'originalUnvalidatedReason': 'Lorem ipsum dolor sit amet, consectetur adipe',
    'progress': {
      'value': 20,
      'totalPhotos': 2
    },
    'icon': 'http://res.cloudinary.com/www-yoobic-com/image/upload/v1458059035/nv6zlofgiaajrrlnxppu.jpg',
    '_geoloc': [-0.23755030000006627, 51.5314998],
    'address': '2 Bayfront Avenue B1-39A/40 & B2-38/39 The Shoppes at Marina Bay Sands, 18972, Singapore',
    'location': {
      '_id': '5836c051a501dc00176549f5',
      'clientid': 'YOOBIC_PROJECT',
      'title': 'Chandelier Building',
      'address': 'Chandelier Bldg, 8 Scrubs Ln, White City, London NW10 6RB, Royaume-Uni',
      'contactname': 'Singapore - Marina Bay Sands',
      'contactphone': '604-938-3954',
      'tags': ['test', 'CELIO_V0'],
      'info': 'Lorem ipsum dolor sit amet, consectetur adipe'
    },
    'description': {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipe elit, sed do eiusmod tempor incididunt ut mare labore et dolore magna aliqua. Ut enim ad alor minim veniam, quis nostrud exercitation nerde ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'slides': [{}, {}, {}, {}, {}]
    }
  };
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`mission`|IMission|*required|contains the informations related to the mission|
|`slidesNumber`|string|undefined|the number of steps|
|`photosNumber`|string|undefined|the number of photos|
|`questionsNumber`|string|undefined|the number of question|

|Attr|Description|
|---|---|
|`book`| emit either 'start', 'unbook' when we click on a button on the footer|
