window.addEventListener("load", () => {

  let contactData = [];
  const contactArea = document.querySelector("#contact-area");

  loadContact();

	async function loadContact() {
		const resp = await fetch("/data/contact.json");
    const data = await resp.json();
    contactData = data.map((obj) => {
      return {
        id: obj.id,
        name: obj.name,
        blurb: obj.blurb,
        link: obj.link,
        image: obj.image
      };
    });
		displayContact();
	}

	function displayContact() {
    contactData.forEach((data) => {
      contactArea.innerHTML += `
        <div class="content-item">
          <div class="content-block">
            <div class="content-primary">
              <div class="content-logo-container tooltip-container">
              <a href="${data.link}" target="_blank"><img class="content-logo" src="../images/${data.image}" width="80px" /></a>
                <span class="tooltip-left">${data.name}</span>
              </div>
              <div class="content-primary-text">
                <div>
                  <p><span class="content-header">${data.name}</span></br>
                    ${data.blurb}</p>
                </div>
              </div>
            </div>            
          </div>
        </div>
      `;
    });
	}
});