import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
    "postgres",
    "postgres",
    "1234567890",
    {
        host: 'localhost',
        port: 5432,
        dialect: "postgres",
        logging: false
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