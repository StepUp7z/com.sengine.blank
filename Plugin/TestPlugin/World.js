
var TestPlugin = {
	
	name: "TestPlugin",
	time: "2024.08.14",
	
	show: function(){
		Message(`name: ${this.name}`);
		Message(`time: ${this.time}`);
	},
	
	init: function(){
		AddListener("OnPlayerCommand", (player, cmd, arg)=>{
			DLog(`TestPlugin拦截到cmd事件：${player.Name}使用${cmd}指令并传参${arg}`);
		});
	},
	
};


TestPlugin.init();

