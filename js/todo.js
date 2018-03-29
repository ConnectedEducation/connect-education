console.log("modal.js loaded");

function toggleModal(ele) {

    let modal = document.getElementById("modal");

    // Make modal disappear on click.
    modal.onclick = () => {
        modal.innerHTML = "";
        modal.style.display = "none";
    };

    // Make modal appear.
    if (modal.style.display == "none") {
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";

        let clonedTodo = ele.cloneNode(true);
        clonedTodo.style.width = "70%";
        modal.appendChild(clonedTodo);
    }
}

function submitFile(ele, item) {

    // Just make max upload limit one for now.
    let file = ele.getElementsByClassName("submission")[0].files[0];

    // AJAX call to upload file
    if (file) {
        console.log("FILE:", file);

        
        let req = {
            id: "Placeholder",
            file: file,
            test: {this: true, is: 99, a: "true", test: "YEAH"}
        }

        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "/submission");
        xhr.onload = () => {
            if(xhr.status == 200){
                console.log("success!");
            }
        }
        // Send JSON file containing information about TODO
        // JSON file should contain file
        xhr.send(JSON.stringify(req));

        // Send info about todo to inform the server-side query
    } else {
        console.log("No file attached.");
    }
}