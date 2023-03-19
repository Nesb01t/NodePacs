var dicomParser = require('dicom-parser');
var fs = require('fs');

var parser = require('./api/parser.js');

var file = fs.readFileSync('files/test.dcm');

try {
  // 获取数据
  var dataSet = parser.getDataSet(file);
  var tags = parser.getTags(dataSet);

  // 信息获取
  var patientName = dataSet.string('x00100010');
  console.log('Patient Name = ' + patientName);
  console.log(dataSet)
}
catch (e) {
  console.log(e);
}