import { writeFile } from "node:fs/promises";

const GAMES_JSON_URL =
  "https://raw.githubusercontent.com/pgrenon1/portfolio/master/games.json";

async function syncGames() {
  try {
    const res = await fetch(GAMES_JSON_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    JSON.parse(text); // sanity check it's valid JSON before saving
    await writeFile(new URL("../games.json", import.meta.url), text);
    console.log("games.json synced from Portfolio repo.");
  } catch (err) {
    console.warn(
      `Could not fetch games.json (${err.message}). Using existing local copy.`
    );
  }
}

syncGames();