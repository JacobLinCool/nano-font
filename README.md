# Worker Font

 A Font Collection for CloudFlare Workers.

## Why?

When I was working on [LeetCode Stats Card](https://github.com/JacobLinCool/LeetCode-Stats-Card), I wanted to use fonts that were available on Google Fonts.

But external fonts are not available in SVG, so I had to embed the font in base64 format.

There is a size limit of 1 MB for CloudFlare Workers. So I cannot just convert the font to base64 format. I had to remove some useless characters from the font.

Then, I thought if there is a collection to let me embed fonts in CloudFlare Workers, the things will be easier.

## Usage

```typescript
import { Baloo_2 } from "worker-font";
// const { Baloo_2 } = require("worker-font");

const my_css = `font-face { 
    font-family: "${Baloo_2.name}";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("${Baloo_2.base64}") format("woff2");
}`;
```

## Fonts

### Font Format & Range

- Format: **woff2**
- Range: **ASCII**
