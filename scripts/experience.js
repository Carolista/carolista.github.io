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
              <div class="content-logo-container">
                <a href="${data.website}" target="_blank"><img class="content-logo" src="images/${data.image}" width="60px" /></a> 
              </div> 
              <div class="content-primary-text">
                <p><span class="content-header">${data.employer}</span><br />
                ${data.type} &nbsp;&bull;&nbsp; ${data.location} &nbsp;&bull;&nbsp; ${data.period}</p>
              </div>                     
            </div>
          </div>
          <div class="content-animated-box">
            <div class="content-hover-bar">
              <i class="content-arrow fas fa-chevron-circle-down"></i>
              <p class="content-subheader">${data.title}</p>
              </div>
            <div class="content-secondary">
              <div class="content-description">${data.desc}</div>
            </div>
          </div>
        </div>
    `;
    });
	}
});