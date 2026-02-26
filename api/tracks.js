import express from "express";
const tracksRouter = express.Router();
export default tracksRouter;

import { getTracks } from "#db/queries/tracks";
import { getTrackById } from "#db/queries/tracks";

tracksRouter.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

tracksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number(id)) {
    res.status(400).send("id is not a number");
  }
  const track = await getTrackById(id);
  if (!track) {
    res.status(404).send("track not found");
  }
  res.send(track);
});
