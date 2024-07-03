require("dotenv").config();
const { encrypt, decrypt } = require("cipher-guard");

class EncryptionUtil {
  private encryptionKey;
  private salt;
  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY;
    this.salt = process.env.ENCRYPTION_SALT;
  }

  encrypt(object: any) {
    const text = JSON.stringify(object);
    const encrypted = encrypt(text, this.encryptionKey, this.salt);
    return encrypted;
  }

  decrypt(text: any) {
      const decrypted = decrypt(text, this.encryptionKey, this.salt);
      console.log(decrypted)
      const decryptedVAl = JSON.parse(decrypted);
      return decryptedVAl;
    
  }
}

export default new EncryptionUtil();
