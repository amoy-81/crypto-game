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

  registerValidation(body: {
    name: string;
    username: string;
    password: string;
  }) {
    // Define validation schema for user registration.
    const schema = {
      name: Joi.string().max(50).required(),
      username: Joi.string().max(50).required(),
      password: Joi.string().min(6).required(),
    };

    this.checkValidation(schema, body);
  }

  loginValidation(body: { username: string; password: string }) {
    // Define validation schema for user registration.
    const schema = {
      username: Joi.string().max(50).required(),
      password: Joi.string().min(6).required(),
    };

    this.checkValidation(schema, body);
  }
}

export default new JoiValidation();
