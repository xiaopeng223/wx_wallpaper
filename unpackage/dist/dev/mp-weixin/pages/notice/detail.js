"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_apis = require("../../apis/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const details = common_vendor.ref();
    let noticeId;
    common_vendor.onLoad((e) => {
      noticeId = e.id;
      getNoticeDetail();
    });
    const getNoticeDetail = () => {
      apis_apis.apiGetNoticeDetail({ id: noticeId }).then((res) => {
        details.value = res.data.data;
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: details.value
      }, details.value ? common_vendor.e({
        b: details.value.select
      }, details.value.select ? {
        c: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        })
      } : {}, {
        d: common_vendor.t(details.value.title),
        e: common_vendor.t(details.value.author),
        f: common_vendor.p({
          date: Date.now(),
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        g: details.value.content,
        h: common_vendor.t(details.value.view_count)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/detail.js.map
