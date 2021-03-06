# fis3-jsptpl


## 说明
git地址 [https://github.com/ghy511024/fis3-jsptpl](https://github.com/ghy511024/fis3-jsptpl)


这插件主要是基于fis3平台下编译js 语法的模版文件的编译插件，产出为成一个单独的js文件，适用于辅助 弹窗，轮播，滚动条这种小插件开发
插件所包含的 html,js,css 最终都存在于一个js文件中，方便第三方使用。
对于开发插件本身来说，在模版中可以使用jsp taglib 语法的模版引擎，并且可以在文件中写scss 语法，让组件的二次开发和维护变得简单

此插件为fis3后端编译插件，只做将模版和样式转换为js 函数，模版语法本身的解析需要参照另外一个项目 [https://github.com/ghy511024/jsptpl](https://github.com/ghy511024/jsptpl)

更详细详细教程demo [http://nln.me/page/tpl/fis3-jsptpl.html](http://nln.me/page/tpl/fis3-jsptpl.html)

## 使用方法
- 安装

~~~js 

npm install fis3-parser-jsptpl --save

~~~

- 基础配置

~~~js 

fis.match("*/tpl/(*).tpl", {
    parser: fis.plugin('jsptpl'),
    rExt: '.js',
})
// 启用模版内，内联联scss 编译
fis.match('**{**.tpl:scss,**.scss}', {
    rExt: 'css',
    // 官方推荐 node-sass ，node7 以上不好使，所以自己封装了一个
    // https://github.com/ghy511024/fis3-parser-nodev8-scss
    parser: [fis.plugin('nodev8-scss')],
    postprocessor: fis.plugin('autoprefixer'),
});

~~~

- tpl 文件组成

~~~html 

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<tmplate name="ghytmp">
    <p>我的名字:${name}，</p>
    <p>性别：<c:if test="${sex=='boy'}">男</c:if></p>
    <p>其他属性：<c:if test="${sex=='boy'&&xianrou&&a2>3}">很帅</c:if></p>
    <p>条件判断：<c:if test="${a1>2}">符合条件</c:if></p>
        <p>还有一组朋友</p>
        <ul>
        <c:forEach items="${friends}" var="item">
            <li>他的名字:${item.name},今年${item.age}岁,
                <c:forEach items="${item.hobby}" var="hobby">
                    ${hobby} 
                </c:forEach> 
            </li>
        </c:forEach>
    </ul>
</tmplate>
<style type="text/css">
    body{
        margin:0px;
        p{
            font-size:12px;
        }
    }
</style>

~~~

- <%@page contentType="text/html" pageEncoding="UTF-8"%> jsp 文件需要加这一行保证编码为utf8，没有编码问题就不需要这个

- 只有 tmplate 和style 标签中的内容才会被产出，可以有多个 tmplate，和style 标签

- 产出

~~~js 

window.TPL = window.TPL || {};
TPL.tplmap = TPL.tplmap || {};
TPL.getTpl = TPL.getTpl || function (_id) {
    return this.tplmap[_id];
};
TPL.addStyle = TPL.addStyle || function (styleContent) {
    var styleNode = document.getElementById("jsptpl-style") || document.createElement("style");
    styleNode.setAttribute("type", "text/css");
    styleNode.setAttribute("id", "jsptpl-style");
    if (styleNode.styleSheet) {
        styleNode.styleSheet.cssText = styleContent;
    } else {
        styleNode.appendChild(document.createTextNode(styleContent));
    }
    document.getElementsByTagName("head")[0].appendChild(styleNode);
};
(function (TPL) {
    TPL.tplmap['ghytmp'] = '<p>我的名字:${name}，</p><p>性别：<c:if test="${sex==\'boy\'}">男</c:if></p><p>其他属性：<c:if test="${sex==\'boy\'&&xianrou&&a2>3}">很帅</c:if></p><p>条件判断：<c:if test="${a1>2}">符合条件</c:if></p><p>还有一组朋友</p><ul><c:forEach items="${friends}" var="item"><li>他的名字:${item.name},今年${item.age}岁,<c:forEach items="${item.hobby}" var="hobby">${hobby}</c:forEach></li></c:forEach></ul>'
})(TPL);
   
//begin insert style
TPL.addStyle('body{margin:0px;}body p{font-size:12px;}')

~~~

 TPL.tplmap['ghytmp'] 这个是模版字符串，要解析这字符串，就是大家耳熟能详的 ‘模版引擎了’，解析jsp 语法的模版引擎参照上面 所说的 项目和和演示demo