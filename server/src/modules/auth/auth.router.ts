import express from "express";
import authController from "./auth.controller";
const AuthRouter = express.Router();

// TODO : Mine with add a friend from link
AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);

export default AuthRouter;
