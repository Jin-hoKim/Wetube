/* eslint-disable consistent-return */
import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
	// res.send("Home");
	// const videos = await Video.find({}); >> no good
	try {
		// order by id desc
		const videos = await Video.find({}).sort({
			_id: -1
		});
		console.log(videos);
		res.render("home.pug", {
			pageTitle: "HOME",
			videos
		});
	} catch (error) {
		console.log(error);
		res.render("home.pug", {
			pageTitle: "HOME",
			videos: []
		});
	}
};

export const search = async (req, res) => {
	// const searchingBy = req.query[ "term" ]; // old version
	// ES6 NEW Version
	const {
		query: { term: searchingBy }
	} = req;

	let videos = [];

	try {
		// mongoose find regex 사용
		// option - i : insenstive
		videos = await Video.find({
			title: { $regex: searchingBy, $options: "i" }
		});
	} catch (error) {
		console.log(error);
	}

	// 전달하려는 변수명이 동일한 경우 한번만 작성해도 인식한다.
	// searchingBy: searchingBy ==> searchingBy
	res.render("search.pug", {
		pageTitle: "Search",
		searchingBy,
		videos
	});
};

export const getVideoUpload = (req, res) => {
	res.render("videoUpload.pug", {
		pageTitle: "Upload Video"
	});
};

export const postVideoUpload = async (req, res) => {
	const {
		body: { title, description },
		file: { path }
	} = req;

	const newVideo = await Video.create({
		fileUrl: path,
		title,
		description,
		creator: req.user.id
	});

	req.user.videos.push(newVideo.id);
	req.user.save();

	res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
	const {
		params: { id }
	} = req;

	try {
		const video = await Video.findById(id)
			.populate("creator")
			.populate({
				path: "comments",
				populate: {
					path: "creator",
					model: User
				}
			}); // >>  nested populate
		res.render("videoDetail.pug", {
			pageTitle: video.title,
			user: req.user,
			video,
			dateFormat: dateString => {
				const d = new Date(dateString);
				// d.dateFormat("YY/MM/DD");
				const yy = d
					.getFullYear()
					.toString()
					.substr(2);
				const mm = d.getMonth() + 1;
				const dd = d.getDate();

				return `${yy}.${mm < 10 ? `0${mm}` : mm}.${dd < 10 ? `0${dd}` : dd}`;
			}
			// ,
			// getCreator: async userId => {
			// 	try {
			// 		const u = await User.findById(userId);
			// 		return u.avatarUrl;
			// 	} catch (err) {
			// 		console.log(err);
			// 	}
			// }
		});
	} catch (error) {
		console.log("--------------------------------------------");
		console.log(error);
		res.redirect(routes.home);
	}
};

export const getVideoEdit = async (req, res) => {
	const {
		params: { id }
	} = req;

	try {
		const video = await Video.findById(id);
		if (video.creator !== req.user.id) {
			throw Error();
		} else {
			res.render("videoEdit.pug", {
				pageTitle: `Edit '${video.title}'`,
				video
			});
		}
	} catch (error) {
		console.log(error);
	}
};

export const postVideoEdit = async (req, res) => {
	const {
		params: { id },
		body: { title, description }
	} = req;

	try {
		// https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
		console.log(`update video title : ${title} / description : ${description}`);
		await Video.findOneAndUpdate(
			{
				_id: id
			},
			{
				title,
				description
			}
		);

		res.redirect(routes.videoDetail(id));
	} catch (error) {
		res.redirect(routes.home);
	}
};

export const videoDelete = async (req, res) => {
	const {
		params: { id }
	} = req;

	try {
		const video = await Video.findById(id);
		if (video.creator.id !== req.user.id) {
			throw Error();
		} else {
			// https://mongoosejs.com/docs/api.html#query_Query-findOneAndRemove
			await Video.findByIdAndRemove({
				_id: id
			});
		}
	} catch (error) {
		console.log(error);
	}
	res.redirect(routes.home);
};

// register video view
export const postRegistView = async (req, res) => {
	const {
		params: { id }
	} = req;

	try {
		const video = await Video.findById(id);
		video.views += 1;
		video.save();
		res.status(200); // OK
	} catch (error) {
		res.status(400); // ERROR
		res.end();
	} finally {
		res.end();
	}
};

export const postAddComment = async (req, res) => {
	const {
		params: { id },
		body: { comment },
		user
	} = req;

	try {
		const video = await Video.findById(id);
		const newComment = await Comment.create({
			text: comment,
			creator: user.id
		});
		video.comments.push(newComment.id);
		video.save();
		res.send({ commentid: newComment.id });
	} catch (error) {
		console.log(error);
		res.status(400);
	} finally {
		res.end();
	}
};

export const postDeleteComment = async (req, res) => {
	const {
		body: { videoid, commentid },
		user
	} = req;

	try {
		await Comment.findByIdAndDelete(commentid);
	} catch (error) {
		console.log(error);
		res.status(400);
	} finally {
		res.end();
	}
};
