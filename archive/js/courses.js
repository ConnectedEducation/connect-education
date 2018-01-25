for(let course in courses){
    console.log(course);

    let courseDescription = document.createElement('P');
    courseDescription.className = "course-description";
    let courseTitle = document.createElement('H1');
    courseTitle.className = "course-title";
    let courseContainer = document.createElement('A');
    courseContainer.href = 'coursesample.html';
    courseContainer.className = "ce-panel course";

    courseDescription.textContent = courses[course]['description'];
    courseTitle.textContent = courses[course]['title'];

    courseContainer.appendChild(courseTitle);
    courseContainer.appendChild(document.createElement('HR'));
    courseContainer.appendChild(courseDescription);

    document.getElementById('courses-container').appendChild(courseContainer);
}