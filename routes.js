// GLOBAL 
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// USERS
const USERS = "/users";
const USER_DETAIL = "/:id";
const USER_EDIT_PROFILE = "/edit-profile";
const USER_CHANGE_PASSWORD = "/change-password";

// VIDEO
const VIDEOS = "/videos";
const VIDEO_UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const VIDEO_EDIT = "/:id/edit";
const VIDEO_DELETE = "/:id/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: USER_DETAIL,
    userEditProfile: USER_EDIT_PROFILE,
    userChangePassword: USER_CHANGE_PASSWORD,
    videos: VIDEOS,
    videoUpload: VIDEO_UPLOAD,
    videoDetail: VIDEO_DETAIL,
    videoEdit: VIDEO_EDIT,
    videoDelete: VIDEO_DELETE
};

export default routes;