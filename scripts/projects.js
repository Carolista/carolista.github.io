window.addEventListener("load", () => {
  
  let titleEnd = " Caroline Jones | Full Stack Developer";
  let projectData = [];
  const projectArea = document.querySelector("#project-area");
	const detailArea = document.querySelector("#detail-area");

  loadProjects();

  async function loadProjects() {
		const resp = await fetch("/data/projects.json");
    const data = await resp.json();
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
		document.title.toLowerCase().includes("projects")
			? displayProjects()
			: displayProjectDetail();
	}

	function displayProjects() {
    projectData.forEach((data) => {
      // TODO: create responsive gallery of projects in progress, not just completed ones
      if (!data.inProgress) {
        projectArea.innerHTML += `
          <div class="gallery-item">
            <div class="project-content">
              <img class="project-image" src="images/${data.images[0]}">
              <a href="project-details.html?id=${data.id}">
                <p class="project-name">${data.title}</p>
              </a>
              <p class="project-tagline">${data.subtitle}</p>
            </div>
            <a class="project-switch-page-link" href="project-details.html?id=${data.id}">
              <div class="project-switch-page-bar project-link-align-right">
                View Details
                <i class="project-switch-page-arrow fas fa-chevron-circle-right"></i>
              </div>
            </a>
          </div>
        `;
      }
    });
	}

	function displayProjectDetail() {
    let param = new URLSearchParams(window.location.search);
    let projectId = param.get("id");
    let projectIndex;

    projectData.forEach((data, index) => {
      if (data.id === Number(projectId)) projectIndex = index;
    });
    let currentProject = projectData[projectIndex];

    document.title = currentProject.title + " - " + titleEnd;

    let bullets = "";
    currentProject.noteworthy.forEach((note) => {
      bullets += `
        <li>${note}</li>
      `;
    });
    let links = "";
    let demoUrl = currentProject.demo.url;
    let demoType = currentProject.demo.type;
    let codeUrl = currentProject.code.url;
    let codeType = currentProject.code.type;
    if (demoUrl !== "")
      links += `
        <b>Demo:</b> 
        <a href="${demoUrl}" target="_blank">
          <span class="tooltip-container">
            ${demoType}
            <span class="tooltip">
              Take it for a spin
            </span>
          </span>
        </a>`;
    if (demoUrl !== "" && codeUrl !== "") links += ` &nbsp;&#124;&nbsp; `;
    if (codeUrl !== "")
      links += `
        <b>Code:</b> 
        <a href="${codeUrl}" target="_blank">
          <span class="tooltip-container">
            ${codeType}
            <span class="tooltip">
              Go behind the scenes
            </span>
          </span>
        </a>`;
    let images = "";
    currentProject.images.forEach((image, index) => {
      // TODO: create slideshow version of modal
      images += `
        <img id="image-${index}" class="project-details-image" src="images/${image}" />
      `;
    });
    detailArea.innerHTML = `
      <div class="project-details-col">
        <div class="project-details-bkg">
          <h1 class="project-title">${currentProject.title}</h1>
          <h3 class="project-subtitle">${currentProject.subtitle}</h3>
          <p>${currentProject.desc}</p>
          <h4 class="project-section">Tech Stack</h4>
          <p>${currentProject.tech}</p>
          <h4 class="project-section">Noteworthy</h4>
          <ul>${bullets}</ul>
          <h4 class="project-section">Displays well on ${currentProject.devices}</h4>
          <p class="project-links">${links}</p>
        </div>
        <a class="project-switch-page-link" href='projects.html'>
          <div class="project-switch-page-bar">
            <i class="project-switch-page-arrow fas fa-chevron-circle-left"></i>
            Back to Projects Gallery
          </div>
        </a>
      </div>
      <div class="project-details-col">
        ${images}
      </div>
    `;

    // MODAL FOR PROJECT DETAILS IMAGES
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const projectImages = document.getElementsByClassName(
      "project-details-image"
    );

    document.addEventListener("click", (event) => {
      [...projectImages].forEach((image) => {
        let id = image.id;
        if (event.target.matches(`#${id}`)) {
          modalImage.src = event.target.src;
          modal.style.display = "block";
        }
      });
      if (event.target.matches(".close")) modal.style.display = "none";
    });

	}

});