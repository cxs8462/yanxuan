<template>
  <div class="topic">
    <van-sticky :offset-top="0">
      <van-nav-bar title="专题"></van-nav-bar>
    </van-sticky>
    <div class="listBox">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <topic-item
          @click.native="onTopic(item.id)"
          v-for="item in list"
          :key="item.id"
          :data="item"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import http from "@/api/api";
import topicItem from "@/components/topic";

export default {
  name: "topic",
  components: { topicItem },
  created() {
    this.onLoad();
  },
  data() {
    return {
      page: {
        page: 1,
        size: 5,
      },
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      http.getTopicData(this.page).then((r) => {
        if (this.page.page >= r.totalPages) {
          this.data.push(...r.data);
          this.finished = true;
        } else {
          this.list.push(...r.data);
          this.page.page++;
        }
        this.loading = false;
      });
    },
    onTopic(id) {
      this.$router.push({ name: "专题详情", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.topic {
  .listBox {
    padding: 10px;
  }
}
</style>
