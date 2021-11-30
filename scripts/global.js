// Event listener for page load
window.addEventListener("load", () => init());

function init() {

	let page = location.href.split("\\").pop().split("/").pop();
	let titleEnd = " Caroline Jones | Full Stack Developer";
	
	document.title += titleEnd;

  headerElements = `
      <a href="home.html">
        <div id="name-box">
          <span class="text-light">Caroline&nbsp;</span><span class="text-heavy">Jones</span>
        </div>
      </a>
      <div id="nav-bkg"></div>
      <div id="nav-box">
        <div id="navbar">
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

	// Handle elements and events only on certain pages
	if (page !== "" && page !== "index.html") {

    // BACKDROP
    const backdrop = document.querySelector("#backdrop-container");
    backdrop.innerHTML = `
      <div id="backdrop-right"></div>
      <div id="backdrop-center"></div>
      <div id="backdrop-left"></div>
    `;

		// HEADER
    // TODO: make sure current page is indicated in nav box
    // TODO: change all the hover dropdowns to click dropdowns?
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
      }, 500);
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
  }, 200); // only needs a slight delay

}

