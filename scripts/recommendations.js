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
          <div class="content-animated-box">
            <div class="content-hover-bar">
              <i class="content-arrow fas fa-chevron-circle-down"></i>
              <p class="content-subheader">${data.title}</p>
            </div>
            <div class="content-secondary">
              <div class="content-description">${data.recText}</div>
            </div>
          </div>
        </div>
    `;
    });
	}
});