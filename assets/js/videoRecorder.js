const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let mediaStream;
let videoRecorder;
let recordedVideoData;

const hasGetUserMedia = () => {
	return !!(
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia
	);
};

const handleVideoData = event => {
	recordedVideoData = event.data;

	const link = document.createElement("a");
	link.href = URL.createObjectURL(recordedVideoData);
	link.download = "recorded.webm";
	document.body.appendChild(link);
	link.click();
};

const stopRecording = () => {
	recordButton.innerHTML =
		"<i class='fas fa-video'></i><span>Start Recording</span>";

	recordButton.removeEventListener("click", stopRecording);
	recordButton.addEventListener("click", getVideo);
};

const startRecording = () => {
	videoRecorder = new MediaRecorder(mediaStream);

	// videoRecorder.start(1000); // 매초 비디오 데이터 추출
	videoRecorder.start(); // 비디오 녹화 종료시 데이터 추출
	videoRecorder.addEventListener("dataavailable", handleVideoData);
	recordButton.addEventListener("click", stopRecording);
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

			recordButton.innerHTML =
				"<i class='fas fa-video-slash'></i><span>Stop Recording</span>";

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
