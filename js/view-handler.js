let currentView = "";

// Request a file using AJAX.
function requestView(url) {
    if (url != currentView) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                console.log(xhr.response);
                let responseView = JSON.parse(xhr.response);
                let view = responseView.view;
                let data = responseView.data;
                renderHandlebars(view, data);
                currentView = url;
                //window.history.pushState(view, "", url);
            }
        }
        xhr.send();
    }
    else {
        console.log("View is already loaded.");
    }
}

// Render the view with data.
function renderHandlebars(htmlFile, data) {
    let template = Handlebars.compile(htmlFile);
    let view = template(data);

    document.getElementById("container").innerHTML = view;
}