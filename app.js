import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { userRouter } from './route';

var app = express();

const handleHome = (req,res) => {
    res.send("sended from handleHome");
}
const handleProfile = (req,res) => {
    res.send("sended form handleProfile"); 
}

// middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app;