const fs = require('fs');
const parser = require('../parser/parser.js');
const filePath = '../dicomfiles/'; // 源数据文件夹路径
const resultPath = '../dicomresult/'; // 结果文件夹路径

/**
 * 读取所有现存DCM文件
 */
function readAllFiles() {
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    /**
     * 输出文件内容
     */
    files.forEach((file) => {
      readFileByName(file);
    });
  });
}

/**
 * 读取特定名字DCM文件
 */
function readFileByName(fileName) {
  fs.readFile(filePath + fileName, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    /**
     * 输出文件内容
     */
    parser.run(filePath + fileName);
  });
}

module.exports = {
  readAllFiles,
};
