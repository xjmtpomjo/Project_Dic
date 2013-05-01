function login()
{
  chrome.extension.getBackgroundPage().openDashboard();
  window.close();
}

function logout() {
  chrome.extension.getBackgroundPage().logout();
  window.close();
}

function setPopupLoginState()
{
  var loginInfo = document.getElementById('login-info');
  var loginBtn = document.getElementById('login-btn');
  loginInfo.innerText = "You've logged in. GOOOOOD";
  loginBtn.innerText = "Logout";
  loginBtn.removeEventListener('click');
  loginBtn.addEventListener('click', logout);
}

function setPopupLogoutState()
{
  var loginInfo = document.getElementById('login-info');
  var loginBtn = document.getElementById('login-btn');
  loginInfo.innerText = "You must login first.";
  loginBtn.innerText = "Login";
  loginBtn.removeEventListener('click');
  loginBtn.addEventListener('click', login);
}

document.addEventListener('DOMContentLoaded', function () {
  if(chrome.extension.getBackgroundPage().oauth.hasToken())
  {
    setPopupLoginState();
  }
  else
  {
    setPopupLogoutState();
  }
});
