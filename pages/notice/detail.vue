<template>
	<view class="noticeLayout" v-if="details">
		<view class="title">
			<view class="tag" v-if="details.select">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">{{details.title}}</view>			
		</view>
		
		<view class="info">
			<view class="item">{{details.author}}</view>					
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>	
		</view>
		<view class="content" v-html="details.content">
		</view>
		<view class="count">
			阅读 {{details.view_count}}
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import {apiGetNoticeDetail} from "../../apis/apis"
import { onLoad } from "@dcloudio/uni-app"
const details = ref()
let noticeId
onLoad((e)=>{
	noticeId =e.id;
	getNoticeDetail();
})
const getNoticeDetail =()=>{
	apiGetNoticeDetail({id:noticeId}).then(res=>{
		// console.log( res.data.data);
		details.value = res.data.data
	})
}

</script>

<style lang="scss" scoped>
.noticeLayout{
	padding:30rpx;
		.title{
			font-size: 40rpx;
			color:#111;
			line-height: 1.6em;
			padding-bottom:30rpx;
			display: flex;
			.tag{
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;	
			}
			.font{
				padding-left:6rpx;
			}
		}
		.info{
			display: flex;
			align-items: center;
			color:#999;
			font-size: 28rpx;
			.item{
				padding-right: 20rpx;
			}
		}
		.content{
			padding:50rpx 0;
		}
		.count{
			color:#999;
			font-size: 28rpx;
		}
}
</style>
