---
name: Mission Results
category: Entities Components
---

```mission-results.html
    <yoo-mission-results></yoo-mission-results>
```

```mission-results.js hidden
var comp = document.querySelector('yoo-mission-results');
comp.mission =   {
        '_id': '5af31e19c099da00417e97e2',
        'finishedDate': '2018-05-09T16:14:10.069Z',
        'bookedDate': '2018-05-09T16:13:13.440Z',
        'locationRef': '5af2c9ffc099da00417e79ad',
        'locationTypeRef': '5af2c983c099da00417e797f',
        'descriptionRef': '5af2f7efc099da00417e83a9',
        'plansRef': [],
        '_lmt': '2018-05-09T16:14:10.070Z',
        '_ect': '2018-05-09T16:13:13.441Z',
        'ownerRef': '5af2cb58c099da00417e7c3e',
        'title': 'Store Visit Report',
        'type': 'mission',
        'autoRenewOnBooking': true,
        'tags': ['Monthly', 'StoreAction', 'Tactical'],
        '_kmd': {
            'ect': '2018-05-09T16:13:13.441Z',
            'lmt': '2018-05-09T16:14:10.070Z'
        },
        'icon': 'https://res.cloudinary.com/www-yoobic-com/image/upload/a_exif/v1525872264/j98fqw6enut1hknzjmel.png',
        '_acl': {
            'groups': {
                'r': ['yoobicv6_store_managers', 'yoobicv6_store', 'yoobicv6_field', 'admin'],
                'w': ['yoobicv6_store_managers',
                    'yoobicv6_store', 'yoobicv6_field', 'admin', 'manager'
                ]
            }
        },
        '_geoloc': [103.8578105, 1.2823747],
        'address': 'Singapore - Marina Bay Sands - 2 Bayfront Avenue #01-74, The Shoppes at Marina Bay Sands, Singapore 018972', 'status': 'finished', 'ownerDisplayName':
            'Cécilia Adams',
        'location': {
            '_id': '5af2c9ffc099da00417e79ad', 'title': 'Singapore - Marina Bay Sands', 'address': '2 Bayfront Avenue # 01 - 74, The Shoppes at Marina Bay Sands, Singapore 018972 '
        }, ' owner ': {
            '_id ': '5 af2cb58c099da00417e7c3e ',
            'firstName': 'Cécilia',
            'lastName': 'Adams',
            'username': 'storemanager@yoobicv6.com'
        }, 'creator': {}, 'description': {
            'title': 'Store Visit Report',
            'background': {
                'size': 16494,
                '_kmd': {
                    'ect': '2018-05-09T13:24:25.551Z',
                    'lmt': '2018-05-09T13:24:25.551Z'
                },
                'hideMobile': true,
                '_filename': 'Yoobic.png',
                '_downloadURL': 'https://res.cloudinary.com/www-yoobic-com/image/upload/a_exif/v1525872264/j98fqw6enut1hknzjmel.png',
                '_acl': {
                    'groups': {
                        'r': ['yoobicv6', 'yoobicv6_field', 'yoobicv6_hq', 'yoobicv6_managers', 'yoobicv6_store',
                            'yoobicv6_store_managers'
                        ],
                        'w': []
                    },
                    'creator': '5af2cab4c099da00417e7a4f'
                },
                'mimeType': 'image/png',
                '_lmt': '2018-05-09T13:24:25.551Z',
                '_ect': '2018-05-09T13:24:25.551Z',
                '_id': '5af2f689c099da00417e837f',
                'group': ['yoobicv6', 'yoobicv6_field', 'yoobicv6_hq', 'yoobicv6_managers',
                    'yoobicv6_store', 'yoobicv6_store_managers'
                ]
            }
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