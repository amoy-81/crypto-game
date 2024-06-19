import express from "express";
import coiController from "./coi.controller";
import authGuard from "../../common/guards/auth.guard";
const CoinRouter = express.Router();

CoinRouter.get("/record", authGuard, coiController.startRecord);

CoinRouter.get("/current-record", authGuard, coiController.getCurrentRecord);

CoinRouter.get("/mine", authGuard, coiController.mineRecord);

// TODO : GET History list
// TODO : GET User History list

export default CoinRouter;
