<template>
	<view class="themeItem">
		<navigator url="" class="box">
			<image src="/common/images/classify1.jpg" mode="aspectFill" class="pic"></image>
			<view class="mask">
				明星美女
			</view>
			<view class="tab">
				3天前更新
			</view>
		</navigator>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.themeItem{
	.box{
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic{
			width: 100%;
	        height: 100%;
		}
		.mask{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 70rpx;
			font-size: 30rpx;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(20rpx);
		}
		.tab{
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(250, 129,90 ,0.7);
			backdrop-filter: blur(20rpx);
			color: #fff;
			font-size: 24rpx;
			padding: 5rpx 16rpx;
			border-radius: 0 0 20rpx 0;
		}
	}
}
</style>