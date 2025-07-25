const SYSTEM_INFO = uni.getSystemInfoSync();
export const getstatusBarHeight = ()=>SYSTEM_INFO.statusBarHeight || 15;

export const getTitleBarHeight = ()=>{
      if(uni.getMenuButtonBoundingClientRect){
		  let {top,height} = uni.getMenuButtonBoundingClientRect();
		  return (top - getstatusBarHeight())*2 + height
	  }else{
		  return 40;
	  }
}
export const getNavBarHeight = ()=>getstatusBarHeight()+getTitleBarHeight();
