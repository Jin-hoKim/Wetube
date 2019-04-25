import routes from "../routes";

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

export const getJoin = (req, res) => {
    res.render("join.pug", {pageTitle: "Join"});
}

export const postJoin = (req, res) => {
    console.log(req.body);
    
    const {
        body: {name, email, password, password2}
    } = req;

    if( password != password2 ) {
        res.status(400);
        res.render("errorJoin.pug", {pageTitle: "Join", errorMsg:"비밀번호가 일치하지 않습니다!"});
    } else {
        res.redirect(routes.home);
    }

}

export const getLogin = (req, res) => {
    res.render("login.pug", {pageTitle: "Login"});
}

export const postLogin = (req, res ) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    res.render("logout.pug", {pageTitle: "Logout"});
}