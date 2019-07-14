const SSD_MOBILENETV1 = 'ssd_mobilenetv1';

let selectedFaceDetector = SSD_MOBILENETV1;

// ssd_mobilenetv1 options
let minConfidence = 0.5;

function isFaceDetectionModelLoaded(faceDetectionNet) {
  return !!faceDetectionNet.params
}

let forwardTimes = [];

function updateTimeStats(timeInMs) {
  forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30);
}

function getAvgTimeInMs() {
  return forwardTimes.reduce((total, t) => total + t) / forwardTimes.length
}

function drawStats(canvas, detections) {
  const ctx = canvas.getContext("2d");
  const fontSize = Math.ceil(Math.max(canvas.height / 40, 20));
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = '#7fc8ec';

  const avgTimeInMs = getAvgTimeInMs();
  const timeText = `${Math.round(avgTimeInMs)} ms`;
  const fpsText = `${faceapi.round(1000 / avgTimeInMs)}`;

  const lines = [
    selectedFaceDetector,
    `${fpsText} fps (${timeText})`,
    `${detections} faces; confidence >=${minConfidence}`,
  ];
  lines.forEach((line, index) => ctx.fillText(line, 10, (index + 1) * fontSize * 1.1));
}

class FaceTracker {
  constructor() {
    this.faceDetectionNet = faceapi.nets.ssdMobilenetv1;
    this.options = this.getFaceDetectorOptions();
  }

  isLoaded() {
    return isFaceDetectionModelLoaded(this.faceDetectionNet)
  }

  load() {
    if (!this.isLoaded()) {

      $('#loader').show();
      this.faceDetectionNet.load('/');
      $('#loader').hide();
    }
  }

  getFaceDetectorOptions() {
    return new faceapi.SsdMobilenetv1Options({minConfidence});
  }

  async detectAllFaces(videoEl) {
    return await faceapi.detectAllFaces(videoEl, this.options);
  }
}
