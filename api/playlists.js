import express from "express";
const playlistRouter = express.Router();
export default playlistRouter;

import {
  getPlaylists,
  getPlaylistById,
  getTracksByPlaylistId,
} from "#db/queries/playlists";
import { createPlaylistTrackItem } from "#db/queries/playlists_tracks";

playlistRouter.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

playlistRouter.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

playlistRouter.get("/:id", async (req, res) => {
  res.send(req.playlist);
});

playlistRouter.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

playlistRouter.post("/:id/tracks", async (req, res) => {
  const newTrack = await createPlaylistTrackItem(req.playlist.id, req.trackId);
  res.send(newTrack);
});
