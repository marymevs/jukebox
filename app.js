import express from "express";
const app = express();
export default app;

import tracksRouter from "#api/tracks";
import playlistRouter from "#api/playlists";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to jukebox 🎶");
});

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistRouter);
