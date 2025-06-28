"use strict";
function formatTimeDiff(timestamp) {
  const now = Date.now();
  const diffInMs = now - timestamp;
  const diffInSeconds = Math.floor(diffInMs / 1e3);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInSeconds < 60) {
    return "一分钟内";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  } else if (diffInDays <= 30) {
    return `${diffInDays}天前`;
  } else if (diffInMonths <= 3) {
    return `${diffInMonths}个月前`;
  } else {
    return null;
  }
}
exports.formatTimeDiff = formatTimeDiff;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
