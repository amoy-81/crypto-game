import { Request, Response } from "express";
import autoBind from "auto-bind";
import coinService from "./coin.service";
import createHttpError from "http-errors";

class CoinController {
  #coinService;
  constructor() {
    autoBind(this);
    this.#coinService = coinService;
  }

  async startRecord(req: any, res: Response, next: any) {
    try {
      const newRecord = await this.#coinService.createRecord(req.user._id);
      return res.status(201).json(newRecord);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentRecord(req: any, res: Response, next: any) {
    try {
      const currentRecord = await this.#coinService.findOpenRecords(
        req.user._id
      );
      return res.json(currentRecord);
    } catch (error) {
      next(error);
    }
  }

  async mineRecord(req: any, res: Response, next: any) {
    try {
      const result = await this.#coinService.mine(req.user._id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async mineHistory(req: any, res: Response, next: any) {
    try {
      const result = await this.#coinService.getMineHstory();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async userMineHistory(req: any, res: Response, next: any) {
    try {
      if (!req.params.userId)
        throw new createHttpError[400]("User is not found");
      const result = await this.#coinService.getMineHstory(req.params.userId);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentResource(req: any, res: Response, next: any) {
    try {
      const resource = await this.#coinService.getCurrentResource();
      return res.json({ resource });
    } catch (error) {
      next(error);
    }
  }
}

export default new CoinController();
