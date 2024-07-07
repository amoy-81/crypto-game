import { Request, Response } from "express";
import autoBind from "auto-bind";
import joiUtil from "../../common/utilities/validation/joi.util";
import encryptionUtil from "../../common/utilities/encryption.util";
import createHttpError from "http-errors";
import goldService from "./gold.service";

class GoldController {
  #goldService;
  constructor() {
    autoBind(this);
    this.#goldService = goldService;
  }

  async getCurrentPrice(req: any, res: Response, next: any) {
    try {
      const current = await this.#goldService.getCurrentPrice();

      return res.status(200).json(current);
    } catch (error) {
      next(error);
    }
  }

  async getChanges(req: any, res: Response, next: any) {
    try {
      const changes = await this.#goldService.getChanges();

      return res.status(200).json(changes);
    } catch (error) {
      next(error);
    }
  }
}

export default new GoldController();
