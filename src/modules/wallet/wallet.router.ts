import express from "express";
import authGuard from "../../common/guards/auth.guard";
import walletController from "./wallet.controller";
import encryptionUtil from "../../common/utilities/encryption.util";

const WalletRouter = express.Router();

WalletRouter.post(
  "/transaction",
  authGuard,
  walletController.createTransaction
);

// for test
WalletRouter.get("/e", (req: any, res: any) => {
  const nw = new Date().getTime() / 1000;

  const en = encryptionUtil.encrypt({
    wallet: "6683f84b2b82dd4f938ca804",
    amount: 10,
    exp: nw + 20,
  });

  res.json(en);
});

export default WalletRouter;
