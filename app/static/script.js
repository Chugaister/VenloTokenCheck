const sendForm = document.querySelector('#send-form');
let counter = 0;
if(counter==0){
sendForm.onclick = function (event) {

    let URLAddress = window.location.protocol + "//" + window.location.host + "/api/verify";
    const networkValue = document.querySelector('.network').value;
    const addressValue = document.querySelector('.address').value;
    URLAddress = URLAddress + "?network=" + networkValue + "&tokenAddress=" + addressValue;
    console.log(URLAddress);
    let requestResult = new XMLHttpRequest();
    requestResult.open('GET', URLAddress );
    requestResult.responseType = 'json';
    requestResult.send();
        if (addressValue != "" && networkValue != "") {
        event.preventDefault();
        let listOfParameters = requestResult.response;
         console.log(listOfParameters);
        let description = listOfParameters['response']['description'];
        let mySection = document.getElementById("result")
        let myArticle = document.createElement('article');
        let info = document.createElement('p');

        myArticle.appendChild(info);
        info.textContent = description;
        mySection.appendChild(myArticle);
        let color = listOfParameters['response']['scam'];
        if (color == true) {
            info.setAttribute("style", "color: rgb(92, 208, 128)")
        } else if (color == false) {
            info.setAttribute("style", "color: rgb(224, 53, 53)")

        } else {
            info.setAttribute("style", "color: white")

        }
        counter++;


    }
}


}


/*XMLHttpRequest()*/

   let requestURL = window.location.protocol + "//" + window.location.host + "/api/networks";
   let request = new XMLHttpRequest();
   request.open('GET', requestURL);
   request.responseType = 'json';
   request.send();
   request.onload = function()
  {
   let listOfNetworks = request.response;
   InputInDropbox(listOfNetworks);
   console.log(listOfNetworks);
  }
  /*function InputInDropbox()*/
function InputInDropbox(jsonObj)
{
  let networks = jsonObj['response'];
  let mySelect = document.getElementById("select");

  for(let i = 0; i < networks.length; i++){
    let option = document.createElement('option');
    option.type = 'hidden';
    mySelect.appendChild(option);
    option.textContent = networks[i];
    option.setAttribute("value", String(networks[i]));
  }
}

