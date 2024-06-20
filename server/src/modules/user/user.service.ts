import User from "./models/user.model";
import createHttpError from "http-errors";

// Enum for specifying credit change type
export enum changeUserCreditT {
  i = "INCREASE",
  d = "DECREASE",
}

// UserService class for managing user operations
class UserService {
  #userModel;
  // Initialize User model
  constructor() {
    this.#userModel = User;
  }

  // Method to change user credit
  async changeUserCredit(
    userId: string,
    type: changeUserCreditT,
    amount: number
  ) {
    // Find user by ID
    const user = await this.#userModel.findById(userId);

    // Throw error if user not found
    if (!user) throw new createHttpError[404]("User Not Found");

    // Get current credit of user
    const userCredit: any = user.currentCredit;

    // Calculate final credit based on the change type
    const finalCredit =
      type === changeUserCreditT.i ? userCredit + amount : userCredit - amount;

    // Update user's current credit
    user.currentCredit = finalCredit;

    // Throw error if final credit is less than 0
    if (finalCredit < 0) throw new createHttpError[400]("Your credit is low");

    // Save the updated user information
    await user.save();

    // Destructure user object to exclude password
    const { password, ...userResult } = user.toJSON();
    // Return user object without password
    return userResult;
  }
}
// Export an instance of UserService
export default new UserService();
