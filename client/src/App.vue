<template>
  <div id="app">
    <transition name = "fade">
      <router-view />
    </transition>
    <login />
  </div>
</template>

<style lang="less">
#app {
  background: #f1f2f6;
  .fade-enter-active, .fade-leave-active {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .5s;
  }
  .fade-enter{
    transform: translateX(-100%);
  }
  .fade-leave-to{
    transform: translateX(100%);
  }
}
html,
body,
p,
div {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
<script>
import Login from "@/components/login";
export default {
  components: { Login }
}
</script>
