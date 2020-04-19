//暴露手机逻辑验证
export function checkMobile(rule,value,callback){
    //正则
    const reg=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    //判断 如果传过来的值不为该标准
    if(!reg.test(value)){
        //错误提示
        return callback(new Error('请输入正确的手机号'))
    }
    //正确提示
    callback()
}
//暴露勾选
export function checkAgree(rule,value,callback){
    if(value===false){
        return callback(new Error('请够选'))
    }
    //正确提示
    callback()
}

// 暴露的 邮箱验证 逻辑
export function checkEmail(rule, value, callback) {
    // 正则
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 正则验证
    if (!reg.test(value)) {
      // 错误提示
      return callback(new Error("请输入正确的邮箱"));
    }
    // 正确提示
    callback();
  }