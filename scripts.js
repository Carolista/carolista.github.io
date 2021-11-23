// Event listener for page load
window.addEventListener("load", () => init());

// TODO: Split file into shared content and per-page files; update HTML to pull in corresponding files
// TODO: Edit data to add new projects, Udemy courses, etc

function init() {
	// For dynamic nav buttons - must be updated to match SCSS variables
	let navButtonBaseColor = "#034045"; // $muted-accent-color
	let navButtonCurrentColor = "#064d52"; // $accent-color
	let navButtonHoverColor = "#0a656c"; // $bright-accent-color

	// Other universal stuff
	let page = location.href.split("\\").pop().split("/").pop();
	let titleEnd = " Caroline Jones | Full Stack Developer";


	// Arrays to hold any data loaded
	let timelineData = [];
	let projectData = [];
	
	
	

	// DOM elements for index page only
	const timelineTable = document.querySelector("#timeline-table");
	const timelineButton = document.querySelector("#timeline-button");

	// DOM elements for pages other than index
	const projectArea = document.querySelector("#project-area");
	const detailArea = document.querySelector("#detail-area");
	
	
	
	

	// Tack on to end of <title> content specified in html doc
	document.title += titleEnd;

	loadAndDisplayData();

	// Handle elements and events only on certain pages
	if (page !== "" && page !== "index.html" && page !== "home.html") {

    // BACKDROP
    const backdrop = document.querySelector("#backdrop-container");
    backdrop.innerHTML = `
      <div id="backdrop-right"></div>
      <div id="backdrop-center"></div>
      <div id="backdrop-left"></div>
    `;
		// HEADER
		const header = document.querySelector("header");
		header.innerHTML = `
      <div id="name-box">
        <span class="text-light">Caroline&nbsp;</span><span class="text-heavy">Jones</span>
      </div>
      <div id="nav-box">
        <div id="new-navbar">
          <p class="highlighted"><a class="highlight" href="projects.html">Projects</a></p>
          <p class="highlighted"><a class="highlight" href="experience.html">Experience</a></p>
          <p class="highlighted"><a class="highlight" href="education.html">Education</a></p>
          <p class="highlighted"><a class="highlight" href="skills.html">Skills</a></p>
          <p class="highlighted"><a class="highlight" href="recommendations.html">Recommendations</a></p>
          <p class="highlighted"><a class="highlight" href="contact.html">Contact</a></p>
        </div>
        <div id="nav-arrow">
          <i id="nav-arrow-icon" class="fas fa-chevron-circle-right"></i>
        </div>
      </div>
    `;

		// FOOTER
		const footer = document.querySelector("footer");
		footer.innerHTML = `
      <span class="off-white-text text-center">
        <p>&copy; 2021&nbsp; Caroline R. Jones &nbsp;&bull;&nbsp;
          St. Louis, MO &nbsp;&bull;&nbsp; <a href="https://www.linkedin.com/in/carolinerjones/" target="_blank">LinkedIn</a> &nbsp;|&nbsp; 
          <a href="https://www.hackerrank.com/Carolina49a" target="_blank">HackerRank</a> &nbsp;|&nbsp; 
          <a href="https://github.com/Carolista" target="_blank">GitHub</a></p>
      </span>
    `;

		

		// MODAL FOR PROJECT DETAILS IMAGES
		if (page.includes("project-details")) {
			// Modal elements
			const modal = document.getElementById("modal");
			const modalImage = document.getElementById("modal-image");

			// Available images
			const projectImages = document.getElementsByClassName(
				"project-details-image"
			);

			document.addEventListener("click", (event) => {
				// If an image is clicked
				[...projectImages].forEach((image) => {
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
			fetch("/data/timeline.json")
				.then((response) => response.json())
				.then((data) => {
					timelineData = data.map((obj) => {
						return {
							year: obj.year,
							desc: obj.desc,
						};
					});
				});
			displayTimeline(3);
		}

		function generateTimeline(num) {
			timelineTable.innerHTML = ""; // reset
			timelineData.forEach((data) => {
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
		// if (docTitle.includes("experience")) loadExperience();
		// if (docTitle.includes("education")) loadEducation();
		// if (docTitle.includes("skills")) loadSkills();
		// if (docTitle.includes("recommendations")) loadRecommendations();
		makeContentVisible();
	}

	// Delay visibility of content until everything is loaded
	function makeContentVisible() {
		setTimeout(() => {
			if (document.title !== titleEnd.trim()) {
				document.querySelector("main").style.visibility = "visible";
			}
		}, 200); // only needs a slight delay
	}

	// For Projects page
	function loadProjects() {
		fetch("/data/projects.json")
			.then((response) => response.json())
			.then((data) => {
				projectData = data.map((obj) => {
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
						inProgress: obj.inProgress,
					};
				});
			});
		// Determine which information to display (full gallery or detail)
		document.title.toLowerCase().includes("projects")
			? displayProjects()
			: displayProjectDetail();
	}

	function displayProjects() {
		setTimeout(() => {
			projectData.forEach((data) => {
				// TODO: create responsive gallery of projects in progress, not just completed
				if (!data.inProgress) {
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
		setTimeout(() => {
			// Get query parameter to get id number (index)
			let param = new URLSearchParams(window.location.search);
			let projectId = param.get("id");
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
			currentProject.noteworthy.forEach((note) => {
				bullets += `
                    <li>${note}</li>
                `;
			});
			// Create links
			let links = "";
			let demoUrl = currentProject.demo.url;
			let demoType = currentProject.demo.type;
			let codeUrl = currentProject.code.url;
			let codeType = currentProject.code.type;
			if (demoUrl !== "")
				links += `<b>Demo:</b> <a href="${demoUrl}" target="_blank">${demoType}</a>`;
			if (demoUrl !== "" && codeUrl !== "") links += ` &nbsp;&#124;&nbsp; `;
			if (codeUrl !== "")
				links += `<b>Code:</b> <a href="${codeUrl}" target="_blank">${codeType}</a>`;
			// Create images
			let images = "";
			currentProject.images.forEach((image, index) => {
				// TODO: create slideshow version of modal
				images += `
                    <img id="image-${index}" class="project-details-image" src="images/${image}" />
                `;
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
      `;
		}, 200); // only needs a slight delay
	}

	

	

  

	
}
