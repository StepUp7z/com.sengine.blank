/**
 * # Main2世界的客户端指令脚本  
 * 
 * - 作者：VEGETAZ  
 * - 创建时间：Aug.14, 2024  
 * - 更新时间：Aug.14, 2024  
 * - 版本：v0.0.1  
 * 
 * ## 说明
 * 
 * - Main世界启动主机进入Main2世界，  
 * 读取Main2文件夹中的World（服务端）和Client（客户端）脚本  
 * - 简单演示指令表的实现：此处为客户端，故指令加上'c'前缀表client
 * - 详细说明（Wiki）[https://sengine.mp-gamer.com/scripting](https://sengine.mp-gamer.com/scripting)
 * 
 */

// 指令表：同时也是个对象，此处客户端加载的对象与服务端上下文环境完全分离（此脚本在玩家电脑运行）
var Commands = {};

// 加入指令：chelp
Commands.chelp = function(args){
    // 一行显示个数
    let cols = 5;
    // 统计指令个数
    let i = 0;
    // 一行输出字符串
    let helpString = "客户端指令\n=>";
	// 客户端的Message仅对本地用户生效
    Message(helpString);
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
            Message(helpString);
            // 清空
            helpString = "";
        }

    }

    // 遍历结束，输出未输出内容，清除末尾空格和逗号
    if(helpString != "") Message(helpString.substring(0, helpString.length-2));
    Message(`=>\n共有${i}个指令`);

}

// 加入指令：cgetpos
Commands.cgetpos = function(args){
    // 输出玩家实体位置
    Message(`${Player.Local.Entity.Pos}`);
}


Commands.testvig = function(arg){


	if(arg == null || arg == "") return;

	Message(`arg: ${arg}`);

	Camera.Vignette = parseFloat(arg);

	Camera.VignetteColor = Color(30, 170, 70);
	
	Message(`Vigenette Set to: ${arg}`);
	
	
};


// 加入指令：cexec
Commands.cexec = function(arg){
    // 传参判空
	if(arg == null) return;

    // try-catch结构捕获异常
	try{
		Exec(arg);
		Message("CExec: " + arg.length);
	}catch(e)
	{
		Message("CExec Error: " + e);
	}
};

