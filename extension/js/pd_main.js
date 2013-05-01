function toSaveWord(info, tab)
{
  if (oauth.hasToken())
  {
    if (ntf) {
       ntf.cancel();
       clearTimeout(toForNTF);
    }
    showNotifyDiv(info.selectionText);
  }
  else
  {
    openDashboard();
  }
}

function showNotifyDiv(selTxt)
{
    ntf = webkitNotifications.createNotification("img/dict.png", "\"" + selTxt + "\" is saved to your Dic.", "");
    ntf.show();
    toForNTF = setTimeout(function () {
        ntf.cancel()
    }, 3000);
}

function checkAuth() {
  if (oauth.hasToken()) 
  {
    chrome.browserAction.setIcon({ 'path' : 'img/dict_19.png'});
  }
  else
  {
    chrome.browserAction.setIcon({ 'path' : 'img/dict_19_off.png'});
  }
}

function openDashboard() {
  oauth.authorize(function() {
    console.log("on authorize");
    checkAuth();
    // var url = "http://www.google.com/m8/feeds/contacts/default/full";
    // oauth.sendSignedRequest(url, onContacts, {
    //   'parameters' : {
    //     'alt' : 'json',
    //     'max-results' : 100
    //   }
    // });
  });
};

function logout() {
  oauth.clearTokens();
  checkAuth();
};

function onCMenuClickHandler(info, tab)
{
  if(info.menuItemId == "mainItem")
  {
    openDashboard();
  }
  else if(info.menuItemId == "selectedText")
  {
    toSaveWord(info, tab);
  }
}

var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key' : 'anonymous',
  'consumer_secret' : 'anonymous',
  'scope' : 'https://www.googleapis.com/auth/userinfo.email',
  'app_name' : 'Project Dic.'
});

var ntf;
var toForNTF;

checkAuth();
chrome.contextMenus.onClicked.addListener(onCMenuClickHandler);
chrome.runtime.onInstalled.addListener(function(){
  // Create one test item for each context type.
  var pageId = chrome.contextMenus.create({
    "id": "mainItem",
    "title": "Open Project Dic. Dashboard",
    "contexts": ["page"]
  });
  var selectionId = chrome.contextMenus.create({
    "id": "selectedText",
    "title": "Save this word to my dic.(?)",
    "contexts": ["selection"]
  });
});
