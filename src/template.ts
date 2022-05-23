export const template = `
/**
 * \${font.family} \${font.version} (\${font.lastModified})
 * 
 * Category: \${font.category}
 * 
 * [View \${font.family} on Google Fonts](https://fonts.google.com/specimen/\${font.family.replace(/ /g, "+")})
 * 
 * @module
 */

import type { CssFontName, Base64EncodedWoff2 } from "../types";
export const name: CssFontName = "\${font.family}";
export const base64: Base64EncodedWoff2 = "\${base64}";
`;
