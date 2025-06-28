<template>
  <view class="searchLayout">
    <!-- 搜索框区域 -->
    <view class="searchBarWrapper">
      <uni-search-bar
        v-model="keyword"
        :focus="true"
        @confirm="onSearch"
        @cancel="onClear"
        @clear="onClear"
        placeholder="搜索关键词"
      ></uni-search-bar>
    </view>

    <!-- 无数据时显示搜索历史 + 推荐 -->
    <view v-if="!classList.length || noSearch">
      <view class="history" v-if="historySearch.length">
        <view class="topTitle">
          <view class="text">最近搜索</view>
          <view class="icon" @click="removeHistory">
            <uni-icons type="trash" size="25"></uni-icons>
          </view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in historySearch"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>

      <view class="recommend">
        <view class="topTitle">
          <view class="text">热门搜索</view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in recommendList"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>
    </view>

    <!-- 无结果提示 -->
    <view class="noSearch" v-if="noSearch">
      <uv-empty
        mode="search"
        icon="http://cdn.uviewui.com/uview/empty/search.png"
      ></uv-empty>
    </view>

    <!-- 搜索结果 -->
    <view v-else>
      <view class="list">
        <navigator
          v-for="item in classList"
          :key="item._id"
          :url="`/pages/preview/preview?id=${item._id}`"
          class="item"
        >
          <image :src="item.smallPicurl" mode="aspectFill"></image>
        </navigator>
      </view>

      <view class="loadingLayout" v-if="noData || classList.length">
        <uni-load-more :status="noData ? 'noMore' : 'loading'" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReachBottom, onUnload } from "@dcloudio/uni-app";
import { apiSearchData } from "../../apis/apis.js";

// 搜索输入内容
const keyword = ref("");

// 查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 12,
  keyword: "",
});

// 搜索记录等数据
const historySearch = ref(uni.getStorageSync("historySearch") || []);
const recommendList = ref(["美女", "帅哥", "宠物", "卡通"]);
const noData = ref(false);
const noSearch = ref(false);
const classList = ref([]);

// 搜索行为
const onSearch = () => {
  if (!keyword.value.trim()) return; // 空值不搜索

  uni.showLoading({ mask: true });

  // 更新历史记录
  historySearch.value = [
    ...new Set([keyword.value.trim(), ...historySearch.value]),
  ].slice(0, 10);
  uni.setStorageSync("historySearch", historySearch.value);

  // 重置参数并请求
  initParams(keyword.value.trim());
  searchData();
};

// 清空输入
const onClear = () => {
  keyword.value = "";
  initParams();
};

// 标签点击搜索
const clickTab = (val) => {
  keyword.value = val;
  onSearch();
};

// 清空历史
const removeHistory = () => {
  uni.showModal({
    title: "是否清空历史搜索？",
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync("historySearch");
        historySearch.value = [];
      }
    },
  });
};

// 初始化查询参数
const initParams = (val = "") => {
  classList.value = [];
  noData.value = false;
  noSearch.value = false;
  queryParams.value = {
    pageNum: 1,
    pageSize: 12,
    keyword: val,
  };
};

// 搜索请求
const searchData = async () => {
  try {
    const res = await apiSearchData(queryParams.value);
    const list = res.data?.data || [];
    classList.value = [...classList.value, ...list];
    uni.setStorageSync("storgClassList", classList.value);

    if (list.length < queryParams.value.pageSize) noData.value = true;
    if (list.length === 0 && classList.value.length === 0) noSearch.value = true;
  } finally {
    uni.hideLoading();
  }
};

// 加载更多
onReachBottom(() => {
  if (noData.value) return;
  queryParams.value.pageNum++;
  searchData();
});

// 页面卸载清理缓存
onUnload(() => {
  uni.removeStorageSync("storgClassList");
});
</script>

<style lang="scss" scoped>
.searchLayout {
  position: relative;
  z-index: 1;

  .searchBarWrapper {
    padding: 0 10rpx;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 99;
  }

  .topTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    color: #999;
  }

  .history,
  .recommend {
    padding: 30rpx;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 20rpx;

    .tab {
      background: #f4f4f4;
      font-size: 28rpx;
      color: #333;
      padding: 10rpx 28rpx;
      border-radius: 50rpx;
      margin-right: 20rpx;
      margin-top: 20rpx;
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 20rpx 5rpx;

    .item {
      height: 440rpx;

      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }

  .noSearch {
    margin-top: 100rpx;
  }
}
</style>
