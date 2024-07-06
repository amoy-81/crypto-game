import { isJson } from "./utils";
import { encrypt, decrypt } from "cipher-guard";
require("dotenv").config();

class EncryptionUtil {
  private encryptionKey: any;
  private salt: any;
  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY;
    this.salt = process.env.ENCRYPTION_SALT;
  }

  encrypt(object: any) {
    const encrypted = encrypt(object, this.encryptionKey, this.salt);
    return encrypted;
  }

  decrypt(text: any) {
    const decrypted = decrypt(text, this.encryptionKey, this.salt);
    console.warn("Decrypted =>", decrypted);
    return decrypted;
  }
}

export default new EncryptionUtil();
