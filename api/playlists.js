import express from "express";
const playlistRouter = express.Router();
export default playlistRouter;

import {
  getPlaylists,
  getPlaylistById,
  getTracksByPlaylistId,
  createPlaylist,
} from "#db/queries/playlists";
import { createPlaylistTrackItem } from "#db/queries/playlists_tracks";
import { getTrackById } from "#db/queries/tracks";

playlistRouter.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

playlistRouter.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).send("missing request body");
  } else {
    const { name, description } = req.body;
    if (!name || !description) {
      res
        .status(400)
        .send("missing one or more of required params: name, description");
    } else {
      const newPlaylist = await createPlaylist(name, description);
      res.status(201).send(newPlaylist);
    }
  }
});

playlistRouter.param("id", async (req, res, next, id) => {
  if (!Number(id)) {
    res.status(400).send("id needs to be a number");
  }
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
  if (!req.body) {
    res.status(400).send("request body is missing");
  } else {
    const { trackId } = req.body;
    if (!trackId || !Number(trackId)) {
      res
        .status(400)
        .send("trackId param missing from request body or is not a number");
    } else {
      const track = await getTrackById(trackId);
      if (!track) {
        res.status(400).send("track not found");
      } else {
        const newPlaylistTrackItem = await createPlaylistTrackItem(
          req.playlist.id,
          req.trackId,
        );
        res.status(201).send(newPlaylistTrackItem);
      }
    }
  }
});
