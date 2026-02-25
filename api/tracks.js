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
  const track = await getTrackById(id);
  res.send(track);
});
