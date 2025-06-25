import Joi from "joi";

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required()
})

export default function userValidation(req,res,next){
    const error = userSchema.validate(req.body);
    // console.log(req.body);
    // console.log(userSchema.validate(req.body));
    if(error.error){
        console.log(error);
        return res.status(400).send({error:error.error});
    }

    next();
};