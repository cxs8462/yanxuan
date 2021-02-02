const Base = require("./base.js");

module.exports = class extends (
  Base
) {
  async indexAction() {
    const banner = await this.model("ad").select();
    return this.success([...banner]);
  }

  async updatebannerAction() {
    const banner = this.post();
    console.log(banner)
    for (let item of banner) {
        console.log(item)
      const id = item.id;
      delete item.id;
      if(id){
        await this.model("ad").where({ id }).update(item);
      }else{
        await this.model("ad").add(item);
      }
    }
    return this.success({
      success: true,
    });
  }
  async updateadminAction() {
    const data = this.post();
    const id = data.id
    delete data.id
    await this.model("admin").where({ id }).update(data);
    return this.success({
      success: true,
    });
  }

  async delAction() {
    const id = this.post("id");
    console.log(id)
    await this.model("ad").where({id}).delete();
    return this.success();
  }
};
