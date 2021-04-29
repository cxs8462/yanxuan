const Base = require('./base.js');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Base {
  async infoAction() {
    const userInfo = await this.model('user').where({id: this.getLoginUserId()}).find();
    delete userInfo.password;
    return this.success(userInfo);
  }

  /**
   * 保存用户头像
   * @returns {Promise.<void>}
   */
  async saveAvatarAction() {
    const avatar = this.file('avatar');
    if (think.isEmpty(avatar)) {
      return this.fail('保存失败');
    }

    const avatarPath = think.RESOURCE_PATH + `/static/user/avatar/${this.getLoginUserId()}.` + _.last(_.split(avatar.path, '.'));

    fs.rename(avatar.path, avatarPath, function(res) {
      return this.success();
    });
  }

  async setUserInfoAction(){
    const info =await this.post('info')
    info.birthday = this.getBirth(info.birthday)
    const s =await this.model('user').where({id:info.id}).update(info)
    console.log(s)
    return this.success({success:true})
  }
};
