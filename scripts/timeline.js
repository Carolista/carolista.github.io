window.addEventListener("load", () => {
  
  let timelineData = [];
  let isCollapsed = true;

  const timelineTable = document.querySelector("#timeline-table");
	const timelineButton = document.querySelector("#timeline-button");


  function loadTimeline() {
    fetch("/data/timeline.json")
      .then((response) => response.json())
      .then((data) => {
        timelineData = data.map((obj) => {
          return {
            year: obj.year,
            desc: obj.desc,
          };
        });
      });
    displayTimeline(3);
  }

  function generateTimeline(num) {
    timelineTable.innerHTML = "";
    timelineData.forEach((data) => {
      timelineTable.innerHTML += `
        <tr>
            <td class="year">${data.year}</td>
            <td>${data.desc}</td>
        </tr>
        `;
    });
  }

  function displayTimeline(num) {
    setTimeout(() => {
      generateTimeline(num);
    }, 300); 
  }

  function toggleTimeline() {
    if (isCollapsed) {
      generateTimeline(timelineData.length);
      timelineTable.classList.remove("gradient-text");
      timelineButton.innerHTML = "&uarr; COLLAPSE &uarr;";
      timelineButton.style.margin = "-40px 0px 40px";
    } else {
      generateTimeline(3);
      timelineTable.classList.add("gradient-text");
      timelineButton.innerHTML = "&darr; READ MORE &darr;";
      timelineButton.style.margin = "-90px 0px 90px";
    }
  }

  loadTimeline();

  timelineButton.addEventListener("click", () => {
    toggleTimeline();
    isCollapsed = !isCollapsed;
  });

});