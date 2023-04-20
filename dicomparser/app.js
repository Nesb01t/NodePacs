var dicomParser = require('dicom-parser');
var fs = require('fs');

var dicomtag = require('./api/dicomtag');
var parser = require('./api/parser.js');

/**
 * 主入口程序
 */
function main() {
  // 读取某个路径下的 dcm 文件
  var file = fs.readFileSync('files/test.dcm');

  // 通过 parser 获取数据
  var dataSet = parser.getDataSet(file);
  var tags = parser.getTags(dataSet);

  // 输出 dicom 文件数据
  dicomtag.logValidTagsInDict(tags);
}

main();