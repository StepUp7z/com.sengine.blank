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
 * - 作为插件的服务端脚本
 * - 简单演示了Plugin的实现
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/world/main](https://sengine.mp-gamer.com/scripting/world/main)
 * 
 */


// 模块对象
var HealthVignette = {
	
	
	name: "HealthVignette",
	
	// Stream信号
	SIGNAL: {
		HEALTHY: 0,
		UNHEALTHY: 1
	},
	

	// 健康界限
	HEALTHY_LEVEL: 20,	

	// 模块初始化
	init: function(){
		this.register();
	},
	
	// 注册事件
	register: function(){
		
		AddListener("OnCharacterSpawn", ( character )=>{
			
			// JSON构造
			let data = {"key": this.name, "value": this.SIGNAL.HEALTHY};
			// Send Stream
			let plr = character.Owner;
			if(plr != null){
				plr.SendData(this.SIGNAL.HEALTHY, JSON.stringify(data));
			}
			
		});
		
		
		AddListener("OnCharacterHealthChange", ( character, oldHealth, newHealth )=>{
			
			DLog("Plugin: OnCharacterHealthChange");


			// 变为不健康
			if( oldHealth > this.HEALTHY_LEVEL && newHealth <= this.HEALTHY_LEVEL ){
				let data = {"key": this.name, "value": 100-newHealth};
				// Send Stream
				let plr = character.Owner;
				if(plr != null){
					plr.SendData(this.SIGNAL.UNHEALTHY, JSON.stringify(data));
				}
			}
			// 变为健康
			else if( oldHealth <= HEALTHY_LEVEL && newHealth > HEALTHY_LEVEL ){
				let data = {"key": this.name, "value": this.SIGNAL.HEALTHY};
				// Send Stream
				let plr = character.Owner;
				if(plr != null){
					plr.SendData(this.SIGNAL.HEALTHY, JSON.stringify(data));
				}
			}
			
		});
		
	},
	
	
	
};


// 模块初始化
HealthVignette.init();

