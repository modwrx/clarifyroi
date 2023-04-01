
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Landing Page</title>
  <meta name="description" content="A brief description of my landing page.">
</head>
<body>
  <header>
    <h1>Welcome to My Landing Page</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h2>What We Offer</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor fringilla lacus, nec mollis velit euismod in. Proin vel ipsum dolor. Sed euismod id quam non dapibus. Aenean feugiat volutpat nibh, ut malesuada nulla euismod ut.</p>
    <p>Phasellus eu rutrum mauris. Donec eget mauris et est maximus bibendum nec eget urna. Nulla facilisi. Nullam consectetur elementum nulla, at eleifend lorem ornare vel. Donec vestibulum sodales urna, ut facilisis mi bibendum quis.</p>
    <a href="#" class="btn">Learn More</a>
  </main>
  <footer>
    <p>&copy; 2023 My Landing Page. All Rights Reserved.</p>
  </footer>
</body>
</html>

<!-- <script src="https://cdn.jsdelivr.net/gh/modwrx/clarifyroi@main/clarifyroi.js"></script> -->

<script>

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

const currentUrl = window.location.href; 

const source = urlParams.get('utm_source');
const medium = urlParams.get('utm_medium');
const campaign = urlParams.get('utm_campaign');
//const keyword = urlParams.get('utm_keyword');
const keyword = extractKeywordFromUrl(currentUrl);



var CROICookie = readCookie("croi_user");
var wcCookie = readCookie("wc_visitor");
if(wcCookie != null)
{
    if(CROICookie === null || CROICookie != wcCookie || wcCookie != '105865-155764be-f535-662e-fe7f-86a214dcce45') 
    {
        const data = {
            'source' : source,
            'user_id' : wcCookie,
            'medium' : medium,
            'campaign' : campaign,
            'keyword' : keyword,
            'currentUrl' : currentUrl
        };

        createCookie('croi_user', wcCookie, .5);
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

function extractKeywordFromUrl(url) {
  // Extract the query string from the URL
  const queryString = url.split("?")[1];

  // Extract the value of the "q" parameter from the query string
  const regex = /q=([^&]+)/;
  const match = queryString.match(regex);

  // Return the keyword if found, otherwise null
  if (match) {
    return decodeURIComponent(match[1].replace(/\+/g, " "));
  } else {
    return null;
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

</script>

