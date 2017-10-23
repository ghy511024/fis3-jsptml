<tmplate name="gdpanel">
    <div class="gd-panel">
        <div class="gd-title">${title}</div>
        <div class="gd-leftbar">
            <ul>
                <c:forEach items="${leftlist}" var="item">
                    <li>${item}</li>
                </c:forEach>
            </ul>
        </div>
        <div class="gd-list">
            <ul>
                <c:forEach items="${datalist}" var="d">
                    <li>
                        <div class="col-num" style="height:${d.per}%">
                            <div class="per-num">${d.num}</div>
                        </div>
                    </li>
                </c:forEach>
            </ul>
        </div>
    </div>
</tmplate>

<style type="text/scss">
    body, ul, li {
        margin: 0px;
        padding: 0px;
        list-style: none;
    }
    .gd-panel {
        width: 500px;
        height: 250px;
        background: #000;
        position: relative;
        color: #fff;
        overflow: hidden;
        .gd-title {
            margin: 0px 20px;
            height: 32px;
            border-bottom: 1px solid;
            line-height: 32px;
        }
        .gd-leftbar {
            position: absolute;
            width: 40px;
            height: 200px;
            border-right: 1px solid #ccc;
            bottom: 0px;
            left: 20px;
            ul {
                li {
                    postion: relative;
                    height: 40px;
                    text-align: right;
                    margin-right: 10px;
                }
            }
        }
        .gd-list {
            position: absolute;
            bottom: 0px;
            height: 200px;
            left: 80px;
            ul {
                height: 100%;
                width: 100%;
                li {
                    height: 100%;
                    width: 20px;
                    margin-left: 5px;
                    float: left;
                    position: relative;
                    .col-num {
                        width: 100%;
                        background: red;
                        bottom: 0px;
                        position: absolute;
                    }
                    .per-num {
                        position: absolute;
                        top: -20px;
                    }
                }
            }
        }
    }
</style>