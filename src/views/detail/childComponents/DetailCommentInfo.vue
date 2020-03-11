<template>
  <div class="detail-comment-info">
    <div class="detail-comments" v-if="Object.keys(commentInfo).length !== 0">
      <div class="comment-info">
        <div class="info-header">
          <div class="header-title">用户评价</div>
          <div class="header-more">
            更多
            <i class="arrow-right"></i>
          </div>
        </div>
        <div class="info-user">
          <img :src="commentInfo.user.avatar" alt />
          <span>{{commentInfo.user.uname}}</span>
        </div>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt />
        </div>
      </div>
    </div>
    <div v-else class="noCommends">抱歉，此商品暂无用户评价!</div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转成Date对象
      const date = new Date(value * 1000);

      // 2.将date进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.detail-comment-info {
  margin-bottom: 5px;
}

.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.info-header .header-title {
  float: left;
}
.info-header .header-more {
  float: right;
}

.info-user {
  margin: 10px 0 6px;
}
.info-user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}
.info-user span {
  margin-left: 10px;
  vertical-align: middle;
}

.info-detail {
  padding: 5px 12px;
  border-bottom: 5px solid #f2f5f8;
}
.info-detail p {
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 6px;
}
.info-detail .info-other {
  font-size: 14px;
  margin-bottom: 10px;
}
.info-detail .info-other .date {
  margin-right: 10px;
}

.info-detail .info-imgs img {
  width: 65px;
  height: 65px;
  margin-right: 3px;
}

.noCommends {
  height: 40px;
  font-size: 14px;
  padding: 0px 12px;
  line-height: 35px;
  border-bottom: 5px solid #f2f5f8;
}
</style>