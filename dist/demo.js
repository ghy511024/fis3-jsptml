/**
 * 引入组件 html,css
 * */

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
TPL.addStyle('body, ul, li{margin:0px;   padding:0px;   list-style:none;}.gd-panel{width:500px;   height:250px;   background:#000;   position:relative;   color:#fff;   overflow:hidden;}.gd-panel .gd-title{margin:0px 20px;   height:32px;   border-bottom:1px solid;   line-height:32px;}.gd-panel .gd-leftbar{position:absolute;   width:40px;   height:200px;   border-right:1px solid #ccc;   bottom:0px;   left:20px;}.gd-panel .gd-leftbar ul li{postion:relative;   height:40px;   text-align:right;   margin-right:10px;}.gd-panel .gd-list{position:absolute;   bottom:0px;   height:200px;   left:80px;}.gd-panel .gd-list ul{height:100%;   width:100%;}.gd-panel .gd-list ul li{height:100%;   width:20px;   margin-left:5px;   float:left;   position:relative;}.gd-panel .gd-list ul li .col-num{width:100%;   background:red;   bottom:0px;   position:absolute;}.gd-panel .gd-list ul li .per-num{position:absolute;   top:-20px;}');

/**
 * 传入 组件xuanran
 * @funciton gdCard
 * @param {Element} el 组件父容器
 * @return {Object} data
 *         data[title] {String} 组件标题
 *         data[datalist] {Array} 原始数据list
 * @constructor
 *
 * */

function gdCard(el, data) {
    var edata = this.exchangData(data);
    console.log(edata);
    var str = TPL.getTpl("gdpanel")
    // 获取模板对象
    var strtmpl = new jsptpl(str);
    // 模板与数据结合转换为字符串
    var retstr = strtmpl.render(edata);
    el.innerHTML = retstr;
    console.log(retstr);
}

gdCard.prototype = {
    constroctor: gdCard,
    /**
     * 将原始数据转换为 组件需要数据
     * @param {Object} {title: "title", list: [89]}
     * @return {Object} {title:"title",datalist:[{per:89,num:89}],leftlist:[100,75,50,25,0]}
     *
     * */
    exchangData: function (data) {
        var retdata = {};
        var per = this.getPer(data.list);
        var array = [];
        for (var i = 4; i >= 0; i--) {
            array.push(i * per)
        }
        var max = per * 4;
        var objarray = [];
        for (var i = 0; i < data.list.length; i++) {
            var obj = {};
            var tmp = data.list[i];
            obj.num = tmp;
            obj.per = (tmp / max * 100) | 0;
            objarray.push(obj);
        }
        retdata["datalist"] = objarray
        retdata["leftlist"] = array;
        retdata["title"] = data.title;
        return retdata;
    },
    /**
     * 获取合适的阶差数值
     * @param {Array} list [18, 8, 258, 86, 30, 25]
     * @return {Number} 例如 传入最大258 则柱状最高为400 阶差为100
     *
     * */
    getPer: function (list) {
        var max = list[0];
        for (var i = 0; i < list.length; i++) {
            if (list[i] > max) {
                max = list[i];
            }
        }
        console.log(max);
        var tmp = 10;
        for (var i = 1; i < 10; i++) {
            if (max / tmp > 10) {
                tmp = tmp * 10;
            } else {
                break;
            }
        }
        var per = max / tmp / 4;

        var b = Math.floor(per)
        var m = per % 1;
        if (m > 0.5) {
            b = b + 1;
        } else {
            b = b + 0.5;
        }
        return b * tmp;
    }
}