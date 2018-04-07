// I guess this is why React is a thing

var socket = io();

let chatsContainer = document.createElement('DIV');
chatsContainer.id = "chats-container";
document.body.appendChild(chatsContainer);

// > Add profile picture next to each message
// > Allow for user to enter linebreaks using SHIFT+Enter
function Chat(/*chatID*/ name) {
    let chatContainer = document.createElement('DIV');
    chatContainer.className = 'chat-container';

    let chatTop = document.createElement('DIV');
    chatTop.className = 'chat-top';

    let chatGroupName = document.createElement('DIV');
    chatGroupName.className = 'chat-group-name';
    chatGroupName.innerHTML = name;

    let chatControlsTop = document.createElement('DIV');
    chatControlsTop.className = 'chat-controls';

    let sizeToggleButton = document.createElement('BUTTON');
    sizeToggleButton.className = 'chat-size-toggle-button';
    sizeToggleButton.className = 'button btn';
    sizeToggleButton.innerHTML = '-';

    let chatCollapsible = document.createElement('DIV');
    chatCollapsible.className = 'chat-collapsible';

    let chatContent = document.createElement('DIV');
    chatContent.className = 'chat-content';

    let chatControlsBottom = document.createElement('DIV');
    chatControlsBottom.className = 'chat-controls chat-bottom';

    let chatInput = document.createElement('TEXTAREA');
    chatInput.className = 'chat-message-textbox';
    chatInput.placeholder = 'type in a message';

    let chatButton = document.createElement('BUTTON');
    chatButton.className = 'chat-submit-button';
    chatButton.className = 'button btn';
    chatButton.innerHTML = 'Send';

    chatContent.style.position = "relative";

    let userIsTyping = document.createElement('DIV');
    userIsTyping.id = "user-is-typing";
    userIsTyping.style.position = "absolute";
    userIsTyping.style.bottom = "0.5em";
    userIsTyping.style.right = "0.5em";
    userIsTyping.textContent = "User is typing...";
    userIsTyping.style.display = "none";

    // Build the chat box
    //document.body.appendChild(chatContainer);
    chatsContainer.appendChild(chatContainer);
    chatContainer.appendChild(chatTop);
    chatTop.appendChild(chatGroupName);
    chatTop.appendChild(chatControlsTop);
    chatControlsTop.appendChild(sizeToggleButton);
    chatContainer.appendChild(chatCollapsible);
    chatContent.appendChild(userIsTyping);
    chatCollapsible.appendChild(chatContent);
    chatCollapsible.appendChild(chatControlsBottom);
    chatControlsBottom.appendChild(chatInput);
    chatControlsBottom.appendChild(chatButton);

    let messageHistory = [];
    // Mobile responsive design
    // Turn this into seperate resize function
    console.log(window.innerWidth / window.innerHeight);
    if (window.innerWidth / window.innerHeight < 1) {
        console.log('mobile');
        chatsContainer.style.right = '0';
        chatsContainer.style.width = '60%';
        chatContent.style.maxHeight = '14em';
    }

    chatInput.oninput = function (event) {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';

        if (this.scrollHeight > 120) {
            this.style.overflow = 'auto';
        }
        if (event.keyCode == 13) {
            //sendMessage();
        } else {
            if (chatInput.value != "") {
                console.log("User is typing.");
                socket.emit("typing");
            } else {
                socket.emit("not typing");
            }
        }
    }

    chatInput.onkeyup = function (event) {
        if (event.keyCode == 13) {
            sendMessage();
        }
    }

    /*
    let loadMessages = function(){
        Hmm... make object for each chat that holds message history
        Something like:
            let chatHistory = {
                chatID: chatID,
                messages: []
            } 
            
        load from messageHistory
    }
    */
    document.addEventListener("DOMContentLoaded", (event) => {

        let isTyping = false;

        socket.on("chat message", (msg) => {
            let messageContainer = document.createElement('DIV');
            messageContainer.textContent = msg;
            chatContent.appendChild(messageContainer);
            chatContent.appendChild(document.createElement("BR"));
            //userIsTyping.style.display = "none";
        });

        socket.on("typing", () => {
            console.log("TYPING EMITTED WOOOW");
            userIsTyping.style.display = "block";
        });

        socket.on("not typing", () => {
            userIsTyping.style.display = "none";
        });
    });

    function sendMessage() {
        let message = chatInput.value;

        console.log("clicked send button!");
        messageHistory.push(message);

        let messageContainer = document.createElement('DIV');

        if (message != '' && !message.match(/^\s+$/)) {
            socket.emit("chat message", message);
            socket.emit("not typing");
            chatInput.value = "";
        }

        chatContent.scrollTop = chatContent.scrollHeight;
        clearInput(chatInput);
        chatInput.focus();

        console.log(messageHistory);
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
    //chatInput.addEventListener("keyup", detectTyping, false);
    //toggleSize(); // start minimized?
}

let nuChat = new Chat('Fran Ericsson');
//let theChat = new Chat('The Goons');