/**
 * # Main2世界的服务端脚本  
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
 * - 简单演示了引入外部文件的操作
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting/world/main](https://sengine.mp-gamer.com/scripting/world/main)
 * 
 */

// =========================== Script 脚本事件 ===================================

function OnScriptLoad(){

    // 加载外部脚本
    LoadScript("Commands.js");

    DLog("Main2 World 1");

}