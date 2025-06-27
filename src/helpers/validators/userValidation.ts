import Joi from "joi";

export default class UserValidation {
  static userCreateSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  });

  static userUpdationSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(30),
  });

  static validateCreate(data: any) {
    const  {error}  = this.userCreateSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
  }

  static validateUpdate(data: any) {
    const { error } = this.userUpdationSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
  }
}
