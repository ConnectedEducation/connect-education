let User = function(/*userID*/){

    let printUser = function(){
        document.getElementById('profile-name').textContent = currentUser['name'];
        document.getElementById('profile-role').textContent = currentUser['role'];
        document.getElementById('profile-bio').textContent = currentUser['bio'];
        document.getElementById('profile-picture').src = currentUser['picture'];
    }

    let getCourses = function(){
        for (let i =0; i < currentUser['courses'].length; i++) {
            let courseLink = document.createElement('A');
            courseLink.href = 'coursesample.html';
            courseLink.textContent = courses[currentUser['courses'][i]]['title'];
            document.getElementById('profile-course-list').appendChild(courseLink);
        }
    }

    getCourses();
    printUser();
}

let sampleUser = new User();