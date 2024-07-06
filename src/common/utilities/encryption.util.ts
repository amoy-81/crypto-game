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
    const textString: string = isJson(text) ? JSON.parse(text) : text;
    const result = textString.replace("+", " ");
    const decrypted = decrypt(result, this.encryptionKey, this.salt);
    console.warn("Decrypted =>", decrypted);
    const decryptedVAl = isJson(decrypted) ? JSON.parse(decrypted) : decrypted;
    return decryptedVAl;
  }
}

export default new EncryptionUtil();
