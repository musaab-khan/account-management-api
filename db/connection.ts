import { Sequelize } from 'sequelize-typescript';
import User from '../models/Users.js';
import Address from '../models/Address.js';
import Roles from '../models/Roles.js';
import Permissions from '../models/Permissions.js';
import roles_permissions from '../models/roles_permissions.js';
import user_roles from '../models/user_roles.js';

const sequelize = new Sequelize(
    "postgres",
    "postgres",
    "1234567890",
    {
        host: 'localhost',
        port: 5432,
        dialect: "postgres",
        logging: false,
        models: [User, Address, Roles, Permissions, roles_permissions, user_roles]
    }
);

async function testDB(){
    try{
        await sequelize.authenticate();
        console.log("Connection to DB is successfull :)");
    }
    catch(error){
        console.log("Error Connecting to DB :(");
        console.log("Error: ",error);
    }
}

export {sequelize,testDB};