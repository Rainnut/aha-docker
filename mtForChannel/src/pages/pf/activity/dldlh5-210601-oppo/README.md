# heytap-appoint-sdk-0.0.1

## 互娱项目 SDK 功能说明

### 目录

- 接入步骤
- SDK api 说明
- Demo 展示

## 1 接入步骤

cp 整个接入分为三个大的阶段步骤：

1.技术接入阶段

2.资源包提审阶段

3.发布阶段与另行说明

## 1.1 技术接入阶段

该阶段主要的目的是进行技术对接。由我方提供开发版大厅 apk，用于 cp 技术层面接入和联调示例。

```javascript
<script src="./oppo-appoint-sdk-0.0.1.js"></script>
```

SDK 接口的详细使用教程您可以查看 **2.0 SDK 说明**

## 1.2 资源包提审阶段

cp 提供的功能和开发版 SDK 联调好后 , 进入提审阶段 , 需要根据我方运营文档向我方运营提供上报参数和上报类型，例如 : 是否已经 PV 埋点，CP 提供产品包名(ID)，自定义上报数据的字段等...**整理成 excel 文档并由运营人员进行审核通过 。**

以下 excel 表格仅供参考 :

![rBAoMGCaSrGAcfLhAAC0DlTJnQE928](README.assets/rBAoMGCaSrGAcfLhAAC0DlTJnQE928.png)

## 1.3 发布阶段与另行说明

添加对应的方法&参数成功后 , 对应的方法&参数将有相对应的网页 log 或者 alert 窗口提示 。 例如弹窗提示:`上报自定义参数成功! 自定义参数:Hi`

## 2.0 SDK api 说明

### 2.1 heytap.stats

#### 数据上报

示例：

```javascript
heytap.stats(type [,text]);
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | --- |
| type | <code>Number</code> | 埋点类型 | 必传 |
| text | <code>String</code> | 埋点具体参数 | 非必传 |

其中 type 包含 8 个类别，具体取值说明如下：

| type | 示例                                              | 说明                                                                                            |
| ---- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1    | heytap.stats(1)                                   | 用于统计活动入口的访问量 , **必传 , 请在首页添加**                                              |
| 2    | heytap.stats(2 , 'com.pop.nearme.gamecenter')     | 用于统计 APP 下载成功后的数据, "com.pop.nearme.gamecenter"为当前应用的包名                      |
| 3    | heytap.stats(3 , 'com.pop.nearme.gamecenter')     | 用于统计打开 APP 应用时的数据, "com.pop.nearme.gamecenter"为当前应用的包名                      |
| 4    | heytap.stats(4)                                   | 用于统计参与活动次数                                                                            |
| 5    | heytap.stats(5 , 'pv-login')                      | 用于自定义数据埋点, "pv-login"为当前自定义数据的上报字段                                        |
| 6    | heytap.stats(6 , 'com.pop.nearme.gamecenter')     | 用于统计奖品列表中应用下载后的数据, "com.pop.nearme.gamecenter"<br />为当前应用的包名           |
| 7    | heytap.stats(7 , 'com.pop.nearme.gamecenter')     | 用于统统计奖品列表中应用打开后的数据, "com.pop.nearme.gamecenter"<br />为当前应用的包名         |
| 8    | heytap.stats(8 , '[com.oppo.test,com.oppo.test]') | 用于统计下载列表应用曝光后的数据, "[com.oppo.test,com.oppo.test]"为<br />当前列表应用的包名集合 |

### 2.2 heytap.isAppReserved

#### 是否已预约

示例：

```js
heytap.isAppReserved(appId);
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | --- |
| appId | <code>Number</code> | 需要预约的 APP 应用 ID| 必传 |

输出:
| 返回类型 | 说明 |
| --- | --- |
| <code>Boolean</code> | 返回对应 ID 的预约状态|

### 2.3 heytap.appoint

#### 预约游戏

示例：

```javascript
heytap.appoint(appId [,callback]);
```

参数:

| 参数     | 参数类型              | 说明                   | 是否必选 |
| -------- | --------------------- | ---------------------- | -------: |
| appId    | <code>Number</code>   | 需要预约的 APP 应用 ID |     必传 |
| callback | <code>Function</code> | 成功后的回调方法       |     必传 |

### 2.4 heytap.openGameBbsBoard

#### 跳转到游戏论坛板块

示例：

```js
heytap.openGameBbsBoard(borderId);
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | --- |
| borderId | <code>Number</code> | 需要打开论坛的板块 ID | 必传 |

### 2.5 heytap.openGameBbsPost

#### 跳转到游戏论坛的帖子详情

示例：

```js
heytap.openGameBbsPost(postId);
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | --- |
| postId | <code>Number</code> | 需要打开帖子的帖子 ID | 必传 |

### 2.6 heytap.getAppStatus

#### 获取 APP 当前的状态

示例：

```js
heytap.getAppStatus({ packageName, pid });
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | :-- |
| packageName | <code>String</code> | 包名 | 必传 |
| pid | <code>Number</code> | versionId 或 pid | 可传空字符串 |

输出:
| 返回参数 | 参数类型 | 说明 |
| --- | --- | --- |
| status | <code>String</code> | 客户端返回的状态|
| btnText | <code>String</code> | 按钮文字文案(可设置对应 UI 文案)|
| event | <code>String</code> | 点击按钮后对应的事件|
| appInstallStatus | <code>String</code> | APP 当前的状态|

### 2.7 heytap.openAppDetail

#### 打开 APP 详情界面(跳转 oppo 游戏中心进行下载)

示例：

```js
heytap.openAppDetail(masterId);
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | --- |
| masterId | <code>Number</code> | appId | 必传 |

### 2.8 heytap.openApp

#### 打开 APP

示例：

```js
heytap.openApp(packageName);
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | --- |
| packageName | <code>String</code> | 包名 | 必传 |

### 2.9 heytap.downloadOrOpenApp

#### 下载或者打开 App(可在当前页进行下载打开)

示例：

```js
heytap.downloadOrOpenApp({ packageName, masterId, pid });
```

参数:
| 参数 | 参数类型 | 说明 | 是否必选 |
| --- | --- | --- | --- |
| packageName | <code>String</code> | 包名 | 必传 |
| masterId | <code>Number</code> | appId | 必传 |
| pid | <code>Number</code> | versionId 或 pid | 可传空字符串 |



### 3. demo 展示

#### 3.1 初始化上报---初始化时必传埋点

```js
  <script>
       setTimeout(function () {
          heytap.stats(1);//上报PV埋点
          heytap.stats(5,"activity");//上报自定义数据，activity-自定义上报定义的字段；
         }, 0);
   </script>
```

#### 3.2 自定义上报---根据自定义事件按需添加

```js
heytap.stats(5, "one"); //上报自定义数据 数据:one

heytap.stats(5, "two"); //上报自定义数据 数据:two

heytap.stats(5, "three"); //上报自定义数据 数据:three
```

#### 3.3 预约活动---根据预约需求按需添加

```js
let isAppReserved = heytap.isAppReserved(123456);
if (!isAppReserved) {//未预约进行预约
  heytap.appoint(123456, function () {
   console.log("处理已预约成功的业务!");
  }); 
    return false;
}
 console.log("处理已预约成功的业务!");
```

#### 3.4 跳转到游戏论坛板块

```js
heytap.openGameBbsBoard(123456);
```

#### 3.5 跳转到游戏论坛的帖子详情

```js
heytap.openGameBbsPost(123456);
```

#### 3.6 获取 APP 当前的状态

```js
let params = {
  packageName: "kaixinxiaoxiaole", //包名
  masterId: 123456, //appId
  pid: "", //versionId
};
let status = heytap.getAppStatus(params);
```

#### 3.7 根据获取的 APP 当前的状态,打开 App 或者跳转到 oppo 对应平台进行下载和打开

```js
let params = {
  packageName: "kaixinxiaoxiaole", //包名
  masterId: 123456, //appId
  pid: "", //versionId
};

let status = heytap.getAppStatus(params);

if (status.appInstallStatus == "installed") {
  //已安装,打开对应APP
  heytap.openApp(params.packageName);
} else {
  //未安装,跳转到oppo对应平台进行下载
  heytap.openAppDetail(params.masterId);
}
```

#### 3.8 根据获取的 APP 当前的状态,在当前页安装和打开 APP

##### 3.8.1 点击下载时

```js
let params = {
  packageName: "kaixinxiaoxiaole", //包名
  masterId: 123456, //appId
  pid: "", //versionId
};
let timer;
heytap.downloadOrOpenApp(params);
const status = heytap.getAppStatus(params); //获取APP下载状态
if (timer || ["installed", "pause"].includes(status.appInstallStatus)) {
  //清除实时获取APP下载的进度的定时器
  clearInterval(timer);
}
if (["download", "none", "pause"].includes(status.event)) {
  //实时获取APP下载进度
  timer = setInterval(() => {
    const obj = heytap.getAppStatus(params);
    console.log("返回下载进行状态", obj);
    if (["installed", "pause"].includes(obj.appInstallStatus)) {
      //如果已安装或者暂停时清除定时器
      clearInterval(timer);
    }
    //在这里获取返回的obj.appInstallStatus/或根据返回的obj.btnText直接设置按钮下载中的状态,
    //downloading--设置 [下载中] UI;(可以设置文案为下载中,或者设置下载进度百分比)
    //installing-- 设置 [安装中] UI;
    //installed--  设置 [ 打开 ] UI;
    //pause--      设置 [ 继续 ] UI

    //如:下边设置-样例---可以改变按钮文案,状态图片等
    let btnNode = document.querySelector(".btn-demo");
    btnNode.innerHTML = obj.btnText;
  }, 1000);
}
```

##### 3.8.2 初始化进入页面获取 APP 下载状态

```js
let initTimer;
//初始化时获取app的状态-是已下载,未下载,还是下载中等状态
setTimeout(() => {
   let params = {
      packageName: "kaixinxiaoxiaole", //包名
      masterId: 123456, //appId
      pid: "", //versionId
   };
  const obj = heytap.getAppStatus(params);
  console.log("初始化获取状态", obj);
  if (["uninstall", "installed", "pause", "waitUpdate"].includes( obj.appInstallStatus)){
    // 在这里获取返回的obj.appInstallStatus/或根据返回的obj.btnText直接设置按钮下载中的状态,
    //uninstall-设置 [安装] UI;
    //installed-设置 [打开] UI
    //pause    -设置 [继续] UI

    //如:下边设置-样例---可以改变按钮文案,状态图片等
    let btnNode = document.querySelector(".btn-demo");
    btnNode.innerHTML = obj.btnText;
  } else if ( ["downloading", "installing", "waiting"].includes(obj.appInstallStatus)){
    initTimer = setInterval(() => {
      const obj = heytap.getAppStatus(params);
      console.log("初始化正在下载中,安装中等待中", obj);
      if (["installed", "pause"].includes(obj.appInstallStatus)) {
        //如果已安装,或者暂停时清除定时器
        clearInterval(initTimer);
      }
      // 在这里获取返回的obj.appInstallStatus/或根据返回的obj.btnText直接设置按钮下载中的状态,
      //downloading--设置 [下载中] UI;可以设置文案为下载中,或者设置下载进度百分比
      //installing-- 设置 [安装中] UI;
      //waiting--    设置 [等待中] UI;
      //installed--  设置 [ 打开 ] UI;

      //如:下边设置-样例---可以改变按钮文案,状态图片等
      let btnNode = document.querySelector(".btn-demo");
      btnNode.innerHTML = obj.btnText;
    }, 1000);
  } else {
    console.log("未知状态", obj);
  }
}, 0);
```
