import express from 'express'
import { testDB } from './db/connection.mjs';
import userRouter from './routers/userRouter.mjs'
import { sequelize } from './db/connection.mjs';

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.get('/', (req,res)=>{
    res.status(200).send({hello:"world"});
});

app.listen(PORT, async ()=>{
    console.log(`Server started at port ${PORT}`);
    await testDB();
    await sequelize.sync();
});
