
var options = {
  autoclose: true,
  auth: {
    responseType: "token id_token",
  }
}

var APIUrl = 'http://192.168.2.1:8000'

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
    var url = APIUrl+'/apis/Components'
    APIRequest("GET", url, null, localStorage.getItem('idToken')).then(function(result){
      
      var result = JSON.parse(result);
      result = result.ComponentIDs[0];
      console.log(JSON.parse(result));
    
    })
    .catch(function(error){
      console.log(error);
    });
  });

  //Search Components
  this.document.getElementById('btn-componentSearch').addEventListener('click', function () {
    var query = "?page=1&pagesize=100";
    var url = APIUrl+'/apis/ComponentSearch' + encodeURI(query);
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
    var url = APIUrl+'/apis/Components' + encodeURI(query);
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

    

    var url = APIUrl+'/apis/Components';

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
    var url = APIUrl + '/apis/Components';

    
    APIRequest('GET',url,null,localStorage.getItem('idToken')).then(function(result){
      console.log(result);
    })
    .catch(function(error){
      console.log(error)
    })
  });



  
  
}

function oneDriveGetSignIn(){

  //get OneDrive clientID
  var url = APIUrl + '/apis/authenticate';
APIRequest('GET',url,null,localStorage.getItem('idToken')).then(function(result){
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
   

    var url = APIUrl + '/apis/authenticate';
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