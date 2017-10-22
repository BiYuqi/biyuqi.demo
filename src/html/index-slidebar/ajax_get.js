const ajax_get = function(param) {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open("GET",param.url)

        xhr.send(null)

        xhr.onload = function(){
            if(xhr.readyState === 4){
                resolve(JSON.parse(xhr.responseText))
            }
        }

        xhr.onerror = function(error){
            reject(error)
        }
    })
}
