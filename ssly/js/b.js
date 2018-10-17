!function () {
    var j = document.createElement("ins");
    j.id = "newBridge";
    if (document.getElementById(j.id)) {
        return
    }
    var b = [{
        "inviteBox": {
            "skinIndex": 4,
            "startPage": 1,
            "customerStyle": {"acceptFontColor": "#000000", "backImg": "", "acceptBgColor": "#fecb2e"},
            "skinName": "财富之路",
            "autoHide": 0,
            "reInvite": 1,
            "sendButton": {"bgColor": "#bfecff", "fontColor": "#1980df"},
            "isShowText": 1,
            "skinType": 1,
            "buttonType": 1,
            "autoInvite": 0,
            "stayTime": 5,
            "width": 311,
            "closeTime": 20,
            "isCustomerStyle": 0,
            "position": "right-bottom",
            "inviteInterval": 50,
            "welcome": "<p style=\"color: #fff\">欢迎来到本网站，点击礼品多多</p>",
            "height": 141
        },
        "isWebim": 1,
        "pageId": 0,
        "seekIcon": {
            "customerStyle": {"backImg": ""},
            "skinIndex": 0,
            "skinName": "青春靓丽",
            "groups": [{"groupName": "示例分组1", "groupId": 108614}],
            "displayLxb": 1,
            "marginLeft": 0,
            "skinType": 1,
            "isFixedPosition": 1,
            "iconType": 0,
            "isCustomerStyle": 2,
            "width": 190,
            "groupStyle": {"bgColor": "#ffffff", "buttonColor": "#d6f3ff", "fontColor": "#008edf"},
            "position": "right-center",
            "marginTop": 0,
            "height": 151
        }
    }], l = {
        "eid": "22745792",
        "queuing": "<p>欢迎光临！您已经进入服务队列，请您稍候，马上为您转接您的在线咨询顾问。</p>",
        "authToken": "bridge",
        "isWebim": 1,
        "userId": "22745792",
        "platform": 0,
        "route": "1",
        "webimConfig": {"skinIndex": 0, "skinType": 1},
        "siteId": "10261423",
        "online": "true",
        "authType": 4,
        "bid": "",
        "webRoot": "//p.qiao.baidu.com/cps2/",
        "timestamp": 1526815052397
    }, m = [];

    function h() {
        var p = window.location.href, o = 0, n = null;
        if (m) {
            for (var i = 0, g = m.length; i < g; i++) {
                if (m[i].url === p || -1 < p.indexOf(m[i].url)) {
                    o = m[i].pageId;
                    break
                }
            }
        }
        l.pageId = o;
        i = 0;
        for (g = b.length; i < g; i++) {
            if (b[i].pageId === o) {
                f = b[i].webimConfig;
                l.webimConfig = {skinIndex: f.skinIndex, skinType: f.skinType};
                return b[i]
            }
            0 === b[i].pageId && (n = b[i])
        }
        return n
    }

    j.config = h(), j.siteConfig = l, j.startTime = +new Date;
    j.deferOnce = {
        on: function (e) {
            this.done ? e() : this.callback = e
        }, emit: function () {
            this.callback ? this.callback() : (this.done = true)
        }
    };
    var k = document.getElementsByTagName("script")[0];
    k.parentNode.insertBefore(j, k);

    function c() {
        if (document.body) {
            document.body.insertBefore(j, document.body.firstElement || null);
            j.deferOnce.emit()
        } else {
            setTimeout(c, 0)
        }
    }

    c();
    var d = document.createElement("script");
    d.src = "//sgoutong.baidu.com/embed/1525933466/asset/embed/pc_nb.js", d.setAttribute("charset", "UTF-8");
    var a = document.getElementsByTagName("head")[0] || document.body;
    a.insertBefore(d, a.firstElement || null)
}(this);