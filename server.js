const express = require('express');
const http = require('http');
const reload = require('reload');
const path = require('path');
const watch = require('watch');

const app = express();

app.set('port', process.env.PORT || 2555);
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

app.get('/', (req, res) => res.sendFile(path.join(viewsDir, 'talkative.html')));

const server = http.createServer(app);
reload(app).then(function (reloadReturned) {
  watch.watchTree(viewsDir, function (f, curr, prev) {
    reloadReturned.reload();
  });

  server.listen(app.get('port'), function () {
    console.log(`Web server listening on port ${app.get('port')}`)
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server app', err)
});

