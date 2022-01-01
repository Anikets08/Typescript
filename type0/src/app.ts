import express from 'express';
import { baseRouter } from './routes/base.routes';
import { userRouter } from './routes/user.routes';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})

app.use("/", baseRouter, userRouter);
