import { Request, Response } from "express";
import autoBind from "auto-bind";
import walletService from "./wallet.service";
import joiUtil from "../../common/utilities/validation/joi.util";
import encryptionUtil from "../../common/utilities/encryption.util";
import createHttpError from "http-errors";

class WalletController {
  #walletService;
  constructor() {
    autoBind(this);
    this.#walletService = walletService;
  }

  async createTransaction(req: any, res: Response, next: any) {
    try {
      const body = req.body;

      joiUtil.walletValidation(body);

      const payload: any = encryptionUtil.decrypt(body.token);

      joiUtil.transactionValidation(payload);

      const { exp, ...transactionDatas } = payload;
      const now = new Date().getTime() / 1000; // time to second

      if (exp < now)
        throw new createHttpError[400]("Transaction was expire!!!");

      const newTransaction = await this.#walletService.createTransaction(
        req.user._id,
        payload.wallet,
        payload.amount
      );

      return res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }
}

export default new WalletController();
