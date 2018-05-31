---
name: Typography
category: Overview
---

```typography.html hidden
    <div class="dark">
        <div class="top" attr-layout="row">
            <div class="column1">
                <h3>Font Variations</h3>
                <div class="square-1">Lato Black</div>
                <br>             
                <div class="square-2">Lato Black Italic</div>
                <br>                             
                <div class="square-3">Lato Bold Italic</div>
                <br>
                <div class="square-4">Lato Bold</div>
                <br>                               
                <div class="square-5">Lato Italic</div>
                <br>
                <div class="square-6">Lato Regular</div>
                <br>
                <div class="square-7">Lato LightItalic</div>
                <br>
                <div class="square-8">Lato Light</div>
                <br>
                <div class="square-9">Lato Hairline Italic</div>
                <br>              
                <div class="square-10">Lato Hairline <br> 0123456789>        </div>
            </div>
        </div>
        <br>
        <h1>Heading 1: The quick brown fox jumps over the lazy dog</h1>
        <br>
        <h2>Heading 2: The quick brown fox jumps over the lazy dog</h2>
        <br>
        <h3>Heading 3: The quick brown fox jumps over the lazy dog</h3>
        <br>
        <div>Body: The quick brown fox jumps over the lazy dog</div>
        <br>
        <div class="caption">Caption: The quick brown fox jumps over the lazy dog</div>
        <br>
        <div class="tiny">Tiny: The quick brown fox jumps over the lazy dog</div>
        <br>
        <div class="label">LABEL: The quick brown fox jumps over the lazy dog</div>
        <br>
    </div>
```
```typography.css hidden
    .top {
        margin-bottom: 1rem;
        margin-top: 1rem;
        .column1 {
            margin-right: 3rem;
        }
    }

    .square-1 {
        font-size: 3rem;
        font-weight: 700;
        font-style: normal;        
        line-height: 1.05;
        text-align: left;
    }

    .square-2 {
        font-size: 2rem;
        font-weight: 700;
        font-style: italic;
        line-height: 1.38;
        text-align: left;
    }

    .square-3 {
        font-size: 2rem;
        font-weight: 600;
        font-style: italic;
        line-height: 1.38;
        text-align: left;
    }
    
    .square-4 {
        font-size: 2rem;
        font-weight: 600;
        font-style: normal;
        line-height: 1.38;
        text-align: left;
    }
    
    .square-5 {
        font-size: 2rem;
        font-weight: 400;
        font-style: italic;
        line-height: 1.38;
        text-align: left;
    }

    .square-6 {
        font-size: 2rem;
        font-weight: 400;
        font-style: normal;
        line-height: 1.38;
        text-align: left;
    }

    .square-7 {
        font-size: 2rem;
        font-weight: 300;
        font-style: italic;
        line-height: 1.38;
        text-align: left;
    }

    .square-8 {
        font-size: 2rem;
        font-weight: 300;
        font-style: normal;
        line-height: 1.38;
        text-align: left;
    }

    .square-9 {
        font-size: 2rem;
        font-weight: 100;
        font-style: italic;
        line-height: 1.2;
        text-align: left;
    }

     .square-10 {
        font-size: 2rem;
        font-weight: 100;
        font-style: normal;
        line-height: 1.2;
        text-align: left;
    }
```