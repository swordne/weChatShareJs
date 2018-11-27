#wechatShare.js

#### 公司自用的微信 分享js

还在制作，后续完善......

#####2018年11月27日  
1. 添加了对新版本（客户端版本6.7.3以上和jweixin1.4以上版本）的新分享接口的支持，会自动切换支持版本
2. 添加了api请求接口的配置.

## 使用它

###实例
```html
<!-html->
<script src="/static/libs/wx/jweixin-1.4.0.js"></script>
<script src="/static/demo/k11/js/share.js?v=2"></script>
```
```js
/**
* javascript
*/
let config = {
    sType: true,
    debug: false,
    shareConfig: {
        sTitle: '测试分享标题',
        sDesctiption: '这里是分享的简介',
        sLink: 'http://atools.goosdk.com/demo/k11/debug',
        sImage: 'http://atools.goosdk.com/static/demo/jinmao1013/images/animal.png'
    }
};

let share = new wShare(config);
```

### 回调方法

waiting...

### 配置参数

```js
let config = {
    sType: true, //是否分享
    debug: false, //是否开启debug模式
    //其他组件
    plugins: {
        //预览图片接口
        previewImage
    },
    //请求求口相关配置
    apiConfig: {
        //请求接口地址
        url: '/homepage/wxshare/getSignPackage',
        //分享版本
        version: 'kll'
    },
    //分享相关配置
    shareConfig: {
        //分享的标题
        sTitle: '测试分享标题', 
        //分享的简述
        sDesctiption: '这里是分享的简介',
        //分享的页面地址(必须为授权域名相同的域名下)
        sLink: 'http://atools.goosdk.com/demo/k11/debug',
        //分享的缩略图(同上)
        sImage: 'http://atools.goosdk.com/static/demo/jinmao1013/images/animal.png'
    }
};

let share = new wShare(config);
```

### 组件方法
```js
share.previewImage('ele', 'event', true);
//第三个参数为是否开启相册功能，如果为true，则预览时候，取相同ele组内的图片地址；false则关闭。
```