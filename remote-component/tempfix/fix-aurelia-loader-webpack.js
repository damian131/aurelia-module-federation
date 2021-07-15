const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const replaceRegExp = /^(\s*)return \[2 \/\*return\*\/, result\];\s*$/m;

(async () => {
    const aureliaLoaderWebpackCjsFolder = path.dirname(require.resolve("aurelia-loader-webpack"));
    const pluginPath = path.resolve(aureliaLoaderWebpackCjsFolder, "..", "native-modules", "aurelia-loader-webpack.js");

    let pluginContent = (await readFileAsync(pluginPath)).toString();
    pluginContent = pluginContent.replace(replaceRegExp, (s, g1) => `${g1}return [2 /*return*/, typeof result === "string" ? result : defaultExport];`);
    await writeFileAsync(pluginPath, pluginContent);
})();
