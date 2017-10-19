/* 
 * 编译模版文件，返回模版对象
 */
// tmplate 正则
var regHtml = /<template[\s]+name=["|'](.*?)["|']\s*?>([\s\S]*?)<\/template>/gi
// style 正则
var regStyle = /<style.*?>([\s\S]*?)<\/style>/gi

var compiler = {
    parse: function (content) {
        var retobj = {
            template: [],
            style: []
        };
        content.replace(regHtml, function (_, _id, str) {
            var content_str = compiler.replaceContent(str);
            var obj = {};
            obj.content = content_str;
            obj.fout = false;
            if (/_out/gi.test(_id)) {
                _id = _id.replace("_fout", "");
                obj.fout = true;
            }
            obj._id = _id;
            retobj.template.push(obj)
        });
        content.replace(regStyle, function (_, str) {
            var obj = {};
            obj.content = str;
            retobj.style.push(obj)
        });

//        console.log(typeof retobj.template, typeof retobj.style);
//        console.log(retobj.template.length, retobj.style.length);
        return retobj;
    },
    miniStyle: function (str) {
        var reg1 = /([{}:])([\s]+)/gi;// > 之后的空格
        var reg2 = /([\s]+)([{}:])/gi;// < 之前
        str = str.replace(/\r\n|\n|\r/g, " ").
                replace(reg1, function (content, _, __) {
                    return _;
                }).
                replace(reg2, function (content, _, __) {
                    return __;
                })
        return str;
    }, replaceContent: function (str) {
        if (str == null) {
            return str;
        }
        var reg2 = />([\s]*?)</gi;// 标签之间的空格
        var reg3 = />([\s]+)/gi;// > 之后的空格
        var reg4 = /([\s]+)</gi;// < 之前
        str = str.replace(/\r\n|\n|\r/g, "\v").
                replace(reg2, function (content, _) {
                    return "><"
                }).
                replace(reg3, function (content, _) {
                    return ">"
                }).
                replace(reg4, function (content, _) {
                    return "<"
                }).
                replace(/'/gi, function (content, _) {
                    return "\\'"
                })
        return str;
    }
}
module.exports.parse = compiler.parse;
module.exports.miniStyle = compiler.miniStyle;
