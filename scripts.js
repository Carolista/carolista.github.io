

// Event listener for page load
window.addEventListener("load", () => init() );

function init() {

    // For dynamic nav buttons - must be updated to match SCSS variables
    let navButtonBaseColor = "#034045"; // $muted-accent-color
    let navButtonCurrentColor = "#064d52"; // $accent-color
    let navButtonHoverColor = "#0a656c"; // $bright-accent-color

    // Other universal stuff
    let page = location.href.split('\\').pop().split('/').pop();
    let titleEnd = " Caroline Jones | Full Stack Developer";

    // Arrays to hold any data loaded
    let timelineData = [];
    let projectData = [];
    let experienceData = [];
    let educationData = [];
    let skillsData = {
        generalKnowledge: [],
        generalStrengths: [],
        generalTools: [],
        generalValues: [],
        techFrameworks: [],
        techKnowledge: [],
        techLanguages: [],
        techTools: []
    };
    let recommendationData = [];

    // Data structures to hold everything needed to display lists on Skills page
    let techSkillsCategories = {
        tools: { category: "Tools", list: "", count: 0 },
        frameworks: { category: "Frameworks", list: "", count: 0 },
        languages: { category: "Languages", list: "", count: 0 },
        knowledge: { category: "Knowledge", list: "", count: 0 }
    }
    let generalSkillsCategories = {
        tools: { category: "Tools", list: "", count: 0 },
        strengths: { category: "Strengths", list: "", count: 0 },
        knowledge: { category: "Knowledge", list: "", count: 0 },
        values: { category: "Values", list: "", count: 0 }
    }
    
    // DOM elements for index page only
    const timelineTable = document.querySelector("#timeline-table");
    const timelineButton = document.querySelector("#timeline-button");

    // DOM elements for pages other than index
    const projectArea = document.querySelector("#project-area");
    const detailArea = document.querySelector("#detail-area");
    const expArea = document.querySelector("#exp-area");
    const edArea = document.querySelector("#ed-area");
    const techSkillsArea = document.querySelector("#tech-skills-area");
    const generalSkillsArea = document.querySelector("#general-skills-area");
    const recArea = document.querySelector("#rec-area");

    // Tack on to end of <title> content specified in html doc
    document.title += titleEnd;

    loadAndDisplayData();

    // Handle elements and events only on certain pages
    if (page !== "" && page !== "index.html" && page !== "home.html") { 

        // HEADER
        const header = document.querySelector("header");
        header.innerHTML = `
            <nav class="nav-container">
                <p id="navbar-name"><a class="inverted" href="/">Caroline R. Jones</a></p>
                <button type="button" class="nav-button" aria-label="Open dropdown nav">
                    <span class="tri-bar"></span>
                    <span class="tri-bar"></span>
                    <span class="tri-bar"></span>
                </button>
                <div class="nav-menu">
                    <ul class="nav-links">
                        <li class="nav-item"><a class="nav-link" id="home" href="/home.html">Home</a></li>
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

        // FOOTER
        const footer = document.querySelector("footer");
        footer.innerHTML = `
            <span class="off-white-text text-center">
                <p>&copy; 2021&nbsp; Caroline R. Jones &nbsp;&bull;&nbsp;
                    St. Louis, MO</p>
                <p><a class="inverted" href="https://www.linkedin.com/in/carolinerjones/" target="_blank">LinkedIn</a> &nbsp;|&nbsp; 
                    <a class="inverted" href="https://www.hackerrank.com/Carolina49a" target="_blank">HackerRank</a> &nbsp;|&nbsp; 
                    <a class="inverted" href="https://github.com/Carolista" target="_blank">GitHub</a></p>
            </span>
        `; 
        
        // NAV BAR
        const navbar = document.getElementById("navbar");
        const navButton = document.querySelector(".nav-button");
        const allNavLinks = document.getElementsByClassName("nav-link");
        const navMenu = document.querySelector(".nav-menu");
        const navLinksContainer = document.querySelector(".nav-links");

        const toggleDropdown = (shouldOpen) => {
            shouldOpen ? navbar.classList.add("opened") : navbar.classList.remove("opened");
            navButton.setAttribute("aria-label", (shouldOpen ? "Open nav" : "Close nav"));
        };
        navButton.addEventListener("click", () => {
            navbar.classList.contains("opened") ? toggleDropdown(false) : toggleDropdown(true);
        });   
        navLinksContainer.addEventListener("click", (e) => e.stopPropagation());   
        navMenu.addEventListener("click", toggleDropdown(false));
    
        // Set static background for nav link of current page
        [...allNavLinks].forEach((link) => {
            let color = page.includes(link.id) ? navButtonCurrentColor : navButtonBaseColor;
            link.style.backgroundColor = color;
        });
    
        // Highlight nav links when hovered over
        document.addEventListener("mouseover", event => {
            if (event.target.matches(".nav-link")) {
                event.target.style.backgroundColor = navButtonHoverColor;
            } 
        });
        document.addEventListener("mouseout", event => {
            if (event.target.matches(".nav-link")) {
                let color = page.includes(event.target.id) ? navButtonCurrentColor : navButtonBaseColor;
                event.target.style.backgroundColor = color;    
            } 
        });

        // MODAL FOR PROJECT DETAILS IMAGES
        if (page.includes("project-details")) {

            // Modal elements
            const modal = document.getElementById("modal");
            const modalImage = document.getElementById("modal-image");

            // Available images
            const projectImages = document.getElementsByClassName("project-details-image");
            
            document.addEventListener("click", event => {
                // If an image is clicked
                [...projectImages].forEach( image => {
                    let id = image.id;
                    if (event.target.matches(`#${id}`)) {
                        modalImage.src = event.target.src;
                        modal.style.display = "block";
                    }
                });
                // If the close button is clicked
                if (event.target.matches(".close")) modal.style.display = "none";      
            });
        }

    } else if (page === "home.html") {

        // TIMELINE
        let isCollapsed = true;

        function loadTimeline() {
            fetch('/data/timeline.json')
                .then(response => response.json())
                .then(data => {
                    timelineData = data.map(obj => {
                        return {
                            year: obj.year,
                            desc: obj.desc
                        }
                    });     
            });
            displayTimeline(3);
        }

        function generateTimeline(num) {
            timelineTable.innerHTML = ''; // reset
            timelineData.forEach(data => {
                timelineTable.innerHTML += `
                <tr>
                    <td class="year">${data.year}</td>
                    <td>${data.desc}</td>
                </tr>
                `;
            });
        }
    
        function displayTimeline(num) {
            setTimeout(() => {
                generateTimeline(num);
            }, 300); // only needs a slight delay
        }
    
        function toggleTimeline() {
            if (isCollapsed) {
                generateTimeline(timelineData.length); // get all
                timelineTable.classList.remove("gradient-text");
                timelineButton.innerHTML = "&uarr; COLLAPSE &uarr;";
                timelineButton.style.margin = "-40px 0px 40px";
            } else {
                generateTimeline(3);
                timelineTable.classList.add("gradient-text");
                timelineButton.innerHTML = "&darr; READ MORE &darr;";
                timelineButton.style.margin = "-90px 0px 90px";
            }
        }
        
        loadTimeline();

        timelineButton.addEventListener("click", () => {
            toggleTimeline();
            isCollapsed = !isCollapsed;
        });
    }
        
    // Determine which data should be loaded, if any
    function loadAndDisplayData() {
        let docTitle = document.title.toLowerCase();
        if (docTitle.includes("project")) loadProjects();
        if (docTitle.includes("experience")) loadExperience();
        if (docTitle.includes("education")) loadEducation();
        if (docTitle.includes("skills")) loadSkills();
        if (docTitle.includes("recommendations")) loadRecommendations();
        makeContentVisible();
    }

    // Delay visibility of content until everything is loaded 
    function makeContentVisible() {
        setTimeout(() =>  {
            if (document.title !== titleEnd.trim()) {
                document.querySelector("main").style.visibility = "visible";
            }
        }, 200); // only needs a slight delay
    }

    // For Projects page
    function loadProjects() {
        fetch('/data/projects.json')
            .then(response => response.json())
            .then(data => {
                projectData = data.map(obj => {
                    return {
                        id: obj.id,
                        title: obj.title,
                        subtitle: obj.subtitle,
                        desc: obj.desc,
                        tech: obj.tech,
                        noteworthy: obj.noteworthy,
                        devices: obj.devices,
                        demo: { type: obj.demo.type, url: obj.demo.url },
                        code: { type: obj.code.type, url: obj.code.url },
                        images: obj.images,
                        inProgress: obj.inProgress
                    }
                });     
        });
        // Determine which information to display (full gallery or detail)
        document.title.toLowerCase().includes("projects") ? displayProjects() : displayProjectDetail();
    }

    function displayProjects() {
        setTimeout(() =>  {
            projectData.forEach(data => {
                // TODO: create responsive gallery of projects in progress, not just completed
                if (! data.inProgress) {
                    projectArea.innerHTML += `
                            <div class="gallery-item">
                                <div class="project-content">
                                    <a href="project-details.html?id=${data.id}"><img class="project-image" src="images/${data.images[0]}"></a>
                                    <h3>${data.title}</h3>
                                    <p>${data.subtitle}</p>
                                    <p class="text-right view-details"><a href="project-details.html?id=${data.id}">View Details &gt;</a></p>
                                </div>
                            </div>
                    `;
                }
            });
        }, 200); // only needs a slight delay
    }

    function displayProjectDetail() {
        setTimeout(() =>  {
            // Get query parameter to get id number (index)
            let param = new URLSearchParams(window.location.search);
            let projectId = param.get('id');
            let projectIndex;
            //Get index from array based on project id
            projectData.forEach((data, index) => {
                if (data.id === Number(projectId)) projectIndex = index;
            });
            let currentProject = projectData[projectIndex];
            
            // Update browser tab with specific project name
            document.title = currentProject.title + " - " + titleEnd;

            // Create bullet points from noteworthy array
            let bullets = "";
            currentProject.noteworthy.forEach(note => {
                bullets += `
                    <li>${note}</li>
                `
            });
            // Create links
            let links = "";
            let demoUrl = currentProject.demo.url;
            let demoType = currentProject.demo.type;
            let codeUrl = currentProject.code.url;
            let codeType = currentProject.code.type;
            if (demoUrl !== "") links += `<b>Demo:</b> <a href="${demoUrl}" target="_blank">${demoType}</a>`;
            if (demoUrl !== "" && codeUrl !== "") links += ` &nbsp;&#124;&nbsp; `;
            if (codeUrl !== "") links += `<b>Code:</b> <a href="${codeUrl}" target="_blank">${codeType}</a>`;
            // Create images
            let images = "";
            currentProject.images.forEach((image, index) => {
                // TODO: create slideshow version of modal
                images += `
                    <img id="image-${index}" class="project-details-image" src="images/${image}" />
                `
            });
            // Assemble all HTML for project details
            detailArea.innerHTML = `
                <div class="project-details-col">
                    <div class="project-details-bkg">
                        <h1 class="project-title" class="page-title">${currentProject.title}</h1>
                        <hr>
                        <h3 class="project-subtitle">${currentProject.subtitle}</h3>
                        <p>${currentProject.desc}</p>
                        <h4 class="project-section">Tech Stack</h4>
                        <p>${currentProject.tech}</p>
                        <h4 class="project-section">Noteworthy</h4>
                        <ul>${bullets}</ul>
                        <h4 class="project-section">Displays well on ${currentProject.devices}</h4>
                        <p class="project-links">${links}</p>
                        <hr>
                        <p><a href='projects.html'>&lt; Back to Projects Gallery</a></p>
                    </div>
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
                experienceData = data.map(obj => {
                    return {
                        id: obj.id,
                        employer: obj.employer,
                        period: obj.period,
                        title: obj.title,
                        type: obj.type,
                        location: obj.location,
                        desc: obj.desc,
                        image: obj.image,
                        website: obj.website
                    }
                });     
        });
        displayExperience();
    }

    function displayExperience() {
        setTimeout(() => {
            experienceData.forEach(data => {
                expArea.innerHTML += `
                    <div class="content-item">
                        <div class="content-block"> 
                            <div>  
                                <a href="${data.website}" target="_blank"><img class="job-ed-logo" src="images/${data.image}" width="60px" /></a>                      
                                <p><span class="employer">${data.employer}</span><br />
                                ${data.type} &nbsp;&bull;&nbsp; ${data.location} &nbsp;&bull;&nbsp; ${data.period}</p>
                            </div>
                            <p class="job-title">${data.title}</p>
                            <p>${data.desc}</p>
                        </div>
                    </div>
                `;
            });
        }, 200); // only needs a slight delay
    }

    // For Education page
    function loadEducation() {
        fetch('/data/education.json')
            .then(response => response.json())
            .then(data => {
                educationData = data.map(obj => {
                    return {
                        id: obj.id,
                        institution: obj.institution,
                        gradDate: obj.gradDate,
                        degree: obj.degree,
                        desc: obj.desc,
                        image: obj.image,
                        website: obj.website
                    }
                });     
        });
        displayEducation();
    }

    function displayEducation() {
        setTimeout(() => {
            educationData.forEach(data => {
                // TODO: gather images of certificates/degrees
                edArea.innerHTML += `
                <div class="content-item">
                    <div class="content-block">
                        <div>
                            <a href="${data.website}" target="_blank"><img class="job-ed-logo" src="images/${data.image}" width="60px" /></a>                      
                            <p><span class="institution">${data.institution}</span><br />
                            ${data.gradDate}</p>    
                        </div>
                        <p class="degree">${data.degree}</p>
                        <p>${data.desc}</p>
                    </div>
                </div>
                `;
            });
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
                        } else if (skill.category === "Values") {
                            skillsData.generalValues.push(skill);
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
        buildSkillsHTML();
        displaySkills();
    }

    

    function buildSkillsHTML() {
        setTimeout(() => {
            for (group in skillsData) {
                skillsData[group].sort((a, b) => a.skillName > b.skillName ? 1 : -1);
                skillsData[group].forEach(data => {
                    if (data.type === "Tech") {
                        if (data.category === "Frameworks") {
                            techSkillsCategories.frameworks.list += `<p class='skill-name'>${data.skillName}</p>`;
                            techSkillsCategories.frameworks.count += 1;
                        } else if (data.category === "Languages") {
                            techSkillsCategories.languages.list += `<p class='skill-name'>${data.skillName}</p>`;
                            techSkillsCategories.languages.count += 1;
                        } else if (data.category === "Tools") {
                            techSkillsCategories.tools.list += `<p class='skill-name'>${data.skillName}</p>`;
                            techSkillsCategories.tools.count += 1;
                        } else if (data.category === "Knowledge") {
                            techSkillsCategories.knowledge.list += `<p class='skill-name'>${data.skillName}</p>`;
                            techSkillsCategories.knowledge.count += 1;
                        }
                    } else if (data.type === "General") {
                        if (data.category === "Tools") {
                            generalSkillsCategories.tools.list += `<p class='skill-name'>${data.skillName}</p>`;
                            generalSkillsCategories.tools.count += 1;
                        } else if (data.category === "Strengths") {
                            generalSkillsCategories.strengths.list += `<p class='skill-name'>${data.skillName}</p>`;
                            generalSkillsCategories.strengths.count += 1;
                        } else if (data.category === "Knowledge") {
                            generalSkillsCategories.knowledge.list += `<p class='skill-name'>${data.skillName}</p>`;
                            generalSkillsCategories.knowledge.count += 1;
                        } else if (data.category === "Values") {
                            generalSkillsCategories.values.list += `<p class='skill-name'>${data.skillName}</p>`;
                            generalSkillsCategories.values.count += 1;
                        }
                    }
                });
            }
        }, 200); // only needs a slight delay
    }

    function displaySkills() {
        setTimeout(() => {
            // Tech subsection
            let allTechSkills = "";
            for (techCategory in techSkillsCategories) {
                allTechSkills += `
                    <div class="content-block skills-list">
                        <h3>${techSkillsCategories[techCategory].category}</h3>
                        <div>${techSkillsCategories[techCategory].list}</div> 
                    </div>
                `
            }
            techSkillsArea.innerHTML = allTechSkills;
            // General subsection
            let allGeneralSkills = "";
            for (generalCategory in generalSkillsCategories) {
                allGeneralSkills += `
                    <div class="content-block skills-list">
                        <h3>${generalSkillsCategories[generalCategory].category}</h3>
                        <div>${generalSkillsCategories[generalCategory].list}</div> 
                    </div>
                `
            }
            generalSkillsArea.innerHTML = allGeneralSkills;

        }, 200); // only needs a slight delay
    }

    // For Recommendations page
    function loadRecommendations() {
        fetch('/data/recommendations.json')
            .then(response => response.json())
            .then(data => {
                recommendationData = data.map(obj => {
                    return {
                        id: obj.id,
                        author: obj.author,
                        relationship: obj.relationship,
                        recText: obj.recText
                    }
                });     
        });
        displayRecommendations();
    }

    function displayRecommendations() {
        setTimeout(() => {
            recommendationData.forEach(data => {
                recArea.innerHTML += `
                    <div class="content-item">
                        <div class="content-block">
                            <p>${data.recText}</p>
                            <p class="text-right"><span class="rec-name">${data.author}</span><br />
                            <span class="rec-role">${data.relationship}</span></p>
                        </div>
                    </div>
                `;
            });
        }, 200); // only needs a slight delay
    }
}