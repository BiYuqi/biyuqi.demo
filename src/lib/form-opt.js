// 表单自动化工具
var _validator = (function(){
    // 构造表单策略对象
    return function(ruleList){
        return {
            strategyFn:[],
            ruleList:ruleList,
            add:function(dom,rules){
                var that = this;
                for(var i=0,len = rules.length;i<len;i++){
                    (function(i){
                        that.strategyFn.push(function(){
                            var info = [];
                            var method = rules[i].strategy.split(":"),
                                methodName = method[0],
                                errMsg = rules[i].msg,
                                val = dom.value;
                            info.push(val);
                            if(method[1]){
                                info.push(method[1])
                            }
                            info.push(errMsg);
                            return that.ruleList[methodName].apply(dom,info)
                        })
                    })(i)
                }
            },
            start:function(){
                for( i in this.strategyFn){
                    if(this.strategyFn.hasOwnProperty(i)){
                        var msg = this.strategyFn[i]();
                        if(msg){
                            return msg
                        }
                    }
                }
            }
        }
    }
})()
