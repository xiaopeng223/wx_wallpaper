"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_apis = require("../../apis/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const dayRandom = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const classfiyList = common_vendor.ref([]);
    const goClass = () => {
      common_vendor.index.switchTab({
        url: "/pages/classify/classify"
      });
    };
    const goPreview = (id) => {
      common_vendor.index.setStorageSync("storgClassList", dayRandom.value);
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
    };
    const goDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail"
      });
    };
    const getbanner = async () => {
      let res = await apis_apis.apiGetBanner();
      bannerList.value = res.data.data;
    };
    getbanner();
    const getDayRandom = async () => {
      const res = await apis_apis.apiDayRandom();
      dayRandom.value = res.data.data;
    };
    getDayRandom();
    const getNotice = async () => {
      const res = await apis_apis.apiGetNotice({ select: true });
      noticeList.value = res.data.data;
    };
    getNotice();
    const getClassify = async () => {
      const res = await apis_apis.apiGetClassify({ select: true });
      classfiyList.value = res.data.data;
    };
    getClassify();
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸",
        path: "/pages/classlist/classlist"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        }),
        c: common_vendor.p({
          type: "sound-filled",
          size: "20",
          color: "$brand-theme-color"
        }),
        d: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item._id
          };
        }),
        e: common_vendor.p({
          type: "right",
          size: "16",
          color: "#333"
        }),
        f: common_vendor.o(goDetail),
        g: common_vendor.p({
          type: "calendar-filled",
          size: "18",
          color: "#28b389"
        }),
        h: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        i: common_vendor.f(dayRandom.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: common_vendor.o(($event) => goPreview(item._id), item._id),
            c: item._id
          };
        }),
        j: common_vendor.o(goClass),
        k: common_vendor.f(classfiyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-7-" + i0,
            c: common_vendor.p({
              item
            })
          };
        }),
        l: common_vendor.p({
          isMore: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
