/**
 * # 世界血条（Billboard）模块  
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
var HealthBar = {
	
	
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
	
	// 距离实体偏移
	OFFSET: Vector(0, 3, 0),
	
	// 进度与血量之比
	HEALTH_RATE: 0.01,
	
	// Billboard类型
	BILLBOARD_TYPE: 2,
	
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
	
	
	// 模块初始化
	init: function(){
		this.bars = new Array(GetMaxPlayers()).fill(null);
		this.register();
	},
	
	// 注册事件
	register: function(){
		
		
		AddListener("OnCharacterHealthChange", ( character, oldHealth, newHealth )=>{

			// 掉血时
			if(newHealth < oldHealth){
				let damage = oldHealth - newHealth;
				// 伤害提示
				Billboard.CreateTips(`血量-${damage}`, character.Pos, 1, 1, false, false);
			}
			
		});
		
		
		
		AddListener("OnFrameUpdate", (deltaTime)=>{
			
			this.barsUpdate();
			
		});
		
		
		AddListener("OnPlayerPart", (player, reason)=>{
			
			this.bars[player.ID].Remove();
			// help GC
			this.bars[player.ID] = null;
			
		});
		
		
		AddListener("OnPlayerComplete", ( player )=>{
			
			this.newBar(player.Character);
			
		});
		
	},


		
		
		
		
};

// 模块初始化
HealthBar.init();

