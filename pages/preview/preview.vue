<template>
	<view class="preview">
		<swiper circular>
			<swiper-item v-for="item in 5">
				<image src="/common/images/preview1.jpg" mode="aspectFill" @click="maskChange"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="maskState">
			<view class="goback" :style="{top:getstatusBarHeight()+'px'}" @click="goback">
				<uni-icons type="back" color="#fff" size="20" ></uni-icons>
			</view>
			<view class="count">
				3 / 5
			</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text" @click="clickInfo">
						信息
					</view>
				</view>
				<view class="box" @click="openScore">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">
						5分
					</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">
						下载
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader" >
					<view></view>
					<view class="title">
						壁纸评分
					</view>
					<view class="close">
						<uni-icons type="closeempty" size="18" color="#999" @click="close"></uni-icons>
					</view>
					
				</view>
				<scroll-view scroll-y="true" >
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable class="value">1232321</text>
						</view>
						<view class="row">
							<view class="label">分类：</view>
							<text selectable class="value class">明星美女</text>
						</view>
						<view class="row">
							<view class="label">发布者：</view>
							<text selectable class="value">尼古拉斯赵四</text>
						</view>
						<view class="row">
							<view class="label">评分：</view>
							<view class="value rotebox">
								<uni-rate readonly touchable value="3.5" size="16"/>
								<text class="score">5分</text>
							</view>
						</view>
						
						<view class="row">
							<view class="label">摘要：</view>
							<text selectable class="value">摘要文字内容填充部分，
							摘要文字内容填充部分，摘要文字内容填充部分，
							摘要文字内容填充部分，摘要文字内容填充部分。</text>
						</view>
						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="item in 3">
									标签名
								</view>
							</view>
						</view>
						
						<view class="coperight">
							本代码及设计内容仅供学习参考，
							未经许可不得用于商业用途。原创内容版权归作者所有，转载请注明出处。
							使用第三方资源（如图片、组件）请遵守其相关授权协议。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">	
				<view class="popHeader" >
				<view></view>
				<view class="title">
				壁纸信息
				</view>
				<view class="close">
		<uni-icons type="closeempty" size="18" color="#999" @click="scoreClose"></uni-icons>
				</view>
				</view>
			<view class="content">
				<uni-rate v-model="useScore" allowHalf/>
				<text>{{useScore}}分</text>
			</view>
			<view class="footer">
				<button @click="submitScore" :disabled="!useScore" type="default" size="mini" plain>确认评分</button>
			</view>
		</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {getstatusBarHeight} from "@/utils/system.js"
const useScore =ref(0)
//遮罩层显示
	const maskState =ref(true);
	const maskChange =()=>{
		maskState.value = !maskState.value
	}
//info弹窗显示
const infoPopup = ref("");
const clickInfo =()=>{
	infoPopup.value.open();
}
//关闭弹窗
const close =()=>{
	infoPopup.value.close();
}
//评分弹窗
const scorePopup = ref("");
const openScore = ()=>{
	scorePopup.value.open();
}
const scoreClose =()=>{
	scorePopup.value.close();
}
//提交评分
const submitScore =()=>{
	console.log("评分成功");
}

//返回上一页
const goback=()=>{
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
	.preview{
		position: relative;
		width: 100%;
		height: 100vh;
		swiper{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.mask{
			&>view{
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content;
			}
			.goback{
				width: 76rpx;
				height: 76rpx;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100rpx;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1px solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.count{
				top: 10vh;
				background:rgba(0, 0, 0, 0.3);
				backdrop-filter: blur(10rpx);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
			}
			.time{
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em;
				text-shadow:0rpx 4rpx rgba(0, 0, 0, 0.3);
				
			}
			.date{
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0rpx 4rpx rgba(0, 0, 0, 0.3);
			}
			.footer{
				background: rgba(255, 255, 255, 0.6);
				bottom: 10vh;
				width: 60vw;
				height: 120rpx;
				border-radius: 120rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);
				.box{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rpx 20rpx;
					.text{
						font-size: 26rpx;
						color: #777;
					}
			}	
			}
		}
	.infoPopup{
		background: #fff;
		padding: 30rpx;
		border-radius:30rpx 30rpx 0 0 ;
		overflow: hidden;
		.popHeader{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title{
				color: #676767;
				font-size: 26rpx;
			}
			.close{
				padding: 6rpx;
			}
		}
		scroll-view{
			max-height: 60vh;
			.content{
				.row{
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label{
						color: #a7a7a7;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value{
						flex: 1;
						width: 0;
					}
					.rotebox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color: #676767;
							padding-left: 20rpx;
						}
					}
					.tabs{
						display: flex;
						flex-wrap: wrap;//放不下自动换行
						.tab{
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
					.class{
						color: $brand-theme-color;
					}
				}
				.coperight{
					background: #f6f6f6;
					font-size: 28rpx;
					padding: 20rpx;
					border-radius: 10rpx;
					color: #666;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}
	.scorePopup{
		background: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius:30rpx;
		.popHeader{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title{
				color: #676767;
				font-size: 26rpx;
			}
			.close{
				padding: 6rpx;
			}
		}
		.content{
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				color: #ffca3e;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer{
			padding: 10rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
