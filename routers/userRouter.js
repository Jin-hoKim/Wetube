import express from "express";
import routes from "../routes";
import {
	userEditProfile,
	userChangePassword,
	userDetail,
	users,
	logout
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();
userRouter.get(routes.users, users);
userRouter.get(routes.userChangePassword(), onlyPrivate, userChangePassword);
userRouter.get(routes.userEditProfile(), onlyPrivate, userEditProfile);
userRouter.get(routes.userDetail(), userDetail);

userRouter.get(routes.logout, logout);

export default userRouter;
