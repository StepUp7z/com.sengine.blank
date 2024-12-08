/**
 * # 健康效果（镜头边缘）模块  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Aug.14, 2024  
 * - 更新时间：Dec.08, 2024  
 * - 版本：v0.0.4  
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
	
	// ==== 数据区 ====
	name: "HealthVignette",
	
	// Stream信号枚举
	SIGNAL: {
		HEALTHY: 0x00,
		UNHEALTHY: 0x01
	},

	// 健康界限
	HEALTHY_LEVEL: 20,
	// 满血血量
	MAX_HEALTH: 100,

	// 存放：事件监听器实例哈希值，deinit中用
	listeners: [],
	
	
	// ==== 功能区 ====
	// 初始化
	init: function(){
		// 遍历事件实现
		for(let eventName in this.events){
			// 注册事件监听：事件名，事件实现
			let listener = AddListener(eventName, this.events[eventName]);
			// 加入容器
			this.listeners.push(listener);
		}
	},
	// 反向初始化-插件关闭用
	deinit: function(){
		// 取消事件监听
		for(let i=0; i<this.listeners.length; i++){
			RemoveListener(this.listeners[i]);
		}
	},
	
	// 生成对象用于发送Stream
	makeData: function(){
		// 数据对象
		let data = {"key": this.name};
		return data;
	},
	
	// 变动检测逻辑
	checkChange: function(oldHealth, newHealth){
		
		// 结果对象：是否需要更改滤镜，更改类型，滤镜更改参考的新值
		let resultObject = {isChanged: false, changeType: null, newValue: null};
		
		// 变为不健康，或者不健康细化变化
		if( newHealth < this.HEALTHY_LEVEL || oldHealth >= this.HEALTHY_LEVEL && newHealth < this.HEALTHY_LEVEL ){
			resultObject.isChanged = true;
			resultObject.changeType = this.SIGNAL.UNHEALTHY;
			resultObject.newValue = newHealth;

		}
		// 变为健康
		else if( oldHealth < this.HEALTHY_LEVEL && newHealth >= this.HEALTHY_LEVEL ){
			resultObject.isChanged = true;
			resultObject.changeType = this.SIGNAL.HEALTHY;
			// 健康滤镜颜色统一，此处值无用
			resultObject.newValue = this.MAX_HEALTH;
		}
		
		return resultObject;
	},


	// ==== 事件区 ====
	events: {
		// 角色出生
		OnCharacterSpawn: function( character ){
			
			// JSON构造
			let data = HealthVignette.makeData();
			data["value"] = HealthVignette.SIGNAL.HEALTHY;
			// Send Stream
			let plr = character.Owner;
			if(plr != null){
				plr.SendData(HealthVignette.SIGNAL.HEALTHY, JSON.stringify(data));
			}
			
		},
		// 角色生命变动
		OnCharacterHealthChange: function( character, oldHealth, newHealth ){
			
			DLog("Plugin: OnCharacterHealthChange");
			
			// 健康变动判断
			let result = HealthVignette.checkChange(oldHealth, newHealth);
			
			// 不需要改动
			if(result.isChanged == false) return;
			
			// 数据对象
			let data = HealthVignette.makeData();
			// 写入值
			data["value"] = result.newValue;
			// Send Stream
			let plr = character.Owner;
			if(plr != null){
				plr.SendData(result.changeType, JSON.stringify(data));
			}
			
		},

	},


};


// 加载本文件即刻调用初始化
HealthVignette.init();


