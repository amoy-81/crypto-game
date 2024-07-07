import express from "express";
import authGuard from "../../common/guards/auth.guard";
import goldController from "./gold.controller";

const GoldRouter = express.Router();

GoldRouter.get("/current-price", goldController.getCurrentPrice);

GoldRouter.get("/changes", goldController.getChanges);

export default GoldRouter;
