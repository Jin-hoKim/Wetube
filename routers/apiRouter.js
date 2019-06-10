import express from "express";
import routes from "../routes";
import { postRegistView, postAddComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegistView);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
