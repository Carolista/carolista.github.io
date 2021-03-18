


// Event listener for page load
window.addEventListener("load", function() {
    console.log('Page loaded.');
    init();
});

// DOM code for page elements
function init() {


    /** TAB TITLE **/

    // Tack on to end of <title> content specified in html doc
    document.title += "Caroline Jones | Web Developer";


    /** STYLE SHEETS & FONTS **/

    const head = document.querySelector("head");
    head.innerHTML += `
        <link rel="stylesheet" type="text/css" href="styles.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&family=Barlow:wght@200;400;600;800&display=swap" rel="stylesheet">
    `


    /** HEADER **/

    const header = document.querySelector("header");
    header.innerHTML = `
        <nav class="nav-container">
            <p id="header-name"><a class="inverted" href="/">Caroline R. Jones</a></p>
            <button type="button" class="nav-button" aria-label="Open dropdown nav">
                <span class="tri-bar"></span>
                <span class="tri-bar"></span>
                <span class="tri-bar"></span>
            </button>
            <div class="nav-menu">
                <ul class="nav-links">
                    <li class="nav-item"><a class="nav-link" id="projects" href="/projects.html">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" id="experience" href="/experience.html">Experience</a></li>
                    <li class="nav-item"><a class="nav-link" id="education" href="/education.html">Education</a></li>
                    <li class="nav-item"><a class="nav-link" id="skills" href="/skills.html">Skills</a></li>
                    <li class="nav-item"><a class="nav-link" id="recommendations" href="/recommendations.html">Recommendations</a></li>
                    <li class="nav-item"><a class="nav-link" id="contact" href="/contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;



    /** NAV BAR **/

    // TODO: Add event listeners to highlight current page on navbar
    // TODO: Consider adding dropdown for projects
    // FIXME: remove fade-in upon page loading
    // FIXME: change up colors

    const navbar = document.getElementById("navbar");
    const navButton = navbar.querySelector(".nav-button");

    function openDropdown() {
        navbar.classList.add("opened");
        navButton.setAttribute("aria-label", "Close dropdown nav");
    }

    function closeDropdown() {
        navbar.classList.remove("opened");
        navButton.setAttribute("aria-label", "Open dropdown nav");
    }

    navButton.addEventListener("click", () => {
        if (navbar.classList.contains("opened")) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    const navMenu = navbar.querySelector(".nav-menu");
    const navLinksContainer = navbar.querySelector(".nav-links");

    navLinksContainer.addEventListener("click", (clickEvent) => {
        clickEvent.stopPropagation();
    });

    navMenu.addEventListener("click", closeDropdown);



    /** MAIN **/

    /*
        Everything below controls the contents with the <main> element of each page, but data from JSON will only load for the matching page.
    */

    // Arrays to hold any data loaded
    let projectData = [];
    let experienceData = [];
    let educationData = [];
    let skillsData = {
        generalKnowledge: [],
        generalStrengths: [],
        generalTools: [],
        techFrameworks: [],
        techKnowledge: [],
        techLanguages: [],
        techTools: []
    };
    let recommendationData = [];
    
    // DOM elements for each page where content should be displayed
    let projectArea = document.querySelector("#project-area");
    let detailArea = document.querySelector("#detail-area");
    let expArea = document.querySelector("#exp-area");
    let edArea = document.querySelector("#ed-area");
    let techFrameworksArea = document.querySelector("#tech-frameworks-area");
    let techLanguagesArea = document.querySelector("#tech-languages-area");
    let techToolsArea = document.querySelector("#tech-tools-area");
    let techKnowledgeArea = document.querySelector("#tech-knowledge-area");
    let generalToolsArea = document.querySelector("#general-tools-area");
    let generalStrengthsArea = document.querySelector("#general-strengths-area");
    let generalKnowledgeArea = document.querySelector("#general-knowledge-area");
    let recArea = document.querySelector("#rec-area");

    // Determine which data should be loaded, if any
    function loadAndDisplayData() {
        if (document.title.toLowerCase().includes("project")) { // for both gallery & detail pages
            loadProjects();
        } else if (document.title.toLowerCase().includes("experience")) {
            loadExperience();
        } else if (document.title.toLowerCase().includes("education")) {
            loadEducation();
        } else if (document.title.toLowerCase().includes("skills")) {
            loadSkills();
        } else if (document.title.toLowerCase().includes("recommendations")) {
            loadRecommendations();
        }
    }

    // For Projects page
    function loadProjects() {
        fetch('/data/projects.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(obj => {
                    let project = {
                        id: obj.id,
                        title: obj.title,
                        subtitle: obj.subtitle,
                        desc: obj.desc,
                        tech: obj.tech,
                        noteworthy: obj.noteworthy,
                        demo: { type: obj.demo.type, url: obj.demo.url},
                        code: { type: obj.code.type, url: obj.code.url},
                        images: obj.images,
                        inProgress: obj.inProgress
                    }
                    projectData.push(project);
                });     
        });
        // Determine which information to display (full gallery or detail)
        if (document.title.toLowerCase().includes("projects")) {
            displayProjects();
        } else {
            displayProjectDetail();
        }
        
    }

    function displayProjects() {
        setTimeout(function() {
            for (let i=0; i < projectData.length; i++) {
                // TODO: create responsive gallery of all projects not in progress
                if (! projectData[i].inProgress) {
                    projectArea.innerHTML += `
                            <div class="gallery-column">
                                <div class="project-content">
                                    <a href="project-details.html?id=${projectData[i].id}"><img class="project-image" src="images/${projectData[i].images[0]}"></a>
                                    <h3>${projectData[i].title}</h3>
                                    <p>${projectData[i].subtitle}</p>
                                    <p class="text-right project-link"><a href="project-details.html?id=${projectData[i].id}" target="_blank">View Details &gt;</a></p>
                                </div>
                            </div>
                    `;
                }
            }
        }, 200); // only needs a slight delay
    }

    function displayProjectDetail() {
        setTimeout(function() {
            // Get query parameter to get id number (index)
            let param = new URLSearchParams(window.location.search);
            let projectId = param.get('id');
            let projectIndex;
            //Get index from array based on project id
            for (let j=0; j < projectData.length; j++) {
                if (projectData[j].id === Number(projectId)) {
                    projectIndex = j;
                }
            }

            let currentProject = projectData[projectIndex];
            
            // Update browser tab with specific project name
            document.title = currentProject.title + " - " + document.title;

            // Create bullet points from noteworthy array
            let bullets = "";
            for (let i=0; i<currentProject.noteworthy.length; i++) {
                bullets += `
                    <li>${currentProject.noteworthy[i]}</li>
                `
            }
            // Create links
            let links = "";
            if (currentProject.demo.url !== "") {
                links += `<b>Demo:</b> <a href="${currentProject.demo.url}" target="_blank">${currentProject.demo.type}</a>`;
            }
            if (currentProject.demo.url !== "" && currentProject.code.url !== "") {
                links += ` &nbsp;&#124;&nbsp; `;
            }
            if (currentProject.code.url !== "") {
                links += `<b>Code:</b> <a href="${currentProject.code.url}" target="_blank">${currentProject.code.type}</a>`;
            }
            // Create images
            let images = "";
            for (let i=0; i<currentProject.images.length; i++) {
                images += `
                    <img class="project-detail-image" src="images/${currentProject.images[i]}" />
                `
            }
            // Assemble all HTML for project details
            detailArea.innerHTML = `
                <div class="project-details-col">
                    <h1 id="project-title" class="page-title">${currentProject.title}</h1>
                    <h3 id="project-subtitle">${currentProject.subtitle}</h3>
                    <p>${currentProject.desc}</p>
                    <h4 class="project-section">Tech Stack</h4>
                    <p>${currentProject.tech}</p>
                    <h4 class="project-section">Noteworthy</h4>
                    <ul class="bullet-points">${bullets}</ul>
                    <p id="project-links">${links}</p>
                </div>
                <div class="project-details-col">
                    ${images}
                </div>
            `
        }, 200); // only needs a slight delay
    }

    // For Experience page
    function loadExperience() {
        fetch('/data/experience.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(obj => {
                    let job = {
                        id: obj.id,
                        employer: obj.employer,
                        period: obj.period,
                        title: obj.title,
                        type: obj.type,
                        location: obj.location,
                        desc: obj.desc
                    }
                    experienceData.push(job);
                });     
        });
        displayExperience();
    }

    function displayExperience() {
        setTimeout(function() {
            for (let i=0; i < experienceData.length; i++) {
                expArea.innerHTML += `
                    <div class="content-block">                        
                        <p><span class="employer">${experienceData[i].employer}</span><br />
                        ${experienceData[i].type} &nbsp;&bull;&nbsp; ${experienceData[i].location} &nbsp;&bull;&nbsp; ${experienceData[i].period}</p>
                        <p class="job-title">${experienceData[i].title}</p>
                        <p>${experienceData[i].desc}</p>
                    </div>
                `;
            }
        }, 200); // only needs a slight delay
    }

    // For Education page
    function loadEducation() {
        fetch('/data/education.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(obj => {
                    let ed = {
                        id: obj.id,
                        institution: obj.institution,
                        gradDate: obj.gradDate,
                        degree: obj.degree,
                        desc: obj.desc,
                        image: obj.image
                    }
                    educationData.push(ed);
                });     
        });
        displayEducation();
    }

    function displayEducation() {
        setTimeout(function() {
            for (let i=0; i < educationData.length; i++) {
                // FIXME: move link to institution website to a property and redo HTML below
                // TODO: decide if using logos or not
                edArea.innerHTML += `
                <div class="content-block">                        
                    <p><span class="institution">${educationData[i].institution}</span><br />
                    ${educationData[i].gradDate}</p>
                    <p class="degree">${educationData[i].degree}</p>
                <p>${educationData[i].desc}</p>
            </div>
                `;
            }
        }, 200); // only needs a slight delay
    }

    // For Skills page
    function loadSkills() {
        fetch('/data/skills.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(obj => {
                    let skill = {
                        id: obj.id,
                        skillName: obj.skillName,
                        category: obj.category,
                        type: obj.type
                    }
                    if (skill.type === "General") {
                        if (skill.category === "Knowledge") {
                            skillsData.generalKnowledge.push(skill);
                        } else if (skill.category === "Strengths") {
                            skillsData.generalStrengths.push(skill);
                        } else if (skill.category === "Tools") {
                            skillsData.generalTools.push(skill);
                        }
                    } else { // Tech
                        if (skill.category === "Frameworks") {
                            skillsData.techFrameworks.push(skill);
                        } else if (skill.category === "Knowledge") {
                            skillsData.techKnowledge.push(skill); 
                        } else if (skill.category === "Languages") {
                            skillsData.techLanguages.push(skill);
                        } else if (skill.category === "Tools") {
                            skillsData.techTools.push(skill);
                        }
                    }
                });     
        });
        displaySkills();
    }

    function displaySkills() {
        setTimeout(function() {
            for (group in skillsData) {
                skillsData[group].sort((a, b) => a.skillName > b.skillName ? 1 : -1);
                for (let i=0; i < skillsData[group].length; i++) {
                    if (skillsData[group][i].type === "Tech") {
                        if (skillsData[group][i].category === "Frameworks") {
                            techFrameworksArea.innerHTML += `
                                <p class="skill-name">${skillsData[group][i].skillName}</p>
                            `
                        } else if (skillsData[group][i].category === "Languages") {
                            techLanguagesArea.innerHTML += `
                                <p class="skill-name">${skillsData[group][i].skillName}</p>
                            `
                        } else if (skillsData[group][i].category === "Tools") {
                            techToolsArea.innerHTML += `
                                <p class="skill-name">${skillsData[group][i].skillName}</p>
                            `
                        } else if (skillsData[group][i].category === "Knowledge") {
                            techKnowledgeArea.innerHTML += `
                                <p class="skill-name">${skillsData[group][i].skillName}</p>
                            `
                        }
                    } else if (skillsData[group][i].type === "General") {
                        if (skillsData[group][i].category === "Tools") {
                            generalToolsArea.innerHTML += `
                                <p class="skill-name">${skillsData[group][i].skillName}</p>
                            `
                        } else if (skillsData[group][i].category === "Strengths") {
                            generalStrengthsArea.innerHTML += `
                                <p class="skill-name">${skillsData[group][i].skillName}</p>
                            `
                        } else if (skillsData[group][i].category === "Knowledge") {
                            generalKnowledgeArea.innerHTML += `
                                <p class="skill-name">${skillsData[group][i].skillName}</p>
                            `
                        }
                    }
                }
                
            }
        }, 200); // only needs a slight delay
    }

    // For Recommendations page
    function loadRecommendations() {
        fetch('/data/recommendations.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(obj => {
                    let rec = {
                        id: obj.id,
                        author: obj.author,
                        relationship: obj.relationship,
                        recText: obj.recText
                    }
                    recommendationData.push(rec);
                });     
        });
        displayRecommendations();
    }

    function displayRecommendations() {
        setTimeout(function() {
            for (let i=0; i < recommendationData.length; i++) {
                recArea.innerHTML += `
                    <div class="content-block">
                        
                        <p>${recommendationData[i].recText}</p>
                        <p class="text-right"><span class="rec-name">${recommendationData[i].author}</span><br />
                        <span class="rec-role">${recommendationData[i].relationship}</span></p>
                    </div>
                `;
            }
        }, 200); // only needs a slight delay
    }

    // Call function to utilize any required code above
    loadAndDisplayData();
    

    /** FOOTER **/ 

    const footer = document.querySelector("footer");
    footer.innerHTML = `
        <p class="off-white-text text-center">
            &copy; 2021 Caroline R. Jones &nbsp;&nbsp;&nbsp;&nbsp;
            St. Louis, MO</p>
            <p class="off-white-text text-center"><a class="inverted" href="https://www.linkedin.com/in/carolinerjones/" target="_blank">LinkedIn</a> &nbsp;|&nbsp; 
            <a class="inverted" href="https://www.hackerrank.com/Carolina49a" target="_blank">HackerRank</a> &nbsp;|&nbsp; 
            <a class="inverted" href="https://github.com/Carolista" target="_blank">GitHub</a>
             
        </p>
    `;

}