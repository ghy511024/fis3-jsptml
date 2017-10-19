
module.exports = function (content, file, settings, opt) {

    content = replaceImport(content.toString());
    var tmp_header = require("./lib/tmp_header.js")// 输出模版字符串
    var tmp_body = require("./lib/tmp_body.js")// 输出模版字符串
    var compiler = require("./lib/compiler.js")

    var ret_str = "";
    var outtmp = compiler.parse(content);
//    处理html 模版
    for (var i in outtmp.template) {
        var tmp = outtmp.template[i];
        if (tmp.fout) {
            ret_str = ret_str + "\n//begin insert static dom";
            ret_str = ret_str + "\nTPL.addNode('" + tmp.content + "')";
        } else {
            ret_str += tmp_body().replace("##TMP_KEY##", tmp._id).replace("##TMP_VALUE##", tmp.content)
        }
    }

//    处理 style 样式
    // style
    outtmp.style.forEach(function (item, index) {
        if (!item.content) {
            return;
        }

        // empty string, or all space line
        if (/^\s*$/.test(item.content)) {
            return;
        }
        // console.log("开始编译", item.content)
        // css也采用片段编译，更好的支持less、sass等其他语言
        var styleContent = fis.compile.partial(item.content, file, {
            ext: item.lang || 'scss',
            isCssLike: true
        });

        styleContent = compiler.miniStyle(styleContent);
//         console.log("ghy:", styleContent);
        ret_str = ret_str + "\n//begin insert style";
        ret_str = ret_str + "\nTPL.addStyle('" + styleContent + "')";
        return;

//默认内联 这一版 不执行以下代码
        var styleFileName, styleFile;
//
        if (outtmp.style.length == 1) {
            styleFileName = file.realpathNoExt + '.scss';
        } else {
            styleFileName = file.realpathNoExt + '-' + index + '.scss';
        }
//
        styleFile = fis.file.wrap(styleFileName);
//
        styleFile.cache = file.cache;
        styleFile.isCssLike = true;
        styleFile.setContent(styleContent);

        fis.compile.process(styleFile);

//        console.log("links" + styleFile.links, styleFile.getId())
        //        
        styleFile.links.forEach(function (derived) {
            file.addLink(derived);
        });
        file.derived.push(styleFile);
        file.addRequire(styleFile.getId());
    });

    ret_str = tmp_header() + ret_str;
    return ret_str;
}
function replaceImport(str) {
    var reg1 = /<%@.*?%>/gi;// jsp 标签引用

    str = (str || "").replace(reg1, "");
    return str;
}