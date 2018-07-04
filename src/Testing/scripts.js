window.onload = function () {

  var options = {
    autoclose: true,
    auth: {
      responseType: "token id_token",
      redirect: false,
      sso: true,
      params: {
        scope: "admin",
      }
    }
  }

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
  this.document.getElementById('btn-logout').addEventListener('click',function(){
    localStorage.clear();
  })


  //Get Components
  this.document.getElementById('btn-getComponents').addEventListener('click', function () {
    var url = 'http://192.168.0.17:8000/apis/Components'
    APIRequest("GET",url,null,localStorage.getItem('idToken'));
  });

   //Search Components
   this.document.getElementById('btn-componentSearch').addEventListener('click', function(){
    var query = "?search=55&page=1&pagesize=100";
    var url = 'http://192.168.0.17:8000/apis/ComponentSearch' + encodeURI(query);
    APIRequest("GET",url,null,localStorage.getItem('idToken'));
  });

  //Get Components By ID
  this.document.getElementById('btn-getComponentsByID').addEventListener('click',function(){
    var query = "/13456";
    var url = 'http://192.168.0.17:8000/apis/Components' + encodeURI(query);
    APIRequest("GET",url,null,localStorage.getItem('idToken'));
  })

  //Post Components
  this.document.getElementById('btn-postComponents').addEventListener('click', function(){
    var params = {
      "ComponentIDs": [
        "string"
      ]
    };

    var url = 'http://192.168.0.17:8000/apis/Components';

    APIRequest("POST",url,params,localStorage.getItem('idToken'));
  });

 

 

  function APIRequest(requestType,url,params,JWT){
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
      console.log(xmlHttp.status);
      if (xmlHttp.status == 200){
        console.log(xmlHttp.responseText);
      }else{
        console.log("Error");
        console.log(xmlHttp.responseText);
      }
    }

   
    
    
    var AuthorizationHeader = "Bearer " + JWT;
    xmlHttp.open(requestType, url, true); 
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.setRequestHeader('Accept', 'application/json');
    xmlHttp.setRequestHeader("Authorization", AuthorizationHeader);

    if(params != null){
      xmlHttp.send(JSON.stringify(params));
    }else{
      xmlHttp.send(null);
    }
    
  }
}