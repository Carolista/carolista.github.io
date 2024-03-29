window.addEventListener('load', () => init());

function init() {
  let page = location.href.split('\\').pop().split('/').pop();
  let titleEnd = ' Caroline Jones | Front End Developer';

  document.title += titleEnd;

  let pageNames = [
    'Projects',
    'Experience',
    'Education',
    'Skills',
    'Recommendations',
    'Contact',
  ];
  let pages = '';
  pageNames.forEach(pageName => {
    if (page !== '' && page !== 'index.html') {
      if (page === `${pageName.toLowerCase()}.html`) {
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

  // BACKDROP
  const backdrop = document.querySelector('#backdrop-container');
  backdrop.innerHTML = `
    <div id="backdrop-right"></div>
    <div id="backdrop-center"></div>
    <div id="backdrop-left"></div>
  `;

  // HEADER
  const header = document.querySelector('header');
  header.innerHTML = headerElements;

  const navBox = document.getElementById('nav-box');
  const navBkg = document.getElementById('nav-bkg');
  const navArrow = document.getElementById('nav-arrow');
  const navArrowIcon = document.getElementById('nav-arrow-icon');

  navArrow.addEventListener('click', () => {
    if (navBkg.style.display === 'block') {
      navBkg.style.opacity = 0;
      navBox.style.transform = null;
      navArrowIcon.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        navBkg.style.display = 'none';
      }, 500);
    } else {
      navBkg.style.display = 'block';
      navBox.style.transform = 'translate(240px, 18px) scale(1.15)';
      navArrowIcon.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        navBkg.style.opacity = 0.8;
      }, 100);
    }
  });

  navBkg.addEventListener('click', () => {
    navBkg.style.opacity = 0;
    navBox.style.transform = null;
    navArrowIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      navBkg.style.display = 'none';
    }, 500);
  });

  // FOOTER
  const footer = document.querySelector('footer');
  footer.innerHTML = `
    <div>
      &copy; 2021&nbsp; Caroline R. Jones &nbsp;&bull;&nbsp; St. Louis, MO
    </div>
    <div id="footer-links">
      <a href="https://github.com/Carolista" target="_blank">
        <span class="tooltip-container">
          GitHub
          <span class="tooltip">
            Check out my repos and contributions
          </span>
        </span>
      </a> &nbsp;|&nbsp; 
      <a href="https://www.hackerrank.com/Carolina49a" target="_blank">
        <span class="tooltip-container">
          HackerRank
          <span class="tooltip">
            View my badges and certificates
          </span>
        </span>
      </a> &nbsp;|&nbsp; 
      <a href="https://www.linkedin.com/in/carolinerjones/" target="_blank">
        <span class="tooltip-container">
          LinkedIn
          <span class="tooltip">
            Visit my full profile
          </span>
        </span>
      </a> &nbsp;|&nbsp; 
      <a href="https://docs.google.com/document/d/1k1mPR0vxqAQla466vhOiXAHgIHWvuDXujZZF_OF_SMs" target="_blank">
        <span class="tooltip-container">
          Résumé
          <span class="tooltip">
            Download from Google Docs
          </span>
        </span>
      </a>
    </div>
  `;

  setTimeout(() => {
    document.querySelector('main').style.visibility = 'visible';
  }, 200);

  document.addEventListener('click', e => {
    if (
      e.target.classList.contains('content-click-bar') ||
      e.target.classList.contains('content-subheader') ||
      e.target.classList.contains('content-arrow')
    ) {
      let width = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
      let id = e.target.id.slice(0, e.target.id.indexOf('-'));
      let arrowIcon = document.getElementById(`${id}-arrow-icon`);
      if (arrowIcon.style.transform === 'translateY(0px) rotate(180deg)') {
        arrowIcon.style.transform = 'translateY(0px) rotate(0deg)';
        arrowIcon.classList.remove('nudge-up');
        setTimeout(() => {
          arrowIcon.classList.add('nudge-down');
        }, 1100);
      } else {
        arrowIcon.style.transform = 'translateY(0px) rotate(180deg)';
        arrowIcon.classList.remove('nudge-down');
        setTimeout(() => {
          arrowIcon.classList.add('nudge-up');
        }, 1100);
      }
      let secondary = document.getElementById(`${id}-secondary`);
      let transition = Math.round(10 * secondary.scrollHeight / 300) / 10;
      arrowIcon.style.transition = `transform ${transition + 's'}`;
      secondary.style.transition = `max-height ${transition + 's'}`;
      parseInt(secondary.style.maxHeight) > 0
        ? (secondary.style.maxHeight = "0px")
        : (secondary.style.maxHeight = secondary.scrollHeight + 'px');
    }
  });
}

function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
