// A generic onclick callback function.
function genericOnClick(info, tab) {
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
  //alert(info.selectionText);
  showNotifyDiv(info.selectionText);
}

function showNotifyDiv(selTxt)
{
  var aDiv = document.createElement('div');
  aDiv.style.opacity = '0.7';
  aDiv.style.padding = '5px';
  aDiv.style.fontSize = '10px';
  aDiv.style.margin = '10px';
  aDiv.style.position = 'absolute';
  aDiv.style.minHeight = '50px';
  aDiv.style.width = '250px';
  aDiv.style.backgroundColor = '#badaaa';
  aDiv.style.borderRadius = '10px';
  aDiv.text = "\"" + selTxt + "\" is saved to your Dic.";
  document.body.appendChild(aDiv);
}

// Create one test item for each context type.
var contexts = ["page","selection","link","editable","image","video",
                 "audio"];
var id = chrome.contextMenus.create({"title": "Save this word to my dic.(?)", "contexts": contexts,
                                       "onclick": genericOnClick});

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": "Open Project Dic. Dashboard"});
var child1 = chrome.contextMenus.create(
  {"title": "Child 1", "parentId": parent, "onclick": genericOnClick});
// var child2 = chrome.contextMenus.create(
//   {"title": "Child 2", "parentId": parent, "onclick": genericOnClick});

