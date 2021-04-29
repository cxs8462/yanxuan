const Base = require("./base.js");
const _ = require('lodash');

module.exports = class extends (
  Base
) {
  async getOrderListAction() {
    const userid = this.getLoginUserId();
    const list = await this.model("orderlist").where({ userid }).select();
    for (let i = 0; i < list.length; i++) {
      list[i].shop = await this.model("goods")
        .where({ id: list[i].shopid })
        .find();
      list[i].address = await this.model("address")
        .where({ id: list[i].addressid })
        .find();
    }
    list.map((r) => {
      switch (r.typeid) {
        case 1:
          r.type = "待发货";
          break;
        case 2:
          r.type = "已发货";
          break;
        case 3:
          r.type = "已收货";
          break;
        default:
          break;
      }
      return r;
    });
    return this.success({
      list,
    });
  }

  async pushOrderListAction(){
    const list = this.post("list");
    for(let i = 0;i<list.length;i++){
        if(list[i].checked===0) continue
        console.log(list[i])
        const obj = {
            shopid : list[i].goods_id,
            number:list[i].number,
            time:this.getDate(new Date()),
            userid:this.getLoginUserId(),
            addressid:list[i].addressid,
            bh:this.generateOrderNumber(),
            price:list[i].market_price,
            typeid:1
        }
        await this.model('orderlist').add(obj)
        await this.model('cart').where({ id: list[i].id }).delete();
    }

    return this.success({
        isSuccsee:true
      });
  }
  
  async postOrderShAction(){
    const id = this.post("id");
    await this.model('orderlist').where({id}).update({typeid:3,wl:3})
    return this.success({
      isSuccsee:true
    });
  }

 
  async postCommentAction(){
    const id = this.post("id");
    const comment = this.post("comment")
    await this.model('orderlist').where({id}).update({comment})
    return this.success({
      isSuccsee:true
    });
  }

  generateOrderNumber() {
    const date = new Date();
    return date.getFullYear() + _.padStart(date.getMonth(), 2, '0') + _.padStart(date.getDay(), 2, '0') + _.padStart(date.getHours(), 2, '0') + _.padStart(date.getMinutes(), 2, '0') + _.padStart(date.getSeconds(), 2, '0') + _.random(100000, 999999);
  }
};
