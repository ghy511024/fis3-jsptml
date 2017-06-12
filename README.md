# fis3-jsptpl

## 使用方法

- 说明

这插件主要是将jsp 语法的模版文件，编译成一个单独的js文件，适用于辅助 弹窗，轮播，滚动条这种小插件开发
插件所包含的 html,js,css 最终都存在于一个js文件中，方便第三方使用。
对于开发插件本身来说，在模版中可以使用jsp taglib 语法的模版引擎，并且可以在文件中写scss 语法，让组件的二次开发和维护变得简单

- 安装

~~~js 

npm install fis3-parser-jsptpl -g

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
    parser: [fis.plugin('node-sass')],
    postprocessor: fis.plugin('autoprefixer'),
});

~~~

详细教程 [nln.me/page/jsptpl/demo.html](nln.me/page/jsptpl/demo.html)