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

  async login(req: Request, res: Response, next: any) {
    try {
      const body = req.body;

      joiUtil.loginValidation(body);

      console.log("TTTTTOKEN =>", body.token);
      const user = await this.#authService.loginUser(body.token, body.il);

      return res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new AuthController();
