import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../modules/user/user.model";

const createHttpError = require("http-errors");

const authGuard = async (req: any, res: Response, next: any) => {
  try {
    const jwtSecretKey: any = process.env.JWT_SECRET_KEY;
    const { authorization } = req?.headers;
    if (!authorization) throw new createHttpError.Unauthorized("unauthorized");
    const [bearer, token] = authorization?.split(" ");

    if (!token) throw new createHttpError.Unauthorized("unauthorized");

    const data = jwt.verify(token, jwtSecretKey);

    if (typeof data === "object" && "id" in data) {
      const user = await User.findById(data.id);

      if (!user) throw new createHttpError.Unauthorized("notFound");

      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized("unauthorized");
  } catch (error) {
    next(error);
  }
};
export default authGuard;
