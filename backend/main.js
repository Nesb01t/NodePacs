var dicomParser = require('dicom-parser');
var canvas = require('canvas');
var fs = require('fs');
var getVOILUT = require('./getvoilut.js');

var filePath = './test.dcm';
var dicomFileAsBuffer = fs.readFileSync(filePath);

function getLut(data, windowWidth, windowCenter, invert, voiLUT) {
  let minPixelValue = 0;
  let maxPixelValue = 0;
  for (let i = 0, len = data.length; i < len; i++) {
    if (minPixelValue > data[i]) {
      minPixelValue = data[i];
    }
    if (maxPixelValue < data[i]) {
      maxPixelValue = data[i];
    }
  }
  let offset = Math.min(minPixelValue, 0);
  let lutArray = new Uint8ClampedArray(maxPixelValue - offset + 1);
  const vlutfn = getVOILUT(windowWidth, windowCenter, voiLUT, true);
  if (invert === true) {
    for (let storedValue = minPixelValue; storedValue <= maxPixelValue; storedValue++) {
      lutArray[storedValue + (-offset)] = 255 - vlutfn(storedValue);
    }
  } else {
    for (let storedValue = minPixelValue; storedValue <= maxPixelValue; storedValue++) {
      lutArray[storedValue + (-offset)] = vlutfn(storedValue);
    }
  }
  return {
    minPixelValue: minPixelValue,
    maxPixelValue: maxPixelValue,
    lutArray: lutArray,
  };
}

function createImage(dataSet, tags, dicomFileAsBuffer) {
  let w = parseInt(tags['x00280011']);   //图片宽度
  let h = parseInt(tags['x00280010']);   //图片高度
  let windowCenter = parseInt(tags['x00281050']);   //窗口中心
  let windowWidth = parseInt(tags['x00281051']);   //窗口宽度

  let pixelData = dataSet.elements.x7fe00010;
  let pixelDataBuffer = dicomParser.sharedCopy(dicomFileAsBuffer, pixelData.dataOffset, pixelData.length);

  let cv = canvas.createCanvas(w, h);    //创建画布
  let stream;
  let ctx = cv.getContext('2d', { pixelFormat: 'A8' })    //灰度图
  let uint16 = new Uint16Array(pixelDataBuffer.buffer, pixelDataBuffer.byteOffset, pixelDataBuffer.byteLength / Uint16Array.BYTES_PER_ELEMENT);
  let lut = getLut(uint16, windowWidth, windowCenter, invert, voiLUT); //获取灰度数组
  let uint8 = new Uint8ClampedArray(uint16.length);   //八位灰度像素数组
  for (let i = 0, len = uint16.length; i < len; i++) {
    uint8[i] = lut.lutArray[uint16[i]];
  }
  let image = canvas.createImageData(uint8, w, h);
  ctx.putImageData(image, 0, 0);
  stream = cv.createPNGStream({ compressionLevel: 9, filters: cv.PNG_FILTER_NONE });
  fs.writeFileSync('test1.png', stream.read());
}

try {
  var dataSet = dicomParser.parseDicom(dicomFileAsBuffer);
  var tags = dicomParser.explicitDataSetToJS(dataSet);

  var patientName = dataSet.string('x00100010');
  console.log('Patient Name = ' + patientName);

  var pixelDataElement = dataSet.elements.x7fe00010;
  var pixelData = new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / 2);

  createImage(dataSet, tags, dicomFileAsBuffer)
  console.log(pixelData)
}
catch (e) {
  console.log(e);
}