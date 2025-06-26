import Joi from "joi";

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

export default function userValidation(req,res){
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
            console.log(error);
            throw new Error(error.error.details[0].message)
        }
    }
    catch(err){
        throw (err);
    }

};