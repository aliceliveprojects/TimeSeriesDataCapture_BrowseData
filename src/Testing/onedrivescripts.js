

function signInToOneDrive(appInfo) {
  
  
 
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
