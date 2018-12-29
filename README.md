# 仿网易云音乐

项目描述：
自制音乐网站。
功能：

1. 后台有上传歌曲、编辑歌曲功能。
2. 前端页面灵感来自网易云音乐。
3. 可在线听歌。且配有播放动画。
用到的技术：
后台：LeanCloud 数据存储 API、七牛上传接口
前端：原生 JS、jQuery、CSS 3、iconfont、SVG、AJAX、MVC

1. open first terminal
```
git clone git@github.com:jerryHZLiang/webMusic.git
cd webMusic
npm install 
npm install http-server -g
http-server -c-1
```
2. open http://127.0.0.1:8080/src/index.html
3. open second terimal
```
cd webMusic
node server 8888
```
4. open http://127.0.0.1:8080/src/admin.html to add or edit songs
