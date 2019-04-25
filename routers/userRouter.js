import express from 'express';
import routes from '../routes';
import { userEditProfile, userChangePassword, userDetail, users, join, login, logout } from '../controllers/userController';

const userRouter = express.Router();
userRouter.get(routes.users, users);
userRouter.get(routes.userChangePassword, userChangePassword);
userRouter.get(routes.userEditProfile, userEditProfile);
userRouter.get(routes.userDetail, userDetail);

userRouter.post(routes.login, login);
userRouter.get(routes.logout, logout);

export default userRouter;