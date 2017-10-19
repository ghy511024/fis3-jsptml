<%@page contentType="text/html" pageEncoding="UTF-8"%>
<tmplate name="ghy22">
    <p>我的名字:${name}，</p>
    <p>性别：<c:if test="${sex=='boy'}">男</c:if></p>
    <p>其他属性：<c:if test="${sex=='boy'&&xianrou&&a2>3}">很帅</c:if></p>
    <p>条件判断：<c:if test="${a1>2}">符合条件</c:if></p>
        <p>还有一组朋友</p>
        <ul>
        <c:forEach items="${friends}" var="item">
            <li>他的名字:${item.name},今年${item.age}岁,
                <c:forEach items="${item.hobby}" var="hobby">
                    ${hobby} 
                </c:forEach> 
            </li>
        </c:forEach>
    </ul>
</tmplate>
<style type="text/css">
    body{
        margin:0px;
        p{
            font-size:12px;
        }
    }
</style>