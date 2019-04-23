export const users = (req, res) => {
    res.render("userDetail.pug");
}

export const userDetail = (req, res) => {
    res.render("userDetail.pug");
}

export const userEditProfile = (req, res) => {
    res.render("editProfile.pug");
}

export const userChangePassword = (req, res) => {
    res.render("changePassword.pug");
}

export const join = (req, res) => {
    res.render("join.pug");
}

export const login = (req, res) => {
    res.render("login.pug");
}

export const logout = (req, res) => {
    res.render("logout.pug");
}