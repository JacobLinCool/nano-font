import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: ["src/**/*.ts"],
    outDir: "fonts",
    target: "node16",
    format: ["esm", "cjs"],
    clean: false,
    bundle: false,
    splitting: false,
    minify: !options.watch,
}));
