import jwt from 'jsonwebtoken';

export default function authenticateToken(req: any, res: any, next: any){
    try{
        const token = req.header("Authorization");
        if(!token){
            return res.status(401).send({msg:"No authorization token found"});
        }

        const decode:any = jwt.verify(token, 'secretkey');
        if(decode){
            req.userId= decode.userId;
            next();
        }else{
            return res.status(401).send({msg:"could not verify token"});
        }
    }
    catch(error){
        res.status(401).send({msg:"Invalid Authoization Token"});
    }
};