import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
	const li = document.createElement("li");

	const div = document.createElement("div");
	div.className = "comment__created";

	const creator = document.createElement("span");
	creator.className = "comment__creator";
	creator.innerHTML = "asdfas";

	const createAt = document.createElement("span");
	createAt.className = "comment__createAt";

	const date = new Date();
	const yy = date
		.getFullYear()
		.toString()
		.substr(2);
	const mm = date.getMonth() + 1;
	const dd = date.getDate();
	createAt.innerHTML = `${yy}.${mm < 10 ? `0${mm}` : mm}.${
		dd < 10 ? `0${dd}` : dd
	}`;

	div.appendChild(creator);
	div.appendChild(createAt);

	const span = document.createElement("span");
	span.className = "comment__message";
	span.innerHTML = comment;

	li.appendChild(div);
	li.appendChild(span);

	commentList.prepend(li);
	increaseNumber();
};

const sendComment = async comment => {
	const videoId = window.location.href.split("/videos/")[1];
	const response = await axios({
		url: `/api/${videoId}/comment`,
		method: "POST",
		data: {
			comment
		}
	});

	console.log("comment");
	console.log(response.status);

	if (response.status === 200) {
		addComment(comment);
	}
};

const handleSubmit = event => {
	event.preventDefault();
	const commentInput = addCommentForm.querySelector("input");
	const comment = commentInput.value;
	sendComment(comment);
	commentInput.value = "";
};

function init() {
	addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) init();
