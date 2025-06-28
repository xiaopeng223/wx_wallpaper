<template>
	<view class="classifyLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classfiy">
			<theme-item v-for="item in classfiyList" 
			:key="item._id" 
			:item="item"></theme-item>
		</view>
		<view class="safe-area-inset-bottom">
			
		</view>
	</view>
</template>

<script setup>
	import {apiGetClassify} from "../../apis/apis"
	import{ref} from "vue"
	const classfiyList = ref([])
	const getClassify = async() =>{
		const res =await apiGetClassify({pageSize:15});
		classfiyList.value = res.data.data;
	}
	getClassify();
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
