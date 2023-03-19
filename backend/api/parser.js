var dicomParser = require('dicom-parser');

module.exports = {
    getDataSet(file) {
        return dicomParser.parseDicom(file);
    },

    getTags(dataSet) {
        return dicomParser.explicitDataSetToJS(dataSet);
    }
}