"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "https://tea.qingnian8.com/api/bizhi";
function request(config = {}) {
  let {
    url,
    data = {},
    method = "GET",
    header = {}
  } = config;
  url = baseUrl + url;
  header["access-key"] = "psr223";
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      data,
      method,
      header,
      success: (res) => {
        if (res.data.errCode === 0) {
          resolve(res);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "错误提示",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none"
          });
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
