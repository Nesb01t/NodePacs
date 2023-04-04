var dicomdict = require('./dicomdict');

module.exports = {
    logValidTagsInDict(tags) {
        for (const tag in tags) {
            if (Object.hasOwnProperty.call(tags, tag)) {
                const element = tags[tag];
                const name = dicomdict.getNameByTag(tag);
                if (name != undefined) {
                    console.log(name + " - " + tag + " - " + element);
                }
            }
        }
    }
}