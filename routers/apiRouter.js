import express from "express";
import routes from "../routes";
import { postRegistView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get(routes.registerView, postRegistView);

export default apiRouter;
