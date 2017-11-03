let chatContainer = document.getElementById('chat-container');
let chatContent = document.getElementById('chat-content');
let chatInput = document.getElementById('chat-message-textbox');
let chatButton = document.getElementById('chat-submit-button');
let sizeToggleButton = document.getElementById('chat-size-toggle-button');
let chatCollapsible = document.getElementById('chat-collapsible');
let chatTop = document.getElementById('chat-top');

// Add profile picture next to each message

function chat() {

    // Mobile responsive design
    console.log(window.innerWidth/window.innerHeight);
    if(window.innerWidth/window.innerHeight < 1){
        chatContainer.style.right = '0em';
        chatContainer.style.width = '100%';
    }

    chatInput.oninput = function (event) {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';

        if(this.scrollHeight > 120){
            this.style.overflow = 'auto';
        }
        if(event.keyCode == 13){
            sendMessage();
        }
    }

    
    chatInput.onkeyup = function(event){
        if(event.keyCode == 13){
            sendMessage();
        }
    }

    let sendMessage = function () {
        let message = chatInput.value;
        message = message.replace(/[<>]/g, ''); // Temporary sanitization measure.
        let messageContainer = document.createElement('DIV');
        
        if(message != '' && !message.match(/^\s+$/)){
            messageContainer.innerHTML = message;
            chatContent.appendChild(messageContainer);
            chatContent.appendChild(document.createElement('BR'));
        }

        chatContent.scrollTop = chatContent.scrollHeight;
        clearInput(chatInput);
    }

    let clearInput = function (ele) {
        ele.value = '';
        ele.style.height = '2em';
        ele.style.overflow = 'hidden';
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
        sizeToggleButton.blur();
    }

    chatButton.addEventListener("click", sendMessage, false);
    sizeToggleButton.addEventListener("click", toggleSize, false);
}

let myChat = new chat();