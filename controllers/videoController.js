import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    // res.send("Home");
    // const videos = await Video.find({}); >> no good
    try {
        const videos = await Video.find({});
        console.log( videos );
        res.render("home.pug", {pageTitle:"HOME", videos});
    } catch( error ) {
        console.log( error );
        res.render("home.pug", {pageTitle:"HOME", videos: []});        
    }
}

export const search = (req, res) => {
    // const searchingBy = req.query[ "term" ]; // old version
    // ES6 NEW Version
    const {
        query: { term: searchingBy }
    } = req;

    // 전달하려는 변수명이 동일한 경우 한번만 작성해도 인식한다.
    // searchingBy: searchingBy ==> searchingBy
    res.render("search.pug", {pageTitle:"Search", searchingBy, videos});
}

export const getVideoUpload = (req, res) => {
    res.render("videoUpload.pug", {pageTitle:"Upload Video"});
}

export const postVideoUpload = async (req, res) => {
    // const {
    //     body: {file, title, description}
    // } = req;

    const {
        body: { title, description},
        file: { path }
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
    });

    console.log( newVideo );

    res.redirect( routes.videoDetail( newVideo.id ) );
}

export const videoDetail = (req, res) => {
    res.render("videoDetail.pug", {pageTitle: "Video Detail"});
}

export const videoEdit = (req, res) => {
    res.render("videoEdit.pug", {pageTitle: "Edit Video"});
}

export const videoDelete = (req, res) => {
    res.render("videoDelete.pug", {pageTitle: "Delete Video"});
}