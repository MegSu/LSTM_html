function postData(url, data) {
    //Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // msut match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', //include, same-origin, *omit
        headers:{
            'user-agent': 'Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // 輸出成json
}

function submit(){
    var elements = document.getElementsByName("selecttype")
    
    if(elements[0].checked){
        const keyin = document.getElementsByName("keyin")[0].value
        const row = parseInt(document.getElementById('row').value)
        const data = {
            keyin,
            row
        }
        
        postData('http://35.223.93.152/predict', data)
        .then(data=>{
            data = data.replace(/\n/g, "<br />");
            console.log(data);
            document.getElementsByName("resultText")[0].innerHTML=(data)
            
        })
    }else{
        const keyin = document.getElementsByName("keyin")[0].value
        const data = {
            keyin
        }
        
        postData('http://35.223.93.152/hidden', data)
        .then(data=>{
            data = data.replace(/\n/g, "<br />");
            console.log(data);
            document.getElementsByName("resultText")[0].innerHTML=(data)
        })
    }
}
