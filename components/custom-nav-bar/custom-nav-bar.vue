<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{height:getstatusBarHeight() + 'px'}">
				
			</view>
			<view class="titleBar" :style="{height:getTitleBarHeight()+'px'}">
				<view class="title">
					{{title}}
				</view>
				<view class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</view>
			</view>
		</view>
		<view class="fill" :style="{height:getNavBarHeight() + 'px'}">
			
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {getstatusBarHeight,getTitleBarHeight,getNavBarHeight} from '@/utils/system.js'
defineProps({
	title:{
		type:String,
		defualt:"壁纸"
	}
})
</script>

<style lang="scss" scoped>
.layout{
	.navbar{
		position: fixed;
		top: 0;
		left: 0;
		z-index:10;
		width: 100%;
		background:
		linear-gradient(to bottom,rgba(0,0,0,0),#fff 400rpx),
		linear-gradient(to right,#beecd8 60%,pink);
		.statusBar{

		}
		.titleBar{
			display: flex;
			align-items: center;
			padding: 0 30rpx;
		
			.title{
				font-size:44rpx;
				font-weight: 700;
				color: #000;
			}
			.search{
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255,255,255,0.4);
				border: 1px solid #fff;
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
			    display: flex;
				align-items: center;
				.text{
					padding-left: 10rpx;
				}
				.icon{
					margin-left: 10rpx;
				}
			}
		}
	}
}
</style>