# fis3-jsptpl

## 使用方法

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