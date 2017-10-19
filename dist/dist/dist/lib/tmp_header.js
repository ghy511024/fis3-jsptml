
module.exports = function () {
    var fn = function () {
window.TPL = window.TPL || {};
TPL.tplmap = TPL.tplmap || {};
TPL.getTpl = TPL.getTpl || function (_id) {
    return this.tplmap[_id];
};
TPL.addNode=TPL.addNode||function(){
     var divTemp = document.createElement("div"), nodes = null ,
              fragment = document.createDocumentFragment(); 
      divTemp.innerHTML = html;
       nodes = divTemp.childNodes;  
    for (var i=0, length=nodes.length; i<length; i+=1) {  
       fragment.appendChild(nodes[i].cloneNode(true));  
    }  
    document.appendChild(fragment);  
    nodes = null;  
    fragment = null;
}
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
}
    var str = fn.toString();
    var retstr = str.substring(str.indexOf("{") + 1, str.lastIndexOf("}") - 1);
    return  retstr;
}
