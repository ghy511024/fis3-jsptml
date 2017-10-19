
window.TPL = window.TPL || {};
TPL.tplmap = TPL.tplmap || {};
TPL.getTpl = TPL.getTpl || function (_id) {
    return TPL.tplmap[_id];
};
<template name="shiming">
    <div class="shiming-page">
        <div class="shiming-banner">
            <p class="title">选择一种认证方式</p>
            <p class="desc">根据相关法规，您需要通过实名认证才能发布</p>
        </div>
        <div class="shiming-list">
            <ul>
                <li shiming-type="renlian" class="active">
                    <div class="pic pic-renlian"></div>
                    <div class="shiming-title">人脸认证</div>
                    <div class="shiming-desc">简单快捷，请在光线较好的环境下进行</div>
                    <div class="shiming-arrow"></div>
                </li>
                <li shiming-type="zhima">
                    <div class="pic pic-zhima"></div>
                    <div class="shiming-title">芝麻实名认证</div>
                    <div class="shiming-desc">适用于已有支付宝帐号的用户</div>
                    <div class="shiming-arrow"></div>
                </li>
                <li shiming-type="yinhang">
                    <div class="pic pic-renlian"></div>
                    <div class="shiming-title">银行卡认证</div>
                    <div class="shiming-desc">简单快捷，请在光线较好的环境下进行</div>
                    <div class="shiming-arrow"></div>
                </li>
            </ul>
        </div>
        <div class="next-btn disable" id="shiming-next">下一步</div>
    </div>

</template>