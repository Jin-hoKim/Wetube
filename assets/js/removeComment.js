import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");
const commentRemove = document.getElementById("jsCommentRemove");
const commentId = document.getElements;

const decreaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleRemoveComment = () => {
	console.log(commentRemove);
	decreaseNumber();
};

function init() {
	commentRemove.addEventListener("click", handleRemoveComment);
}

if (commentRemove) init();
