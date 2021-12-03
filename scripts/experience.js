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
      expArea.innerHTML += `
        <div class="content-item">
          <div class="content-block"> 
            <div class="content-primary"> 
              <div class="content-logo-container tooltip-container">
                <a href="${data.website}" target="_blank"><img class="content-logo" src="images/${data.image}" width="60px" /></a> 
                <span class="tooltip-left">${data.website.match(/(?<=.\/\/)[^\/]*/)[0]}</span>
              </div> 
              <div class="content-primary-text">
                <p><span class="content-header">${data.employer}</span><br />
                ${data.type} &nbsp;&bull;&nbsp; ${data.location} &nbsp;&bull;&nbsp; ${data.period}</p>
              </div>                     
            </div>
          </div>
          <div id="${data.id}-animated-box" class="content-animated-box">
            <div id="${data.id}-click-bar" class="content-click-bar">
              <i id="${data.id}-arrow-icon" class="content-arrow fas fa-chevron-circle-down"></i>
              <p  id="${data.id}-subheader" class="content-subheader">${data.title}</p>
              </div>
            <div id="${data.id}-secondary" class="content-secondary">
              <div id="${data.id}-desc" class="content-description">${data.desc}</div>
            </div>
          </div>
        </div>
    `;
    });
	}
});