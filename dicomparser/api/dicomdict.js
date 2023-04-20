/**
 * dicom 字典
 */
module.exports = {
  dict: {
    '00080018': 'Acquisition Date',
    '00080020': 'Study Date',
    '00080030': 'Study Time',
    '00080060': 'Modality',
    '00100010': "Patient's Name",
    '00100020': 'Patient ID',
    '00100030': "Patient's Birth Date",
    '00100040': "Patient's Sex",
    '0020000D': 'Study Instance UID',
    '00200010': 'Study ID',
    '00200011': 'Series Number',
    '00200013': 'Instance Number',
    '00280010': 'Rows',
    '00280011': 'Columns',
    '00280030': 'Pixel Spacing',
    '7FE00010': 'Pixel Data',
  },

  /**
   * 获取 tag 在字典中对应的名称
   */
  getNameByTag(tag) {
    tag = tag.replace('x', '');
    return this.dict[tag];
  },
};
