window.addEventListener('load', () => {
  const cjLogoContainer = document.getElementById('cj-logo-container');

  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  if (isTouchDevice()) {
    cjLogoContainer.innerHTML += `
      <a href="/pages/home.html">
        <img id="cj-logo" src="../images/CJ-open.png" />
      </a>
    `;
  } else {
    cjLogoContainer.innerHTML += `
      <a href="/pages/home.html">
        <div id="hover-anchor">
          <div class="text-container">
            <div id="cee" class="text">
              C<span id="fn" class="fade-in">aroline</span>
            </div>
          </div>
          <div class="text-container">
            <div id="jay" class="text">
              J<span id="ln" class="fade-in">ones</span>
            </div>
          </div>
          <div id="circle-mask">
            <div id="shape4" class="square"></div>
            <div id="shape3" class="square"></div>
            <div id="shape2" class="square"></div>
            <div id="shape1" class="square"></div>
          </div>
        </div>
      </a>
    `;
  }

  setTimeout(() => {
    cjLogoContainer.classList.remove('preload');
  }, 300);
});
