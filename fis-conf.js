var parserTpl = require('./index');

fis.match('*', {
    release: false
});


fis.match('*(*.tpl)', {
    release: "$1"
});
fis.match('*(*.js)', {
    release: "$1"
});


var path = require('path');
var root = fis.project.getProjectPath();


fis.match("**.tpl", {
    // parser: [parserTpl],
    parser: "jsptpl",// npm install fis3-parser-jsptpl --save
    rExt: '.js',
})


fis.match('**.tpl:scss', {
    rExt: 'css',
    parser: [
        fis.plugin('nodev8-scss', {})
    ],
});


fis.match('/test/*{.tpl,.js}', {
    deploy: fis.plugin('local-deliver', {
        to: path.join(__dirname, './dist/')
    })
});


