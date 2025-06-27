import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required()
});

const userUpdationSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(30)
});

export default function userValidation(req: Request, res: Response, next: NextFunction){
    try{
        const token = req.header("Authorization");
        let error=null;
        if(!token){
            error = userSchema.validate(req.body);
        }
        else{
            error = userUpdationSchema.validate(req.body);
        }

        if(error.error){
            console.log(error.error.details[0].message);
            throw new Error(error.error.details[0].message);
        }
        next();
    }
    catch(err){
        throw (err);
    }

};