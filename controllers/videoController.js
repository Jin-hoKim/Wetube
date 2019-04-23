export const home = (req, res) => {
    // res.send("Home");
    res.render("home.pug");
}

export const search = (req, res) => {
    res.render("search.pug");
}

export const videoUpload = (req, res) => {
    res.render("videoUpload.pug");
}

export const videoDetail = (req, res) => {
    res.render("videoDetail.pug");
}

export const videoEdit = (req, res) => {
    res.render("videoEdit.pug");
}

export const videoDelete = (req, res) => {
    res.render("videoDelete.pug");
}