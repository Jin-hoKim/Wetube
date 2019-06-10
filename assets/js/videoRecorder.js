const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let mediaStream;
let videoRecorder;

const hasGetUserMedia = () => {
	return !!(
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia
	);
};

const handleVideoData = event => {
	const { data: videoFile } = event;
	const link = document.createElement("a");
	link.href = URL.createObjectURL(videoFile);
	link.download = "recorded.webm";
	document.body.appendChild(link);
	link.click();
};

const stopRecording = () => {
	videoPreview.srcObject = null;
	videoPreview.stop();

	videoRecorder = null;
	videoRecorder.stop();

	recordButton.removeEventListener("click", stopRecording);
	recordButton.addEventListener("click", getVideo);

	recordButton.innerHTML = "Start Recording";
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
