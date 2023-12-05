import fs from "fs";
import path from "path";
import asar from "@electron/asar";

const exts = fs.readdirSync("./exts");
const repo = [];
for (const file of exts) {
  if (!file.endsWith(".asar")) continue;
  const filePath = path.join("./exts", file);

  try {
    const manifestBuffer = asar.extractFile(filePath, "manifest.json");
    const manifest = JSON.parse(manifestBuffer.toString());
    manifest.download = `https://moonlight-mod.github.io/extensions/${file}`;
    repo.push(manifest);
  } catch (e) {
    console.error(e);
    continue;
  }
}

fs.writeFileSync(
  path.join("./exts", "repo.json"),
  JSON.stringify(repo, null, 2)
);
