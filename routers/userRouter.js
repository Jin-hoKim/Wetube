import express from 'express';
import routes from '../routes';
import { users, detail, edit, changePassword } from '../controllers/userController';

const userRouter = express.Router();
userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, edit);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, detail);

export default userRouter;