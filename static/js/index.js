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
    divProgressDialog.style.display = "";
     resizeModal();
     btnCancel.focus();
     window.onresize = resizeModal;
     window.onbeforeunload = showWarning;
     continueLongProcess();
    if(document.getElementsByName("modern").checked){
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
    }else if(document.getElementsByName("headhidden").checked){
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

var NUMBER_OF_REPETITIONS = 40;
  var nRepetitions = 0;
  var g_oTimer = null;
  function updateProgress(nNewPercent)
  {
     divProgressInner.style.width = (parseInt(divProgressOuter.style.width)
        * nNewPercent / 100)+ "px";
  }
  function stopLongProcess()
  {
     if (g_oTimer != null)
     {
        window.clearTimeout(g_oTimer);
        g_oTimer = null;
     }
     // Hide the fake modal DIV
     divModal.style.width = "0px";
     divModal.style.height = "0px";
     divProgressDialog.style.display = "none";
     // Remove our event handlers
     window.onresize = null;
     window.onbeforeunload = null;
     nRepetitions = 0;
  }
  function continueLongProcess()
  {
     if (nRepetitions < NUMBER_OF_REPETITIONS)
     {
        var nTimeoutLength = Math.random() * 1000;
        updateProgress(100 * nRepetitions / NUMBER_OF_REPETITIONS);
        g_oTimer = window.setTimeout("continueLongProcess();", nTimeoutLength);
        nRepetitions++;
     }
     else
     {
        stopLongProcess();
     }
  }
  function showWarning()
  {
     return "Navigating to a different page or refreshing the window could cause you to lose precious data.\n\nAre you*absolutely* certain you want to do this?";
  }
  function resizeModal()
  {
     divModal.style.width = document.body.scrollWidth;
     divModal.style.height = document.body.scrollHeight;
     divProgressDialog.style.left = ((document.body.offsetWidth -
  divProgressDialog.offsetWidth) / 2);
     divProgressDialog.style.top = ((document.body.offsetHeight -
  divProgressDialog.offsetHeight) / 2);
  }

  function checkRadio(name) {
    if(name == "modern"){
    console.log("Choice: ", name);
        document.getElementById("modern-poetry").checked = true;
        document.getElementById("headhidden-poetry").checked = false;
        document.getElementById('row').style.display = 'block'
        document.getElementById("row").value = ''
        document.getElementsByName("keyin")[0].value= ''

    } else if (name == "headhidden"){
        console.log("Choice: ", name);
        document.getElementById("headhidden-poetry").checked = true;
        document.getElementById("modern-poetry").checked = false;
        document.getElementById('row').style.display = 'none'
        document.getElementsByName("keyin")[0].value= ''
    }
  }
