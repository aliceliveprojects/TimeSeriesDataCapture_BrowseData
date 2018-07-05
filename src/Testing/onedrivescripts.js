
window.onload = function () {
  this.document.getElementById('btn-oneDriveLogin').addEventListener('click', function () {
    signInToOneDrive();
  });

  this.document.getElementById('btn-onedrivetest').addEventListener('click', function () {
    var url = 'https://graph.microsoft.com/v1.0/me/drive/root/children';

    APIRequest('GET',url,null,localStorage.getItem('OneDriveToken'));
  });

}

function signInToOneDrive() {
  // Register your own application at https://apps.dev.microsoft.com
  // and set the "clientId" and "redirectUri" variables accordingly.
  var appInfo = {
    "clientId": "1a67f6f4-db2a-4298-8cf8-72946ac50669",
    "redirectUri": "http://localhost:8080/callback.html",
    "scopes": "user.read",
    "authServiceUri": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
  };
  provideAppInfo(appInfo);



  challengeForAuth();

  return false;
}


// odauth calls our onAuthenticated method to give us the user's auth token.
// in this demo app we just use this as the method to drive the page logic
function onAuthenticated(token, authWindow) {
  if (token) {
    if (authWindow) {
      removeLoginButton();
      authWindow.close();
    }

    console.log('============OneDrive Token======================');
    console.log(token);
    console.log('=================================================');
    localStorage.setItem('OneDriveToken', token);

  }
}

/// /me/drive/root/children

//https://graph.microsoft.com/v1.0



function APIRequest(requestType, url, params, token) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {

    console.log(xmlHttp.responseText);
  }




  xmlHttp.open(requestType, url, true);
  xmlHttp.setRequestHeader('Content-type', 'application/json');
  xmlHttp.setRequestHeader('Accept', 'application/json');

  if (token != null) {
    var AuthorizationHeader = "bearer " + token;
    xmlHttp.setRequestHeader("Authorization", AuthorizationHeader);
  }


  if (params != null) {
    xmlHttp.send(JSON.stringify(params));
  } else {
    xmlHttp.send(null);
  }

}