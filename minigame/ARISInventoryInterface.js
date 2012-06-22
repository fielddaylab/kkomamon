


function sendRequest(fn, params, calledByFunction)
{
  var xmlhttp;
  xmlhttp=new XMLHttpRequest();
  //xmlhttp.open("POST","../../../json.php/v1."+fn,false);
  xmlhttp.open("POST","dev.arisgames.org/server/json.php/v1."+fn,false); 
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params); //Synchronous call

  var response=JSON.parse(xmlhttp.responseText);
  alert(xmlhttp.responseText);
  document.getElementById('playerLogs').innerHTML = response.data;
  if(response.returnCode != 0) //Error
  {
      alert(xmlhttp.responseText);
  }
  else
  {
      
      return response.data;   
  }
}

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1;
  var queryEnd   = url.indexOf("#") + 1 || url.length + 1;
  var query      = url.slice(queryStart, queryEnd - 1);

  var params  = {};
  if (query === url || query === "") return params;
  var nvPairs = query.replace(/\+/g, " ").split("&");

  for (var i=0; i<nvPairs.length; i++) {
    var nv = nvPairs[i].split("=");
    var n  = decodeURIComponent(nv[0]);
    var v  = decodeURIComponent(nv[1]);
    if ( !(n in params) ) {
      params[n] = [];
    }
    params[n].push(nv.length === 2 ? v : null);
  }
    return params;
}


function getItemCountForPlayer(gameId, playerId, itemId) {
    var inventoryObj = new Object();
    inventoryObj.gameId = gameId;
    inventoryObj.playerId = playerId;
    sendRequest("items.getItemsForPlayer", JSON.stringify(inventoryObj));
    
    var allItems = data;
    for (item in allItems) {
        if (allItems[item] == itemId) {
            itemCount = allItems[item].qty;
        }
    }
    
    return itemCount;
}



function giveItemToPlayer(gameId, playerId, itemId, qtyToGive) {
    var inventoryObj = new Object();
    inventoryObj.intGameId = gameId;
    inventoryObj.intItemID = itemId;
    inventoryObj.intPlayerID = playerId;
    inventoryObj.qtyToGive = qtyToGive;
    sendRequest("players.giveItemToPlayer", JSON.stringify(inventoryObj));
}

function takeItemFromPlayer(gameId, playerId, itemId, qtyToTake) {
    var inventoryObj = new Object();
    inventoryObj.intGameId = gameId;
    inventoryObj.intItemID = itemId;
    inventoryObj.intPlayerID = playerId;
    inventoryObj.qtyToGive = qtyToGive;
    sendRequest("players.takeItemFromPlayer", JSON.stringify(inventoryObj));
}

/*function setItemCountForPlayer(gameId, playerId, itemId, itemCount) {
 var inventoryObj = new Object();
 inventoryObj.gameId = gameId;
 inventoryObj.playerId = playerId;
 inventoryObj.itemId = itemId;
 sendRequest("players.giveItemToPlayer", JSON.stringify(inventoryObj));
 
 
 }*/

function updateWebHook(gameId, webHookId, name, url) {
    
    var webHookObj = new Object();
    webHookObj.intGameID = gameId;
    webHookObj.intWebHookID = webHookId;
    webHookObj.strName = name;
    webHookObj.strURL = url;
    sendRequest("webhooks.updateWebHook", JSON.stringify(webHookObj));
    
}
