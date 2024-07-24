/**
 * # Main2世界的客户端脚本  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Jul.24, 2024  
 * - 更新时间：Jul.24, 2024  
 * - 版本：v0.0.1  
 * 
 * ## 说明
 * 
 * - Main世界启动主机进入Main2世界，  
 * 读取Main2文件夹中的World（服务端）和Client（客户端）脚本  
 * - 简单演示了变量、常量设置及不推荐的硬编码（直接在代码中使数据而没用变量装存）
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/client/main](https://sengine.mp-gamer.com/scripting/client/main)
 * 
 */

// 本地玩家变量
var localPlayer = null;

// 相机正常角度常量设置
const COMMON_VANGLE = 30;

// =========================== Entity 实体事件 ===================================

// 玩家登录实体事件
function OnPlayerEntityLogin( player, entity )
{
	
    // 本地玩家时
	if(player.IsLocal)
	{
        // 设置本地玩家变量
		if(localPlayer==null) localPlayer = player;

        // 设置相机目标
		Camera.Target = entity;
		
        // 设置相机模式
		//Camera.Mode = 2;
		//Camera.FreeCamera = true;

        // 设置相机偏移
		Camera.Offset = Vector(0, 1.5, 0);

		// 设置相机向前跟随模式开启
		Camera.ForwardMode = true;

        // 设置相机跟随对象的距离，默认为10.0。
		Camera.Distance = 9;
        // 设置相机跟随对象的平滑（移动）间隔速度，默认0.2（数值越小，速度越快）
		Camera.SmoothTime = 0.3;
        // 设置相机跟随对象距离的差值速度，默认为1.0。
        // （设置新的Distance值后多久到达新距离）。
		Camera.DistanceSpeed = 2;

        // 设置相机跟随的上下角度，默认为50.0（举例：设置90.0则为鸟瞰2D视角）。
		Camera.VAngle = COMMON_VANGLE;




	}



}



// =========================== Script 脚本事件 ===================================

// 脚本加载事件
function OnScriptLoad(){
    DLog("Main2世界");
}