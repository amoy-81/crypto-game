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
    const text = !isJson(object) ? JSON.stringify(object) : object;
    const encrypted = encrypt(text, this.encryptionKey, this.salt);
    return encrypted;
  }

  decrypt(text: any) {
    const textString = isJson(text) ? JSON.parse(text) : text;
    const decrypted = decrypt(textString, this.encryptionKey, this.salt);
    console.warn(decrypted);
    const decryptedVAl = isJson(decrypted) ? JSON.parse(decrypted) : decrypted;
    return decryptedVAl;
  }
}

export default new EncryptionUtil();
