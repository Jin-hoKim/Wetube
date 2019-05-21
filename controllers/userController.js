import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const users = (req, res) => {
	res.render("userDetail.pug", { pageTitle: "User Home" });
};

export const userDetail = (req, res) => {
	res.render("userDetail.pug", { pageTitle: "User Detail" });
};

export const userEditProfile = (req, res) => {
	res.render("userEditProfile.pug", { pageTitle: "User Edit Profiles" });
};

export const userChangePassword = (req, res) => {
	res.render("userChangePassword.pug", { pageTitle: "Change Password" });
};

export const getJoin = (req, res) => {
	res.render("join.pug", { pageTitle: "Join" });
};

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

export const getLogin = (req, res) => {
	res.render("login.pug", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

// export const postLogin = (req, res) => {
// 	res.redirect(routes.home);
// };

export const logout = (req, res) => {
	// res.render("logout.pug", {pageTitle: "Logout"});
	// to do :
	res.redirect(routes.home);
};
