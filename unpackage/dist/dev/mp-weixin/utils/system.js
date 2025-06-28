"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
const getstatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;
const getTitleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
    return (top - getstatusBarHeight()) * 2 + height;
  } else {
    return 40;
  }
};
const getNavBarHeight = () => getstatusBarHeight() + getTitleBarHeight();
exports.getNavBarHeight = getNavBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
exports.getstatusBarHeight = getstatusBarHeight;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
