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
              <a href="project-details.html?id=${data.id}"><img class="project-image" src="images/${data.images[0]}"></a>
              <p class="project-name">${data.title}</p>
              <p class="project-tagline">${data.subtitle}</p>
              <p class="text-right view-details"><a href="project-details.html?id=${data.id}">View Details &gt;</a></p>
            </div>
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
      links += `<b>Demo:</b> <a href="${demoUrl}" target="_blank">${demoType}</a>`;
    if (demoUrl !== "" && codeUrl !== "") links += ` &nbsp;&#124;&nbsp; `;
    if (codeUrl !== "")
      links += `<b>Code:</b> <a href="${codeUrl}" target="_blank">${codeType}</a>`;
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
          <h1 class="project-title" class="page-title">${currentProject.title}</h1>
          <h3 class="project-subtitle">${currentProject.subtitle}</h3>
          <p>${currentProject.desc}</p>
          <h4 class="project-section">Tech Stack</h4>
          <p>${currentProject.tech}</p>
          <h4 class="project-section">Noteworthy</h4>
          <ul>${bullets}</ul>
          <h4 class="project-section">Displays well on ${currentProject.devices}</h4>
          <p class="project-links">${links}</p>
          </div>
          <div class="project-back-bar">
            <a class="project-back-link" href='projects.html'>
              <i class="project-back-arrow fas fa-chevron-circle-left"></i>
              Back to Projects Gallery
            </a>
          </div>
      </div>
      <div class="project-details-col">
        ${images}
      </div>
    `;

    // MODAL FOR PROJECT DETAILS IMAGES
    if (page.includes("project-details")) {
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
	}

});