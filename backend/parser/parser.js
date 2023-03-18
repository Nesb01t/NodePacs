const dicomParser = require("dicom-parser");
const fs = require("fs");

function parseDicomFile(filePath) {
  const dicomData = fs.readFileSync(filePath);
  const dataSet = dicomParser.parseDicom(dicomData);

  // 输出图像信息
  const pixelDataElement = dataSet.elements["x7fe00010"];
  const pixelDataOffset = pixelDataElement.dataOffset;
  const pixelData = new Uint8Array(dicomData.buffer, pixelDataOffset);

  // 遍历元素
  const elements = dataSet.elements;
  let output = '';
  for (let tag in elements) {
    const element = elements[tag];

    const tagValue = dataSet.string(tag);
    const vr = element.vr;
    const length = element.length;
    
    output += `${tag}: ${tagValue} || vr:${vr} || length:${length}\n`;
  }

  // 输出文件内容
  fs.writeFileSync('output.txt', output);
  fs.writeFileSync('output.jpg', pixelData);
  return dataSet;
}


parseDicomFile("./test.dcm");
module.exports = {
  parseDicomFile,
};


