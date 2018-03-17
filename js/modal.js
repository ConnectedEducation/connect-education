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