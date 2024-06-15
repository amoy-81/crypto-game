import User from "../user/user.model";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

class AuthService {
  #User;
  constructor() {
    this.#User = User;
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
    };
  }

  signToken(payload: any, expiresIn = "30d") {
    const jwtSecretKey: any = process.env.JWT_SECRET_KEY;
    return jwt.sign(payload, jwtSecretKey, { expiresIn });
  }
}

export default new AuthService();
