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
              <div class="content-logo-container">
                <img class="content-logo" src="images/${data.image}" width="60px" />
              </div>
              <div class="content-primary-text">
                <p><span class="content-header">${data.name}</span></br>
                  ${data.blurb}</p>
              </div>
            </div>            
          </div>
        </div>
      `;
    });
	}
});