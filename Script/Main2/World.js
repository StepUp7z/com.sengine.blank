/**
 * # Main2世界的服务端脚本  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Jul.24, 2024  
 * - 更新时间：Aug.14, 2024  
 * - 版本：v0.0.2  
 * 
 * ## 说明
 * 
 * - Main世界启动主机进入Main2世界，  
 * 读取Main2文件夹中的World（服务端）和Client（客户端）脚本  
 * - 简单演示了引入外部文件的操作
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/world/main](https://sengine.mp-gamer.com/scripting/world/main)
 * 
 */

// =========================== Script 脚本事件 ===================================
// 脚本加载事件
function OnScriptLoad(){

    // 加载外部脚本：获取Commands对象
    LoadScript("Commands/World.js");
	
	// 根据JSON设置本服最大玩家数
	var Startup = GetGlobalVars("Startup");
	SetMaxPlayers(Startup.MaxPlayers);

}

// =========================== Player 玩家事件 ===================================
// 玩家完成加载事件
function OnPlayerComplete( player )
{

	// 创建角色并绑定
    // 创建角色：类型，位置，角度
	let chara = Character.Create(0, Vector(0, 0, 0), 0);
    // 绑定实体：角色实例，玩家断开连接是否销毁实体
	player.SetEntity(chara, false);

}

// 玩家输入指令事件
function OnPlayerCommand(player, cmd, args){
    // 指令统一转小写
    cmd = cmd.toLowerCase() + "";

    // 是否存在于指令表判断
    if(!(cmd in Commands)){
        return Message("没有这个指令! 使用 /help 来查看服务端所有指令！");
    }

    // O(1)复杂度定位
    return Commands[cmd](player, args);

}