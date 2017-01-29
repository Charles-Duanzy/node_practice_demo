var koa = require('koa');
var xss = require('xss');
var Cookies = require('cookies');

var app = koa();

app.use(function*() {
    var cookies = new Cookies(this.req,this.res);
    var test = cookies.set('user','123');

    var req = this.request;
    console.log(req.method);

    var param = this.query;
    var html1 = '<!DOCTYPE html><html><head><title>test param</title></head><body><span style="color:#ff6600; border:1px solid #ddd;">';
    var html2 = '</span></body></html>';

    function isEmptyObj(obj) {
        for (var i in obj) {
            console.log(i);
            if (i === "") {
                return false;
            }
        }
    }

    var emptyObjStatus = isEmptyObj(param);

    if (!param ||!emptyObjStatus) {
        this.body = html1 + '请输入参数！' + html2;
    } else {
        var arr = [];
        for(var i in param){
            console.log(i);
            console.log(param[i]);
            arr.push(param[i]);
        }
        param = xss(param);
        //防止xss攻击，进行安全过滤
        this.body = html1 + arr + html2;
    }
});

app.listen(3001);

console.log('listening port at 3001');