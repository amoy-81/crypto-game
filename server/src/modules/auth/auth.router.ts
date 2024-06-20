import express from "express";
import authController from "./auth.controller";
const AuthRouter = express.Router();

AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);

export default AuthRouter;
