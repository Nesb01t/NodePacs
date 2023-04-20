const fs = require('fs');
const path = require('path');
const parser = require('../parser/parser.js');

async function dicomMiddleware(ctx, next) {
  const filePath = '../dicomfiles/'; // dicom 数据文件夹路径
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    /**
     * 输出文件内容
     */
    files.forEach((file) => {
      parser.run(filePath + file);
    });
  });
  await next();
}

module.exports = dicomMiddleware;
