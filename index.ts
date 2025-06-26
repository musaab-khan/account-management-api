import express from 'express'
import userRouter from './routers/userRouter'
import addressRouter from './routers/addressRoutes'
import { sequelize, testDB } from './db/connection';

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/address',addressRouter);
app.use('/api/users', userRouter);

app.get('/', (req,res)=>{
    res.status(200).send({hello:"This is not the home page"});
});

app.listen(PORT, async ()=>{
    console.log(`Server started at port ${PORT}`);
    await testDB();
    await sequelize.sync();
});
