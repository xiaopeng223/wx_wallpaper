<template>
	<view class="userLayout pageBg" v-if="userinfo">
		<view :style="{height:getNavBarHeight()+'px'}">
		</view>
	<view class="userInfo" >
		<view class="avatar">
			<image src="/static/images/xxmLogo.png" mode="aspectFill"></image>
		</view>
		<view class="nickname">
			默认用户:{{userinfo.IP}}
		</view>
		<view class="address">
			来自于：{{userinfo.address.province}}-{{userinfo.address.city}}
		</view>
	</view>
	<view class="section">
		<view class="list">
			<navigator url="/pages/classlist/classlist?name=我的下载&type=download">
			<view class="row" @click="openClassfiy">	
				<view class="left">
					<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">
						我的下载
					</view>
				</view>
				<view class="right">
					<view class="text">
						{{userinfo.downloadSize}}
					</view>
					<uni-icons type="right" size="15" color="#aaa"></uni-icons>
				</view>
			</view>	
		</navigator>
		<navigator url="/pages/classlist/classlist?name=我的评分&type=score">
				<view class="row" @click="openClassfiy">
					<view class="left">
						<uni-icons type="star-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">
							我的评分
						</view>
					</view>
					<view class="right">
						<view class="text">
							{{userinfo.scoreSize}}
						</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</navigator>
			<view class="row" >
				<view class="left">
					<uni-icons type="chatboxes-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">
						联系客服
					</view>
				</view>
				<!-- #ifdef H5 || APP -->
				<button @click="phoneContact">拨打电话</button>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<button open-type="contact">联系客服</button>
				<!-- #endif -->
				<view class="right">
					<uni-icons type="right" size="15" color="#aaa"></uni-icons>
				</view>
			</view>
		</view>
	</view>
	<view class="section">
		<view class="list">
			<navigator url="/pages/notice/detail?id=65361e318b0da4ca084e3ce0">
			<view class="row" >
				<view class="left">
					<uni-icons type="notification-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">
					 订阅更新
					</view>
				</view>
				<view class="right">
					<uni-icons type="right" size="15" color="#aaa"></uni-icons>
				</view>
			</view>
			</navigator>
			<navigator url="/pages/notice/detail?id=6536358ce0ec19c8d67fbe82">
			<view class="row" >
				<view class="left">
					<uni-icons type="flag-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">
					 常见问题
					</view>
				</view>
				<view class="right">
					<uni-icons type="right" size="15" color="#aaa"></uni-icons>
				</view>
			</view>
			</navigator>
		</view>
	</view>
	<view class="safe-area-inset-bottom">
		
	</view>
	</view>
	<view class="loadingLayout" v-else>
		<view :style="{height:getNavBarHeight()+'px'}">
		</view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	import {getNavBarHeight} from "@/utils/system.js"
	import { apiUserInfo } from "../../apis/apis";
import { ref } from "vue";
	const userinfo = ref("");
	//用户信息
	const getUserInfo =()=>{
		apiUserInfo().then(res =>{
			console.log(res.data.data);
			userinfo.value = res.data.data;
		})
	}
	getUserInfo();
	const phoneContact=()=>{
		uni.makePhoneCall({
			phoneNumber: '114' 
		});
	}
	const openClassfiy =() =>{
		// uni.switchTab({
		// 	url:"/pages/classify/classify"
		// })
	}
</script>

<style lang="scss" scoped>
.userLayout{
		.userInfo{
			display: flex;
	        align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;
			.avatar{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
			}
			image{
				width: 100%;
				height: 100%;
			}
			.nickname{
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx 0;
			}
			.address{
				font-size: 28rpx;
				color: #ABABAB;
			}
		}	
		.section{
			width: 690rpx;
			margin: 50rpx auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
			.list{
				.row{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding:0 30rpx ;
					height: 100rpx;
					border-bottom: 1px solid #eee;
				    position: relative;
					background: #fff;
					button{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
					&:last-child{
						border-bottom: none;
					}
					.left{
						display: flex;
						align-items: center;
					
						.text{
							padding-left: 20rpx;
							color: #666;
						}
					}
					.right{
						display: flex;
						align-items: center;
						.text{
							padding-right: 20rpx;
							color: #666;
						}
					}
				}
			}
		}
	}
       
</style>
