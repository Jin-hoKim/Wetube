import pug from 'pug';

import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from "./routes";
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import { localMiddleware } from './middlewares';

var app = express();

// middleware
app.use(helmet());

// engines
app.set("view_engine", pug);

// /upload 경로로 진입을 한다면 controller, router등을 거치지 않고 
// 폴더에서 파일을 보내주는 Middleware
// "uploads" 폴더를 직접 접근하여 파일을 검색, 전송
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;