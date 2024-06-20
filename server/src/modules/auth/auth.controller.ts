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

      const il: any = req?.query?.il || null;

      joiUtil.registerValidation(body);

      const user = await this.#authService.createUser(
        body.name,
        body.username,
        body.password
      );

      if (!il) return res.json({ user, generatedHistory: null });

      const { success, generatedHistory } = await this.#authService.invitation(
        il,
        user.il
      );

      return res.json({ user, generatedHistory });
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
