import User from "../models/Users";
import Role from "../models/Roles";
import Permission from "../models/Permissions";

export async function checkPermission(req: any, res: any, next: any){
    const userId = req.userId;
    const endpoint = req.path.split('/').pop();

    const user = await User.findByPk(userId, {
        include: {
            model: Role,
            include: [
                Permission
            ]
        }
    });
    
    let permissions = user?.roles[0].permissions.map((permission : Permission) => {
        return permission.name;
    });
    if(permissions.includes(endpoint)){
        next();
    }
    else{
        return res.status(403).send({ msg: "Forbidden: You don't have access" });
    }
}