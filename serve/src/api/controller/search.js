const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    // 取出输入框默认的关键词
    const defaultKeyword = await this.model('keywords').where({ is_default: 1 }).limit(1).find();
    // 取出热闹关键词
    const hotKeywordList = await this.model('keywords').distinct('keyword').field(['keyword', 'is_hot']).limit(10).select();
    const historyKeywordList = await this.model('search_history').distinct('keyword').where({ user_id: this.getLoginUserId() }).limit(10).getField('keyword');

    return this.success({
      defaultKeyword: defaultKeyword,
      historyKeywordList: historyKeywordList,
      hotKeywordList: hotKeywordList
    });
  }

  async helperAction() {
    const keyword = this.get('keyword');
    const keywords = await this.model('keywords').distinct('keyword').where({ keyword: ['like', keyword + '%'] }).getField('keyword', 10);
    return this.success(keywords);
  }

  async clearhistoryAction() {
    await this.model('search_history').where({ user_id: this.getLoginUserId() }).delete();
    return this.success();
  }

  async searchGoodsAction(){
    const keyword = this.get('keyword');
    const goods = this.model('goods');
    const goodsData = await goods.where({ name: ["like", `%${keyword}%`] }).field(['id', 'name', 'list_pic_url', 'retail_price']).page(this.get('page')||1, this.get('size')||10).countSelect();
    return this.success(goodsData);
  }
};
