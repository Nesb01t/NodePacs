var dicomdict = require('./dicomdict');

/**
 * tags 管理
 */
module.exports = {
  /**
   * 输出在字典中合法的 tags
   * @param {*} tags
   */
  logValidTagsInDict(tags) {
    for (const tag in tags) {
      if (Object.hasOwnProperty.call(tags, tag)) {
        const element = tags[tag];
        const name = dicomdict.getNameByTag(tag);
        if (name != undefined) {
          console.log(name + ' - ' + tag + ' - ' + element);
        }
      }
    }
  },
};
