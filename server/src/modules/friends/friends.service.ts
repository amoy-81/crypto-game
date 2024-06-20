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
      .populate("friends", "-password -il -currentCredit -friends -__v")
      .exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    return user.friends;
  }

  async getUserIl(userId: string) {
    const user = await this.#User.findById(userId);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    return user.il;
  }
}

export default new FriendsService();
