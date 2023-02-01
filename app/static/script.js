console.log("0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7");
const sendForm = document.querySelector('#send-form');
let alert = document.getElementsByClassName("select");
let mySection = document.getElementById("result")
let info = document.createElement('p');
mySection.appendChild(info);
sendForm.onclick = async function (event) {
    event.preventDefault();
    let URLAddress = window.location.protocol + "//" + window.location.host + "/api/verify";
    const networkValue = document.querySelector('.network').value;
    const addressValue = document.querySelector('.address').value;

    URLAddress = URLAddress + "?network=" + networkValue + "&tokenAddress=" + addressValue;
    console.log(URLAddress);

    fetch(URLAddress).then(async (apiResult) => {
        const result = await apiResult.json();
        const myDescription = result.response.description;
        const color = result.response.scam;
        console.log(myDescription);
        console.log(color);

        if (addressValue != "" && networkValue != "" ) {

            info.textContent = "";
            info.textContent = myDescription;


            if (color == false) {
                info.setAttribute("style", "color: rgb(92, 208, 128)")
            } else if (color == true) {
                info.setAttribute("style", "color: rgb(224, 53, 53)")
            } else {
                info.setAttribute("style", "color: white")
            }

        }
        else if(networkValue == ""){


        }


    });
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