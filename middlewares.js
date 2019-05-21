import multer from "multer";

import routes from "./routes";

export const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
	res.locals.siteName = "WeTube";
	res.locals.routes = routes;

	// res.locals.user = {
	// 	isAuthenticated: false,
	// 	id: 1
	// };

	res.locals.user = req.user || {};

	console.log(req.user);

	next();
};

export const uploadVideo = multerVideo.single("videoFile");
