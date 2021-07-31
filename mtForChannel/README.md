# mt

> 适用于移动端前端需求

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目使用范围
- 单页面适用的需求，对eso无特殊要求的
- 长期使用的移动端需求
- 具有一定耦合度的需求

## 项目结构
- components 放置根据业务场景分类的组件
- utils 自定义js工具库，例如统一的接口请求类
- libs 第三方js工具库
- pages 页面，按域名分类（et：export，非37域名的；pf：platform，37域名的）

#### 1. components内容说明
文件夹名 | js文件 |  用途 
---|---|---|---
login | ptLogin.js| 37平台登录组件
sudokuLottery | sudokuLottery.js | 九宫格抽奖
barDownload | barDownload.js | 顶部栏/底部栏
(以功能分类） | （以场景+动作 为命名规范，例如 wxLogin / qqShare） | 示例
##### 1.1 九宫格抽奖
1. 功能
   适用于八种奖品环绕抽奖按钮，跑马灯形式的抽奖方式

2. 传入参数

   ```javascript
   sudokulottery: {
      // 抽奖设置
      config: {
        first: 1, // 起点位置,
        speed: 200, // 方格间跳转的速度（ms）
        times: 3, // 转动圈数
        terminus: 8, // 中奖位置（1 - 8）
        canILot: false // 是否可抽奖
      },
      // 奖品设置
      prize: {
        width: '1.95rem', // 单个方格宽度
        height: '1.95rem', // 单个方格高度
        normalPath: require('./images/prize.png'), // 未选中状态奖品 Spirit 图
        hoverPath: require('./images/prizeHover.png'), // 选中状态奖品 Spirit 图
        prizeList: [{ 
          backgroundImage: require('./images/prize.png'), // 背景图片
          backgroundPosition: '0rem 0rem', // 基于雪碧的位置
          top: '0rem', // 绝对定位
          left: '0rem' // 绝对定位
        },{},{},{},{},{},{},{}] // 需设置八个奖品，顺时针环绕型排布
      },
      // 中间按钮设置
      button: {
        width: '1.93rem', // 按钮宽度
        height: '1.93rem', // 按钮高度
        normalPath: require('./images/lotterybutton.png'), // 可抽状态图
        hoverPath: require('./images/lotteryGray.png'), // 不可抽状态图
        top: '2.04rem', // 绝对定位
        left: '2.04rem' // 绝对定位
      }
     },
   ```

3. 事件绑定和示例
   ```javascript
   <sudokulottery class="sudokuLottery"
   ref="sudokulottery"
   :sudokulottery="sudokulottery"
   v-on:clickState="getClickState"
   v-on:sudokulotteryState="getSudokulotteryState"
   ></sudokulottery>

   /**
    * @params {Boolean} clickState
    * @desc 点击按钮后回调函数
    * clickState: true 为已点击
    */
   getClickState: function (clickState) {
       if (clickState) {
           // 执行抽奖动画函数
           this.$refs.sudokulottery.lottery()
       }
   }
   /**
    * @params {Boolean} sudokulotteryState
    * @desc 抽奖动画执行完回调函数
    * sudokulotteryState.isLotted: true 为已抽奖
    */
   getSudokulotteryState: function (sudokulotteryState) {}
   ```
#### 1.2 顶部/底部栏

1. 功能

   适用于带有游戏logo，名称，描述以及下载地址的悬浮栏

2. 传入参数

   ```javascript
   bardownload: {
      title: '霸业之巅，命不由天', // 标题
      desc: '独家代金券，下载即抽大奖', // 描述
      logoImagePath: require('./images/logo.png'), // logo 
      buttonImagePath: require('./images/download2.png'), // 下载按钮
      logoLink: '', // logo 点击跳转地址
      buttonLink: '', // 按钮下载跳转地址
      style: {
        titleColor: '#ffe29d' // 标题颜色
      }
    },
   ```
3. 事件绑定和示例
   ```javascript
   <bardownload class="bardownload"
   :bardownload="bardownload"
   v-on:logoState="getLogoState"
   v-on:barState="getBarDownloadState"
   ></bardownload>

   /**
    * @params {Boolean} logoState
    * @desc 点击 logo 回调函数
    * barState: true 已点击下载按钮
    */
   getLogoState: function (logoState) {}
   /**
    * @params {Boolean} barState
    * @desc 点击下载回调函数
    * barState: true 已点击下载按钮
    */
   getBarDownloadState: function (barState) {}

   ```

#### 2. utils内容说明

js文件名 | 功能 | 
---|---|---
api.js | 放置接口api地址 |
rem.js | 移动端页面自适应 |
wxShare.js | 微信分享（朋友、朋友圈）文案以及图片配置 |
#### 2.1 api
* 命名规范

  参照wiki文档[接口文档](https://37wiki.37wan.com/pages/viewpage.action?pageId=12248067#H5%E6%B8%A0%E9%81%93%E6%8E%A5%E5%85%A5%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-7%E6%B8%B8%E6%88%8F%E5%88%9B%E5%BB%BA%E8%A7%92%E8%89%B2%E6%95%B0%E6%8D%AE%E4%B8%8A%E6%8A%A5)

* 命名示例

  ```javascript
  // 官网活动相关文档
  websiteActivity: {
    // 推广活动
    promotionActivity: {
      ipFrequency: 'http://act-api.37.com.cn/Pt/IpFrequency' // IP频率限制
    }
  }
  ```

#### 2.2 rem.js

* 示例

  ```javascript
  import rem from '@/utils/rem.js'
  created() => {
      rem.rem.rePositionHorizon(720) // 水平自适应，不传默认750
      rem.rePositionVertical(1334) // 高度自适应，不传默认750
  }
  window.onresize = function () {
      rem.rem.rePositionHorizon(720) // 水平自适应，不传默认750
      rem.rePositionVertical(1334) // 高度自适应，不传默认750
  }
  ```

#### 2.3 wxShare.js
* 示例
微信对接文档[接口文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
  ```javascript
  // function 引入
  import { share } from '@/utils/wxShare.js'
  // 调用示例
  share({
    desc: "周年庆老用户专题，多重奖励邀你回归。", // 分享的简介
    picUrl: $("#share").attr("src"),  // 分享的icon
    title: "《永恒纪元》王者归来，全服狂欢",  // 分享标题
    url: location.href  // 点击后打开的链接
  });
  ```
#### 3. libs内容说明

js文件名 | 功能 | 
---|---
jquery.js | js库

#### 4. pages内容说明
文件夹名 | vue文件名 |  用途 | 
---|---|---
et| a.vue| 非三七域名下
(以功能分类） | （以场景+动作 为命名规范，例如 wxLogin / qqShare） | 示例

#### 5. 引入的插件功能
库名称 | 用途 | 文档
---|---|---
vue-jsonp | jsonp请求 | 
qrcode | 生成二维码 | https://www.npmjs.com/package/qrcode
vue-layer | 弹窗 | https://www.npmjs.com/package/vue-layer
