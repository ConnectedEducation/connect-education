let chatContent = document.getElementById('chat-content');
let chatInput = document.getElementById('chat-message-textbox');
let chatButton = document.getElementById('chat-submit-button');
let sizeToggleButton = document.getElementById('chat-size-toggle-button');
let chatCollapsible = document.getElementById('chat-collapsible');
let chatTop = document.getElementById('chat-top');

// Add profile picture next to each message

function chat() {

    chatInput.onkeydown = function (event) {
        if (event.keyCode == 13)
            sendMessage();
    }

    let sendMessage = function () {
        let message = chatInput.value;
        message = message.replace(/[<>]/g, ''); // Temporary sanitization measure.
        let messageContainer = document.createElement('DIV');
        
        console.log(message.match(/^\s+$/));
        if(message != '' && !message.match(/^\s+$/)){
            messageContainer.innerHTML = message;
            chatContent.appendChild(messageContainer);
            chatContent.appendChild(document.createElement('BR'));
        }
        clearInput(chatInput);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    let clearInput = function (ele) {
        ele.value = '';
    }

    let toggleSize = function () {
        if (chatCollapsible.style.display != 'none') {
            chatCollapsible.style.display = 'none';
            sizeToggleButton.innerHTML = '+';
            chatTop.style.borderBottomStyle = 'none';
        } else {
            chatCollapsible.style.display = 'block';
            sizeToggleButton.innerHTML = '-';
            chatTop.style.borderBottomStyle = 'solid';
        }
    }

    chatButton.addEventListener("click", sendMessage, false);
    sizeToggleButton.addEventListener("click", toggleSize, false);
}

let myChat = new chat();