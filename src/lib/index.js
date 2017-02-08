(function(window){
    function ajax(obj){
        obj.type = obj.type || "GET";
        if(window.XMLHttpRequest){
    		xhr = new XMLHttpRequest();
    	}else if(window.ActiveXObject){
    		xhr = new ActiveXObject(Microsoft.XMLHTTP);
    	}
        xhr.open(obj.type,obj.url,obj.boolType);
        xhr.onload = function(){
            if(xhr.readyState === 4){
                if(xhr.status >=200 && xhr.status <300 || xhr.status === 304){
                    if(obj.dataType && obj.dataType.toLowerCase() === "json"){
                        return obj.success(JSON.parse(xhr.responseText));
                    }
                    return obj.success(xhr.responseText);
                }
            }else{
                return obj.error(new Error(xhr.statusText));
            }
        };
        xhr.onerror = function(){
            return obj.error(new Error(xhr.statusText));
        }
        obj.type && obj.type.toLowerCase() == "get" ?
    		xhr.send(null) : xhr.send(obj.data);
    }
    window.ajax = function(obj){
        return new ajax(obj);
    }
})(window)
