<template>
  <el-scrollbar style="height: calc(100vh - 50px);">
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  padding:0 10px;
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  background-color: rgb(241,247,252);
}
.fixed-header+.app-main {
  padding-top: 50px;
}

</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
