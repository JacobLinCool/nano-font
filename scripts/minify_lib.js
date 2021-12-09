const fs = require("fs");
const { resolve } = require("path");
const UglifyJS = require("uglify-js");

const files = files_in_dir(resolve(__dirname, "..", "lib"));
for (const file of files) {
    minify(file);
}

function minify(path) {
    const code = fs.readFileSync(path, "utf8");
    const minified = UglifyJS.minify(code, {
        output: {
            beautify: false,
            preamble: "/* minified */",
        },
    });
    fs.writeFileSync(path, minified.code);
}

function files_in_dir(dir) {
    const files = [];
    const dirs = fs.readdirSync(dir);
    for (const d of dirs) {
        const file = resolve(dir, d);
        if (fs.statSync(file).isDirectory()) {
            files.push(...files_in_dir(file));
        } else {
            files.push(file);
        }
    }
    return files.filter((f) => f.endsWith(".js"));
}
