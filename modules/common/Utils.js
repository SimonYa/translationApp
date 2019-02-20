
//电话号码格式验证方法
verifyMobile = (mobile) => {
    // 200：合法   0：参数未定义或为空   1：空   2：格式不正确
    let flag = 200;

    if (typeof mobile === 'undefined' || mobile === null) {
        flag = 0;
        return flag;
    }

    //电话验证
    if (mobile === '' || mobile.length === 0) {
        flag = 1;
        return flag;
    }

    let mobilePatt = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    if (mobile.length < 11 || !mobilePatt.test(mobile)) {
        flag = 2;
        return flag;
    }

    return flag;
}





export default { verifyMobile };
