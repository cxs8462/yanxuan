<template>
  <div class="address">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        title="地址中心"
        @click-right="del"
        right-text="删除"
      >
      </van-nav-bar>
    </van-sticky>
    <van-contact-card type="add" @click="add" add-text="新建地址" />
    <div class="list">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @edit="onEdit"
        @add="add"
      />
    </div>
    <van-popup v-model="addShow" style="width: 100%; height: 100%">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="close"
      ></van-nav-bar>
      <van-address-edit
        v-if="addShow"
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </van-popup>
    <van-popup v-model="editShow" style="width: 100%; height: 100%">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="close"
      ></van-nav-bar>
      <van-address-edit
        v-if="editShow"
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onEditSub"
        :address-info="info"
      />
    </van-popup>
  </div>
</template>

<script>
import http from "@/api/api";
import areaList from "@/utils/adress";
export default {
  name: "address",
  created() {},
  data() {
    return {
      addShow: false,
      areaList: JSON.parse(JSON.stringify(areaList)),
      chosenAddressId: "",
      editShow: false,
      info: {},
    };
  },
  computed: {
    list() {
      return this.$store.state.address;
    },
  },
  methods: {
    add() {
      this.addShow = true;
    },
    close() {
      this.addShow = false;
      this.editShow = false;
    },
    onSave(value) {
      this.$toast.loading("保存中");
      http
        .postAddAddress({
          address:
            value.province + value.city + value.county + value.addressDetail,
          is_default: value.isDefault,
          province_id: value.areaCode,
          name: value.name,
          mobile: value.tel,
        })
        .then((r) => {
          if (r.errno === 0) {
            this.$toast.success("添加成功！");
            this.$store.dispatch("getAdress");
            this.addShow = false;
          }
        });
    },
    onEdit(i) {
      const { id, name, tel, isDefault } = i;
      this.info = {
        id,
        name,
        tel,
        areaCode: i.province_id,
        addressDetail: i.address,
        isDefault: isDefault ? true : false,
      };
      this.editShow = true;
    },
    del() {
      if (!this.chosenAddressId) {
        this.$toast.fail("请选择地址！");
        return;
      }
      this.$toast.loading("删除中");
      http.postDelteAddress({ id: this.chosenAddressId }).then((r) => {
        if (r.errno === 0) {
          this.$toast.success("删除成功！");
          this.$store.dispatch("getAdress");
        }
      });
    },
    onEditSub(value) {
      this.$toast.loading("保存中");
      http
        .postAddAddress({
          address:
            value.province + value.city + value.county + value.addressDetail,
          is_default: value.isDefault,
          province_id: value.areaCode,
          name: value.name,
          mobile: value.tel,
          id: value.id,
        })
        .then((r) => {
          if (r.errno === 0) {
            this.$toast.success("修改成功！");
            this.$store.dispatch("getAdress");
            this.editShow = false;
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  .list {
    height: 80vh;
    overflow-y: scroll;
  }
}
</style>
