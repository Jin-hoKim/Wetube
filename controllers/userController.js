import passport from "passport";
import routes from "../routes";
import User, { TYPE_NORMAL } from "../models/User";

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
 * 로그인한 사용자의 프로필 페이지
 * @method GET
 * @param {*} req
 * @param {*} res
 */
export const userMe = async (req, res) => {
	console.log(">>>>>>>>>>>> userMe <<<<<<<<<<<<");
	try {
		const user = await User.findById(req.user.id);
		res.render("userProfile.pug", { pageTitle: "Profile", user });
	} catch (error) {
		res.redirect(routes.home);
	}
};

/**
 * 사용자 프로필 페이지
 * @method GET
 * @param {*} req
 * @param {*} res
 */
export const userProfile = async (req, res) => {
	console.log(">>>>>>>>>>>> userProfile <<<<<<<<<<<<");

	const {
		params: { id }
	} = req;

	try {
		const user = await User.findById(id).populate("videos");
		console.log(user);
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
	console.log(">>>>>>>>>>>> getUserEditProfile <<<<<<<<<<<<");

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
	console.log(">>>>>>>>>>>> getUserChangePassword <<<<<<<<<<<<");

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
