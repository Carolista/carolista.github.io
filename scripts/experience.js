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
              <a href="${data.website}" target="_blank"><img class="content-logo" src="images/${data.image}" width="50px" /></a>                      
              <p><span class="content-header">${data.employer}</span><br />
              ${data.type} &nbsp;&bull;&nbsp; ${data.location} &nbsp;&bull;&nbsp; ${data.period}</p>
            </div>
          </div>
          <div class="content-animated-box">
            <div class="content-hover-bar">
              <p class="content-subheader">${data.title}</p>
              <i id="content-arrow" class="fas fa-chevron-circle-down"></i>
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