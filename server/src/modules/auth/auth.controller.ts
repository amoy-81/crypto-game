import { Request, Response } from "express";
import authService from "./auth.service";

class AuthController {
  #authService;
  constructor() {
    this.#authService = authService;
  }

  async login(req: Request, res: Response, next: any) {}
  //   async signUp(root, { username, password }) {
  //     let newUser = await this.#authService.createUser({ username, password });
  //     return newUser;
  //   }

  //   async signIn(root, { username, password }) {
  //     let user = await this.#authService.loginUser({ username, password });
  //     return user;
  //   }

  //   async whoIAm(root, inputs, { isLogged, userData }) {
  //     if (!isLogged) throw new Error("You must be logged in to see your data.");

  //     return { id: userData._id.toString(), username: userData.username };
  //   }
}

export default new AuthController();
