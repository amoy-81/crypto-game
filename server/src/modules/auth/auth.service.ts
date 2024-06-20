import User from "../user/models/user.model";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import userService from "../user/user.service";
import coinService from "../coin/coin.service";
import { mineT } from "../coin/models/resource.model";

class AuthService {
  #User;
  #userService;
  #coinService;
  constructor() {
    this.#User = User;
    this.#userService = userService;
    this.#coinService = coinService;
  }

  // signUp
  async createUser(name: string, username: string, password: string) {
    const user = await this.#User.findOne({ username });
    if (user) throw new createHttpError[403]("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.#User.create({
      name,
      username,
      password: hashPassword,
    });

    return this.loginUser(newUser.username, password);
  }

  // login
  async loginUser(username: string, password: string) {
    const user = await this.#User.findOne({ username });
    if (!user) throw new createHttpError[404]("Username not found");

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) throw new createHttpError[403]("Invalid Password");

    const accessToken = this.signToken({ id: user.id });
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      token: accessToken,
      il: user.il,
    };
  }

  signToken(payload: any, expiresIn = "30d") {
    const jwtSecretKey: any = process.env.JWT_SECRET_KEY;
    return jwt.sign(payload, jwtSecretKey, { expiresIn });
  }

  async invitation(user: string, friend: string) {
    try {
      const hostUser = await this.#User.findOne({ il: user });
      const guestUser = await this.#User.findOne({ il: friend });

      console.log(hostUser?.friends.includes(guestUser?.id));

      if (!hostUser || !guestUser || hostUser?.friends.includes(guestUser.id))
        return {
          success: false,
          generatedHistory: null,
        };

      hostUser?.friends.push(guestUser.id);

      await hostUser.save();

      const userNewHistory = await this.#coinService.createHistory(
        hostUser.id,
        500,
        mineT.addFriend
      );

      const higherNode = await this.#User.findOne({ friends: hostUser.id });
      console.log("HigherNode => ", higherNode);

      if (!higherNode)
        return {
          success: true,
          generatedHistory: [userNewHistory],
        };

      const higherNodeNewHistory = await this.#coinService.createHistory(
        higherNode.id,
        100,
        mineT.commission
      );

      return {
        success: true,
        generatedHistory: [userNewHistory, higherNodeNewHistory],
      };
    } catch (error) {
      return {
        success: false,
        generatedHistory: null,
      };
    }
  }
}

export default new AuthService();
