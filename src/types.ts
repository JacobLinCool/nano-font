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
