import passport from "passport";
import routes from "../routes";
import User, { TYPE_SOCIAL, TYPE_NORMAL } from "../models/User";

export const users = (req, res) => {
	res.redirect(routes.home);
};

/**
 * MEMBER JOIN - GET
 * @method GET
 * @param {*} req
 * @param {*} res
 */
export const getJoin = (req, res) => {
	res.render("join.pug", { pageTitle: "Join" });
};

/**
 * MEMBER JOIN - POST
 * PASSPORT-LOCAL-MONGOOSE를 이용하여 회원가입
 * @param {} req
 * @param {*} res
 * @param {*} next : 다음 실행될 METHOD
 */
export const postJoin = async (req, res, next) => {
	// console.log(req.body);
	const {
		body: { name, email, password, password2 }
	} = req;

	if (password !== password2) {
		res.status(400);
		res.render("errorJoin.pug", {
			pageTitle: "Join",
			errorMsg: "비밀번호가 일치하지 않습니다!"
		});
	} else {
		try {
			const user = await User({
				type: TYPE_NORMAL,
				name,
				email
			});
			await User.register(user, password);
			next();
		} catch (error) {
			console.log(error);
			res.redirect(routes.home);
		}
	}
};

/**
 * WETUBE LOGIN - GET
 * @method GET
 * @param {*} req
 * @param {*} res
 */
export const getLogin = (req, res) => {
	res.render("login.pug", { pageTitle: "Login" });
};

/**
 * WETUBE LOGIN - POST
 * PASSPORT-LOCAL-MONGOOSE를 통해 로그인한다.
 * @method POST
 */
export const postLogin = passport.authenticate("local", {
	failureRedirect: routes.login,
	failureFlash: "Invalid username or password",
	successRedirect: routes.home
});

/**
 * GITHUB 계정으로 로그인 권한 검사
 * @method GET
 */
export const githubLogin = passport.authenticate("github");

/**
 * GITHUB 계정으로 로그인 권한 검색 결과
 * @param {*} accessToken : 사용안함
 * @param {*} refreshToken : 사용안함
 * @param {*} profile : GITHUB 사용자 정보
 * @param {} cb : 다음 실행할 METHOD
 * @returns {error, user} cb : 에러 또는 로그인/가입한 사용자 정보 반환
 */
export const githubLoginCallback = async (
	accessToken,
	refreshToken,
	profile,
	cb
) => {
	// console.log(accessToken, refreshToken, profile, cb);
	const {
		_json: { id, avatar_url: avatarUrl, name, email }
	} = profile;

	try {
		const user = await User.findOne({ email });
		if (user) {
			user.type = TYPE_SOCIAL;
			user.githubId = id;
			user.save();
			return cb(null, user); // cb(error, user)
		}
		const newUser = await User.create({
			type: TYPE_SOCIAL,
			email,
			name,
			avatarUrl,
			githubId: id
		});
		return cb(null, newUser);
	} catch (error) {
		return cb(error);
	}
};

/**
 * GITHUB 계정으로 로그인 / 회원가입 완료
 * @param {*} req
 * @param {*} res
 */
export const postGithubLogin = async (req, res) => {
	res.redirect(routes.home);
};

/**
 * FACEBOOK 계정으로 로그인 권한 검사 / EMAIL 정보 요청
 */
export const facebookLogin = passport.authenticate("facebook", {
	scope: ["email"]
});

/**
 * FACEBOOK 계정으로 로그인 권한 검삭 결과
 * @param {*} accessToken : 사용안함
 * @param {*} refreshToken : 사용안함
 * @param {*} profile : 사용자 정보
 * @param {*} cb : 다음 실행될 METHOD
 * @returns {error, user} cb : 에러 또는 로그인/가입한 사용자 정보 반환
 */
export const facebookLoginCallback = async (
	accessToken,
	refreshToken,
	profile,
	cb
) => {
	const {
		_json: { id, email, first_name: firstName, last_name: lastName, picture }
	} = profile;

	try {
		const user = await User.findOne({ email });
		if (user) {
			user.type = TYPE_SOCIAL;
			user.facebookId = id;
			user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
			user.save();
			return cb(null, user);
		}

		const newUser = await User.create({
			type: TYPE_SOCIAL,
			email,
			name: `${firstName} ${lastName}`,
			facebookId: id,
			avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
			// avatarUrl: picture.data.url // 임시 URL
		});
		return cb(null, newUser);
	} catch (error) {
		return cb(error);
	}
};

/**
 * FACEBOOK 계정으로 로그인  / 회원가입 완료
 * @param {*} req
 * @param {*} res
 */
export const postFacebookLogin = (req, res) => {
	res.redirect(routes.home);
};

/**
 * INSTAGRAM 계정으로 로그인 권한 검사 (추후진행)
 */
export const instagramLogin = passport.authenticate("instagram");

/**
 * INSTAGRAM 계정으로 로그인 권한 검사 결과 (추후진행)
 * @param {*} accessToken
 * @param {*} refreshToken
 * @param {*} profile : 사용자 정보
 * @param {*} cb : 다음 실행될 METHOD
 * @returns {error, user} cb : 에러 또는 로그인/가입한 사용자 정보 반환
 */
export const instagramLoginCallback = (
	accessToken,
	refreshToken,
	profile,
	cb
) => {
	console.log(profile);
	return cb(null);
};

/**
 * INSTAGRAM 계정으로 로그인 완료
 * @param {*} req
 * @param {*} res
 */
export const postInstagramLogin = (req, res) => {
	res.redirect(routes.home);
};

/**
 * 사용자 프로필 페이지
 * @method GET
 * @param {*} req
 * @param {*} res
 */
export const userProfile = async (req, res) => {
	console.log(">>>>>>>> userProfile <<<<<<<<<<<");

	try {
		const user = await User.findById({ _id: req.user.id });
		res.render("userProfile.pug", { pageTitle: "Profile", user });
	} catch (error) {
		res.redirect(routes.home);
	}
};

/**
 * 사용자 프로필 수정 - GET
 * @method GET
 * @param { user:User } req
 * @param {*} res
 */
export const getUserEditProfile = (req, res) => {
	console.log(">>>>>>>> getUserEditProfile <<<<<<<<<<<");

	res.render("userEditProfile.pug", {
		pageTitle: "Edit Profile",
		user: req.user
	});
};

/**
 * 사용자 프로필 수정 - POST
 * @method POST
 * @param { user:User } req
 * @param {*} res
 */
export const postUserEditProfile = async (req, res) => {
	const {
		body: { name, email },
		file
	} = req;

	try {
		await User.findByIdAndUpdate(req.user.id, {
			name,
			email,
			avatarUrl: file ? file.path : req.user.avatarUrl
		});
		res.redirect(routes.me);
	} catch (error) {
		res.redirect(routes.userEditProfile);
	}
};

/**
 * 사용자 비밀번호 수정
 * @method GET
 * @param {*} req
 * @param {*} res
 */
export const getUserChangePassword = (req, res) => {
	console.log(">>>>>>>> getUserChangePassword <<<<<<<<<<<");

	res.render("userChangePassword.pug", { pageTitle: "Change Password" });
};

/**
 * 사용자 비밀번호 수정
 * @method POST
 * @param {*} req
 * @param {*} res
 */
export const postUserChangePassword = async (req, res) => {
	const {
		body: { oldPassword, newPassword, newPassword1 }
	} = req;

	try {
		if (newPassword !== newPassword1) {
			res.status(400);
			res.redirect(routes.userChangePassword);
			return;
		}

		await req.user.changePassword(oldPassword, newPassword);
		res.redirect(routes.me);
	} catch (error) {
		res.redirect(routes.userChangePassword);
	}
};

/**
 * LOGOUT
 * PASSPORT에서 LOGOUT 처리
 * @param {*} req
 * @param {*} res
 */
export const logout = (req, res) => {
	// res.render("logout.pug", {pageTitle: "Logout"});
	// to do :
	req.logout();
	res.redirect(routes.home);
};
