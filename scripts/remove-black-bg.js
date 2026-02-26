import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, "../public/assets/clients/dailypay.png");
const out = join(__dirname, "../public/assets/clients/dailypay-transparent.png");

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const threshold = 40; // treat pixels with R,G,B all below this as background

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r <= threshold && g <= threshold && b <= threshold) {
    data[i + 3] = 0; // set alpha to 0
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(out);

console.log("Done: black background made transparent");
