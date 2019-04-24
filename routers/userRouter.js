import express from 'express';
import routes from '../routes';
import { userEditProfile, userChangePassword, userDetail, users } from '../controllers/userController';

const userRouter = express.Router();
userRouter.get(routes.users, users);
userRouter.get(routes.userChangePassword, userChangePassword);
userRouter.get(routes.userEditProfile, userEditProfile);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;