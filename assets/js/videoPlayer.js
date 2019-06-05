const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeControl = document.getElementById("jsVolume");

let videoIntervarId;
let isFullScreen = false;
let currentVolume = 0.5;

const formatDate = seconds => {
	const secondsNumber = parseInt(seconds, 10);
	let hh = Math.floor(secondsNumber / 3600);
	let mm = Math.floor((secondsNumber - hh * 3600) / 60);
	let ts = secondsNumber - hh * 3600 - mm * 60;

	if (hh < 10) {
		hh = `0${hh}`;
	}

	if (mm < 10) {
		mm = `0${mm}`;
	}

	if (seconds < 10) {
		ts = `0${ts}`;
	}

	return `${hh}:${mm}:${ts}`;
};

function handlerPlayClick() {
	if (videoPlayer.paused) {
		videoPlayer.play();
		videoIntervarId = setInterval(getCurrentTime, 1000);
		playButton.innerHTML = '<i class="fas fa-pause"></i>';
	} else {
		videoPlayer.pause();
		playButton.innerHTML = '<i class="fas fa-play"></i>';
	}
}

function handleVolumeClick() {
	if (videoPlayer.muted) {
		videoPlayer.muted = false;
		volumeControl.value = currentVolume;
		volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
	} else {
		videoPlayer.muted = true;
		volumeControl.value = 0;
		volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
	}
}

function handleFullScreenButton() {
	if (isFullScreen) {
		fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>';

		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullScreen) {
			document.msExitFullScreen();
		}

		isFullScreen = false;
	} else {
		fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';

		if (videoContainer.requestFullscreen) {
			videoContainer.requestFullscreen();
		} else if (videoContainer.mozRequestFullScreen) {
			videoContainer.mozRequestFullScreen();
		} else if (videoContainer.webkitRequestFullscreen) {
			videoContainer.webkitRequestFullscreen();
		} else if (videoContainer.msRequestFullscreen) {
			videoContainer.msRequestFullscreen();
		}

		isFullScreen = true;
	}
}

function getCurrentTime() {
	const currentTimeString = formatDate(videoPlayer.currentTime);
	currentTime.innerHTML = currentTimeString;

	if (videoPlayer.ended) {
		videoPlayer.currentTime = 0;
		playButton.innerHTML = '<i class="fas fa-play"></i>';
		clearInterval(videoIntervarId);
	}
}

function handleVideoPlayerLoaded() {
	const totalTimeString = formatDate(videoPlayer.duration);
	totalTime.innerHTML = totalTimeString;
	videoIntervarId = setInterval(getCurrentTime, 1000);
	videoPlayer.volume = currentVolume;
}

function hangleVolumeChange() {
	currentVolume = volumeControl.value;
	videoPlayer.volume = volumeControl.value;

	if (currentVolume >= 0.6) {
		volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
	} else if (currentVolume >= 0.3) {
		volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>';
	} else {
		volumeButton.innerHTML = '<i class="fas fa-volume-off"></i>';
	}
}

function init() {
	playButton.addEventListener("click", handlerPlayClick);
	volumeButton.addEventListener("click", handleVolumeClick);
	fullScreenButton.addEventListener("click", handleFullScreenButton);
	volumeControl.addEventListener("input", hangleVolumeChange);
	videoPlayer.addEventListener("loadedmetadata", handleVideoPlayerLoaded);
}

if (videoContainer) {
	init();
}
