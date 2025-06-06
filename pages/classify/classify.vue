<template>
	<view class="classifyLayout pageBg">
		<view class="classfiy">
			<theme-item v-for="item in 15"></theme-item>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.classifyLayout{
	.classfiy{
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 15rpx;
	}
}    
</style>
