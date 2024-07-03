import Joi from "joi";
import autoBind from "auto-bind";

class JoiValidation {
  constructor() {
    autoBind(this);
  }

  checkValidation(schema: any, body: any) {
    // Perform the joi validation on given body against defined
    const validationResult = Joi.object(schema).validate(body);

    //  If any error found in request, send back the error with status code 500
    if (validationResult.error) throw validationResult.error;
  }

  loginValidation(body: { token: string; il: string }) {
    // Define validation schema for user registration.
    const schema = {
      token: Joi.string().required(),
      il: Joi.string().allow(null).required(),
    };

    this.checkValidation(schema, body);
  }

  walletValidation(body: { token: string }) {
    // Define validation schema for create transaction.
    const schema = {
      token: Joi.string().required(),
    };

    this.checkValidation(schema, body);
  }

  transactionValidation(body: { wallet: string; amount: number }) {
    // Define validation schema for create transaction.
    const schema = {
      wallet: Joi.string().required(),
      amount: Joi.number().required(),
      exp: Joi.number().required(),
    };

    this.checkValidation(schema, body);
  }
}

export default new JoiValidation();
