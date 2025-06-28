"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_apis = require("../../apis/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    let pageName;
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    common_vendor.onLoad((e) => {
      let { id = null, name = null, type = null } = e;
      if (type)
        queryParams.type = type;
      if (id)
        queryParams.classid = id;
      pageName = name;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getClassList();
    });
    const getClassList = async () => {
      try {
        let res;
        if (queryParams.classid) {
          res = await apis_apis.apiGetClassList(queryParams);
        } else if (queryParams.type) {
          res = await apis_apis.apiGetHistoryList(queryParams);
        } else {
          common_vendor.index.__f__("warn", "at pages/classlist/classlist.vue:52", "classid 和 type 都不存在，无法加载数据");
          return;
        }
        if (res && res.data && Array.isArray(res.data.data)) {
          classList.value = [...classList.value, ...res.data.data];
          if (queryParams.pageSize > res.data.data.length) {
            noData.value = true;
          }
          common_vendor.index.setStorageSync("storgClassList", classList.value);
        } else {
          common_vendor.index.__f__("error", "at pages/classlist/classlist.vue:65", "接口返回结构不符合预期：", res);
          noData.value = true;
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/classlist/classlist.vue:69", "getClassList 请求失败：", err);
        noData.value = true;
      }
    };
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.pageNum++;
      getClassList();
    });
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸",
        path: "/pages/classlist/classlist?id=" + queryParams.classid + "&name=" + pageName
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸",
        query: "id=" + queryParams.classid + "&name=" + pageName
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length && !noData.value
      }, !classList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        d: classList.value.length || noData.value
      }, classList.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classlist/classlist.js.map
