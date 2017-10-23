
window.TPL = window.TPL || {};
TPL.tplmap = TPL.tplmap || {};
TPL.getTpl = TPL.getTpl || function (_id) {
    return this.tplmap[_id];
};
TPL.addNode=TPL.addNode||function(html){
     var divTemp = document.createElement("div"), nodes = null ,
              fragment = document.createDocumentFragment();
      divTemp.innerHTML = html;
       nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
       fragment.appendChild(nodes[i].cloneNode(true));
    }
    document.body.appendChild(fragment);
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
(function (TPL) {
    TPL.tplmap['gdpanel'] = '<div class="gd-panel"><div class="gd-title">${title}</div><div class="gd-leftbar"><ul><c:forEach items="${leftlist}" var="item"><li>${item}</li></c:forEach></ul></div><div class="gd-list"><ul><c:forEach items="${datalist}" var="d"><li><div class="col-num" style="height:${d.per}%"><div class="per-num">${d.num}</div></div></li></c:forEach></ul></div></div>'
})(TPL);
   
//begin insert style
TPL.addStyle('body, ul, li{margin:0px;   padding:0px;   list-style:none;}.gd-panel{width:500px;   height:250px;   background:#000;   position:relative;   color:#fff;   overflow:hidden;}.gd-panel .gd-title{margin:0px 20px;   height:32px;   border-bottom:1px solid;   line-height:32px;}.gd-panel .gd-leftbar{position:absolute;   width:40px;   height:200px;   border-right:1px solid #ccc;   bottom:0px;   left:20px;}.gd-panel .gd-leftbar ul li{postion:relative;   height:40px;   text-align:right;   margin-right:10px;}.gd-panel .gd-list{position:absolute;   bottom:0px;   height:200px;   left:80px;}.gd-panel .gd-list ul{height:100%;   width:100%;}.gd-panel .gd-list ul li{height:100%;   width:20px;   margin-left:5px;   float:left;   position:relative;}.gd-panel .gd-list ul li .col-num{width:100%;   background:red;   bottom:0px;   position:absolute;}.gd-panel .gd-list ul li .per-num{position:absolute;   top:-20px;}')