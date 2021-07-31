# 弹窗封装

将弹窗进行组件的封装
使用的是单例模式


## header
参数 showHeader：boolean  默认不传 || false --> 不显示头部栏
                         true  --> 显示头部栏
    title: String        头部信息

## body
现在中间body默认传的是一个组件 body: component
并给中间组件传值
    successCallback：Function  给中间组件一个事件的回调

## footer
参数 buttons: Array  定义底部的按钮 [{text: ''}]
     butClick0, butClick1, ...... : Function   对应上面按钮的事件，不传默认是close()事件


## 调用栗子
this.$rpPopup.show({})  打开弹窗
this.$rpPopup.close() 关闭弹窗


this.$rpPopup.show({
        showHeader: true,
        title: '测试asiudhfishdfkahsdkjfh',
        showClose: true,
        Body: loginPopup,
        bodyProps: {
          content: '唐朝',
          successCallback: (() => {
            console.log(1)
          })
        },
        buttons: [
          {text: '取消'},
          {text: '确定'}
        ],
        btnClick0: () => {
          console.log(2222)
        }
})
