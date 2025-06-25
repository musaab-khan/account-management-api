import { where } from "sequelize";
import User from "../models/Users.mjs";
import bcrypt from 'bcrypt';

class UserController{
    
    safeUser(user){
        const safeUser = user.toJSON();
        delete safeUser.password;
        return safeUser;
    }

    async create(req,res) {
        try{
            const {firstName, lastName, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profilePhoto: req.file?.filename || null
            });
            res.status(201).send({msg:"New user created", user: this.safeUser(newUser)});
        }
        catch(err){
            res.status(500).send({error:err.message});
        }
    }


    async getUsers(req,res){

        const allUsers = await User.findAll();

        res.status(200).send({users:allUsers});
    }

    async login(req, res){
        const {email,password} = req.body;
        const user = await User.findOne({ where: { email: email } });
        if(await bcrypt.compare(password,user.password)){
            res.status(200).send({user:this.safeUser(user)})
        }
        else{
            res.sendStatus(401);
        }
    }
};

export default new UserController();