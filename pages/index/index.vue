<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots 
			indicator-color="rgba(255,255,255,0.5)" 
			indicator-active-color="#fff"
			autoplay
			circular>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice" @click="goDetail">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="$brand-theme-color" ></uni-icons>
				<text class="text" >公告</text>
			</view>
			<view class="center">
				<swiper  
				autoplay
				circular
				vertical
				interval="1500"
				duration="300">
					<swiper-item v-for="item in noticeList" :key="item._id">{{item.title}}</swiper-item>

				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333" ></uni-icons>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar-filled" size="18" color="#28b389"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title >
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in dayRandom" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill" @click="goPreview(item._id)"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<view class="more" @click="goClass">
						More+
					</view>
				</template>
			</common-title>
		</view>
		<view class="content1">
			<theme-item v-for="item in classfiyList" 
			:key="item._id"
			 :item="item"></theme-item>
			<theme-item :isMore="true"></theme-item>
		</view>
		<view class="safe-area-inset-bottom">
			
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import {apiGetBanner,apiDayRandom,apiGetNotice ,apiGetClassify} from "../../apis/apis"
//获取轮播图
	const bannerList = ref([])
	const dayRandom = ref([])
	const noticeList = ref([])
	const classfiyList = ref([])
	
	const goClass = ()=>{
		uni.switchTab({
			url:"/pages/classify/classify"
		})
	}
	const goPreview=(id)=>{
		uni.setStorageSync("storgClassList",dayRandom.value);
		uni.navigateTo({
			url:"/pages/preview/preview?id="+id
		})
	}
	const goDetail=()=>{
		uni.navigateTo({
			url:"/pages/notice/detail"
		})
	}
	
	const getbanner =async ()=>{
	let res =await apiGetBanner();
	bannerList.value = res.data.data;
	}
	getbanner();
	//每日推荐
	const getDayRandom =async ()=>{
	const res =await apiDayRandom(); 
	dayRandom.value = res.data.data
	}
	getDayRandom();
	//公告
	const getNotice =async () =>{
		const res = await apiGetNotice({select:true});
		noticeList.value = res.data.data
	}
	getNotice();
	const getClassify = async() =>{
		const res =await apiGetClassify({select:true});
		classfiyList.value = res.data.data;
	}
	getClassify();
	
//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"壁纸",
		path:"/pages/classlist/classlist"
	}
})
//分享到朋友圈
onShareTimeline(()=>{
	return{
		title:"壁纸",
	}
})
</script>
 
<style lang="scss" scoped>
	.homeLayout{
		.banner{
			width: 750rpx;
			padding: 30rpx 0;
			swiper{
				width: 750rpx;
				height: 340rpx;
				swiper-item{
					width: 100%;
					height: 100%;
					padding: 0 30rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}
		.notice{
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #f9f9f9;
			margin: 0 auto;
			border-radius: 80rpx;
			display: flex;
			.left{
				width: 140rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.text{
					color: $brand-theme-color;
					font-weight: 600;
					font-size: 28rpx;
				}
			}
			.center{
				flex: 1;
				swiper{
					height: 100%;
					swiper-item{
						height: 100%;
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			.right{
				width:70rpx
			}
		}
		.select{
			padding-top: 50rpx;	
			.date{
				color: $brand-theme-color;
				display: flex;
				align-items: center;
				.text{
					margin-left: 5rpx;
				}
			}
			.content{
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;
    			}
				scroll-view{
					white-space:nowrap;
					.box{
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;
						image{
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
					.box:last-child{
						margin-right: 30rpx;
					}
				}
		}
		.theme{
			padding-top:30rpx;
			.more{
				font-size: 32rpx;
				color: #888;
			}
		}
		.content1{
			// margin-top: 10rpx;
			padding: 30rpx 30rpx;
			display: grid;
			gap:15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
</style>
