const Base = require('./base.js');
const fs = require('fs');

module.exports = class extends Base {
  async uppicAction() {
    const brandFile = this.file('file');
    if (think.isEmpty(brandFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/web/pic/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      // name: 'brand_pic',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }
};
