import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: ["src/**/*.ts"],
    outDir: "lib",
    target: "node14",
    format: ["esm", "cjs"],
    clean: true,
    bundle: false,
    splitting: true,
    minify: !options.watch,
}));
