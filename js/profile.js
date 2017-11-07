let User = function(/*userID*/){

    let printUser = function(){
        document.getElementById('profile-name').innerHTML = currentUser['name'];
        document.getElementById('profile-role').innerHTML = currentUser['role'];
        document.getElementById('profile-bio').innerHTML = currentUser['bio'];
        document.getElementById('profile-picture').src = currentUser['picture'];
    }

    let getCourses = function(){
        for (let i =0; i < currentUser['courses'].length; i++) {
            let courseLink = document.createElement('A');
            courseLink.href = 'coursesample.html';
            courseLink.innerHTML = courses[currentUser['courses'][i]]['title'];
            document.getElementById('profile-course-list').appendChild(courseLink);
        }
    }

    getCourses();
    printUser();
}

let sampleUser = new User();