window.addEventListener("load", () => {

  let educationData = [];
  let courseData = [];
  let courseCategories = [];
  let courseInfo = "";
  const edArea = document.querySelector("#ed-area");

  loadEducation();

	async function loadEducation() {
		const resp = await fetch("/data/education.json")
    const data = await resp.json();
    educationData = data.map((obj) => {
      return {
        id: obj.id,
        institution: obj.institution,
        gradDate: obj.gradDate,
        degree: obj.degree,
        desc: obj.desc,
        image: obj.image,
        website: obj.website,
      };
    });
    loadUdemyCourses();
	}

  async function loadUdemyCourses() {
		const resp = await fetch("/data/udemy-courses.json")
    const data = await resp.json();
    courseData = data.map((obj) => {
      if (!courseCategories.includes(obj.category)) courseCategories.push(obj.category);
      return {
        id: obj.id,
        title: obj.title,
        instructor: obj.instructor,
        category: obj.category,
        subject: obj.subject
      };
    });
    courseCategories.sort();
		buildCourseInfo();
	}

  function buildCourseInfo() {
    courseCategories.forEach(category => {
      courseInfo += `
        <p class="course-category">${category}</p>
      `;
      let courses = courseData.filter((course) => {
        return course.category === category;
      });
      courses.sort((a, b) => (a.subject > b.subject) ? 1 : -1);
      courses.forEach((course) => {
        courseInfo += `
          <p><span class="course-title">${course.title}</span> | 
          <span class="course-instructor">${course.instructor}</p>
        `;
      });
    })
    displayEducation();
  }

	function displayEducation() {
    educationData.forEach((data) => {
      let websitePart = data.website.slice(data.website.indexOf("//") + 2);
      let website = websitePart.includes("/")  ? websitePart.slice(0, websitePart.indexOf("/")) : websitePart;
      edArea.innerHTML += `
        <div class="content-item">
          <div class="content-block">
            <div class="content-primary">
              <div class="content-logo-container tooltip-container">
                <a href="${data.website}" target="_blank"><img class="content-logo" src="images/${data.image}" width="60px" /></a>
                <span class="tooltip-left">${website}</span>
              </div>
              <div class="content-primary-text">
                <p><span class="content-header">${data.institution}</span><br />
                ${data.gradDate}</p>     
              </div>                   
            </div>                    
          </div>
          <div id="${data.id}-animated-box" class="content-animated-box">
            <div id="${data.id}-click-bar" class="content-click-bar">
              <i id="${data.id}-arrow-icon" class="content-arrow fas fa-chevron-circle-down"></i>
              <p  id="${data.id}-subheader" class="content-subheader">${data.degree === "REPLACE ME" ? courseData.length + " Courses" : data.degree}</p>
              </div>
            <div id="${data.id}-secondary" class="content-secondary">
              <div id="${data.id}-desc" class="content-description">${data.desc === "REPLACE ME" ? courseInfo : data.desc}</div>
            </div>
          </div>
        </div>
      `;
    });
	}
});