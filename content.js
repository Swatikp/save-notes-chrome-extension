var flag;
var show;




var bubbleDOM = document.createElement('input');

bubbleDOM.setAttribute('type', 'button');


bubbleDOM.setAttribute('class', 'selection_bubble');
bubbleDOM.setAttribute('id', "btn");
document.body.appendChild(bubbleDOM);

var inputDOM = document.createElement('input');

inputDOM.setAttribute('type', 'button');


inputDOM.setAttribute('class', 'selection_bubble');
inputDOM.setAttribute('id', "btn");
document.body.appendChild(inputDOM);


document.addEventListener('mouseup', function(e) {

    var selection = window.getSelection();
    if (selection.toString().length > 0) {
        renderBubble(e.pageX, e.pageY, selection);
    }
}, false);


//Close the bubble when we click on the screen.
document.addEventListener('mousedown', function(e) {
    if (bubbleDOM.id != e.target.id && bubbleDOM.style.visibility == 'visible') {
        bubbleDOM.removeAttribute("value");
        inputDOM.removeAttribute("value");
        bubbleDOM.style.visibility = 'hidden';
        inputDOM.style.visibility = 'hidden';
    }
}, false);

// Move the bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
    chrome.storage.local.get("isActive", function(data) {
        if (data.isActive == true) {
            showit(mouseX, mouseY, selection);

        } else {
            chrome.browserAction.setIcon({ path: "images/off.png" });
        }
    });






}

function showit(mouseX, mouseY, selection) {

    if (bubbleDOM.hasAttribute('value') == false) {
        bubbleDOM.setAttribute('value', "Add to file");
        inputDOM.setAttribute('value', "Save file");


        bubbleDOM.style.top = mouseY + 'px';
        bubbleDOM.style.left = mouseX + 'px';
        bubbleDOM.style.visibility = 'visible';
        inputDOM.style.top = mouseY + 'px';
        inputDOM.style.left = (mouseX + 102) + 'px';
        inputDOM.style.visibility = 'visible';
        bubbleDOM.onclick = function() {
            addToFile(selection.toString());
        };
        inputDOM.onclick = function() {
            saveFile(selection.toString());
        };
    }
}

function saveFile(selection) {

    //console.log("Data to add and thn save :" + selection);
    bubbleDOM.style.visibility = 'hidden';
    inputDOM.style.visibility = 'hidden';
    // console.log(bubbleDOM.style.visibility);
    chrome.runtime.sendMessage({
        task: 'saveFile',
        selected: selection
    }, function() {
        bubbleDOM.removeAttribute("value");
        inputDOM.removeAttribute("value");
    });
    selection = "";
}

function addToFile(selection) {

    // console.log("Data to add :" + selection);


    bubbleDOM.style.visibility = 'hidden';
    inputDOM.style.visibility = 'hidden';
    // console.log(bubbleDOM.style.visibility);



    chrome.runtime.sendMessage({
        task: 'addToFile',
        selected: selection
    }, function() {
        bubbleDOM.removeAttribute("value");
        inputDOM.removeAttribute("value");
    });
    selection = "";
}