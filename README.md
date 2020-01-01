## iCanteen - 爱食堂

[![HitCount](http://hits.dwyl.io/TimeGarage/TimeGarage/iCanteen.svg)](http://hits.dwyl.io/TimeGarage/TimeGarage/iCanteen)![stars](https://img.shields.io/github/stars/TimeGarage/iCanteen?color=yellow&style=flat-square)![forks](https://img.shields.io/github/forks/TimeGarage/iCanteen?style=flat-square)![issues](https://img.shields.io/github/issues/TimeGarage/iCanteen?color=red&style=flat-square)![license](https://img.shields.io/github/license/TimeGarage/iCanteen?style=flat-square)

### 项目介绍

爱食堂是一款针对学生和食堂工作人员的微信小程序，后端采用Serverless架构实现。这个项目的设计初衷是建立起食堂和学生沟通的平台，让学生通过评论、点赞、发帖等形式向食堂工作人员提供合理的建议。同时，也让食堂工作人员根据这些信息优化自身服务，推出更符合学生口味的菜品。

### 技术点

- 云存储
- 云函数
- WeUI
- 图片懒加载
- 异步读写

### 运行截图

#### 菜品展示

<img src="./images4md/首页.PNG" alt="img" width="200px" /> <img src="./images4md/菜品评论.PNG" alt="img" width="200px" /> <img src="./images4md/菜品筛选.PNG" alt="img" width="200px" />

#### 交流社区

<img src="./images4md/发帖.PNG" alt="img" width="200px" /> <img src="./images4md/社区.PNG" alt="img" width="200px" /> <img src="./images4md/评论.PNG" alt="img" width="200px" />

#### 我的信息

<img src="./images4md/我的.PNG" alt="img" width="200px" /> <img src="./images4md/我的发贴.png" alt="img" width="200px" /> <img src="./images4md/喜爱菜品.png" alt="img" width="200px" />

### 目录结构

```
├── cloudfunctions     //云函数文件夹
│   ├── addBookmark    //收藏贴子
│   ├── addComment     //贴子评论
│   ├── addMessage     //写入我的消息
│   ├── addPageview    //增加浏览计数
│   ├── addcommentnum  //增加评论计数
│   ├── addcontent     //上传菜品
│   ├── addfav         //点赞
│   ├── changePassword //修改密码
│   ├── clearMessage   //清除消息
├── images4md          //运行截图
└── miniprogram        //小程序文件夹
    ├── assets         //素材文件夹
    │   └── images     //图片素材
    ├── pages          //页面文件夹
    │   ├── addcomment //菜品评论页
    │   ├── category   //菜品分类页
    │   ├── discuss    //交流社区页
    │   ├── index      //首页
    │   ├── menuDetail //菜品详情页
    │   ├── my         //我的信息页
    └── utils          //第三方Javascript函数
        ├── util.js    //工具
        ├── Date.js    //日期格式转换
```

### 联系方式

个人博客：[「少数派报告」](https://www.timegarage.works)

Email：82610725@163.com

WeChat：DalePeng

<img src="./images4md/QR.png" alt="img" width="150px" />





