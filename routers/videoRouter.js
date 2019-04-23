import express from 'express';
import routes from '../routes';
import { home, videoUpload, videoDelete, videoEdit } from '../controllers/videoController';

const videoRouter = express.Router();
videoRouter.get(routes.videos, home);
videoRouter.get(routes.videoUpload, videoUpload);
videoRouter.get(routes.videoDetail, videoDelete );
videoRouter.get(routes.videoEdit, videoEdit);
videoRouter.get(routes.videoDelete, videoDelete);

export default videoRouter;