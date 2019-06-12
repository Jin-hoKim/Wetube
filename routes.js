// GLOBAL
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// USERS
const USERS = "/users";
// const USER_DETAIL = "/:id";
// const USER_EDIT_PROFILE = "/:id/edit-profile";
const USER_PROFILE = "/:id";
const USER_EIDT_PROFILE = "/edit-profile";
const USER_CHANGE_PASSWORD = "/change-password";
const USER_ME = "/me";

// VIDEO
const VIDEOS = "/videos";
const VIDEO_UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const VIDEO_EDIT = "/:id/edit";
const VIDEO_DELETE = "/:id/delete";

// GITHUB
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// FACEBOOK
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// INSTAGRAM
const INSTAGRAM = "/auth/instagram";
const INSTAGRAM_CALLBACK = "/auth/instagram/callback";

// API : 서버와의 통신을 위한 URL
const API = "/api";
const REGISTER_VIEW = "/:id/view";

// comment
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/delete-comment";

const routes = {
	home: HOME,
	join: JOIN,
	login: LOGIN,
	logout: LOGOUT,
	search: SEARCH,

	users: USERS,
	me: USER_ME,
	userProfile: id => {
		return id ? `/users/${id}` : USER_PROFILE;
	},
	userEditProfile: USER_EIDT_PROFILE,
	userChangePassword: USER_CHANGE_PASSWORD,

	videos: VIDEOS,
	videoDetail: id => {
		return id ? `${VIDEOS}/${id}` : VIDEO_DETAIL;
	},
	videoEdit: id => {
		return id ? `${VIDEOS}/${id}/edit` : VIDEO_EDIT;
	},
	videoDelete: id => {
		return id ? `${VIDEOS}/${id}/delete` : VIDEO_DELETE;
	},
	videoUpload: VIDEO_UPLOAD,

	github: GITHUB,
	githubCallback: GITHUB_CALLBACK,

	facebook: FACEBOOK,
	facebookCallback: FACEBOOK_CALLBACK,

	instagram: INSTAGRAM,
	instagramCallback: INSTAGRAM_CALLBACK,

	api: API,
	registerView: REGISTER_VIEW,
	addComment: ADD_COMMENT,
	deleteComment: DELETE_COMMENT
};

export default routes;
