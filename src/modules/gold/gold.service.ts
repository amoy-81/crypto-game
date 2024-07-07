import Gold from "./models/gold.model";

// GoldService class
class GoldService {
  #goldModel;

  constructor() {
    this.#goldModel = Gold;
  }

  async getCurrentPrice() {
    const current = await this.#goldModel.findOne().sort({ _id: -1 });
    return current;
  }

  async getChanges() {
    const changes = await this.#goldModel.find().sort({ _id: -1 }).limit(6);
    return changes;
  }

  async createPrice() {
    const prof = { from: 1500, range: 500 };
    const price = await this.#goldModel.create({
      price: (Math.random() * prof.range + prof.from).toFixed(0),
    });
    return price;
  }
}

export default new GoldService(); // Export an instance of GoldService
