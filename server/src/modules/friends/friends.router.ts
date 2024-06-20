import express from "express";
import friendsController from "./friends.controller";
import authGuard from "../../common/guards/auth.guard";
const FriendsRouter = express.Router();

FriendsRouter.get("/", authGuard, friendsController.getUserFriends);
FriendsRouter.get("/il", authGuard, friendsController.generateIl);

export default FriendsRouter;
