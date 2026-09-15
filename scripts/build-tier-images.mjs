import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../dist/js/theme-arcade.js", import.meta.url), "utf8");
const range = source.match(/var worldSeeds = (\[[\s\S]*?\n  \]);/);
if (!range) throw new Error("Could not read worldSeeds from theme-arcade.js");
const worldSeeds = Function(`"use strict"; return (${range[1]});`)();
const output = new URL("../dist/js/tier-images.js", import.meta.url);
const api = "https://commons.wikimedia.org/w/api.php";
const values = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const levels = ["Starter", "Growing", "Double", "Stack", "Power", "Elite", "Epic", "Legend", "Mythic", "Grand", "Final form"];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const specials = {
  Dogs: [
    ["Puppy", "puppy dog"], ["Young dog", "young dog"], ["Two dogs", "two dogs"], ["Dog pack", "dog pack"], ["Working dog", "working dog"], ["Champion", "champion dog"], ["Dog show", "dog show"], ["Wolf", "gray wolf"], ["Wolf pack", "wolf pack"], ["Alpha", "alpha wolf"], ["Legendary pack", "wolf pack landscape"]
  ],
  Desserts: [
    ["Cookie", "chocolate chip cookie"], ["Cupcake", "cupcake"], ["Donut", "donut"], ["Fruit tart", "fruit tart dessert"], ["Pie", "pie dessert"], ["Layer cake", "layer cake"], ["Birthday cake", "birthday cake"], ["Dessert table", "dessert buffet"], ["Tiered cake", "tiered cake"], ["Wedding cake", "wedding cake"], ["Grand wedding cake", "grand wedding cake"]
  ],
  Cupcakes: [
    ["Mini cupcake", "mini cupcake"], ["Vanilla cupcake", "vanilla cupcake"], ["Chocolate cupcake", "chocolate cupcake"], ["Frosted cupcake", "frosted cupcake"], ["Cupcake pair", "two cupcakes"], ["Cupcake box", "cupcake box"], ["Cupcake tower", "cupcake tower"], ["Birthday cupcakes", "birthday cupcakes"], ["Wedding cupcakes", "wedding cupcakes"], ["Dessert display", "cupcake dessert display"], ["Cake finale", "wedding cake cupcakes"]
  ],
  Cars: [
    ["Classic", "classic small car"], ["Daily driver", "compact car"], ["Sedan", "sedan car"], ["Muscle", "muscle car"], ["Sports car", "sports car"], ["Supercar", "supercar"], ["Race car", "race car"], ["Formula car", "formula one car"], ["Vintage legend", "classic race car"], ["Hypercar", "hypercar"], ["Final machine", "hypercar supercar"]
  ],
  Raccoons: [
    ["Kit", "raccoon kit"], ["Raccoon", "raccoon"], ["Two raccoons", "two raccoons"], ["Forager", "raccoon foraging"], ["Tree climber", "raccoon tree"], ["Night scout", "raccoon night"], ["Creek explorer", "raccoon water"], ["Family", "raccoon family"], ["Forest guardian", "raccoon forest"], ["Masked legend", "raccoon portrait"], ["Trash panda king", "raccoon close up"]
  ]
};

function subjectFor(name, category) {
  const categorySubjects = {
    People: "stage performer",
    Games: "arcade video game",
    Visuals: "abstract colorful art",
    Animals: name,
    Science: "science space",
    Tech: "robot technology",
    Sports: name,
    Nature: name,
    Culture: name,
    Home: name,
    Food: name,
    Transport: name,
    Chaos: "abstract light art"
  };
  return categorySubjects[category] || name;
}

function planFor(name, category) {
  if (specials[name]) return specials[name];
  const subject = subjectFor(name, category);
  const modifiers = ["small", "close up", "pair", "collection", "action", "professional", "large", "rare", "spectacular", "grand", "celebration"];
  return modifiers.map((modifier, index) => [levels[index], `${modifier} ${subject}`]);
}

function queryUrl(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "18",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "560",
    indexpageids: "1",
    format: "json",
    origin: "*"
  });
  return `${api}?${params}`;
}

async function search(query, attempt = 0) {
  const response = await fetch(queryUrl(query), { headers: { "User-Agent": "100-2048s image world builder/1.0 (personal project)" } });
  if (response.status === 429 && attempt < 6) {
    await wait(2500 * (attempt + 1));
    return search(query, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} while searching ${query}`);
  const data = await response.json();
  const pages = data.query?.pages || {};
  const candidates = (data.query?.pageids || Object.keys(pages)).map((id) => pages[id]).filter(Boolean).map((page) => {
    const info = page.imageinfo?.[0];
    const metadata = info?.extmetadata || {};
    return {
      src: info?.thumburl,
      source: info?.descriptionurl,
      title: page.title?.replace(/^File:/, "") || query,
      license: (metadata.LicenseShortName?.value || "Wikimedia Commons").replace(/<[^>]*>/g, ""),
      artist: (metadata.Artist?.value || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
    };
  }).filter((image) => image.src && /\.(jpe?g|png)(\?|$)/i.test(image.src));
  await wait(1150);
  return candidates;
}

async function findImage(query, used) {
  const candidates = await search(query);
  return candidates.find((image) => !used.has(image.src)) || candidates[0] || null;
}

async function writeCheckpoint(records) {
  await writeFile(output, `/* Generated from Wikimedia Commons. See scripts/build-tier-images.mjs. */\nwindow.TierImageData = ${JSON.stringify(records)};\n`);
}

async function readCheckpoint() {
  try {
    const checkpoint = await readFile(output, "utf8");
    const match = checkpoint.match(/window\.TierImageData = (\{[\s\S]*\});/);
    return match ? JSON.parse(match[1]) : {};
  } catch (error) {
    return {};
  }
}

const records = await readCheckpoint();
for (let worldIndex = 0; worldIndex < worldSeeds.length; worldIndex += 1) {
  const [name, category] = worldSeeds[worldIndex];
  const id = `world-${worldIndex + 1}`;
  const used = new Set();
  const stages = planFor(name, category);
  if (records[id]?.length === values.length) {
    process.stdout.write(`\r${worldIndex + 1}/${worldSeeds.length} ${name}: restored`);
    continue;
  }
  records[id] = [];
  if (specials[name]) {
    for (let level = 0; level < values.length; level += 1) {
      const [label, query] = stages[level];
      let image = await findImage(query, used);
      if (!image) image = await findImage(subjectFor(name, category), used);
      if (!image) throw new Error(`No usable Commons image for ${name} / ${label}`);
      used.add(image.src);
      records[id].push({ value: values[level], label, query, ...image });
      process.stdout.write(`\r${worldIndex + 1}/${worldSeeds.length} ${name}: ${level + 1}/${values.length}`);
    }
  } else {
    const query = subjectFor(name, category);
    let candidates = await search(query);
    if (candidates.length < values.length) candidates = candidates.concat(await search(category));
    const unique = candidates.filter((image) => !used.has(image.src));
    if (unique.length < values.length) throw new Error(`Not enough usable Commons images for ${name}`);
    values.forEach((value, level) => {
      const [label] = stages[level];
      const image = unique[level];
      used.add(image.src);
      records[id].push({ value, label, query, ...image });
    });
    process.stdout.write(`\r${worldIndex + 1}/${worldSeeds.length} ${name}: 11/11`);
  }
  await writeCheckpoint(records);
}
process.stdout.write("\n");
await writeCheckpoint(records);
console.log(`Wrote ${Object.keys(records).length * values.length} tier images to ${output.pathname}`);
