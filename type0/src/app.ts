import express from 'express';
import config from './config';
import connect from './db';
import { baseRouter } from './routes/base.routes';
import { userRouter } from './routes/user.routes';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = config.port || process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})

connect();

app.use("/", baseRouter, userRouter);
