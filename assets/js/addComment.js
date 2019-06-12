import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const deleteChild = commentId => {
	for (let i = 0; i < commentList.children.length; i++) {
		if (
			commentList.children[i].querySelector(".comment__delete").id === commentId
		) {
			commentList.removeChild(commentList.children[i]);
			break;
		}
	}
};

const decreaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleRemoveComment = async event => {
	const videoId = window.location.href.split("/videos/")[1];
	const commentId = event.target.parentElement.id;

	console.log(
		`handle remove comment - videoId : ${videoId} / commentId : ${commentId}`
	);

	const response = await axios({
		url: `/api/${commentId}/delete-comment`,
		method: "POST",
		data: {
			videoid: videoId,
			commentid: commentId
		}
	});

	if (response.status === 200) {
		deleteChild(commentId);
		decreaseNumber();
	}
};

const increaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = async (videoId, comment, loggedUser, commentId) => {
	const date = new Date();
	const yy = date
		.getFullYear()
		.toString()
		.substr(2);
	const mm = date.getMonth() + 1;
	const dd = date.getDate();

	const li = document.createElement("li");

	const created = document.createElement("div");
	created.className = "comment__created";

	const creator = document.createElement("span");
	creator.className = "comment__creator";
	creator.innerHTML = loggedUser;

	const createAt = document.createElement("span");
	createAt.className = "comment__createAt";
	createAt.innerHTML = `${yy}.${mm < 10 ? `0${mm}` : mm}.${
		dd < 10 ? `0${dd}` : dd
	}`;

	const message = document.createElement("span");
	message.className = "comment__message";
	message.innerHTML = comment;

	const del = document.createElement("span");
	del.className = "comment__delete";
	del.id = commentId;
	del.addEventListener("click", handleRemoveComment);

	const icon = document.createElement("i");
	icon.className = "fas fa-trash-alt";
	del.appendChild(icon);

	created.appendChild(creator);
	created.appendChild(createAt);

	li.appendChild(created);
	li.appendChild(message);
	li.appendChild(del);

	commentList.prepend(li);
	increaseNumber();
};

const sendComment = async (comment, loggedUser) => {
	const videoId = window.location.href.split("/videos/")[1];
	const response = await axios({
		url: `/api/${videoId}/comment`,
		method: "POST",
		data: {
			comment
		}
	});

	if (response.status === 200) {
		console.log(response.data);
		addComment(videoId, comment, loggedUser, response.data.commentid);
	}
};

const handleSubmit = event => {
	event.preventDefault();
	const commentInput = addCommentForm.querySelector("input");
	const loggedUser = commentInput.id;
	const comment = commentInput.value;
	sendComment(comment, loggedUser);
	commentInput.value = "";
};

function init() {
	addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) init();
