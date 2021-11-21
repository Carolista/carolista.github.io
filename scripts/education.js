window.addEventListener("load", () => {

  let educationData = [];
  const edArea = document.querySelector("#ed-area");

  loadEducation();

	async function loadEducation() {
		const resp = await fetch("/data/education.json")
    const data = await resp.json();
    educationData = data.map((obj) => {
      return {
        id: obj.id,
        institution: obj.institution,
        gradDate: obj.gradDate,
        degree: obj.degree,
        desc: obj.desc,
        image: obj.image,
        website: obj.website,
      };
    });
		displayEducation();
	}

	function displayEducation() {
    educationData.forEach((data) => {
      edArea.innerHTML += `
        <div class="content-item">
          <div class="content-block">
            <div class="content-primary">
              <a href="${data.website}" target="_blank"><img class="content-logo" src="images/${data.image}" width="60px" /></a>                     
              <p><span class="content-header">${data.institution}</span><br />
              ${data.gradDate}</p>     
            </div>                    
          </div>
          <div class="content-animated-box">
            <div class="content-hover-bar">
              <p class="content-subheader">${data.degree}</p>
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