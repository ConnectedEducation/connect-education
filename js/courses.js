let courses = {
    INFO4105: {
        title: "INFO 4105: Search Engine Principles (S10)",
        description: "Students will learn the principles of search engines and information retrieval. Information filtering and retrieval drives some of the world's most successful and high-tech businesses. Students will learn various methods of search engine optimization (SEO), ranging from theory to implementation. Students will learn how to use tools and methods to perform searches and utilize results effectively. They will also learn how large data sources such as social media affects information retrieval."
    },
    INFO4115: {
        title: "INFO 4115: Human Factors and Web Design (S50)",
        description: "Students will learn computer interface design requirements based on perceptual and cognitive factors; learnability; recall, recognition and retention; speed and accuracy of performance, and apply them in Web design process. They will learn website planning and design, usability, website navigation design, graphics and color selection, text formatting using cascated style sheet (CSS), browser compatibility testing and interactivity design using JavaScripts."
    },
    INFO4190: {
        title: "INFO 4190: Integration Project I (S50)",
        description: "Students will conduct an extensive literature review and research for projects originating from faculty or the stakeholders from the industry or local communities. Students will carry out detailed project designs and complete the overall project design documentation in this capstone course. They will report the design results through presentations that are open to all faculty and students in the department and industry sponsors. Students will apply in great depth and breadth the system, hardware, software and project management knowledge they learned in the program to the accomplish the tasks of the project. Note: This course is a prerequisite for INFO 4290 Integration Project II where the students will implement their designs using software and/or hardware."
    }
}

let coursesContainer = document.getElementById('courses-container');

for(let course in courses){
    console.log(course);

    let courseDescription = document.createElement('P');
    courseDescription.className = "course-description";
    let courseTitle = document.createElement('H1');
    courseTitle.className = "course-title";
    let courseContainer = document.createElement('A');
    courseContainer.href = 'coursesample.html';
    courseContainer.className = "ce-panel course";

    courseDescription.innerHTML = courses[course]['description'];
    courseTitle.innerHTML = courses[course]['title'];

    courseContainer.appendChild(courseTitle);
    courseContainer.appendChild(document.createElement('HR'));
    courseContainer.appendChild(courseDescription);
    coursesContainer.appendChild(courseContainer);
}