import express from "express";

import {
	home,
	getVideoUpload,
	postVideoUpload,
	videoDelete,
	videoEdit,
	videoDetail,
	postVideoEdit,
	getVideoEdit
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.videos, home);

videoRouter.get(routes.videoUpload, onlyPrivate, getVideoUpload);
videoRouter.post(routes.videoUpload, onlyPrivate, uploadVideo, postVideoUpload);

videoRouter.get(routes.videoEdit(), onlyPrivate, getVideoEdit);
videoRouter.post(routes.videoEdit(), onlyPrivate, postVideoEdit);

videoRouter.get(routes.videoDelete(), onlyPrivate, videoDelete);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
