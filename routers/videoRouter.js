import express from 'express';
import routes from '../routes';
import { home, upload, detail, edit, deleteVideo } from '../controllers/videoController';

const videoRouter = express.Router();
videoRouter.get(routes.videos, home);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, detail);
videoRouter.get(routes.editVideo, edit);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;