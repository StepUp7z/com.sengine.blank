/**
 * # Main2世界的服务端指令脚本  
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
 * - 简单演示指令表的实现
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting](https://sengine.mp-gamer.com/scripting)
 * 
 */

// 指令表：同时也是个对象
var Commands = {};

// 加入指令：help
Commands.help = function(player, args){
    // 一行显示个数
    let cols = 5;
    // 统计指令个数
    let i = 0;
    // 一行输出字符串
    let helpString = "服务端指令\n=>";
    player.Message(helpString);
    helpString = "";

    // 遍历表键名
    for(let k in Commands){
        // 计数
        i++;
        // 拼接
        helpString += k + ", ";

        // 行满判断
        if(i%cols==0){
            // 输出
            player.Message(helpString);
            // 清空
            helpString = "";
        }

    }

    // 遍历结束，输出未输出内容，清除末尾空格和逗号
    if(helpString != "") player.Message(helpString.substring(0, helpString.length-2));
    player.Message(`=>\n共有${i}个指令`);

}

// 加入指令：getpos
Commands.getpos = function(player, args){
    // 输出玩家实体位置
    player.Message(`${player.Entity.Pos}`);
}

// 加入指令：exec
Commands.exec = function(player, arg){
    // 传参判空
	if(arg == null) return;

    // try-catch结构捕获异常
	try{
		Exec(arg);
		player.Message("Exec: " + arg.length);
	}catch(e)
	{
		player.Message("Exec Error: " + e);
	}
};

