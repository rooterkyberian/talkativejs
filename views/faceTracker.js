const SSD_MOBILENETV1 = 'ssd_mobilenetv1';

let selectedFaceDetector = SSD_MOBILENETV1;

// ssd_mobilenetv1 options
let minConfidence = 0.5;

function getFaceDetectorOptions() {
  return new faceapi.SsdMobilenetv1Options({minConfidence});
}

function getCurrentFaceDetectionNet() {
  return faceapi.nets.ssdMobilenetv1;
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

async function changeFaceDetector(detector) {
  ['#ssd_mobilenetv1_controls', '#tiny_face_detector_controls', '#mtcnn_controls']
    .forEach(id => $(id).hide());

  selectedFaceDetector = detector;
  const faceDetectorSelect = $('#selectFaceDetector');
  faceDetectorSelect.val(detector);
  faceDetectorSelect.material_select();

  $('#loader').show();
  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().load('/')
  }

  $(`#${detector}_controls`).show();
  $('#loader').hide()
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
  selectedFaceDetector = SSD_MOBILENETV1;
}
