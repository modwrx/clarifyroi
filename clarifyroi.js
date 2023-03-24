function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);


const source = urlParams.get('utm_source');
const medium = urlParams.get('utm_medium');
const campaign = urlParams.get('utm_campaign');
const keyword = urlParams.get('utm_keyword');

const currentUrl = window.location.href;

var CROICookie = readCookie("croi_user");
var wcCookie = readCookie("wc_visitor");
if(wcCookie != null)
{
    if(CROICookie === null || CROICookie != wcCookie) 
    {
        const data = {
            'source' : source,
            'user_id' : wcCookie,
            'medium' : medium,
            'campaign' : campaign,
            'keyword' : keyword,
            'currentUrl' : currentUrl
        };

        createCookie('croi_user', wcCookie, .0005);
        console.log('roi doesnt exist or is not equal');

        const apiUrl = 'http://192.168.1.30/api/clarifyroi';

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
            // Handle the API response data
            console.log(data);
            })
            .catch(error => {
            // Handle any errors that occur during the API request
            console.error(error);
        });
    }
}




function readCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}
