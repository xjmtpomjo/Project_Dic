function toSaveWord(word)
{
  if (ntf) {
     ntf.cancel();
     clearTimeout(toForNTF);
  }
  showNotifyDiv(word.selectionText);
}

function showNotifyDiv(selTxt, tab)
{
  //var aDiv = document.createElement('div');
  //aDiv.style.opacity = '0.7';
  //aDiv.style.padding = '5px';
  //aDiv.style.fontSize = '10px';
  //aDiv.style.margin = '10px';
  //aDiv.style.position = 'absolute';
  //aDiv.style.minHeight = '50px';
  //aDiv.style.width = '250px';
  //aDiv.style.backgroundColor = '#badaaa';
  //aDiv.style.borderRadius = '10px';
  //aDiv.style.display = 'block';
  //aDiv.innerHTML = "\"" + selTxt + "\" is saved to your Dic.";
  //aDiv.setAttribute('id','1aqsr3e4dasdasd');
  //var bd = document.body;
  //bd.insertBefore(aDiv, bd.childNodes[0]);
    //alert(selTxt);
    ntf = webkitNotifications.createNotification("dict.png", "\"" + selTxt + "\" is saved to your Dic.", "");
    ntf.show();
    toForNTF = setTimeout(function () {
        ntf.cancel()
    }, 3000);
}

// Create one test item for each context type.
var pageId = chrome.contextMenus.create({"title": "Open Project Dic. Dashboard", "contexts": ["page"],
                                       "onclick": null});
var selectionId = chrome.contextMenus.create({"title": "Save this word to my dic.(?)", "contexts": ["selection"],
                                       "onclick": toSaveWord});
var ntf;
var toForNTF;
// Create a parent item and two children.
// var parent = chrome.contextMenus.create({"title": "Open Project Dic. Dashboard"});
// var child1 = chrome.contextMenus.create(
//   {"title": "Child 1", "parentId": parent, "onclick": toSaveWord});

