/**
 * # 健康效果（镜头边缘）模块  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Aug.14, 2024  
 * - 更新时间：Dec.09, 2024  
 * - 版本：v0.0.5   
 * 
 * ## 说明
 * 
 * - 作为插件的客户端脚本
 * - 简单演示了Plugin的实现
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/world/main](https://sengine.mp-gamer.com/scripting/world/main)
 * - Vignette有引擎层面bug
 */


// 模块对象
var HealthVignette = {
	
	// ==== 数据区 ====
	name: "HealthVignette",
	
	// 预设枚举数据
	COLORS: {
		HEALTHY: Color(0, 0, 0),
		UNHEALTHY: Color(200, 0, 0)
	},
	
	// Stream信号枚举
	SIGNAL: {
		HEALTHY: 0x00,
		UNHEALTHY: 0x01
	},
	
	// 健康界限
	HEALTHY_LEVEL: 20,
	// 满血血量
	MAX_HEALTH: 100,
	
	// 计算用的偏移
	VIGNETTE_OFFSET: 0.00,
	
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
	
	// 根据损伤/满血的比例计算Vegnette
	calVignette: function(newHealth){
		// 转小数
		newValue = newHealth * 1.0;
		// 算比例
		newValue = (this.HEALTHY_LEVEL - newValue) / this.HEALTHY_LEVEL;
		// 比例最大为1.0
		let vig = newValue + this.VIGNETTE_OFFSET;
		DLog("Cal Vig:" + vig);
		return parseFloat(vig);
	},
	
	// 滤镜应用逻辑
	applyVignette: function(changeType, newValue){

		// 信号值判断
		// 健康信号
		let vig = this.SIGNAL.HEALTHY;
		let vigColor = this.COLORS.HEALTHY;

		// 不健康信号
		if(changeType != this.SIGNAL.HEALTHY){
			// 计算
			vig = this.calVignette(newValue);
			vigColor = this.COLORS.UNHEALTHY;
			
			DLog("UNHEALTHY!");
		}
		else DLog("HEALTHY!");
		
		DLog("镜头Vig:" + vig);
		DLog("镜头VigColor:" + vigColor);
		
		// 有奇妙的Bug，由于延迟问题！
		Camera.Vignette = vig;
		Camera.VignetteColor = vigColor; 
		
		// 定时器3秒后输出：Debug，Vignette还是独树一帜不受控制
		Timer.Create(()=>{
			Message("镜头Vig:" + Camera.Vignette);
			Message("镜头VigColor:" + Camera.VignetteColor);
		}, 3, 1);

	},

	// ==== 事件区 ====
	events: {
		OnServerStreamData: function( numberData, data ){
			
			DLog("Plugin: Vignette: OnServerStreamData");
			
			// JSON解析
			data = JSON.parse(data);
			let key = data.key;

			// 用key过滤非本插件消息
			if(key != HealthVignette.name) return;

			// 滤镜生效
			HealthVignette.applyVignette(numberData, data.value);
			
			DLog("value: " + data.value);

		},

	},
};

// 加载本文件即刻调用初始化
HealthVignette.init();

