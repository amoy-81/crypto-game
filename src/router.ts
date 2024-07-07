import express from "express";
import AuthRouter from "./modules/auth/auth.router";
import errorHandler from "./common/middlewares/errorHandler";
import CoinRouter from "./modules/coin/coin.router";
import FriendsRouter from "./modules/friends/friends.router";
import WalletRouter from "./modules/wallet/wallet.router";
import GoldRouter from "./modules/gold/gold.router";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/coin", CoinRouter);
router.use("/friends", FriendsRouter);
router.use("/wallet", WalletRouter);
router.use("/gold", GoldRouter);

// if route not found
router.use("*", (req, res, next) => {
  try {
    let err: any = new Error("Not Found");
    err.status = 404;
    throw err;
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);
export default router;
