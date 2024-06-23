import express from "express";
import coiController from "./coi.controller";
import authGuard from "../../common/guards/auth.guard";
const CoinRouter = express.Router();

CoinRouter.get("/record", authGuard, coiController.startRecord);

CoinRouter.get("/current-record", authGuard, coiController.getCurrentRecord);

CoinRouter.get(
  "/current-resource",
  authGuard,
  coiController.getCurrentResource
);

CoinRouter.get(
  "/current-credit",
  authGuard,
  coiController.currentCredit
);

CoinRouter.get(
  "/mine-history/:userId",
  authGuard,
  coiController.userMineHistory
);

CoinRouter.get("/mine-history", authGuard, coiController.mineHistory);

CoinRouter.get("/mine", authGuard, coiController.mineRecord);

export default CoinRouter;
