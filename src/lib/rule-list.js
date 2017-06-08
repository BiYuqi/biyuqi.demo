// 构造策略方法
var _rules = (function(){
    var rulelist = {
        isBlank:function(val,msg){
            if(val == ''){
                return msg
            }
        },
        isPhone:function(val,msg){
            var pReg = /^(13\d|14[57]|15[012356789]|18\d|17[013678])\d{8}$/;
            if(!pReg.test(val)){
                return msg
            }
        },
        isCard:function(val,msg){
            var idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if(!idReg.test(val)){
                return msg
            }
        },
        passCheck:function(val,msg){
            var passReg = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]+$/;
            if(!passReg.test(val)){
                return msg
            }
        }
    }
    // 导出规则
    return {
        rulelist:rulelist
    }
})()
