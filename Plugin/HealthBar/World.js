/**
 * # 世界血条（Billboard）模块  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Aug.14, 2024  
 * - 更新时间：Dec.09, 2024  
 * - 版本：v0.0.2 
 * 
 * ## 说明
 * 
 * - 作为插件的服务端脚本
 * - 简单演示了Plugin的实现
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/world/main](https://sengine.mp-gamer.com/scripting/world/main)
 * 
 */


// 模块对象
var HealthBar = {
	
	// ==== 数据区 ====
	name: "HealthBar",
	
	// 玩家血条：数组
	bars: null,

	// 健康分界
	HEALTHY_LEVEL: 20,
	
	// 预设血条内容颜色
	COLORS: {
		HEALTHY: Color(255, 0, 0),
		UNHEALTHY: Color(200, 200, 0)
	},
	
	// 血条距离实体偏移
	OFFSET: Vector(0, 3, 0),
	
	// 血条进度与血量之比
	HEALTH_RATE: 0.01,
	
	// Billboard类型
	BILLBOARD_TYPE: 2,
	
	// 存放：事件监听器实例哈希值，deinit中用
	listeners: [],

	// ==== 功能区 ====
	// 新建血条
	newBar: function(char){

		// 获取玩家实例
		let plr = char.Owner;
		this.bars[plr.ID] = Billboard.Create(this.BILLBOARD_TYPE);

		this.bars[plr.ID].Target = char;
		this.bars[plr.ID].Text = plr.Name;
		this.bars[plr.ID].Progress = char.Health*(this.HEALTH_RATE);
		this.bars[plr.ID].Offset = this.OFFSET;
		
		// 计算颜色
		var color = (char.Health > this.HEALTHY_LEVEL) ? this.COLORS.HEALTHY : this.COLORS.UNHEALTHY;
		this.bars[plr.ID].Color = color;
		
		
	},
	
	// 更新血条
	barsUpdate(){
		
		// 未初始化
		if(this.bars == null) return;
		
		let i = 0;
		// 全服玩家更新状态
		for(i=0; i<GetMaxPlayers(); i++){
	
			// 定位玩家
			let player = Player.Find(i);
	
			// if(player != null && player.Character.IsSpawned){
	
			// 跳过空玩家，无实体玩家
			if(player == null || player.Character == null) continue;
	

			// 血量更新
			this.bars[player.ID].Progress = player.Entity.Health*(this.HEALTH_RATE);
			
			// 计算颜色
			var color = (player.Entity.Health > this.HEALTHY_LEVEL) ? this.COLORS.HEALTHY : this.COLORS.UNHEALTHY;
			this.bars[player.ID].Color = color;
	
		}
	},
	
	
	
	// 初始化
	init: function(){
		// 容器初始化
		this.bars = new Array(GetMaxPlayers()).fill(null);
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
		this.bars = null;
	},


	// ==== 事件区 ====
	events: {
		// 角色生命值变动
		OnCharacterHealthChange: function( character, oldHealth, newHealth ){

			// 掉血时
			if(newHealth < oldHealth){
				let damage = oldHealth - newHealth;
				// 伤害提示
				Billboard.CreateTips(`血量-${damage}`, character.Pos, 1, 1, false, false);
			}

		},
		
		// 逐帧更新
		OnFrameUpdate: function(deltaTime){
			HealthBar.barsUpdate();
		},
		
		// 玩家退出
		OnPlayerPart: function(player, reason){
			
			HealthBar.bars[player.ID].Remove();
			// help GC（也许吧）
			HealthBar.bars[player.ID] = null;
			
		},
		
		// 玩家角色完成加载
		OnPlayerComplete: function( player ){
			
			HealthBar.newBar(player.Character);
			
		},
		
	},


};

// 加载本文件即刻调用初始化
HealthBar.init();

