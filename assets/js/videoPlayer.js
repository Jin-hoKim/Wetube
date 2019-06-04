const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");

let isFullScreen = false;

function handlerPlayClick() {
	if (videoPlayer.paused) {
		videoPlayer.play();
		playButton.innerHTML = '<i class="fas fa-pause"></i>';
	} else {
		videoPlayer.pause();
		playButton.innerHTML = '<i class="fas fa-play"></i>';
	}
}

function handleVolumnClick() {
	if (videoPlayer.muted) {
		videoPlayer.muted = false;
		volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
	} else {
		videoPlayer.muted = true;
		volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
	}
}

function handleFullScreenButton() {
	if (isFullScreen) {
		fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>';
		document.webkitExitFullscreen();
		isFullScreen = false;
	} else {
		fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
		videoContainer.webkitRequestFullscreen();
		isFullScreen = true;
	}
}

function init() {
	playButton.addEventListener("click", handlerPlayClick);
	volumeButton.addEventListener("click", handleVolumnClick);
	// fullScreenButton.addEventListener("click", goFullScreen);
	fullScreenButton.addEventListener("click", handleFullScreenButton);
}

if (videoContainer) {
	init();
}
