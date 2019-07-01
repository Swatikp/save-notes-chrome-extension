var activeTab;


window.onchange = function() {
    chrome.storage.local.get("isActive", function(data) {
        if (data.isActive == true) {

            chrome.browserAction.setIcon({ path: "images/off.png" });
            chrome.storage.local.set({
                "isActive": false
            }, function() {
                if (chrome.runtime.lastError) {
                    console.error(
                        "Error setting " + key + " to " + JSON.stringify(data) +
                        ": " + chrome.runtime.lastError.message
                    );
                }
            });




        } else if (data.isActive == false) {
            chrome.browserAction.setIcon({ path: "images/on.png" });
            chrome.storage.local.set({
                "isActive": true
            }, function() {
                if (chrome.runtime.lastError) {
                    console.error(
                        "Error setting " + key + " to " + JSON.stringify(data) +
                        ": " + chrome.runtime.lastError.message
                    );
                }
            });
        }

    });

}
window.onload = function() {
    chrome.storage.local.get("isActive", function(data) {

        if (data.isActive == true) {
            chrome.browserAction.setIcon({ path: "images/on.png" });
            document.getElementById('switchval').setAttribute('checked', 'checked');
        } else if (data.isActive == false) {
            chrome.browserAction.setIcon({ path: "images/off.png" });
            document.getElementById('switchval').removeAttribute('checked');
        }

    });



}