---
name: Mission Heading
category: Entities Components
---

```mission-heading.html
    <yoo-mission-heading></yoo-mission-heading>
```

```mission-heading.js hidden
var comp = document.querySelector('yoo-mission-heading');
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
## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`mission`|IMission|*required|contains the informations related to the mission|
