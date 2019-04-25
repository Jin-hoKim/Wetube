import express from 'express';
import routes from '../routes';
import { home, getVideoUpload, postVideoUpload, videoDelete, videoEdit, videoDetail } from '../controllers/videoController';

const videoRouter = express.Router();
videoRouter.get(routes.videos, home);
videoRouter.get(routes.videoUpload, getVideoUpload);
videoRouter.post(routes.videoUpload, postVideoUpload);
videoRouter.get(routes.videoEdit(), videoEdit);
videoRouter.get(routes.videoDelete(), videoDelete);
videoRouter.get(routes.videoDetail(), videoDetail );

export default videoRouter;