import {User as userModel} from "../models/Users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserValidation from "../helpers/validators/userValidation";
import ValidationHelper from "../helpers/validators/ValidationHelper";

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
            const validationRules = {
                firstName: 'string|required|min:3|max:30',
                lastName: 'string|required|min:3|max:30',
                email: 'string|required|email',
                password: 'string|required|min:8|max:30',
            };

            const validationResult = ValidationHelper.validateRequest(req, validationRules);
            if (validationResult) {
                return res.status(400).json(validationResult);
            }

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
        try{
            const allUserss = await userModel.findAll();
            res.status(200).send({Userss:allUserss});
        }
        catch(err){
            res.status(500).send({error:err});
        }
    }

    async login(req: any, res: any){
        try{
            const { email, password } = req.body;

            const User: any = await userModel.findOne({ where: { email: email } });
            const isPasswordMatch = await bcrypt.compare(password, User.password)
            if(User && isPasswordMatch){
                const token = jwt.sign({userId : User.id}, 'secretkey', {expiresIn:"12h"})
                res.status(200).send({Users:this.safeUsers(User), token:token})
            }
            else{
                res.status(401).send({msg:"Incorrect email or password"});
            }
        }
        catch(err){
            res.status(500).send({error:err});
        }
    }

    async updateUser(req: any, res: any) {
        try{
            const validationRules = {
                firstName: 'string|min:3|max:30',
                lastName: 'string|min:3|max:30',
                email: 'string|email',
                password: 'string|min:8|max:30',
            };

            const validationResult = ValidationHelper.validateRequest(req, validationRules);
            if (validationResult) {
                return res.status(400).json(validationResult);
            }

            const user: any = await userModel.findOne({ where: { id: req.userId } });
            const {firstName, lastName, email, password} = req.body;

            const updatedUser = await user.update({
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                email: email || user.email,
                profilePhoto: req.file?.filename || user.profilePhoto
            });

            let hashedPassword;
            if(password){
                hashedPassword = await bcrypt.hash(password, 10);
                updatedUser.update({
                    password: hashedPassword,
                });
            }
            
            const data = {
                users: this.safeUsers(updatedUser)
            }
            res.status(201).send({msg:"Users updated sucessfully", data });
        }
        catch(err){
            const errorMessage = err instanceof Error ? err.message : String(err);
            res.status(500).send({error: errorMessage});
        }
    }
};

export default new UsersController();