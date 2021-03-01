
// Event listener for page load
window.addEventListener("load", function() {
    console.log('Page loaded.');
    init();
});

// DOM code for page elements
function init() {


    /** TAB TITLE **/

    const tabTitle = document.querySelector("title");

    tabTitle.innerHTML += "Caroline Jones | Web Developer";


    /** HEADER CONTENT **/

    const header = document.querySelector("header");

    header.innerHTML = `
        <nav class="nav-container container">
            <h1>Caroline R. Jones &nbsp;|&nbsp; Web Developer</h1>
            <button type="button" class="nav-button" aria-label="Open dropdown nav">
                <span class="tri-bar"></span>
                <span class="tri-bar"></span>
                <span class="tri-bar"></span>
            </button>
            <div class="nav-menu">
                <ul class="nav-links">
                    <li class="nav-item"><a class="nav-link" id="home" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" id="projects" href="/projects.html">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" id="resume" href="/resume.html">Resume</a></li>
                    <li class="nav-item"><a class="nav-link" id="skills" href="/skills.html">Skills</a></li>
                    <li class="nav-item"><a class="nav-link" id="recommendations" href="/recommendations.html">Recommendations</a></li>
                    <li class="nav-item"><a class="nav-link" id="contact" href="/contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;


    /** NAV BAR **/

    // TODO: Add event listeners to highlight current page on navbar

    const navbar = document.getElementById("navbar");
    const navButton = navbar.querySelector(".nav-button");

    function openDropdown() {
        navbar.classList.add("opened");
        navButton.setAttribute("aria-label", "Close dropdown nav");
    }

    function closeDropdown() {
        navbar.classList.remove("opened");
        navButton.setAttribute("aria-label", "Open dropdown nav");
    }

    navButton.addEventListener("click", () => {
        if (navbar.classList.contains("opened")) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    const navMenu = navbar.querySelector(".nav-menu");
    const navLinksContainer = navbar.querySelector(".nav-links");

    navLinksContainer.addEventListener("click", (clickEvent) => {
        clickEvent.stopPropagation();
    });

    navMenu.addEventListener("click", closeDropdown);

}