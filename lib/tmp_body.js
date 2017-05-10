
module.exports = function () {
    var fn = function () {
(function (TPL) {
    TPL.tplmap['##TMP_KEY##'] = '##TMP_VALUE##';
})(TPL);
    }
    var str = fn.toString();
    var retstr = str.substring(str.indexOf("{") + 1, str.lastIndexOf("}") - 1);
    return  retstr;
}
