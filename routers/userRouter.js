import express from "express";
import routes from "../routes";
import {
	userProfile,
	userChangePassword,
	users,
	logout,
	getUserEditProfile,
	postUserEditProfile,
	getUserChangePassword,
	postUserChangePassword
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.users, users);

userRouter.get(routes.userChangePassword, onlyPrivate, getUserChangePassword);
userRouter.post(routes.userChangePassword, onlyPrivate, postUserChangePassword);

userRouter.get(routes.userEditProfile, onlyPrivate, getUserEditProfile);
userRouter.post(
	routes.userEditProfile,
	onlyPrivate,
	uploadAvatar,
	postUserEditProfile
);

// userRouter.get(routes.userProfile(), userProfile);

userRouter.get(routes.logout, logout);

export default userRouter;
