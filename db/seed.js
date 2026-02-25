import db from "#db/client";

import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistTrackItem } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 5; i++) {
    let playlist = await createPlaylist("Playlist " + i, "Description " + i);
    for (let i = 1; i <= 15; i++) {
      let track = await createTrack("Track " + i, 100 + i);
      const playlistId = playlist.id;
      await createPlaylistTrackItem(playlistId, track.id);
    }
  }
}
