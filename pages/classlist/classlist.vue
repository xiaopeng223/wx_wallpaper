<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id=' + item._id" class="item" v-for="item in classList"
			:key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status=" noData ? 'noMore':'loading'"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad, onReachBottom,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import {apiGetClassList} from "@/apis/apis.js"
const classList = ref([])
const noData = ref(false)
let pageName;
//获取url传递的id
const queryParams = {
	pageNum:1,
	pageSize:12
}
onLoad((e)=>{
	let {id=null,name=null} = e;
	queryParams.classid = id;
	pageName = name
	uni.setNavigationBarTitle({
		title:name
	})
	//onLoad加载在setup语法糖之后
	getClassList();
})
//获取分类列表
const getClassList =async ()=>{
	const res =await apiGetClassList(queryParams);
	classList.value =[...classList.value , ...res.data.data];
	if(queryParams.pageSize>res.data.data.length){
		noData.value = true
	}
	uni.setStorageSync("storgClassList",classList.value);
}
//触底加载更多
onReachBottom(()=>{
	if(noData.value) return;
	queryParams.pageNum++
	getClassList();
})


//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"壁纸",
		path:"/pages/classlist/classlist?id="+queryParams.classid+"&name="+pageName
	}
})
//分享到朋友圈
onShareTimeline(()=>{
	return{
		title:"壁纸",
		query:"id="+queryParams.classid+"&name="+pageName
	}
})
</script>

<style lang="scss" scoped>
	.classlist{
		.content{
			display: grid;
			grid-template-columns: repeat(3,1fr);
			gap: 5rpx;
			padding: 5rpx 5rpx;
			.item{
				height: 440rpx;
			    image{
			    width: 100%;
				height: 100%;
				display: block;
				}
			}
		}
	}       
</style>
