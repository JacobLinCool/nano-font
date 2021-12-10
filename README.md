# Worker Font

 [![NPM](https://img.shields.io/npm/v/worker-font.svg?style=flat)](https://www.npmjs.com/package/worker-font)

 A Font Collection for CloudFlare Workers. Including 1300+ Google Fonts!

## Why?

When I was working on [LeetCode Stats Card](https://github.com/JacobLinCool/LeetCode-Stats-Card), I wanted to use fonts that were available on Google Fonts.

But external fonts are not available in SVG, so I had to embed the font in base64 format.

There is a size limit of 1 MB for CloudFlare Workers. So I cannot just convert the font to base64 format. I had to remove some useless characters from the font.

Then, I thought if there is a collection to let me embed fonts in CloudFlare Workers, things will be easier.

## Usage

```typescript
import { Baloo_2 } from "worker-font";
// const { Baloo_2 } = require("worker-font");
// import Baloo_2 from "worker-font/lib/fonts/Baloo_2"; // reduce bundle size

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
- Range: **ASCII** (0 ~ 127)

### Fonts Included

[1300+ Fonts](https://jacoblincool.github.io/worker-font/modules/Fonts.html) from Google Fonts.

## Docs

[Worker-Font Documentation](https://jacoblincool.github.io/worker-font/)

## Links

- GitHub Repository: <https://github.com/JacobLinCool/worker-font>
- NPM Package: <https://www.npmjs.com/package/worker-font>
- Documentation: <https://jacoblincool.github.io/worker-font/>
