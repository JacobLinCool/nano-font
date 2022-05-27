import dotenv from "dotenv";
import { Font, FontEditor, woff2 } from "fonteditor-core";
import fs from "fs";
import fetch from "node-fetch";
import ora from "ora";
import path from "path";
import { template } from "./template";
import type { GoogleFont } from "./types";
import { T } from "./utils";

dotenv.config();

const code_dist = path.resolve("src");
const json_dist = path.resolve("json");

build();

async function build(force_rebuild = false) {
    const START_TIME = Date.now();

    if (!process.env.GOOGLE_API_KEY) {
        throw new Error(`GOOGLE_API_KEY is not defined. Run again after setting it in ".env".`);
    }

    const spinner = ora({ text: "Fetching font list from Google Fonts" }).start();

    const google_font_list = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_API_KEY}`,
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then((json) => json.items as GoogleFont[]);

    spinner.succeed(`Fetched ${google_font_list.length} fonts from Google Fonts`);

    fs.mkdirSync(code_dist, { recursive: true });
    fs.mkdirSync(json_dist, { recursive: true });

    // @ts-ignore
    await woff2.init();

    const font_list: string[] = [];

    const list_length = google_font_list.length;
    const padding = Math.log10(list_length) + 1;

    for (let i = 0; i < list_length; i++) {
        const font = google_font_list[i];
        const font_name = font.family.replace(/ /g, "_");
        const code_path = path.resolve(code_dist, `${font_name}.ts`);
        const json_path = path.resolve(json_dist, `${font_name.toLowerCase()}.json`);

        if (font.files.regular) {
            try {
                spinner.start(
                    [
                        `[${(i + 1).toString().padStart(padding)} / ${list_length}]`,
                        `Building ${font.family}`,
                    ].join(" "),
                );

                if (force_rebuild || !fs.existsSync(code_path)) {
                    const base64 = await get_font_base64(font.files.regular);
                    const size = Math.round(base64.length / 102.4) / 10;
                    fs.writeFileSync(code_path, T(template, { font, base64, font_name, size }));
                    fs.writeFileSync(json_path, JSON.stringify({ name: font.family, base64 }));
                }

                font_list.push(font_name);

                spinner.succeed(`Built ${font.family}`);
            } catch (err) {
                spinner.fail(`Failed to build ${font.family}: ${(err as Error).message}`);
            }
        }
    }

    fs.writeFileSync(
        path.resolve(code_dist, "index.ts"),
        font_list.map((font_name) => `export { ${font_name} } from "./${font_name}";`).join("\n"),
    );
    fs.writeFileSync(
        path.resolve(code_dist, "types.ts"),
        `export type FontFamily = ${font_list.map((font) => `"${font}"`).join(" | ")};`,
    );

    spinner.succeed(`Built ${font_list.length} fonts in ${(Date.now() - START_TIME) / 1000}s`);
}

async function get_font_base64(url: string): Promise<string> {
    const res = await fetch(url);
    const buffer = await res.buffer();

    const font = Font.create(buffer, {
        type: path.extname(url).slice(1) as FontEditor.FontType,
        subset: Array.from({ length: 95 }).map((_, i) => i + 32), // ASCII 32 ~ 126
        hinting: true,
    });

    return font.toBase64({ type: "woff2" }, font.write({ type: "woff2", hinting: true }));
}
