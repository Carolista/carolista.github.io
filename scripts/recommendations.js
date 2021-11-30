window.addEventListener("load", () => {

  let recommendationData = [];
  const recArea = document.querySelector("#rec-area");

  loadRecommendations();

	async function loadRecommendations() {
		const resp = await fetch("/data/recommendations.json");
    const data = await resp.json();
    recommendationData = data.map((obj) => {
      return {
        id: obj.id,
        author: obj.author,
        title: obj.title,
        recText: obj.recText,
      };
    });
		displayRecommendations();
	}

	function displayRecommendations() {
    recommendationData.forEach((data) => {
      recArea.innerHTML += `
        <div class="content-item">
          <div class="content-block">
            <div class="content-primary">
              <p class="content-header">${data.author}</p>
            </div>
          </div>
          <div id="${data.id}-animated-box" class="content-animated-box">
            <div id="${data.id}-click-bar" class="content-click-bar">
              <i id="${data.id}-arrow-icon" class="content-arrow fas fa-chevron-circle-down"></i>
              <p  id="${data.id}-subheader" class="content-subheader">${data.title}</p>
              </div>
            <div id="${data.id}-secondary" class="content-secondary">
              <div id="${data.id}-desc" class="content-description">${data.recText}</div>
            </div>
          </div>
        </div>
      `;
    });
	}
});