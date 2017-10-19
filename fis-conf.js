fis.match('*.jsp', {
    release: "$0"
});
var path = require('path');
var root = fis.project.getProjectPath();

fis.match("*.jsp", {
    parser: "jsptpl",
    rExt: '.js',
})


