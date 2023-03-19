import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";
import * as dicomParser from "dicom-parser"; //DICOM解析
import * as canvas from "canvas";

var parser = {
  /**
   * 生成PNG和JPG图片
   * @param uuid
   * @param dataSet
   * @param tags
   * @param dicomFileAsBuffer
   */
  async create(
    uuid: string,
    dataSet: dicomParser.DataSet,
    tags: any,
    dicomFileAsBuffer: Buffer
  ) {
    const savePath = "./"; //默认存放根目录
    let pngFileName = uuid + ".png";
    let jpegFileName = uuid + ".jpg";
    let nextDir = uuid.substring(0, 2) + "/" + uuid.substring(2, 4);
    let pngFilePath = path.join(savePath, nextDir, pngFileName);
    let jpegFilePath = path.join(savePath, nextDir, jpegFileName);

    let w = parseInt(tags["x00280011"]); //图片宽度
    let h = parseInt(tags["x00280010"]); //图片高度
    let invert = tags["x00280004"] === "MONOCHROME1" ? true : false; //图像是否被反转显示
    let windowCenter = parseInt(tags["x00281050"]); //窗口中心
    let windowWidth = parseInt(tags["x00281051"]); //窗口宽度

    let pixelData = dataSet.elements.x7fe00010;
    let pixelDataBuffer = dicomParser.sharedCopy(
      dicomFileAsBuffer,
      pixelData.dataOffset,
      pixelData.length
    );
    //生成PNG
    let cv = canvas.createCanvas(w, h); //创建画布
    this.createPngAsync(
      cv,
      pngFilePath,
      pixelDataBuffer,
      w,
      h,
      windowWidth,
      windowCenter,
      invert,
      jpegFilePath
    );
  },
  /**
   * 生成PNG和JPG图片
   * @param uuid
   * @param dataSet
   * @param tags
   * @param dicomFileAsBuffer
   */
  async createImage(
    uuid: string,
    dataSet: dicomParser.DataSet,
    tags: any,
    dicomFileAsBuffer: Buffer
  ) {
    const savePath = "./"; //默认存放根目录
    let pngFileName = uuid + ".png";
    let jpegFileName = uuid + ".jpg";
    let nextDir = uuid.substring(0, 2) + "/" + uuid.substring(2, 4);
    let pngFilePath = path.join(savePath, nextDir, pngFileName);
    let jpegFilePath = path.join(savePath, nextDir, jpegFileName);

    let w = parseInt(tags["x00280011"]); //图片宽度
    let h = parseInt(tags["x00280010"]); //图片高度
    let invert = tags["x00280004"] === "MONOCHROME1" ? true : false; //图像是否被反转显示
    let windowCenter = parseInt(tags["x00281050"]); //窗口中心
    let windowWidth = parseInt(tags["x00281051"]); //窗口宽度

    let pixelData = dataSet.elements.x7fe00010;
    let pixelDataBuffer = dicomParser.sharedCopy(
      dicomFileAsBuffer,
      pixelData.dataOffset,
      pixelData.length
    );
    //生成PNG

    let cv = canvas.createCanvas(w, h); //创建画布
    this.createPngAsync(
      cv,
      pngFilePath,
      pixelDataBuffer,
      w,
      h,
      windowWidth,
      windowCenter,
      invert,
      jpegFilePath
    );
  },

  /**
   * 生成PNG
   * @param cv
   * @param filePath
   * @param pixelDataBuffer
   * @param w
   * @param h
   * @param windowWidth
   * @param windowCenter
   * @param invert
   * @param jpegFilePath
   */
  async createPngAsync(
    cv: canvas.Canvas,
    filePath: string,
    pixelDataBuffer: any,
    w: number,
    h: number,
    windowWidth: number,
    windowCenter: number,
    invert: boolean,
    jpegFilePath?: string
  ) {
    let stream: canvas.PNGStream;
    let ctx = cv.getContext("2d", { pixelFormat: "A8" }); //灰度图
    let uint16 = new Uint16Array(
      pixelDataBuffer.buffer,
      pixelDataBuffer.byteOffset,
      pixelDataBuffer.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ); //获取uint16的像素数组
    let voiLUT;
    let lut = this.getLut(uint16, windowWidth, windowCenter, invert, voiLUT); //获取灰度数组
    let uint8 = new Uint8ClampedArray(uint16.length); //八位灰度像素数组
    //替换对应像素点为灰度
    for (let i = 0, len = uint16.length; i < len; i++) {
      uint8[i] = lut.lutArray[uint16[i]];
    }
    let image = canvas.createImageData(uint8, w, h);
    ctx.putImageData(image, 0, 0);
    stream = cv.createPNGStream({
      compressionLevel: 9,
      filters: cv.PNG_FILTER_NONE,
    });
    //stream.pipe(fs.createWriteStream(filePath));
    fs.writeFileSync(filePath, stream.read());
  },
  /**
   * 获取灰度数组
   * @param data
   * @param windowWidth
   * @param windowCenter
   * @param invert
   * @param voiLUT
   * @returns
   */
  getLut(
    data: Uint16Array,
    windowWidth: number,
    windowCenter: number,
    invert: boolean,
    voiLUT: any
  ) {
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
      for (
        let storedValue = minPixelValue;
        storedValue <= maxPixelValue;
        storedValue++
      ) {
        lutArray[storedValue + -offset] = 255 - vlutfn(storedValue);
      }
    } else {
      for (
        let storedValue = minPixelValue;
        storedValue <= maxPixelValue;
        storedValue++
      ) {
        lutArray[storedValue + -offset] = vlutfn(storedValue);
      }
    }
    return {
      minPixelValue: minPixelValue,
      maxPixelValue: maxPixelValue,
      lutArray: lutArray,
    };
  },
};
