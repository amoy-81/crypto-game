import createHttpError from "http-errors";
import Record from "./models/record.model";
import userService, { changeUserCreditT } from "../user/user.service";
import Resource, { mineT } from "./models/resource.model";

// CoinService class for managing mining operations
class CoinService {
  #recordModel; // Private field for Record model
  #resourceModel; // Private field for Resource model
  #userService; // Private field for userService

  constructor() {
    this.#recordModel = Record; // Initialize Record model
    this.#resourceModel = Resource; // Initialize Record model
    this.#userService = userService; // Initialize userService
  }

  // Method to find open mining records for a user
  async findOpenRecords(user: string) {
    // Find a record that is not mined
    const record = await this.#recordModel.findOne({ user, isMined: false });
    // Return the found record
    return record;
  }

  // Method to create a new mining record for a user
  async createRecord(user: string) {
    // Get the current time in seconds
    const startAt = Math.floor(new Date().getTime() / 1000);
    // Check if there is an open mining record
    const currentRecord = await this.findOpenRecords(user);
    // Throw error if user is already mining
    if (currentRecord) throw new createHttpError[400]("You are mining!!!");
    // Create a new mining record with start time
    const newRecord = await this.#recordModel.create({ user, startAt });
    // Return the new record
    return newRecord;
  }

  // Method to complete the mining process for a user
  async mine(userId: string) {
    // 4 minutes (in seconds) required for max mining reward
    const prof = 240;
    // Divisor for calculating mined coins
    const divisor = 60;

    // Get the current time in seconds
    const now = Math.floor(new Date().getTime() / 1000);
    // Find the open mining record for the user
    const record = await this.findOpenRecords(userId);
    // Throw error if no open mining record found
    if (!record) throw new createHttpError[400]("You have not mined a coin");
    // Get the start time of the mining record
    const startTime: any = record.startAt;
    // Calculate the mining duration
    const recordTime = now - startTime;

    // Calculate mined coins based on mining duration
    const minedCoin = recordTime > prof ? 5 : Math.floor(recordTime / divisor);

    if (minedCoin == 0)
      throw new createHttpError[400]("You have not mined anything.");

    // Update the mined coin amount in the record
    // Set the end time of the mining
    // Mark the record as mined
    record.amountMined = minedCoin;
    record.endAt = now;
    record.isMined = true;

    const lastTotalResource = await this.#resourceModel
      .findOne()
      .sort({ _id: -1 });

    const lastLeftOver: any = lastTotalResource?.leftOver;

    if (lastLeftOver < minedCoin)
      throw new createHttpError[400]("Resources are exhausted");

    // Save the updated record
    await record.save();

    const newTotalResource = lastLeftOver - minedCoin;

    const newHistory = await this.#resourceModel.create({
      user: userId,
      amount: minedCoin,
      type: mineT.normalMine,
      leftOver: newTotalResource,
    });

    // Update the user's credit with the mined coins
    const userUpdated = await this.#userService.changeUserCredit(
      userId,
      changeUserCreditT.i,
      minedCoin
    );

    // Return the mining details and updated user information
    return { recordTime, record, user: userUpdated, newHistory };
  }
}

export default new CoinService(); // Export an instance of CoinService
