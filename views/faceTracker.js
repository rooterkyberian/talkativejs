const SSD_MOBILENETV1 = "ssd_mobilenetv1";

let selectedFaceDetector = SSD_MOBILENETV1;

// ssd_mobilenetv1 options
let minConfidence = 0.5;

function isFaceDetectionModelLoaded(faceDetectionNet) {
  return !!faceDetectionNet.params;
}

let forwardTimes = [];

function updateTimeStats(timeInMs) {
  forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30);
}

function getAvgTimeInMs() {
  return forwardTimes.reduce((total, t) => total + t) / forwardTimes.length;
}

function drawStats(canvas, detections) {
  const ctx = canvas.getContext("2d");
  const fontSize = Math.ceil(Math.max(canvas.height / 60, 20));
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "#7fc8ec";

  const avgTimeInMs = getAvgTimeInMs();
  const timeText = `${Math.round(avgTimeInMs)} ms`;
  const fpsText = `${faceapi.round(1000 / avgTimeInMs)}`;

  const lines = [
    selectedFaceDetector,
    `${fpsText} fps (${timeText})`,
    `${detections} faces; confidence >=${minConfidence}`
  ];
  lines.reverse().forEach((line, index) => {
    ctx.fillText(line, 10, canvas.height - (index + 1) * fontSize * 1.1);
  });
}

function nowTimestamp() {
  return new Date().getTime() / 1000;
}

class FaceTracker {
  constructor() {
    this.faceDetectionNet = faceapi.nets.ssdMobilenetv1;
    this.options = this.getFaceDetectorOptions();
    this.detectionBuffer = {};
    this.timeout = 1; // seconds
    this.minimalOverlap = 0.4;
  }

  isLoaded() {
    return isFaceDetectionModelLoaded(this.faceDetectionNet);
  }

  load() {
    if (!this.isLoaded()) {
      $("#loader").show();
      this.faceDetectionNet.load("/");
      $("#loader").hide();
    }
  }

  getFaceDetectorOptions() {
    return new faceapi.SsdMobilenetv1Options({ minConfidence });
  }

  removeOldDetectionsFromBuffer(timestamp) {
    const cutoff = timestamp - this.timeout;
    const newDetectionBuffer = {};
    Object.values(this.detectionBuffer).forEach(oldDetectionBuf => {
      if (oldDetectionBuf.timestamp >= cutoff) {
        newDetectionBuffer[oldDetectionBuf.id] = oldDetectionBuf;
      }
    });
    this.detectionBuffer = newDetectionBuffer;
  }

  /**
   * Smallest (furthest away) box first
   * @param d1Buf
   * @param d2Buf
   * @return {number}
   */
  detectionBufSort(d1Buf, d2Buf) {
    return d1Buf.box.area < d2Buf.box.area
      ? -1
      : d1Buf.box.area > d2Buf.box.area
      ? 1
      : 0;
  }

  detectionToDetectionBuf(detection, timestamp) {
    return {
      timestamp,
      detection: detection,
      box: detection.box
    };
  }

  getOverlapArea(d1Buf, d2Buf) {
    const width =
      Math.min(d1Buf.box.right, d2Buf.box.right) -
      Math.max(d1Buf.box.left, d2Buf.box.left);
    const height =
      Math.min(d1Buf.box.bottom, d2Buf.box.bottom) -
      Math.max(d1Buf.box.top, d2Buf.box.top);
    if (Math.min(width, height) < 0) {
      return 0;
    }
    return width * height;
  }

  getOverlapRatio(d1Buf, d2Buf) {
    const overlapArea = this.getOverlapArea(d1Buf, d2Buf);
    if (overlapArea <= 0) {
      return 0;
    }
    return overlapArea / Math.max(d1Buf.box.area, d2Buf.box.area);
  }

  getId(detectionBuf, unusedDetectionBufs) {
    const matches = Object.values(unusedDetectionBufs)
      .map(oldDetectionBuf => ({
        detectionBuf: oldDetectionBuf,
        overlapRatio: this.getOverlapRatio(detectionBuf, oldDetectionBuf)
      }))
      .filter(match => match.overlapRatio > this.minimalOverlap);
    if (matches.length) {
      const oldId = matches[0].detectionBuf.id;
      delete unusedDetectionBufs[oldId];
      return oldId;
    }
    return Math.random();
  }

  async detectAllFaces(videoEl) {
    const timestamp = nowTimestamp();
    const detections = await faceapi.detectAllFaces(videoEl, this.options);
    let newDectionsBuf = detections.map(detection =>
      this.detectionToDetectionBuf(detection, timestamp)
    );
    newDectionsBuf.sort(this.detectionBufSort);
    this.removeOldDetectionsFromBuffer(timestamp);
    const unusedDetectionsBuffer = Object.assign({}, this.detectionBuffer);
    newDectionsBuf.forEach(detectionBuf => {
      detectionBuf.id = this.getId(detectionBuf, unusedDetectionsBuffer);
    });
    newDectionsBuf.forEach(detectionBuf => {
      const prevValue = this.detectionBuffer[detectionBuf.id] || {};
      this.detectionBuffer[detectionBuf.id] = Object.assign(
        prevValue,
        detectionBuf
      );
    });
    return newDectionsBuf.map(
      detectionBuf => this.detectionBuffer[detectionBuf.id]
    );
  }
}
