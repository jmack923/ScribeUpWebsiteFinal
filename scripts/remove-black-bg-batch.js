import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientsDir = join(__dirname, "../public/assets/clients");

const filesToProcess = ["service-cu.png", "nerdwallet.png", "chartway.png"];
const threshold = 45;

for (const filename of filesToProcess) {
  const src = join(clientsDir, filename);
  const out = join(clientsDir, filename.replace(".png", "-transparent.png"));
  try {
    const { data, info } = await sharp(src)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r <= threshold && g <= threshold && b <= threshold) {
        data[i + 3] = 0;
      }
    }
    await sharp(data, { raw: { width, height, channels } })
      .png()
      .toFile(out);
    console.log("OK:", filename, "-> *-transparent.png");
  } catch (err) {
    console.error("Skip", filename, err.message);
  }
}
console.log("Done.");
