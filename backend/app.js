var dicomParser = require('dicom-parser');
var fs = require('fs');

var parser = require('./api/parser.js');

/**
 * 主入口程序
 */
function main() {
  var file = fs.readFileSync('files/test.dcm');

  // 获取数据
  var dataSet = parser.getDataSet(file);
  var tags = parser.getTags(dataSet);

  // 信息获取
  var patientNameByDataSet = dataSet.string('x00100010');
  var patientNameByTags = tags['x00100010'];
  console.log(patientNameByDataSet)
  console.log(patientNameByTags)
}

main();