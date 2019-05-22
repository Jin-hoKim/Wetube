// GLOBAL
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// USERS
const USERS = "/users";
const USER_DETAIL = "/:id";
const USER_EDIT_PROFILE = "/:id/edit-profile";
const USER_CHANGE_PASSWORD = "/:id/change-password";
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

const routes = {
	home: HOME,
	join: JOIN,
	login: LOGIN,
	logout: LOGOUT,
	search: SEARCH,
	users: USERS,
	me: USER_ME,
	userDetail: id => {
		return id ? `${USERS}/${id}` : USER_DETAIL;
	},
	userEditProfile: id => {
		return id ? `${USERS}/${id}/edit-profile` : USER_EDIT_PROFILE;
	},
	userChangePassword: id => {
		return id ? `${USERS}/${id}/change-password` : USER_CHANGE_PASSWORD;
	},

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
	facebookCallback: FACEBOOK_CALLBACK
};

export default routes;
