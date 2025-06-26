import User from "../models/Users";
import Role from "../models/Roles";
import Permission from "../models/Permissions";

export function checkPermission(req: any, res: any, next: any){
    const {userId} = req.userId;

    const role = 
}