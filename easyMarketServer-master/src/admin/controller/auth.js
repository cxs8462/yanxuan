const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const username = this.post('username');
    const password = this.post('password');

    const admin = await this.model('admin').where({ username: username }).find();
    if (think.isEmpty(admin)) {
      return this.fail(401, '用户名或密码不正确');
    }

    if ( password!== admin.password) {
      return this.fail(400, '密码不正确');
    }

    // 更新登录信息
    await this.model('admin').where({ id: admin.id }).update({
      last_login_time: parseInt(Date.now() / 1000),
      last_login_ip: this.ctx.ip
    });

    const TokenSerivce = this.service('token', 'admin');
    const sessionKey = await TokenSerivce.create({
      user_id: admin.id
    });

    if (think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }

    const userInfo = {
      id: admin.id,
      username: admin.username,
      avatar: admin.avatar,
      admin_role_id: admin.admin_role_id
    };
    return this.success({ token: sessionKey, userInfo: userInfo });
  }
  async infoAction(){
    this.ctx.state.token = this.ctx.header['x-nideshop-token'] || '';
    const tokenSerivce = think.service('token', 'admin');
    this.ctx.state.userId = await tokenSerivce.getUserId(this.ctx.state.token);

    // 只允许登录操作
    if (this.ctx.controller !== 'auth') {
      if (this.ctx.state.userId <= 0) {
        return this.fail(401, '请先登录');
      }
    }
    const admin = await this.model('admin').where({ id: this.ctx.state.userId }).find();
    const userInfo = {
      id: admin.id,
      username: admin.username,
      avatar: admin.avatar,
    };
    return this.success({ ...userInfo });
  }
};
