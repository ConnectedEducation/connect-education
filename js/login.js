document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("login-button").addEventListener("click", (event) => {
        let stuid = document.getElementById("stuid").value;
        let password = document.getElementById("password").value;

        console.log("ID:", stuid);
        console.log("Pass:", password);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/login");
        xhr.onload = () => {
            if (xhr.status == 200) {
                console.log("RESPONSE:", xhr.response);
                let user = JSON.parse(xhr.response);
                if(document.getElementById("user-button")){
                    document.getElementById("user-button").addEventListener("click", (event) => {
                        requestView("/user/" + user.userID);
                    });
                    document.getElementById("nav-profile-pic").src = user.avatarDir;
                    document.getElementById("user-name").innerText = user.firstName + " " + user.lastName;
                }
                requestView('/dashboard');
            } else {
                alert("No user found.");
            }
        };
        xhr.send(JSON.stringify({userID: stuid, password: password}));
    });
});