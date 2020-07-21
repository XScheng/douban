使用微信开发者工具,进行豆瓣电影的小程序制作.

演示了如何上手使用云开发的三大基础能力：

- 数据库：在云数据库里创建存储电影详情和喜欢的电影列表集合.
- 文件存储：通过方法,将文件存储在云存储中.
- 云函数：创建电影列表和电影详情的2个云函数.
1.豆瓣电影数据接口地址:http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=()&count=(),其中start和count值可自己定义,只写数值,括号不用写.
2.每个电影详情接口地址:http://api.douban.com/v2/movie/subject/()?apikey=0df993c66c0c636e29ecbb5344252a4a,其中括号里写电影id地址,只写数值,括号不用写.

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

