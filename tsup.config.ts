import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: ["src/**/*.ts"],
    outDir: "fonts",
    target: "node14",
    format: ["esm", "cjs"],
    clean: true,
    bundle: false,
    splitting: false,
    minify: !options.watch,
}));
