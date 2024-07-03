import createHttpError from "http-errors";
import userService, { changeUserCreditT } from "../user/user.service";
import Transaction from "./models/transaction.model";

// WalletService class
class WalletService {
  #userService; // Private field for userService
  #transactionModel;

  constructor() {
    this.#userService = userService; // Initialize userService
    this.#transactionModel = Transaction;
  }

  async createTransaction(payer: string, receiver: string, amount: number) {
    // Check if payer and receiver are valid users
    const payerModel = await this.#userService.findById(payer);
    const receiverModel = await this.#userService.findById(receiver);

    const payerCreditChange = await this.#userService.changeUserCredit(
      payer,
      changeUserCreditT.d,
      amount
    );

    const receiverCreditChange = await this.#userService.changeUserCredit(
      receiver,
      changeUserCreditT.i,
      amount
    );

    const newTransaction = await this.#transactionModel.create({
      payer,
      receiver,
      amount,
    });

    await newTransaction.populate("receiver", "-friends -t_id -il -__v");
    return { newTransaction, payerCreditChange };
  }

  async getUser(id: string) {
    const user = await this.#userService.findById(id);
    return user;
  }
}

export default new WalletService(); // Export an instance of WalletService
