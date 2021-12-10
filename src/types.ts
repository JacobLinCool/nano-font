export type FontType =
    | "100"
    | "100italic"
    | "200"
    | "200italic"
    | "300"
    | "300italic"
    | "regular"
    | "italic"
    | "500"
    | "500italic"
    | "600"
    | "600italic"
    | "700"
    | "700italic"
    | "800"
    | "800italic"
    | "900"
    | "900italic";

export type FontCategory = "display" | "handwriting" | "monospace" | "sans-serif" | "serif";

export type FontFiles = {
    [key in FontType]?: string;
};

export type FontKind = "webfonts#webfont";

export interface GoogleFont {
    family: string;
    variants: FontType[];
    subsets: string[];
    version: string;
    lastModified: string;
    files: FontFiles;
    category: FontCategory;
    kind: FontKind;
}

/**
 * The font name that can be used to define the font family in CSS.
 */
export type CssFontName = string;

/**
 * The base64 encoded font data (format: woff2).
 */
export type Base64EncodedWoff2 = string;

/**
 * Font.
 *
 * ```typescript
 * import Baloo_2 from "worker-font/lib/fonts/Baloo_2";
 *
 * const my_css = `font-face {
 *     font-family: "${Baloo_2.name}";
 *     font-style: normal;
 *     font-weight: 400;
 *     font-display: swap;
 *     src: url("${Baloo_2.base64}") format("woff2");
 * }`;
 * ```
 */
export interface Font {
    /**
     * The font name that can be used to define the font family in CSS.
     */
    name: CssFontName;

    /**
     * The base64 encoded font data (format: woff2).
     */
    base64: Base64EncodedWoff2;
}
