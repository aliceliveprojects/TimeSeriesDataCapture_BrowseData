

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
   

    var url = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
    APIRequest('GET',url,null,token).then(function(result){
    result = JSON.parse(result);
    console.log(result);


  }).catch(function(error) {
    console.log("error");
  })   
  }
}
