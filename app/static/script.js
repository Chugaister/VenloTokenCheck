import '../css/style.css'
const sendForm = document.querySelector("#send-form");
let URLaddress = window.location.protocol + "//" + window.location.host;
sendForm.onclick = function (event) {
  const networkValue = document.querySelector(".network").value;
  const addressValue = document.querySelector(".address").value;
  URLaddress =
    URLaddress + "?network=" + networkValue + "&tokenAddress=" + addressValue;
  if (addressValue != "" && networkValue != "") {
    event.preventDefault();
    /* window.location.href = URLaddress;*/
    window.location.href = "https://www.youtube.com/watch?v=JkLz-Ny_CFo";
  }
};



