class wShare
{

    constructor(options)
    {
        try {
            if (typeof options !== 'object') {
                console.log('配置项错误！');
            } else {
                this.shareConfig = {};
                this.ua = window.navigator.userAgent;

                this.wechatVersion = this.getWechatVersion();

                /* 是否开启调试模式 */
                this.setDebug(options.debug);
                /*if (!options.sType) {
                    this.setHidden();
                } else {
                    this.setOtherPlugin(options);
                    this.setApiList(options);
                    this.setOption(options);
                    this.setShare();
                }*/

                /* 设置调用的api权限列表 */
                this.setApiList(options);
                if (typeof options.plugins === 'object') {
                    /* JSSDK内其他的api接口权限 */
                    this.setOtherPlugin(options.plugins);
                }

                if (options.sType) {
                    /* 设置分享 */
                    this.setShareConfig(options.shareConfig);
                } else {
                    this.setHidden();
                }
            }
        } catch (e) {
            console.log(e);
        }

    }

    setDebug (debug) {
        this.shareConfig.debug = (typeof debug !== "undefined") && debug;
    }

    setApiList (options) {
        this.shareConfig.apiList = [];

        if (options.sType) {
            /*if (this.wechatVersion[1] >=7 && this.wechatVersion[2] >= 2) {
                this.shareConfig.apiList.push('updateAppMessageShareData','updateTimelineShareData');
            } else {
                this.shareConfig.apiList.push('onMenuShareTimeline','onMenuShareAppMessage');
            }*/
            //待bug解决之后启用新接口
            this.shareConfig.apiList.push('onMenuShareTimeline','onMenuShareAppMessage');
        } else {
            this.shareConfig.apiList.push('hideMenuItems');
        }
    }

    setOtherPlugin (plugins) {
        if (plugins.previewImage) {
            this.shareConfig.apiList.push('previewImage');
        }
    }

    setShareConfig (config) {
        this.shareConfig.sTitle = config.sTitle !== undefined ? config.sTitle : document.title;
        this.shareConfig.sDesctiption = config.sDesctiption !== undefined ? config.sDesctiption : document.title;
        this.shareConfig.sLink = config.sLink !== undefined ? config.sLink : location.href;
        this.shareConfig.sImage = config.sImage !== undefined ? config.sImage : this.shareImageSrc();

        this.setShareApi();
    }

    setHidden () {
        let _this = this;
        let ajax = new Ajax();

        ajax.send('get', '/homepage/wxshare/getSignPackage', function(data){

            wx.config({
                debug: _this.shareConfig.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: _this.shareConfig.apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.error(function(e){
                console.log(e);
            });

            wx.ready(function(){
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:appMessage',
                        'menuItem:share:timeline',
                        'menuItem:share:qq',
                        'menuItem:share:weiboApp',
                        'menuItem:favorite',
                        'menuItem:share:facebook',
                        'menuItem:share:QZone',
                        'menuItem:copyUrl',
                        'menuItem:originPage',
                        'menuItem:readMode',
                        'menuItem:openWithQQBrowser',
                        'menuItem:openWithSafari',
                        'menuItem:share:email',
                        'menuItem:share:brand',
                        'menuItem:editTag',
                        'menuItem:refresh',
                        'menuItem:exposeArticle'
                    ]
                });
            });

        });
    }

    shareImageSrc () {
        let obj = document.getElementsByTagName('img')[0];

        if (obj === undefined) {
            return '';
        } else {
            let url = obj.getAttribute('src');
            return this.getImageUrl(url);
        }

    }


    setShareApi () {
        let _this = this;
        let ajax = new Ajax();

        //$.getJSON('/homepage/wxshare/getSignPackage', function(data){
        ajax.send('get', '/homepage/wxshare/getSignPackage',function(data){
            data = JSON.parse(data);

            wx.config({
                debug: _this.shareConfig.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: _this.shareConfig.apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.error(function(e){
                console.log(e);
            });

            wx.ready(function(){
                _this.setShareOptions();
            });

        });
    }

    setShareOptions () {

        //待bug解决之后启用新接口
        //if (this.wechatVersion[1] >=7 && this.wechatVersion[2] >= 2) {
        if (false) {
            //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
            /*wx.updateAppMessageShareData({
                title: this.shareConfig.sTitle,
                desc: this.shareConfig.sDesctiption,
                link: this.shareConfig.sLink,
                imgUrl: this.shareConfig.sImage,
                success: function () {
                    // 设置成功
                }
            });

            //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
            wx.updateTimelineShareData({
                title: this.shareConfig.sTitle,
                link: this.shareConfig.sLink,
                imgUrl: this.shareConfig.sImage,
                success: function () {
                    // 设置成功
                }
            });*/
        } else {
            //朋友圈
            wx.onMenuShareTimeline({
                title: this.shareConfig.sTitle,
                link: this.shareConfig.sLink,
                imgUrl: this.shareConfig.sImage,
                success: function () {

                },
                cancel: function () {

                }
            });

            //给朋友
            wx.onMenuShareAppMessage({
                title: this.shareConfig.sTitle,
                desc: this.shareConfig.sDesctiption,
                link: this.shareConfig.sLink,
                imgUrl: this.shareConfig.sImage,
                type: 'link',
                dataUrl: '',
                success: function () {

                },
                cancel: function () {

                }
            });
        }

    }

    previewImage (ele, event, isAlbum) {
        let imageObject = document.querySelectorAll(ele);
        let imageList = [];
        let _this = this;

        if (isAlbum) {
            for (let i = 0; i < imageObject.length; i++) {
                let _imgSrc = _this.getImageUrl(imageObject[i].getAttribute('src'));

                imageList.push(_imgSrc);
            }
        }
        for (let i = 0; i < imageObject.length; i++) {
            imageObject[i].addEventListener(event, function(){
                let _imgSrc = _this.getImageUrl(imageObject[i].getAttribute('src'));

                if (isAlbum) {
                    wx.previewImage({
                        current: _imgSrc,
                        urls: imageList
                    });
                } else {
                    wx.previewImage({
                        current: _imgSrc,
                        urls: [_imgSrc]
                    });
                }

            });
        }
    }

    getImageUrl (url) {
        let new_src = '';

        if (url === '') {
            return '';
        }

        if (url.indexOf('http://') >= 0) {
            new_src = url;
        } else {
            if (url.substr(0, location.host.length) === location.host) {
                new_src = 'http://' + url;
            } else {
                if (url.substr(0, 1) !== '/') {
                    new_src = location.origin + '/' + url;
                } else {
                    new_src = location.origin + url;
                }
            }
        }

        return new_src;
    }

    getWechatVersion () {
        let ua = this.ua.toLowerCase();
        let _start = ua.indexOf('micromessenger');
        let _end = ua.indexOf('language');

        let _version = ua.substring(_start, _end).replace('micromessenger/', '').split('.');

        if (_version[2].indexOf('(') >= 0) {
            _version[2] = _version[2].substring(0, _version[2].indexOf('('));
        }
        return _version;
    }

}

class Ajax  {
    constructor (xhr) {
        xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        this.xhr = xhr;
    }

    send (method, url, callback, data = '', async = 'async') {
        let xhr = this.xhr;

        xhr.onreadystatechange = () => {
            // readyState: 0: init, 1: connect has set up, 2: recive request, 3: request.. , 4: request end, send response
            if (xhr.readyState === 4 && xhr.status === 200) {
                // status: 200: OK,  404: Not Found Page
                callback(xhr.responseText);
            }
        };

        xhr.open(method, url, async);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        if (data === '') {
            xhr.send();
        } else {
            xhr.send(data);
        }

    }
}