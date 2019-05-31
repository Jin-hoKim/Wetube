import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import InstagramStrategy from "passport-instagram";
import User from "./models/User";
import {
	githubLoginCallback,
	facebookLoginCallback,
	instagramLoginCallback
} from "./controllers/passportController";
import routes from "./routes";

// strategy : 로그인하는 방식, 인증하는 방식
// 아래의 내용은 passport-local-mongoose에서 제공하는 인증방식을 사용한다
// 즉, User 모델에 정의된 스키마 내용을 가지고 인증과정을 passport-local-mongoose가 처리한다.
passport.use(User.createStrategy());

// serialize : 쿠키에 담을 내용을 설정
passport.serializeUser(User.serializeUser());

// deserialize : 쿠키에 저장된 값을 어떻게 찾는가를 설정
passport.deserializeUser(User.deserializeUser());

// Github 인증서 사용설정
passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: `http://localhost:4000${routes.githubCallback}`
		},
		githubLoginCallback
	)
);

// FACEBOOK 인증서 사용설정
passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
			callbackURL: `http://localhost:4000${routes.facebookCallback}`,
			profileFields: [
				"id",
				"first_name",
				"last_name",
				"emails",
				"picture.type(large)"
			]
		},
		facebookLoginCallback
	)
);

// INSTAGRAM 인증서 사용 설정
// passport.use(
// 	new InstagramStrategy(
// 		{
// 			clientID: process.env.INSTAGRAM_ID,
// 			clientSecret: process.env.INSTAGRAM_SECRET,
// 			callbackURL: `http://localhost:4000${routes.instagramCallback}`
// 		},
// 		instagramLoginCallback
// 	)
// );
