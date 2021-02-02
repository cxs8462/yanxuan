const Base = require("./base.js");

module.exports = class extends (
  Base
) {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const page = this.get("page") || 1;
    const size = this.get("size") || 10;
    const name = this.get("name") || "";

    const model = this.model("goods");
    const data = await model
      .where({ name: ["like", `%${name}%`] })
      .order(["id DESC"])
      .page(page, size)
      .countSelect();

    return this.success(data);
  }

  async infoAction() {
    const id = this.get("id");
    const model = this.model("goods");
    const data = await model.where({ id: id }).find();
    data.lbt = (await this.model('goods_gallery').where({goods_id:id}).select()).map(r=>({url:r.img_url}))
    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post("id");
    const {lbt} = values
    const model = this.model("goods");
    values.is_on_sale = values.is_on_sale ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    values.is_hot = values.is_hot ? 1 : 0;
    if (id > 0) {
      await this.model('goods_gallery').where({goods_id:id}).delete()
      for(let i of lbt){
        await this.model('goods_gallery').add({goods_id:id,img_url:i.url})
      }
      delete values.lbt
      await model.where({ id: id }).update(values);
      const obj = {
        goods_id: id,
        goods_sn: id,
        goods_number: values.goods_number,
        retail_price: values.retail_price,
      };
      await this.model("product").where({goods_id:id}).update(obj);
    } else {
      delete values.id;
      const goodsId = await model.add(values);
      console.log('lbt:',lbt)
      for(let i of lbt){
        console.log('lbt:',i)
        await this.model('goods_gallery').add({goods_id:goodsId,img_url:i.url})
      }
      delete values.lbt
      const obj = {
        goods_id: goodsId,
        goods_sn: goodsId,
        goods_number: values.goods_number,
        retail_price: values.retail_price,
      };
      await this.model("product").add(obj);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post("id");
    await this.model("goods").where({ id: id }).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
