import {request} from "../utils/request.js"
//轮播图
export function apiGetBanner(){
	return request({url:"/homeBanner",method:"POST"})
}
//每日推荐
export function apiDayRandom(){
	return request({url:"/randomWall"})
}
//通知
export function apiGetNotice(data={}){
	return request({url:"/wallNewsList",
	data 
	})
}
//分类
export function apiGetClassify(data={}){
	return request({url:"/classify",
	data
	})
}
//分类列表
export function apiGetClassList(data={}){
	return request({url:"/wallList",
	data
	})
}
//评分
export function apiGetSetupScore(data={}){
	return request({url:"/setupScore",
	data
	})
}
//下载
export function apiWriteDownload(data={}){
	return request({url:"/downloadWall",
	data
	})
}
//获取用户信息
export function apiUserInfo(data={}){
	return request({url:"/userInfo",
	data
	})
}

//获取历史列表
export function apiGetHistoryList(data={}){
	return request({url:"/userWallList",
	data
	})
}
//公告详情
export function apiGetNoticeDetail(data={}){
	return request({url:"/wallNewsDetail",
	data
	})
}
//搜索
export function apiSearchData(data={}){
	return request({url:"/searchWall",
	data
	})
}