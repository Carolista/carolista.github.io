window.addEventListener("load", () => init());

function init() {

	let page = location.href.split("\\").pop().split("/").pop();
	let titleEnd = " Caroline Jones | Full Stack Developer";
	
	document.title += titleEnd;

  let pageNames = ["Projects", "Experience", "Education", "Skills", "Recommendations", "Contact"];
  let pages = ""
  pageNames.forEach(pageName => {
    if (page !== "" && page !== "index.html") {
      if (page.slice(0,3) === pageName.toLowerCase().slice(0,3)) {
        pages += `<p class="current-page">${pageName}</p>`;
      } else {
        pages += `<p class="highlighted"><a class="highlight" href="${pageName.toLowerCase()}.html">${pageName}</a></p>`;
      }
    }
  });

  headerElements = `
      <a href="home.html">
        <div id="name-box">
          <span class="text-light">Caroline&nbsp;</span><span class="text-heavy">Jones</span>
        </div>
      </a>
      <div id="nav-bkg"></div>
      <div id="nav-box">
        <div id="navbar">
          ${pages}
        </div>
        <div id="nav-arrow">
          <i id="nav-arrow-icon" class="fas fa-chevron-circle-right"></i>
        </div>
      </div>
    `;

	if (page !== "" && page !== "index.html") {

    // BACKDROP
    const backdrop = document.querySelector("#backdrop-container");
    backdrop.innerHTML = `
      <div id="backdrop-right"></div>
      <div id="backdrop-center"></div>
      <div id="backdrop-left"></div>
    `;

		// HEADER
		const header = document.querySelector("header");
		header.innerHTML = headerElements;

    const navBox = document.getElementById("nav-box");
    const navBkg = document.querySelector("#nav-bkg");

    navBox.addEventListener("mouseenter", () => {
      navBkg.style.display = "block";
      setTimeout(() => {
        navBkg.style.opacity = 0.8;
      }, 100);
    });
    navBox.addEventListener("mouseleave", () => {
      navBkg.style.opacity = 0;
      setTimeout(() => {
        navBkg.style.display = "none"
      }, 500); // time for visual transition to finish before unblocking page content
    });

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
	} 

  setTimeout(() => {
    if (document.title !== titleEnd.trim()) {
      document.querySelector("main").style.visibility = "visible";
    } 
  }, 200);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("content-click-bar") || e.target.classList.contains("content-subheader") || e.target.classList.contains("content-arrow")) {
      let id = e.target.id.slice(0,e.target.id.indexOf("-"));
      let arrowIcon = document.getElementById(`${id}-arrow-icon`);
      arrowIcon.style.transform === "rotate(180deg)" ? arrowIcon.style.transform = "rotate(0deg)" : arrowIcon.style.transform = "rotate(180deg)"; 
      let secondary = document.getElementById(`${id}-secondary`);
      let desc = document.getElementById(`${id}-desc`);
      let maxHeight = Math.round(desc.innerHTML.length / 3); // TODO: finesse this formula
      let transition = maxHeight/300 > 1 ? 1 : Math.round(maxHeight/300 * 10)/10;
      arrowIcon.style.transition = `transform ${transition + 's'}`;
      secondary.style.transition = `max-height ${transition + 's'}`;
      secondary.style.maxHeight === maxHeight + 'px' ? secondary.style.maxHeight = "0px" : secondary.style.maxHeight = maxHeight + 'px';
    }
  });

}

