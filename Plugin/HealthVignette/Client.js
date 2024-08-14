/**
 * # 健康效果（镜头边缘）模块  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Aug.14, 2024  
 * - 更新时间：Aug.14, 2024  
 * - 版本：v0.0.1  
 * 
 * ## 说明
 * 
 * - 作为插件的客户端脚本
 * - 简单演示了Plugin的实现
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/world/main](https://sengine.mp-gamer.com/scripting/world/main)
 * 
 */


// 模块对象
var HealthVignette = {
	
	
	name: "HealthVignette",
	
	// 预设枚举数据
	COLORS: {
		HEALTHY: Color(0, 0, 0),
		UNHEALTHY: Color(200, 0, 0)
	},
	
	// Stream信号
	SIGNAL: {
		HEALTHY: 0,
		
	},
	
	// 满血血量
	MAX_HEALTH: 100,
	
	// 偏移
	VIGNETTE_OFFSET: 0.15,
	
	// 模块初始化
	init: function(){
		this.register();
	},
	
	// 注册事件
	register: function(){
		
		AddListener("OnServerStreamData", ( number, data )=>{
			
			DLog("Plugin: Vignette: OnServerStreamData");
			
			// JSON解析
			data = JSON.parse(data);
			let key = data.key;

			// 筛选key
			switch(key){

				case this.name:
					// 信号值判断
					// 健康信号
					if(data.value == this.SIGNAL.HEALTHY){
						Camera.Vignette = this.SIGNAL.HEALTHY;
						Camera.VignetteColor = this.COLORS.HEALTHY;
						
						DLog("HEALTHY!");
					}
					// 不健康信号
					else{
						
						Camera.Vignette = this.calVignette(data.value);
						Camera.VignetteColor = this.COLORS.UNHEALTHY;
						
						DLog("UNHEALTHY!");
						
					}
				break;
			}
		});
		
	},
	
	// 根据损伤/满血的比例计算Vegnette
	calVignette: function(loss){
		// 最大0.8，此处value为损失的血量
		return (loss*1.0 / this.MAX_HEALTH) - this.VIGNETTE_OFFSET;
	}
	
};

// 初始化模块
HealthVignette.init();

