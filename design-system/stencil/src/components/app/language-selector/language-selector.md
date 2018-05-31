---
name: Language Selector
category: App Components
---

```yoo-language-selector.html
<yoo-button onclick="generateLanguageModal()">
    <div class="icon">
        <i class="yo-world"></i>
    </div>
</yoo-button>
<yoo-modal-controller></yoo-modal-controller>
```

```yoo-language-selector.js
    function generateLanguageModal() {
        let modalCtrl = document.querySelector('yoo-modal-controller');
        let htmlElement = document.createElement('div');
        htmlElement.innerHTML = `<div >
            <yoo-language-selector></yoo-language-selector>
        </div>`
        modalCtrl.generateModal({
            hasHeader: true,
            hasFooter: false,
            content: htmlElement,
            cssClass: 'yoo-modal-language'
        });
        modalCtrl.show();

        let languageSelector = htmlElement.querySelector('yoo-language-selector');
        languageSelector.languages = [
            {title: 'English', value: 'EN', icon: './assets/flags/united-kingdom.svg'},
        ];
    }
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`languages`|Language Object|    |the list to fill the language selection|

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-language-selector accent|
|Dark|`dark`|yoo-language-selector dark|
|Success|`success`|yoo-language-selector success|
|Danger|`danger`|yoo-language-selector danger|
|Info|`info`|yoo-language-selector info|
|Warning|`warning`|yoo-language-selector warning|
|Gradient Accent|`gradient-accent`|yoo-language-selector gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-language-selector gradient-grey|
|Gradient Success|`gradient-success`|yoo-language-selector gradient-success|
|Gradient Danger|`gradient-danger`|yoo-language-selector gradient-danger|
|Gradient Info|`gradient-info`|yoo-language-selector gradient-info|
|Gradient Warning|`gradient-warning`|yoo-language-selector gradient-warning|

## Events
|Attr|Description|
|---|---|---|
|`languageSelected`|event emitted a different language is selected|
