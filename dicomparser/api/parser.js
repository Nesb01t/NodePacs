var dicomParser = require('dicom-parser');

module.exports = {
    /**
     * 获取数据集
     * @param {*} file DCM文件
     * @returns 
     */
    getDataSet(file) {
        return dicomParser.parseDicom(file);
        // 获取某个 tags
        // var patientNameByDataSet = dataSet.string('x00100010');
    },

    /**
     * 获取标签集
     * @param {*} dataSet 数据集
     * @returns 
     */
    getTags(dataSet) {
        return dicomParser.explicitDataSetToJS(dataSet);
        // 获取某个 tags
        // var patientNameByTags = tags['x00100010'];
    }
}