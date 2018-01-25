let courses = {
    // change to CRN instead
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

let todos = {
    1: {
        title: 'Prototype Alpha',
        course: 'INFO 4115 (S50)',
        dueDate: 'Nov. 7, 2017',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    2: {
        title: 'Assignment 2',
        course: 'INFO 4105 (S10)',
        dueDate: 'Nov. 9, 2017',
        body: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes)."
    },
    3: {
        title: 'Progress Report',
        course: 'INFO 4105 (S10)',
        dueDate: 'Nov. 9, 2017',
        body: "Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo ang pagkaka-ayos nito upang makagawa ng libro ng mga type specimen. Nalagpasan nito hindi lang limang siglo, kundi nalagpasan din nito ang paglaganap ng electronic typesetting at nanatiling parehas. Sumikat ito noong 1960s kasabay ng pag labas ng Letraset sheets na mayroong mga talata ng Lorem Ipsum, at kamakailan lang sa mga desktop publishing software tulad ng Aldus Pagemaker ginamit ang mga bersyon ng Lorem Ipsum."
    }
}

let currentUser = {
    name: 'Hugh Mungus',
    picture: 'assets/images/blank-profile-picture.png',
    bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.,",
    courses: ['INFO4105', 'INFO4115', 'INFO4190'],
    role: 'Student'
}