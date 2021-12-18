import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: ["src/index.ts"],
    outDir: "lib",
    target: "node14",
    format: ["esm"],
    clean: false,
    splitting: false,
    minify: !options.watch,
}));
