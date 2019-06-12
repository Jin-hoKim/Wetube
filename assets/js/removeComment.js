import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");
const commentList = document.getElementById("jsCommentList");
const commentDeleteButton = document.querySelectorAll(".comment__delete");

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

function init() {
	const deleteButtons = document.querySelectorAll(".comment__delete");
	for (let i = 0; i < deleteButtons.length; i++) {
		deleteButtons.item(i).addEventListener("click", handleRemoveComment);
	}
}

if (commentDeleteButton) init();
