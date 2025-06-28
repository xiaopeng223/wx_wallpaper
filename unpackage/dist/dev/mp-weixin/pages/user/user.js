"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
const apis_apis = require("../../apis/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userinfo = common_vendor.ref("");
    const getUserInfo = () => {
      apis_apis.apiUserInfo().then((res) => {
        common_vendor.index.__f__("log", "at pages/user/user.vue:118", res.data.data);
        userinfo.value = res.data.data;
      });
    };
    getUserInfo();
    const openClassfiy = () => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userinfo.value
      }, userinfo.value ? {
        b: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        c: common_assets._imports_0,
        d: common_vendor.t(userinfo.value.IP),
        e: common_vendor.t(userinfo.value.address.province),
        f: common_vendor.t(userinfo.value.address.city),
        g: common_vendor.p({
          type: "download-filled",
          size: "20",
          color: "#28b389"
        }),
        h: common_vendor.t(userinfo.value.downloadSize),
        i: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        j: common_vendor.o(openClassfiy),
        k: common_vendor.p({
          type: "star-filled",
          size: "20",
          color: "#28b389"
        }),
        l: common_vendor.t(userinfo.value.scoreSize),
        m: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        n: common_vendor.o(openClassfiy),
        o: common_vendor.p({
          type: "chatboxes-filled",
          size: "20",
          color: "#28b389"
        }),
        p: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        q: common_vendor.p({
          type: "notification-filled",
          size: "20",
          color: "#28b389"
        }),
        r: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        s: common_vendor.p({
          type: "flag-filled",
          size: "20",
          color: "#28b389"
        }),
        t: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        })
      } : {
        v: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        w: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
