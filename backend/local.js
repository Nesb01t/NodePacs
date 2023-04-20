/**
 * 本地线程
 */
const interval = 1000; // 监听间隔

const parserController = require('./controller/parser.js');
function local() {
  setInterval(() => {
    parserController.readAllFiles();
  }, interval);
}

module.exports = local;
