const SSD_MOBILENETV1 = 'ssd_mobilenetv1';

let selectedFaceDetector = SSD_MOBILENETV1;

// ssd_mobilenetv1 options
let minConfidence = 0.5;

function getFaceDetectorOptions() {
  return new faceapi.SsdMobilenetv1Options({ minConfidence });
}

function onIncreaseMinConfidence() {
  minConfidence = Math.min(faceapi.round(minConfidence + 0.1), 1.0);
  $('#minConfidence').val(minConfidence);
  updateResults()
}

function onDecreaseMinConfidence() {
  minConfidence = Math.max(faceapi.round(minConfidence - 0.1), 0.1);
  $('#minConfidence').val(minConfidence);
  updateResults()
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

function initFaceDetectionControls() {
  const faceDetectorSelect = $('#selectFaceDetector');
  faceDetectorSelect.val(selectedFaceDetector);
  faceDetectorSelect.material_select();
}
