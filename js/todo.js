console.log("modal.js loaded");

function toggleModal(ele) {

    let modal = document.getElementById("modal");
    let modalContent = document.getElementById("modal-content");

    // Make modal disappear.
    document.getElementById("modal-closer").onclick = () => {
        modalContent.innerHTML = "";
        modal.style.display = "none";
    };

    // Make modal appear.
    if (modal.style.display == "none") {
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";

        let clonedTodo = ele.cloneNode(true);
        clonedTodo.style.cursor = "auto";
        clonedTodo.getElementsByClassName("clickable")[0].onclick = "";
        clonedTodo.style.width = "80%";
        clonedTodo.style.zIndex = "99";
        modalContent.appendChild(clonedTodo);
    }
}

function submitFile(ele, item) {

    // Just make max upload limit one for now.
    let file = ele.getElementsByClassName("submission")[0].files[0];

    let reader = new FileReader();

    // AJAX call to upload file
    if (file) {
        console.log("FILE:", file);

        let req = {
            _id: ele.dataset._id,
            // Change property file's value
            file: "",
            name: file.name,
        }
        console.log(req);

        reader.onload = (event) => {
            console.log("event.target.result:", event.target.result);
            req.file = event.target.result;

            let xhr = new XMLHttpRequest();
            xhr.open("PUT", "/submission");
            xhr.onload = () => {
                if (xhr.status == 200) {
                    console.log("success!");
                    console.log("FileRead:", req.file);
                    let submission = document.createElement("SPAN");
                    submission.innerText = req.name;
                    ele.getElementsByClassName("submissions")[0].appendChild(submission);
                }
            }

            // Send JSON file containing information about TODO
            // JSON file should contain file
            xhr.send(JSON.stringify(req));
        }

        reader.readAsDataURL(file);

        // Send info about todo to inform the server-side query
    } else {
        console.log("No file attached.");
    }
}