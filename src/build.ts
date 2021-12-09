import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { Font, woff2, FontEditor } from "fonteditor-core";
import type { GoogleFont } from "./types";

dotenv.config();

build();

async function build() {
    if (!process.env.GOOGLE_API_KEY) {
        throw new Error("GOOGLE_API_KEY is not defined. Run npm run gen again after setting it.");
    }

    const google_font_list = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.GOOGLE_API_KEY}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then((json) => json.items as GoogleFont[]);

    fs.mkdirSync(path.resolve(__dirname, "fonts"), { recursive: true });

    // @ts-ignore
    await woff2.init();

    let index_ts = "";
    const font_list: string[] = [];

    for (let i = 0; i < google_font_list.length; i++) {
        const font = google_font_list[i];
        if (font.files.regular) {
            try {
                process.stdout.write(
                    `[${(i + 1).toString().padStart(Math.log10(google_font_list.length) + 1)} / ${google_font_list.length}] ${font.family}... `,
                );
                const base64 = await get_font_base64(font.files.regular);
                fs.writeFileSync(
                    path.resolve(__dirname, "fonts", `${font.family.replace(/ /g, "_")}.ts`),
                    `export const name = "${font.family}"; export const base64 = "${base64}";`,
                );
                index_ts += `export * as ${font.family.replace(/ /g, "_")} from "./${font.family.replace(/ /g, "_")}";\n`;
                font_list.push(font.family.replace(/ /g, "_"));
                console.log("\u001b[92mDONE\u001b[m");
            } catch (err) {
                console.log("\u001b[91mFAILED\u001b[m");
            }
        }
    }

    fs.writeFileSync(path.resolve(__dirname, "fonts", "index.ts"), index_ts);
    fs.writeFileSync(path.resolve(__dirname, "fonts", "types.ts"), `export type FontFamily = ${font_list.map((font) => `"${font}"`).join(" | ")};`);
}

async function get_font_base64(url: string) {
    const res = await fetch(url);
    const buffer = await res.buffer();

    const font = Font.create(buffer, {
        type: path.extname(url).slice(1) as FontEditor.FontType,
        subset: [0, 127],
        hinting: true,
    });

    return font.toBase64({ type: "woff2" }, font.write({ type: "woff2", hinting: true }));
}
