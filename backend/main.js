const Koa = require('koa');
const fs = require('fs');

const app = new Koa();
const logMiddleware = require('./middleware/log.js');
const dicomMiddleware = require('./middleware/dicom.js');

app.use(logMiddleware);
app.use(dicomMiddleware);

app.listen(3000);
