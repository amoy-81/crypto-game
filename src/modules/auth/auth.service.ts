import User from "../user/models/user.model";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import userService from "../user/user.service";
import coinService from "../coin/coin.service";
import { mineT } from "../coin/models/resource.model";
import encryptionUtil from "../../common/utilities/encryption.util";

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
  async createUser(name: string, username: string, t_id: number, il: string) {
    const user = await this.#User.findOne({ t_id });
    if (user) throw new createHttpError[403]("User already exists");

    const newUser = await this.#User.create({
      name,
      username,
      t_id,
    });

    await this.invitation(il, newUser.il);

    return this.createToken(newUser);
  }

  // login
  async loginUser(token: string, il: string) {
    const userData: any = encryptionUtil.decrypt(token);

    const user = await this.#User.findOne({ t_id: userData.id });

    if (!user)
      return this.createUser(
        userData.first_name || "user",
        userData.username || `user_${userData.id}`,
        userData.id,
        il
      );

    return this.createToken(user);
  }

  // generate login lisence
  createToken(user: any) {
    const accessToken = this.signToken({ id: user.id });

    console.log(user);
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

      if (!hostUser || !guestUser || hostUser.friends.includes(guestUser.id))
        return {
          success: false,
          generatedHistory: null,
        };

      hostUser.friends.push(guestUser.id);

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
      console.log(error);
      return {
        success: false,
        generatedHistory: null,
      };
    }
  }
}

export default new AuthService();
