const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let mediaStream;

const hasGetUserMedia = () => {
	return !!(
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia
	);
};

const startRecording = () => {
	const videoRecorder = new MediaRecorder(mediaStream);
	videoRecorder.start();
	console.log(videoRecorder);
};

const getVideo = async () => {
	if (hasGetUserMedia) {
		try {
			recordContainer.disabled = false;

			mediaStream = await navigator.mediaDevices.getUserMedia({
				// audio: true,
				video: { width: 1280, height: 720 }
			});

			videoPreview.srcObject = mediaStream;
			videoPreview.play();

			recordButton.innerHTML = "Stop Recording";

			startRecording();
		} catch (err) {
			console.log(err.message);
			alert(err.message);
		} finally {
			recordButton.removeEventListener("click", getVideo);
			recordContainer.disabled = true;
		}
	} else {
		recordButton.removeEventListener("click", getVideo);
		recordContainer.disabled = true;
	}
};

function init() {
	recordButton.addEventListener("click", getVideo);
}

if (recordContainer) {
	init();
}
