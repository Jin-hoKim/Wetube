import express from "express";
import routes from "../routes";
import {
	postRegistView,
	postAddComment,
	postRemoveComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegistView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.removeComment, postRemoveComment);

export default apiRouter;
