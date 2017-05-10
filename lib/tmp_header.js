
module.exports = function () {
    var fn = function () {
window.TPL = window.TPL || {};
TPL.tplmap = TPL.tplmap || {};
TPL.getTpl = TPL.getTpl || function (_id) {
    return TPL.tplmap[_id];
};
}
    var str = fn.toString();
    var retstr = str.substring(str.indexOf("{") + 1, str.lastIndexOf("}") - 1);
    return  retstr;
}
