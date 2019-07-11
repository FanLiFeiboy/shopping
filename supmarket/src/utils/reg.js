
export function pwdReg(value) {
    //正则表达式
    const reg=/^[A-Za-z0-9]+$/;
    //验证输入的值符不符合正则表达式 返回值式true和false
    return reg.test(value)
}