var data = "";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    "isActive": true
  }, function () {
    if (chrome.runtime.lastError) {
      console.error(
        "Error setting " + key + " to " + JSON.stringify(data) +
        ": " + chrome.runtime.lastError.message
      );
    }
  });
});

var filename;
var date;

chrome.runtime.onStartup.addListener(function () {


    chrome.storage.local.get("isActive", function (data) {

      if(data.isActive)
           {
               chrome.browserAction.setIcon({path:"images/on.png"});
              // console.log("coming here");
           }
           else
           {
               chrome.browserAction.setIcon({path:"images/off.png"});
           }
        
    });
      
 // console.log("started");


  data = "";
})

chrome.runtime.onMessage.addListener(function (request, sender) {

  // if(request.task=="search")
  // {
  //   searchWord(request.selected)
  // }

  if (request.task)

  {
    date = new Date();
    myfilename = "notes_" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getHours() + "-" + date.getMinutes() + ".txt";

    var url;
    var datatoadd = "";
    // console.log(request.selected.length);
    for (var i = 80; i < request.selected.length; i += 80) {
      // console.log("here");
      if (i == 80) {
        // console.log("first");
        datatoadd = (request.selected).substring(0, 80);
      } else {
        // console.log("later");
        datatoadd = datatoadd + "\r\n" + "  " + (request.selected).substring(i - 80, i);
      }


    }
   // console.log(i - 80);
    //console.log(request.selected.length);
    if (datatoadd == "") {
      datatoadd = request.selected;
    } else if ((i - 1) != request.selected.length) {
      datatoadd = datatoadd + "\r\n" + "  " + (request.selected).substring(i - 80, request.selected.length);
    }
    //console.log(datatoadd);
    if (request.task == "addToFile") {
      // var a = document.createElement('a');
      // console.log(request.selected+"%%%%%");
      if (data != "") {
        data = data + "\r\n" + "\u2022" + " " + datatoadd;
      } else {
        data = data + "\u2022" + " " + datatoadd;
      }
    //  console.log(data);
    } else if (request.task == "saveFile") {
      if (data != "") {
        data = data + "\r\n" + "\u2022" + " " + datatoadd;
      } else {
        data = data + "\u2022" + " " + datatoadd;
      }
      var blob = new Blob([data], {
        type: '"text/plain;charset=UTF-8"'
      });
   //   console.log("1");
      myurl = window.URL.createObjectURL(blob);


      chrome.downloads.download({
        url: myurl,
        filename: myfilename
      }, function (downloadId) {
       // console.log("download begin, the downId is:" + downloadId);

      });
      data = "";

    }

  }



});