# 项目地址 

https://github.com/aakqaj/TMWebNovelHidener

## 开发环境

`Node.js 14+`

`npm or yarn`

## 修改配置文件

先在 Chrome 浏览器管理扩展程序页 `chrome://extensions/` 内，点击油猴插件详情，打开允许访问文件网址选项。

然后修改开发环境油猴头文件信息：[`config/dev.meta.json`](config/dev.meta.json) 内下述代码改为自己存放项目的文件路径。

```json
"require": ["file://<你的文件路径>/dist/projectname.dev.user.js"]
```

> 油猴头文件默认配置在 [`config/common.meta.json`](config/common.meta.json)，按需修改。

## 启动项目

安装依赖：`npm install` or `yarn install`

VSCode 内 `ctrl + shift + B` 选择 `start & dev`

> `ctrl shift B` 选择 `start & dev` 实际运行了两个命令，单独运行也可以：
>
> - `npm run start` devServer 提供 web 服务和网页热刷新功能
>
> - `npm run dev` 生成脚本，让 tampermonkey 使用

### 自动安装脚本：

第一次启动项目时，将会自动安装油猴脚本，但安装完要去编辑器内把头文件以外的内容删除，不然会运行两次脚本。（操作：选中并剪切头文件->然后全选->粘贴，覆盖掉其它内容）

# 使用

复制dist目录下的 hidener.user.js 文件.如果出现

```sh
## Warning: Don’t paste code into the DevTools Console that you don’t understand or haven’t reviewed yourself. This could allow attackers to steal your identity or take control of your computer. Please type ‘allow pasting’ below to allow pasting.
```

在控制台使用 ctrl + shift + p  或 command + shift + p 在输入框输入 allow pasting 回车.在刷新网页粘贴代码即可.

推荐使用油猴安装脚本 
https://greasyfork.org/zh-CN/scripts/487296-webnovalhindener

功能

```typescript
// 快捷键
shift + 空格 隐藏/替换
shift + f 显示搜索
左箭头 上一页
右箭头 下一页

支持txt小说解析
解析规则如下
const Regex = /^.*(楔子|序章|序言|序|引子|第[零一二三四五六七八九十百千0123456789]+[章卷节].*)$/gm;
如果遇到解析错误的可以尝试修改此段代码
```





## 参考项目及其文档

https://github.com/Eished/tampermonkey-template
