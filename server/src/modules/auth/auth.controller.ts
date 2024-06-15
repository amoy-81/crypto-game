import { Request, Response } from "express";
import authService from "./auth.service";
import joiUtil from "../../common/utilities/validation/joi.util";
import autoBind from "auto-bind";

class AuthController {
  #authService;
  constructor() {
    autoBind(this);
    this.#authService = authService;
  }

  async register(req: Request, res: Response, next: any) {
    try {
      const body = req.body;

      joiUtil.registerValidation(body);

      const user = await this.#authService.createUser(
        body.name,
        body.username,
        body.password
      );

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: any) {
    try {
      const body = req.body;

      joiUtil.loginValidation(body);

      const user = await this.#authService.loginUser(
        body.username,
        body.password
      );

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
