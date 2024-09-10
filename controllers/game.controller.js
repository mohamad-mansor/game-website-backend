import { GameModel } from "../models/Game.model.js";
import createHttpError from "http-errors";

export async function createGame(req, res, next) {
  try {
    const game = new GameModel({ ...req.body, developer: req.user._id });
    await game.save();
    res.status(201).json({ game });
  } catch (error) {
    next(createHttpError.InternalServerError("Failed to create game"));
  }
}

export async function approveGame(req, res, next) {
  try {
    const game = await GameModel.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.status(200).json({ game });
  } catch (error) {
    next(createHttpError.InternalServerError("Failed to approve game"));
  }
}
