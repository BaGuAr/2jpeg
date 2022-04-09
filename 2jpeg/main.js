document.getElementById("chn").onclick = function() { //button clicked event. popup.html's button. 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //get current tab. if just do document... it will return popup.html btw.
    //so I need to run it after inject the function( if inject the function it will call.
    var activeTab = tabs[0];
    var activeTabId = activeTab.id;
    //chrome.tabs.exe... is outdated.
    chrome.scripting.executeScript({ 
      target: {tabId: activeTabId},
      function: setIDtoImg
    });
    //if the function need args
    // add args: [a,b] xd i forgot google it plz.
 });
};

function setIDtoImg(){
  var imgs = document.getElementsByTagName("img")
  for(let i=0;i<imgs.length; i++){
      var id = Math.random().toString(32).substring(2).toString()
      imgs[i].id = id
      var image = new Image();
      image.onload = function(){
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        canvas.getContext('2d').drawImage(this, 0, 0);
        var lnk = canvas.toDataURL('image/jpeg').toString();
        document.getElementById(id).src = lnk;
        imgs[i].src = lnk;
      };
      // when toDataURL errored for 
      //Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported. at Image.image.onload
      // i googled how to fix and its just add below
      image.crossOrigin = "Anonymous"; //<-- this
      image.src = document.getElementById(id).src; //image.onload = function(){...} will call.
  }   
}
