import User from "../user/models/user.model";
import createHttpError from "http-errors";

class FriendsService {
  #User;
  constructor() {
    this.#User = User;
  }

  async getUserFriends(userId: string) {
    const user = await this.#User
      .findById(userId)
      .populate("friends", "-password");

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    return user.friends;
  }
}

export default new FriendsService();
