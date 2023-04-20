const fs = require('fs');
const path = require('path');

async function dicomMiddleware(ctx, next) {
  const directoryPath = '../dicomfiles/';
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Files in directory:');
    files.forEach((file) => {
      console.log(file);
    });
  });
  await next();
}

module.exports = dicomMiddleware;
