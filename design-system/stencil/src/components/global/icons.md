---
name: Icons
category: Overview
---



```icons.html
    <div class="dark">
        <div class="icon">
            <i class="yo-plus"></i>
            <label>yo-plus</label>
        </div>
    </div>
    <div id="icon-div">
    </div>
```

```icons.css hidden
    .icon {
        margin-bottom: 0.5rem;
    }
    i {
        font-size: 2rem;
        margin-right: 1rem;
    }
```

```icons.js hidden 

    var mainDiv = document.querySelector('div.dark');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let svg =  xhttp.responseXML;
            let glyphs= [...svg.querySelectorAll('glyph')];
            glyphs.filter((glyph) => {return glyph.attributes['glyph-name']}).map((glyph) => {
                let name = glyph.attributes['glyph-name'].value
                mainDiv.innerHTML = mainDiv.innerHTML + `<div class="icon">
                                    <i class=yo-` + name + `></i>
                                    <label>yo- ` + name + `</label>
                                </div>`;
            });
        }
    };
    xhttp.open("GET", "/assets/fonts/yoobicons/yoobicons.svg", true);
    xhttp.send();

```