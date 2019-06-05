const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

const handleStartRecord = async () => {
	try {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia;
		const stream = await navigator.mediaDevices.getUserMedia({
			// audio: false,
			// video: true

			audio: true
		});

		videoPreview.srcObject = stream;
		videoPreview.play();
	} catch (error) {
		recordButton.innerHTML = "Can't record";
	}
};

const hasGetUserMedia = () => {
	return !!(
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia
	);
};

const startRecod = async () => {
	if (hasGetUserMedia()) {
		recordContainer.disabled = false;

		const mediaStream = await navigator.mediaDevices.getUserMedia({
			// audio: true,
			video: { width: 1280, height: 720 }
		});
		try {
			videoPreview.srcObject = mediaStream;
			videoPreview.play();
		} catch (err) {
			alert(err.message);
		}
	} else {
		recordButton.removeEventListener("click", handleStartRecord);
		recordContainer.disabled = true;
	}
};

function init() {
	recordButton.addEventListener("click", startRecod);
}

if (recordContainer) {
	init();
}
