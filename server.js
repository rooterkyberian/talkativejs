const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const viewsDir = path.join(__dirname, 'views');
const faceapiExamples = path.join(__dirname, 'face-api.js/examples/examples-browser/');
app.use(express.static(viewsDir));
app.use(express.static(path.join(faceapiExamples, './public')));
app.use(express.static(path.join(faceapiExamples, '../images')));
app.use(express.static(path.join(faceapiExamples, '../media')));
app.use(express.static(path.join(faceapiExamples, '../../weights')));
app.use(express.static(path.join(faceapiExamples, '../../dist')));

app.get('/', (req, res) => res.redirect('/talkative'));
app.get('/webcam_face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceDetection.html')));

const port = 2555;
app.listen(port, () => console.log(`Listening on port ${port}!`));
