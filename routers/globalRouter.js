import passport from "passport";
import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
	logout,
	postJoin,
	getJoin,
	postLogin,
	getLogin,
	githubLogin,
	githubLoginCallback,
	postGithubLogin,
	facebookLogin,
	postFacebookLogin,
	getUserMe
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
	routes.githubCallback,
	passport.authenticate("github", { failureRedirect: routes.login }),
	postGithubLogin
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
	routes.facebookCallback,
	passport.authenticate("facebook", {
		failureRedirect: routes.login
	}),
	postFacebookLogin
);

globalRouter.get(routes.me, getUserMe);

export default globalRouter;
