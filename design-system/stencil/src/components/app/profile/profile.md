---
name: Profile
category: App Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`config`|IProfileConfig|*required|contains the informations related to the user, the links and the logout|

```yoo-profile.html
<yoo-profile></yoo-profile>
```

```yoo-profile.js
let profile = document.querySelector('yoo-profile');
profile.config = {
  user: { firstName: 'Cecilia' , lastName: 'Adams' , role: 'Store Manager', imgData: 'https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png' }, // might have to change the names
  links: [{title: 'More',
    items: [
      {
        title: 'Documents',
        handler: () => {alert('Documents')}
      },
      {
        title: 'Contacts',
        handler: () => {alert('Contacts')}
      },
      {
        title: 'Notes',
        handler: () => {alert('Notes')}
      },
    ]},
    {title: 'Get started',
      items: [
        {
          title: 'What\'s New?',
          handler: () => {}
        },
        {
          title: 'Walkthrough',
          handler: () => {}
        }
      ]},
    {title: 'Support & Preferences',
      items: [
        {
          title: 'Settings',
          handler: () => {}
        },
        {
          title: 'Help Center',
          handler: () => {}
        },
        {
          title: 'Terms & Conditions',
          handler: () => {}
        }
      ]}
  ],
  logoutText: 'Log Out',
  hideLogout: false
};
```

```yoo-profile-modal.html
<yoo-button onclick="generateProfileModal()">
    <div class="icon">
        <i class="yo-user"></i>
    </div>
</yoo-button>
<yoo-modal-controller></yoo-modal-controller>
```

```yoo-profile-modal.css
    yoo-modal div.outer-container {
      width: 15rem !important;
      height: 20rem !important;
    }
````

```yoo-profile-modal.js
function generateProfileModal() {
    let modalCtrl = document.querySelector('yoo-modal-controller');
    let htmlElement = document.createElement('div');
    htmlElement.innerHTML = `<yoo-profile ></yoo-profile>`
    modalCtrl.generateModal({
      hasHeader: true,
      hasFooter: false,
      content: htmlElement,
      scrollEnabled: true,
    });
    modalCtrl.show();

    let profile = htmlElement.querySelector('yoo-profile');
    profile.config = {
      user: { firstName: 'Cecilia' , lastName: 'Adams' , role: 'Store Manager', imgData: 'https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png' }, // might have to change the names
      links: [{title: 'More',
        items: [
          {
            title: 'Documents',
            handler: () => {alert('Documents')}
          },
          {
            title: 'Contacts',
            handler: () => {alert('Contacts')}
          },
          {
            title: 'Notes',
            handler: () => {alert('Notes')}
          },
        ]},
        {title: 'Get started',
          items: [
            {
              title: 'What\'s New?',
              handler: () => {}
            },
            {
              title: 'Walkthrough',
              handler: () => {}
            }
          ]},
        {title: 'Support & Preferences',
          items: [
            {
              title: 'Settings',
              handler: () => {}
            },
            {
              title: 'Help Center',
              handler: () => {}
            },
            {
              title: 'Terms & Conditions',
              handler: () => {}
            }
          ]}
      ],
      logoutText: 'Log Out',
      hideLogout: false
    };
  }
```

## Events
|Attr|Description|
|---|---|---|
|`profileEdit`|event emitted when the edit button is clicked|
|`clicked`|event emitted when an item is clicked|
|`logout`|event emitted when logout is clicked|
