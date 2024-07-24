/**
 * # Main世界的客户端脚本  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Jul.24, 2024  
 * - 更新时间：Jul.24, 2024  
 * - 版本：v0.0.1  
 * 
 * ## 说明
 * 
 * - 引擎加载模组后自动进入Main世界，  
 * 读取Main文件夹中的World（服务端）和Client（客户端）脚本  
 * - 这里直接开启本地主机进入Main2世界
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/client/main](https://sengine.mp-gamer.com/scripting/client/main)
 * 
 */
// 脚本加载事件
function OnScriptLoad()
{
	// 进连接前禁止聊天
	SetChatEnabled(false);

    // 读取Startup.json文件以获取地图配置
	var Startup = GetGlobalVars("Startup");

	// 以地图配置开启主机，制定脚本（即世界）
	CreateHost(Startup.Map, "Main2");

	return;

}
