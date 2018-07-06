
var options = {
  autoclose: true,
  auth: {
    responseType: "token id_token",
  }
}

var SwaggerURL = 'http://192.168.2.1:8000/apis/'

window.onload = function () {
  // Initializing our Auth0Lock
  var lock = new Auth0Lock(
    '0XLhzBnfbBmbmKU6OnEan4CU5lLWkD81',
    'timeseriestest.eu.auth0.com',
    options
  );

  document.getElementById('btn-login').addEventListener('click', function () {
  
    lock.show();
  });

  lock.on("authenticated", function (authResult) {
    // Use the token in authResult to getUserInfo() and save it to localStorage
    lock.getUserInfo(authResult.accessToken, function (error, profile) {
      if (error) {
        console.log("authentication error");
        console.log("error");
        return;
      }
      console.log(authResult);
      console.log(profile);

      localStorage.setItem('idToken', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
    });
  });

  //temp logout
  this.document.getElementById('btn-logout').addEventListener('click', function () {
    localStorage.clear();
  })


  //Get Components
  this.document.getElementById('btn-getComponents').addEventListener('click', function () {
    var url = SwaggerURL+'Components'
    APIRequest("GET", url, null, localStorage.getItem('idToken')).then(function(result){
      console.log(result);
    })
    .catch(function(error){
      console.log(error);
    });
  });

  //Search Components
  this.document.getElementById('btn-componentSearch').addEventListener('click', function () {
    var query = "?search=55&page=1&pagesize=100";
    var url = SwaggerURL+'ComponentSearch' + encodeURI(query);
    APIRequest("GET", url, null, localStorage.getItem('idToken')).then(function(result){
      console.log(result);
    })
    .catch(function(error){
      console.log(error);
    });
  });

  //Get Components By ID
  this.document.getElementById('btn-getComponentsByID').addEventListener('click', function () {
    var query = "/13456";
    var url = SwaggerURL+'Components' + encodeURI(query);
    APIRequest("GET", url, null, localStorage.getItem('idToken')).then(function(result){
      console.log(result);
    })
    .catch(function(error){
      console.log(error);
    });
  })

  //Post Components
  this.document.getElementById('btn-postComponents').addEventListener('click', function () {
    var params = {
      "ComponentIDs": [
        "string"
      ]
    };

    

    var url = SwaggerURL+'Components';

    APIRequest("POST", url, params, localStorage.getItem('idToken')).then(function(result){
      console.log(result);
    })
    .catch(function(error){
      console.log(error);
    });
  });



  this.document.getElementById('btn-oneDriveLogin').addEventListener('click', function () {
    oneDriveGetSignIn();
  });

 

  this.document.getElementById('btn-onedrivetest').addEventListener('click', function () {
    var url = SwaggerURL + 'Components';

    
    APIRequest('GET',url,null,localStorage.getItem('idToken')).then(function(result){
      console.log(result);
    })
    .catch(function(error){
      console.log(error)
    })
  });

  this.document.getElementById('btn-onedrivetest2').addEventListener('click', function () {
    var url =  'https://graph.microsoft.com/v1.0/me/drive/root/children'
    var token = 'EwBYA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAdk/Bjtxmm7yxi1/ePB8P4dQadHgg331vKEzMrWDExfDhE0U4Uwi4xoV/E1Xwadn8/ky0fMBCxeQ3qT9RGjdkLG9D5cwpvjBeND1JA87JWfWTmdh3eNH0JLuPxPoMLeQX0tfgUB6vBwY/n2kDyBtLdIQh+VdEmxmcSyQSKnLDdrM3eTAZyusTt2e7LWDLRMAw9zGCEDCXySgl3lSHAmb01gstow/3vQRzHXyxZ7Hgrwemm8hWvp2yE2cpM54JCiV4s39We+OL53e5/+Rv3HFMROZoYXpl1AOdRdl3JJuVMsmDp3ruYXawoYAiO+tdESE0ys7uzzSfjKBwYRDWMXyEy4DZgAACFjC/qJ+wgcBKAJ9dBRjK/eRIehCvWWLheOaTXOZj6pyyhjKir79Al2X/RNX+6BV7iy2RmXfmm6+OkCjJMM5xSoXKW/6FOPvr6kQhsswHlMiDbJGKjoSKR496W3cjU3SiiipbkMl/5Ucojkvvt5wlQ1oRqLLhIJ1HF6dVsQJRrM6ldCpw5fwe+3jYb146UiN1lkMxHz6BG/V8BNo91ckPXl/fEZkuB0nZlaW/JkIrPNp71oJRUYmwDzmNdi1SxRA1/wFYzvuZaiv1mo5E9MU5vjz7WgbJHRR/qOJ7C5SerhMn/DuRM50cE+ZkEtLzj7obqubJ0PdlgAVychwWKe5RFu+OsOcvfFxlDk9DZTURbxa3OKIQw7NMJ4FB1CeT2mZ/lOyojPSlJDKw63GfUp5gJwKxOUEAWVE+evCXRtfBm3GhMLvUcynu4g80QDI7mbd6NY6fzX8etFWcBhDYFj/tyBc4wRhzadE4h8UBB8q/mor2jshk0alDybQVCKlHFd12e5heOaU4iG9Th4IPs02fJL0KBi8w4Hg4+5dEOlbMQSILbAu3DcYVgm/lhTRUei7R7XYdfW0LNKkfSKeya3kP3pUc3HbHMXVQrgFKlWes8FbqT63oQNFzYjdjlSIxeqLs/Cvt+YnixczRJGH4QS/0jos1IodmEHWxrofZaGzA2bk2XJ8S9Op1okNl2tdskIMaLgbhZHYvoujIaJh/ln5rquZLORpCFsNeVTvteOQyRit34dmAg=='

    
    APIRequest('GET',url,null,token).then(function(result){
      console.log(result);
    })
    .catch(function(error){
      console.log(error)
    })
  });



  
  
}

function oneDriveGetSignIn(){

  //get OneDrive clientID
APIRequest('GET','http://192.168.2.1:8000/apis/authenticate',null,localStorage.getItem('idToken')).then(function(result){
  result = JSON.parse(result);
  console.log(result);

  var appInfo = {
    "clientId": result.auth_token,
    "redirectUri": "http://localhost:8080/callback.html",
    "scopes": "user.read",
    "authServiceUri": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
  };

  signInToOneDrive(appInfo);
}).catch(function(error) {
  console.log("error");
})   
}

var APIRequest = function(requestType,url,params,token){
  return new Promise(function(resolve,reject){
    console.log('REQUEST' + url);
    var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(requestType, url, true);
  xmlHttp.setRequestHeader('Content-type', 'application/json');
  xmlHttp.setRequestHeader('Accept', 'application/json');

  if (token != null) {
    var AuthorizationHeader = "Bearer " + token;
    xmlHttp.setRequestHeader("Authorization", AuthorizationHeader);
  }

  xmlHttp.onload = function(){
    if(this.status >= 200 && this.status <= 300){
      resolve(xmlHttp.response);
    }else{
      reject({
        status: this.status,
        statusText: xmlHttp.statusText
      });
    }
  };
  xmlHttp.onerror = function(){
    reject({
      status: this.status,
      statusText: xmlHttp.statusText
    });
  }



  if (params != null) {
    xmlHttp.send(JSON.stringify(params));
  } else {
    xmlHttp.send(null);
  }

  })
}


function signInToOneDrive(appInfo) {
  
  console.log(appInfo);
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
   

    var url = SwaggerURL + 'authenticate';
    var params = {
      token: token
    }
    APIRequest('POST',url,params,localStorage.getItem('idToken')).then(function(result){

    console.log(result);


  }).catch(function(error) {
    console.log("error");
  })   
  }
}