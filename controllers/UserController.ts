import {User as userModel} from "../models/Users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserValidation from "../middleware/userValidation";

class UsersController{
    constructor(){
        this.create = this.create.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    safeUsers(Users: userModel){
        const safeUsers = Users.toJSON();
        delete safeUsers.password;
        return safeUsers;
    }

    async create(req: any,res: any) {
        try{
            UserValidation(req,res);
            const {firstName, lastName, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
            const newUsers = await userModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profilePhoto: req.file?.filename || null
            });
            res.status(201).send({msg:"New Users created", Users: this.safeUsers(newUsers)});
        }
        catch(err){
            const errorMessage = err instanceof Error ? err.message : String(err);
            res.status(500).send({error: errorMessage});
        }
    }

    async getUsers(req: any,res: any){
        const allUserss = await userModel.findAll();
        res.status(200).send({Userss:allUserss});
    }

    async login(req: any, res: any){
        const { email, password } = req.body;
        const User: any = await userModel.findOne({ where: { email: email } });
        
        const isPasswordMatch = await bcrypt.compare(password, User.password)
        if(User && isPasswordMatch){
            const token = jwt.sign({UsersId : User.id}, 'secretkey', {expiresIn:"1h"})
            res.status(200).send({Users:this.safeUsers(User), token:token})
        }
        else{
            res.status(401).send({msg:"Incorrect email or password"});
        }
    }

    async updateUser(req: any, res: any) {
        try{
            const Users: any = await userModel.findOne({ where: { id: req.UsersId } });

            const {firstName, lastName, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);

            const updatedUsers = await Users.update({
                firstName:firstName||Users.firstName,
                lastName:lastName||Users.lastName,
                email:email||Users.email,
                password: hashedPassword||Users.password,
                profilePhoto: req.file?.filename || Users.profilePhoto
            });
            res.status(201).send({msg:"Users updated sucessfully", Users: this.safeUsers(updatedUsers)});
        }
        catch(err){
            const errorMessage = err instanceof Error ? err.message : String(err);
            res.status(500).send({error: errorMessage});
        }
    }
};

export default new UsersController();