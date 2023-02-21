window.addEventListener("load", () => {

  let experienceData = [];
  const expArea = document.querySelector("#exp-area");

  loadExperience();

	async function loadExperience() {
		const resp = await fetch("/data/experience.json");
    const data = await resp.json();
    experienceData = data.map((obj) => {
      return {
        id: obj.id,
        employer: obj.employer,
        period: obj.period,
        title: obj.title,
        type: obj.type,
        location: obj.location,
        desc: obj.desc,
        image: obj.image,
        website: obj.website,
      };
    });
		displayExperience();
	}

	function displayExperience() {
    experienceData.forEach((data) => {
      let websitePart = data.website.slice(data.website.indexOf("//") + 2);
      let website = websitePart.includes("/")  ? websitePart.slice(0, websitePart.indexOf("/")) : websitePart;
      let description = "";
      data.desc.forEach(descPart => {
        if (Array.isArray(descPart)) {
          let bullets = "";
          descPart.forEach(bullet => {
            bullets += `<li>${bullet}</li>`;
          })
          description += `<ul class="bullet-list">${bullets}</ul>`
        } else {
          description += `<p class="desc-p">${descPart}</p>`
        }
      });
      expArea.innerHTML += `
        <div class="content-item">
          <div class="content-block"> 
            <div class="content-primary"> 
              <div class="content-logo-container tooltip-container">
                <a href="${data.website}" target="_blank"><img class="content-logo" src="images/${data.image}" width="60px" /></a> 
                <span class="tooltip-left">${website}</span>
              </div> 
              <div class="content-primary-text">
                <p><span class="content-header">${data.employer}</span><br />
                ${data.type} &nbsp;&bull;&nbsp; ${data.location} &nbsp;&bull;&nbsp; ${data.period}</p>
              </div>                     
            </div>
          </div>
          <div id="${data.id}-animated-box" class="content-animated-box">
            <div id="${data.id}-click-bar" class="content-click-bar">
              <i id="${data.id}-arrow-icon" class="content-arrow nudge-down fas fa-chevron-circle-down"></i>
              <p  id="${data.id}-subheader" class="content-subheader">${data.title}</p>
            </div>
            <div id="${data.id}-secondary" class="content-secondary">
              <div id="${data.id}-desc" class="content-description">${description}</div>
            </div>
          </div>
        </div>
    `;
    });
	}
});