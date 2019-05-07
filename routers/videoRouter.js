import express from 'express';

import { home, getVideoUpload, postVideoUpload, videoDelete, videoEdit, videoDetail, postVideoEdit, getVideoEdit } from '../controllers/videoController';
import { uploadVideo } from '../middlewares';
import routes from '../routes';

const videoRouter = express.Router();

videoRouter.get(routes.videos, home);

videoRouter.get(routes.videoUpload, getVideoUpload);
videoRouter.post(routes.videoUpload, uploadVideo, postVideoUpload);

videoRouter.get(routes.videoEdit(), getVideoEdit);
videoRouter.post(routes.videoEdit(), postVideoEdit);

videoRouter.get(routes.videoDelete(), videoDelete);
videoRouter.get(routes.videoDetail(), videoDetail );

export default videoRouter;