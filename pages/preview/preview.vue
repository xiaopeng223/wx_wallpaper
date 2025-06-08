<template>
	<view class="preview">
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<image v-if="readImgs.includes(index)" :src="item.picurl" mode="aspectFill" @click="maskChange"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="maskState">
			<view class="goback" :style="{top:getstatusBarHeight()+'px'}" @click="goback">
				<uni-icons type="back" color="#fff" size="20" ></uni-icons>
			</view>
			<view class="count">
				{{currentIndex+1}} / {{classList.length}}
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
						{{currentInfo.score}}分
					</view>
				</view>
				<view class="box" @click="clickDownload">
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
							<text selectable class="value">{{currentInfo._id}}</text>
						</view>
						<view class="row">
							<view class="label">分类：</view>
							<text selectable class="value class">{{currentInfo._id}}</text>
						</view>
						<view class="row">
							<view class="label">发布者：</view>
							<text selectable class="value">{{currentInfo.nickname}}</text>
						</view>
						<view class="row">
							<view class="label">评分：</view>
							<view class="value rotebox">
								<uni-rate readonly touchable :value="currentInfo.score" size="16"/>
								<text class="score">{{currentInfo.score}}分</text>
							</view>
						</view>
						
						<view class="row">
							<view class="label">摘要：</view>
							<text selectable class="value">{{currentInfo.description}}</text>
						</view>
						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="item in currentInfo.tabs">
									{{item}}
								</view>
							</view>
						</view>
						
						<view class="coperight">
							本代码及设计内容仅供学习，
							未经许可不得用于商业用途。原创内容版权归原作者所有，转载请注明出处。
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
				{{isScore?'评过分了': '壁纸信息'}}
				</view>
				<view class="close">
		<uni-icons type="closeempty" size="18" color="#999" @click="scoreClose"></uni-icons>
				</view>
				</view>
			<view class="content">
				<uni-rate v-model="userScore" allowHalf :disabled="userScore" disabled-color="#ffca3e"/>
				<text>{{userScore}}分</text>
			</view>
			<view class="footer">
				<button @click="submitScore" :disabled="!userScore || isScore" type="default"  size="mini" plain>确认评分</button>
			</view>
		</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import {getstatusBarHeight} from "@/utils/system.js"
import {apiGetSetupScore,apiWriteDownload} from "@/apis/apis.js"
//定义图片信息
const currentInfo = ref(null);
//下载图片到本地
//点击下载
const clickDownload = async () => {
	try {
		uni.showLoading({
			title: "下载中...",
			mask: true
		})
		let {classid,_id:wallId} = currentInfo.value;
	let res =await apiWriteDownload({
			classid,
			wallId
		})
		if(res.data.errCode !=0) throw res;
		// #ifdef MP || APP				
		uni.getImageInfo({
			src: currentInfo.value.picurl,  // 改成 currentInfo
			success: function(res) {					
				var path = res.path;
				uni.saveImageToPhotosAlbum({
					filePath: path,
					success(res) {
						uni.hideLoading();
						uni.showToast({
							title: '保存成功,可去相册查看',
							icon: "none",
							duration:2000
						})							
					},
					fail(err) {
						uni.hideLoading();
						if(err.errMsg == 'saveImageToPhotosAlbum:fail cancel'){
							uni.showToast({
								title: '保存失败，请重新点击下载',
								icon: "none"
							})
							return;
						}							
						uni.showModal({
							title: '提示',
							content: '需要您授权保存相册',
							showCancel: false,
							success:res=>{
								if(res.confirm){
									uni.openSetting({
										success(settingdata) {
											if (settingdata.authSetting['scope.writePhotosAlbum']) {
												uni.showToast({
													title:'获取权限成功',
													icon:"none"
												})													
											}else{
												uni.showToast({
													title:'获取权限失败',
													icon:"none"
												})													
											}
											
										}
									})
								}
							}
						})
					},
					complete(err) {
						
					}
				})
			}
		})
		// #endif

		// #ifdef H5
		//调用预览图片的方法		
		uni.previewImage({
			urls: [currentInfo.value.picurl],
			current: 0,
			success: (res) => {
				uni.showToast({
					title: '请长按保存',
					icon: "none",
					duration: 2000
				})
			}
		})
		// #endif

	} catch (err) {			
		console.log(err);
		uni.hideLoading();
	}
}



const userScore =ref(0)
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
	if(currentInfo.value.userScore){
		isScore.value = true
		userScore.value = currentInfo.value.userScore
	}
	scorePopup.value.open();
}
const scoreClose =()=>{
	scorePopup.value.close();
	userScore.value = 0;
	isScore.value = false
}
//提交评分
const isScore = ref(false)
const submitScore =async ()=>{
	uni.showLoading({
		title:"加载中..."
	})
	let {classid,_id:wallId} = currentInfo.value;
    let res =await apiGetSetupScore({
		classid,
		wallId,
		userScore:userScore.value
	})
	uni.hideLoading();
	if(res.data.errCode === 0){
		uni.showToast({
			title:"评分成功",
			icon:"success",
		})
		//缓存中存用户评分
		classList.value[currentIndex.value].userScore = userScore.value;
		uni.setStorageSync("storgClassList",classList.value);
		scoreClose()
	}
}

//返回上一页
const goback=()=>{
	uni.navigateBack()
}

//读取缓存里内容
const classList =ref([])
const storgClassList = uni.getStorageSync("storgClassList") || [];
classList.value = storgClassList.map(item=>{
	return{
		...item,
		picurl:item.smallPicurl.replace("_small.webp",".jpg")
	}
})
//渲染点击进去的图片
const currentId = ref(null);
const currentIndex = ref(0)
//滑动再加载
const readImgs = ref([])
onLoad((e)=>{
  currentId.value = e.id;
  currentIndex.value = classList.value.findIndex(item=>item._id == currentId.value)
  readImgs.value.push(
  currentIndex.value-1<=0 ? classList.value.length-1 : currentIndex.value-1,
  currentIndex.value,
  currentIndex.value+1>=classList.value.length-1 ? 0:currentIndex.value+1)
  currentInfo.value = classList.value[currentIndex.value]
  console.log(currentInfo);
})
const swiperChange = (e) =>{
	currentIndex.value = e.detail.current;
	readImgs.value.push(currentIndex.value-1,currentIndex.value,currentIndex.value+1)
	currentInfo.value = classList.value[currentIndex.value]
	console.log(currentInfo);
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
