import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export const TYPE_SOCIAL = "social_user";
export const TYPE_NORMAL = "normal_user";

const UserSchema = new mongoose.Schema({
	type: String,
	name: String,
	email: String,
	avatarUrl: String,
	facebookId: Number,
	githubId: Number,
	instagramId: Number,
	videos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
