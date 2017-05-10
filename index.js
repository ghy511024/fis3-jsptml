
module.exports = function (content, file, settings, opt) {

    var reg = /<tmplate[\s]+name=["|'](.*?)["|']\s*?>([\s\S]*?)<\/tmplate>/gi
    content = replaceImport(content);
    var tmp_header = require("./lib/tmp_header.js")// 输出模版字符串
    var tmp_body = require("./lib/tmp_body.js")// 输出模版字符串
    var ret_str = content.replace(reg, function (_, _id, str) {
        var content_str = replaceContent(str);
        var tmp_str = tmp_body().replace("##TMP_KEY##", _id).replace("##TMP_VALUE##", content_str)
        return tmp_str;
    })
    ret_str = tmp_header() + ret_str;
    return ret_str;
}
function replaceImport(str) {
    var reg1 = /<%@.*?%>/gi;// jsp 标签引用
    str = str.replace(reg1, "");
    return str;
}
function replaceContent(str) {
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