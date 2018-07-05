
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
    oneDriveSignIn();
  });

  function oneDriveSignIn(){

    //get OneDrive clientID
  APIRequest('GET','http://192.168.2.1:8000/apis/authenticate',null,localStorage.getItem('idToken')).then(function(result){
    console.log(result);

    var appInfo = {
      "clientId": result,
      "redirectUri": "http://localhost:8080/callback.html",
      "scopes": "user.read",
      "authServiceUri": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
    };

    signInToOneDrive(appInfo);
  })


   
  }


  this.document.getElementById('btn-onedrivetest').addEventListener('click', function () {
    var url = 'https://graph.microsoft.com/v1.0/me/drive/root/children';

    APIRequest('GET',url,null,localStorage.getItem('OneDriveToken'));
  });


  var APIRequest = function(requestType,url,params,token){
    return new Promise(function(resolve,reject){
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
          statusText: ahr.statusText
        });
      }
    };
    xmlHttp.onerror = function(){
      reject({
        status: this.status,
        statusText: ahr.statusText
      });
    }

  
  
    if (params != null) {
      xmlHttp.send(JSON.stringify(params));
    } else {
      xmlHttp.send(null);
    }
  
    })
  }
  
}