# NeteaseCloudMusic

#### React Native 模仿网易云音乐手机客户端，兼容安卓和IOS两个平台。

老规矩，先上图~😄

#### 总览 
![全图](https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/total.gif)

#### 音乐播放 
![音乐播放](https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/player.gif)

<!--more-->

#### 视频播放 
![视频播放](https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/video.gif)

#### 歌曲列表 
![歌曲列表](https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/playlist.png)

#### 用户界面 
![用户界面](https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/user.gif)

#### 电台详情
![电台详情](https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/radio.gif)

#### 主要的技术栈和依赖第三方库：

点击名称可跳转相关项目网站😄😄

- [react@16.0.0-alpha.12](https://facebook.github.io/react/)
- [react-native@0.48.2](https://github.com/facebook/react-native)
- [react-native-scrollable-tab-view@0.7.4](https://github.com/skv-headless/react-native-scrollable-tab-view)(可滚动切换tab页面组件)
- [react-native-swiper@1.5.10](https://github.com/leecade/react-native-swiper)
- [react-native-vector-icons@4.3.0](https://github.com/oblador/react-native-vector-icons)(包含很多icon图标)
- [react-native-video@2.0.0](https://github.com/react-native-community/react-native-video)(视频和音频播放器，经调研，最近版的安卓和IOS系统版本可正常使用)
- [react-navigation@1.0.0-beta.11](https://github.com/react-community/react-navigation)(推荐使用的路由库)
- [redux@3.7.2](https://github.com/reactjs/redux)(项目中重点用在播放器相关功能上)
- 其他细节库省略

> ps: 个别插件会存在小bug或冲突。比如安卓平台swiper在scrollable-tab中不能触屏手动滚动。

#### 主要的功能界面模块

> 大部分主要是展示的demo，网易云的页面和功能实在是太多了，由于时间关系，并没有把所有的功能都做完整，后续会陆续加上其他的功能。

- 各部分模块首页展示
- 音乐播放，包括CD动画，歌词同步等。
- MV视频播放
- 个人详情页面
- 其他细节等等

#### 安装运行

> 特别鸣谢：[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 提供全套API。
    运行本项目前请先本地（或服务器）运行此API接口项目,替换/scr/api/index.js 下BASE_URL的ip地址

```
0. 开发环境平台版本：Android-6.0  ios-10.3

1. git clone https://github.com/yezihaohao/NeteaseCloudMusic.git

2. yarn or npm install

3. react-native link 

3. react-native run-ios 或者 react-native run-android
```

#### 总结

react-native上手不难，熟悉react，看react-native文档，看下开源项目就可以开始开发，就是向下兼容比较差，可能这个版本用的别人的组件下个版本就会有bug。

一般展示性的界面比较容易，重点熟悉flex布局，注意默认纵向排列。

动画模块也需要着重了解下，可以提升用户体验。

多了解下其他的第三方组件，有很多别人都写好的，也要看react-native更新文档。

其他细节在开发过程中慢慢体会~~😄😄😄

刚入门react-native，大佬轻喷~~

> 该项目会持续更新~所有使用数据仅供学习交流，并无它意。若有疑问，可加前端QQ群与我交流：264591039


#### License

[MIT License](http://opensource.org/licenses/mit-license.html).
