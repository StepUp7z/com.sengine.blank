# 沙盘引擎-SEngine之空白模组项目

- 创建时间：Jul.24, 2024
- 更新时间：Jul.24, 2024
- 版本：v0.0.1

## 文件结构

### Language

放置语言相关的文件夹。

### Map

放置模组地图的文件夹。

### Script

放置脚本文件的文件夹。

### Space

放置通用文件的文件。里面的文件可用API：ReadFile来读取。

### SaveData

### Store

放置资源的文件夹。

### Cover.png

模组列表的封面与背景图片.

### Icon.ico

启动模组后引擎窗口的图标。

### Mod.json

放置着每个模组的独立配置项的配置文件。通常发布一个版本后不建议轻易修改，同时这也是模组识别的关键因素，此文件应确保存在且有效。  
详细说明：[https://sengine.mp-gamer.com/developer/config/mod_json](https://sengine.mp-gamer.com/developer/config/mod_json)

### Startup.json

它的作用：允许开发者通过GetGlobalVars("Startup")获取此文件内的所有文本（内容只读，且并不限于json文本格式，即使内部是一串诗歌也不会报错）。  

通过此属性的机制，开发者可扩展实现许多前置功能（例如：专用服务端的前置配置，房间名、端口号、房间最大人数等）。  
详细说明：[https://sengine.mp-gamer.com/developer/config/startup_json](https://sengine.mp-gamer.com/developer/config/startup_json)

### jsconfig.json

vscode的配置文件。

### Developer.txt

开发者列表文件。

### Licence.txt

许可证文本文件。

### 类型定义文件(index.d.ts)

**在ide或智能编辑器中可获取智能提示**  

## 相关网址 & 其他信息

### Gitee空白模组项目

<https://gitee.com/zainus-harvey-yip/com.sengine.blank>

### Wiki

[https://sengine.mp-gamer.com](https://sengine.mp-gamer.com)

### Indienova 游戏资料

[https://indienova.com/g/SandtableEngine/presskit](https://indienova.com/g/SandtableEngine/presskit)

### 引擎开发者及工作室信息

[https://sengine.mp-gamer.com/studio](https://sengine.mp-gamer.com/studio)

### 联系我们 & 加入社区

有什么好的创意或者想法吗？非常欢迎联系我们，让我们看到有人在关注！ 我们很愿意聆听你对《沙盘引擎》的想法和建议，欢迎勾搭~  

- E-Mail：<fantasyjoyed@163.com>
- QQGroup：798458058
- Kook：<https://kook.top/o6Ggd1>
- Discord: <https://discord.gg/3xEq9awnxa>
