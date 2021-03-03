


// Event listener for page load
window.addEventListener("load", function() {
    console.log('Page loaded.');
    init();
});

// DOM code for page elements
function init() {


    /** TAB TITLE **/

    const tabTitle = document.querySelector("title");
    tabTitle.innerHTML += "Caroline Jones | Web Developer";


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
        <nav class="nav-container container">
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
        Everything below controls the contents with the <main> element of each page, but data from JSON will only load for the matching page accessing this file.
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
    let expArea = document.querySelector("#exp-area");
    let edArea = document.querySelector("#ed-area");
    let skillsArea = document.querySelector("#skills-area");
    let recArea = document.querySelector("#rec-area");

    // Determine which data should be loaded, if any
    function loadAndDisplayData() {
        if (tabTitle.innerHTML.toLowerCase().includes("projects")) {
            loadProjects();
        } else if (tabTitle.innerHTML.toLowerCase().includes("experience")) {
            loadExperience();
        } else if (tabTitle.innerHTML.toLowerCase().includes("education")) {
            loadEducation();
        } else if (tabTitle.innerHTML.toLowerCase().includes("skills")) {
            loadSkills();
        } else if (tabTitle.innerHTML.toLowerCase().includes("recommendations")) {
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
                        // TODO: set up property transfers once JSON is created
                        // id: obj.id,
                        // author: obj.author,
                        // relationship: obj.relationship,
                        // recText: obj.recText
                    }
                    projectData.push(project);
                });     
        });
        displayProjects();
    }

    function displayProjects() {
        setTimeout(function() {
            for (let i=0; i < projectData.length; i++) {
                projectArea.innerHTML += `
                    <div class="content-block">                        

                    </div>
                `;
            }
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
                edArea.innerHTML += `
                    <div class="content-block">                        

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
            for (let i=0; i < skillsData.length; i++) {
                skillsArea.innerHTML += `
                    <div class="content-block">                        

                    </div>
                `;
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
            St. Louis, MO &nbsp;&nbsp;&nbsp;&nbsp;
            <a class="inverted" href="https://www.linkedin.com/in/carolinerjones/" target="_blank">LinkedIn</a> &nbsp;|&nbsp; 
            <a class="inverted" href="https://www.hackerrank.com/Carolina49a" target="_blank">HackerRank</a> &nbsp;|&nbsp; 
            <a class="inverted" href="https://github.com/Carolista" target="_blank">GitHub</a>
             
        </p>
    `;

}