export const users = (req, res) => {
    res.render("userDetail.pug", {pageTitle: "User Home"});
}

export const userDetail = (req, res) => {
    res.render("userDetail.pug", {pageTitle: "User Detail"});
}

export const userEditProfile = (req, res) => {
    res.render("userEditProfile.pug", {pageTitle: "User Edit Profiles"});
}

export const userChangePassword = (req, res) => {
    res.render("userChangePassword.pug", {pageTitle: "Change Password"});
}

export const join = (req, res) => {
    res.render("join.pug", {pageTitle: "Join"});
}

export const login = (req, res) => {
    res.render("login.pug", {pageTitle: "Login"});
}

export const logout = (req, res) => {
    res.render("logout.pug", {pageTitle: "Logout"});
}