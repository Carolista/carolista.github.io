window.addEventListener('load', () => {
  let experienceData = [];
  const expArea = document.querySelector('#exp-area');

  loadExperience();

  async function loadExperience() {
    const resp = await fetch('/data/experience.json');
    const data = await resp.json();
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
        website: obj.website,
      };
    });
    displayExperience();
  }

  function displayExperience() {
    experienceData.forEach(data => {
      let websitePart = data.website.slice(data.website.indexOf('//') + 2);
      let shortWebsite = websitePart.includes('/')
        ? websitePart.slice(0, websitePart.indexOf('/'))
        : websitePart;
      let { id, employer, period, title, type, location, desc, image, website } = data;
      expArea.innerHTML += `
        <div class="content-item">
          <div class="content-block"> 
            <div class="content-primary"> 
              <div class="exp-logo-container tooltip-container">
                <a href="${website}" target="_blank"><img class="content-logo" src="../images/${image}" width="80px" /></a> 
                <span class="tooltip-left">${shortWebsite}</span>
              </div> 
              <div class="content-primary-text">
                <div class="content-header">${employer}</span></div>
                <div id="${id}-title" class="content-title">${title}</div>
                <div>${type} &nbsp;&bull;&nbsp; ${location} &nbsp;&bull;&nbsp; ${period}</div>
              </div>                     
            </div>
            <div id="${id}-animated-box" class="content-animated-box">
              <div id="${id}-secondary" class="content-secondary">
                <div id="${id}-desc" class="content-description">${desc}</div>
              </div>
            </div>
            <div id="${id}-click-bar" class="content-click-bar">
              <i id="${id}-arrow-icon" class="content-arrow nudge-down fas fa-chevron-circle-down"></i>
              <p id="${id}-subheader" class="content-subheader">See Details</p>
            </div>
          </div>
        </div>
    `;
    });
  }
});
