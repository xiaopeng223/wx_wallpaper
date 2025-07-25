"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const apis_apis = require("../../apis/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    common_vendor.onShareAppMessage(() => {
      return {
        title: currentInfo.value ? `壁纸 by ${currentInfo.value.nickname}` : "壁纸预览",
        path: "/pages/preview/preview?id=" + currentId.value
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: currentInfo.value ? `壁纸 by ${currentInfo.value.nickname}` : "壁纸预览",
        query: "id=" + currentId.value + "&classid=" + currentInfo.value.classid
      };
    });
    const currentInfo = common_vendor.ref(null);
    const clickDownload = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        let { classid, _id: wallId } = currentInfo.value;
        let res = await apis_apis.apiWriteDownload({
          classid,
          wallId
        });
        if (res.data.errCode != 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          // 改成 currentInfo
          success: function(res2) {
            var path = res2.path;
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: path,
              success(res3) {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: "保存成功,可去相册查看",
                  icon: "none",
                  duration: 2e3
                });
              },
              fail(err) {
                common_vendor.index.hideLoading();
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "提示",
                  content: "需要您授权保存相册",
                  showCancel: false,
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success(settingdata) {
                          if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取权限成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取权限失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete(err) {
              }
            });
          }
        });
      } catch (err) {
        common_vendor.index.__f__("log", "at pages/preview/preview.vue:238", err);
        common_vendor.index.hideLoading();
      }
    };
    const userScore = common_vendor.ref(0);
    const isDisabled = common_vendor.ref(false);
    const maskState = common_vendor.ref(true);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const infoPopup = common_vendor.ref("");
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const close = () => {
      infoPopup.value.close();
    };
    const scorePopup = common_vendor.ref("");
    const openScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const scoreClose = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const isScore = common_vendor.ref(false);
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let { classid, _id: wallId } = currentInfo.value;
      let res = await apis_apis.apiGetSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.data.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "success"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        scoreClose();
      }
    };
    const goback = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
          // 请替换为您的实际首页路径
        });
      }
    };
    const classList = common_vendor.ref([]);
    const storgClassList = common_vendor.index.getStorageSync("storgClassList") || [];
    classList.value = storgClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const readImgs = common_vendor.ref([]);
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      let storgClassList2 = common_vendor.index.getStorageSync("storgClassList") || [];
      if (storgClassList2.length === 0) {
        common_vendor.index.__f__("log", "at pages/preview/preview.vue:336", "缓存为空，主动请求 classList");
        let res = await apis_apis.apiGetClassList({
          classid: e.classid || "",
          // 看你接口是否需要 classid，可以不传
          pageNum: 1,
          pageSize: 50
        });
        storgClassList2 = res.data.data || [];
        common_vendor.index.setStorageSync("storgClassList", storgClassList2);
      }
      classList.value = storgClassList2.map((item) => {
        return {
          ...item,
          picurl: item.smallPicurl.replace("_small.webp", ".jpg")
        };
      });
      currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
      if (currentIndex.value === -1 && classList.value.length > 0) {
        currentIndex.value = 0;
      }
      readImgs.value.push(
        currentIndex.value - 1 <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value + 1 >= classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
      currentInfo.value = classList.value[currentIndex.value];
      common_vendor.index.__f__("log", "at pages/preview/preview.vue:372", "currentInfo:", currentInfo.value);
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
      readImgs.value.push(currentIndex.value - 1, currentIndex.value, currentIndex.value + 1);
      currentInfo.value = classList.value[currentIndex.value];
      common_vendor.index.__f__("log", "at pages/preview/preview.vue:378", currentInfo);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? {
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: item.picurl,
            c: common_vendor.o(maskChange, item._id)
          } : {}, {
            d: item._id
          });
        }),
        c: currentIndex.value,
        d: common_vendor.o(swiperChange)
      } : {}, {
        e: maskState.value
      }, maskState.value ? common_vendor.e({
        f: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        g: common_vendor.unref(utils_system.getstatusBarHeight)() + "px",
        h: common_vendor.o(goback),
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(classList.value.length),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        m: currentInfo.value
      }, currentInfo.value ? {
        n: common_vendor.p({
          type: "info",
          size: "23"
        }),
        o: common_vendor.o(clickInfo),
        p: common_vendor.p({
          type: "star",
          size: "23"
        }),
        q: common_vendor.t(currentInfo.value.score),
        r: common_vendor.o(openScore),
        s: common_vendor.p({
          type: "download",
          size: "23"
        }),
        t: common_vendor.o(clickDownload)
      } : {}) : {}, {
        v: common_vendor.o(close),
        w: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        x: currentInfo.value
      }, currentInfo.value ? {
        y: common_vendor.t(currentInfo.value._id),
        z: common_vendor.t(currentInfo.value._id),
        A: common_vendor.t(currentInfo.value.nickname),
        B: common_vendor.p({
          readonly: true,
          touchable: true,
          value: currentInfo.value.score,
          size: "16"
        }),
        C: common_vendor.t(currentInfo.value.score),
        D: common_vendor.t(currentInfo.value.description),
        E: common_vendor.f(currentInfo.value.tabs, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        })
      } : {}, {
        F: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        G: common_vendor.p({
          type: "bottom"
        }),
        H: common_vendor.t(isScore.value ? "评过分了" : "壁纸信息"),
        I: common_vendor.o(scoreClose),
        J: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        K: common_vendor.o(($event) => userScore.value = $event),
        L: common_vendor.p({
          allowHalf: "true",
          disabled: isDisabled.value,
          ["disabled-color"]: "#ffca3e",
          modelValue: userScore.value
        }),
        M: common_vendor.t(userScore.value),
        N: common_vendor.o(submitScore),
        O: !userScore.value || isScore.value,
        P: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        Q: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map
