import passport from "passport";
import routes from "../routes";
import User, { TYPE_SOCIAL } from "../models/User";

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
