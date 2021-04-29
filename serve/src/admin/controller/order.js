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
    const bh = this.get("bh") || "";
    const typeid = this.get("typeid") == 0 ? "" : this.get("typeid");

    const model = this.model("orderlist");
    const data = await model
      .where({ bh: ["like", `%${bh}%`], typeid: ["like", `%${typeid}%`] })
      .order(["time"])
      .page(page, size)
      .countSelect();
    const newList = [];
    for (const item of data.data) {
      item.user = await this.model("user")
        .where({ id: item.userid })
        .field(["id", "username", "mobile"])
        .find();
      const addressInfo = await this.model("address")
        .where({ id: item.addressid })
        .find();
      if (!think.isEmpty(addressInfo)) {
        addressInfo.province_name = await this.model("region").getRegionName(
          addressInfo.province_id
        );
        addressInfo.city_name = await this.model("region").getRegionName(
          addressInfo.city_id
        );
        addressInfo.district_name = await this.model("region").getRegionName(
          addressInfo.district_id
        );
        addressInfo.full_region =
          addressInfo.province_name +
          addressInfo.city_name +
          addressInfo.district_name;
      }
      item.address = addressInfo;
      item.goods = await this.model("goods")
        .field(["id", "name", "retail_price"])
        .where({ id: item.shopid })
        .find();
      switch (item.typeid) {
        case 1:
          item.type = "待发货";
          break;
        case 2:
          item.type = "已发货";
          break;
        case 3:
          item.type = "已收货";
          break;
        default:
          break;
      }
      newList.push(item);
    }
    data.data = newList;
    return this.success(data);
  }

  async infoAction() {
    const id = this.get("id");
    const model = this.model("order");
    const data = await model.where({ id: id }).find();

    return this.success(data);
  }

  async sendAction() {
    const id = this.post("id");
    await this.model("orderlist").where({ id }).update({ typeid: 2 });
    return this.success();
  }

  async postWLAction(){
    const id = this.post("id");
    const wl = this.post("wl")
    await this.model('orderlist').where({id}).update({wl})
    return this.success();
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post("id");

    const model = this.model("order");
    values.is_show = values.is_show ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    if (id > 0) {
      await model.where({ id: id }).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post("id");
    await this.model("order").where({ id: id }).limit(1).delete();

    // 删除订单商品
    await this.model("order_goods").where({ order_id: id }).delete();

    // TODO 事务，验证订单是否可删除（只有失效的订单才可以删除）

    return this.success();
  }
};
