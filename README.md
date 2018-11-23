#wechatShare.js

#### 公司自用的微信 分享js

还在制作，后续完善......

## Usage

###Explain
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

### Callbacks

waiting...

### arguments AND functions

```js
let config = {
    sType: true, //是否分享
    debug: false, //是否开启debug模式
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
share.previewImage('ele', 'event', true);
//第三个参数为是否开启相册功能，如果为true，则预览时候，取相同ele组内的图片地址；false则关闭。
```