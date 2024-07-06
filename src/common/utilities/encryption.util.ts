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
    const originalData = object;
    const jsonString = JSON.stringify(originalData);

    const encrypted = encrypt(jsonString, this.encryptionKey, this.salt);
    return encrypted;
  }

  decrypt(text: any) {
    const decryptedString = decrypt(text, this.encryptionKey, this.salt);
    console.log("Decrypted String:", decryptedString);

    const originalData = JSON.parse(decryptedString);

    console.log("Original Data:", originalData);
    return originalData;
  }
}

export default new EncryptionUtil();
