function closeMe()
{
  document.location.href = "aris://closeMe";
}

function prepare(mediaId)
{
    console.log("Prepare Media:" + mediaId);
    document.location.href = "aris://media/prepare/" + mediaId;
}

function play(mediaId)
{
    console.log("Play Media:" + mediaId);
    document.location.href = "aris://media/play/" + mediaId;
}

function stop(mediaId)
{
    console.log("Stop Media:" + mediaId);
    document.location.href = "aris://media/stop/" + mediaId;
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

function sendRequest(fn, params, calledByFunction)
{
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://dev.arisgames.org/server/json.php/v1."+fn,false); 
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params); //Synchronous call
    
    var response=JSON.parse(xmlhttp.responseText);
    //alert(xmlhttp.responseText);
    if(response.returnCode != 0) //Error
    {
        alert(xmlhttp.responseText);
    }
    else
    {
        
        return response.data;   
    }
}


function getItemCountForPlayer(gameId, playerId, itemId) {
    var itemCount = 0;
    var inventoryObj = new Object();
    inventoryObj.gameId = gameId;
    inventoryObj.playerId = playerId;
    inventoryObj.itemId = itemId;
    itemCount = sendRequest("items.getItemCountForPlayer", JSON.stringify(inventoryObj));
    
    return itemCount;
}


function setItemCountForPlayer(gameId, playerId, itemId, itemCount) {
    var inventoryObj = new Object();
    inventoryObj.gameId = gameId;
    inventoryObj.playerId = playerId;
    inventoryObj.itemId = itemId;
    inventoryObj.qty = itemCount;
    sendRequest("players.setItemCountForPlayer", JSON.stringify(inventoryObj));
    
    
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


function updateWebHook(gameId, webHookId, name, url) {
    
    var webHookObj = new Object();
    webHookObj.intGameID = gameId;
    webHookObj.intWebHookID = webHookId;
    webHookObj.strName = name;
    webHookObj.strURL = url;
    sendRequest("webhooks.updateWebHook", JSON.stringify(webHookObj));
    
}
