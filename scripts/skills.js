window.addEventListener("load", () => {
	
	let techSkillsCategories = {
		knowledge: { category: "Knowledge", data: [], list: ""},
		tools: { category: "Tools", data: [], list: ""},
		languages: { category: "Languages", data: [], list: ""},
		frameworks: { category: "Frameworks", data: [], list: ""},
		databases: { category: "Databases", data: [], list: ""},
	};
	let generalSkillsCategories = {
		knowledge: { category: "Knowledge", data: [], list: ""},
		strengths: { category: "Strengths", data: [], list: ""},
		tools: { category: "Tools", data: [], list: ""},
		values: { category: "Values", data: [], list: ""},
	};

  const techSkillsArea = document.querySelector("#tech-skills-area");
	const generalSkillsArea = document.querySelector("#general-skills-area");

  loadSkills();

	async function loadSkills() {
		const resp = await fetch("/data/skills.json");
    const data = await resp.json();
    data.forEach((obj) => {
      let skill = {
        id: obj.id,
        skillName: obj.skillName,
        category: obj.category,
        type: obj.type,
      };
      if (skill.type === "Tech") {
        techSkillsCategories[skill.category.toLowerCase()].data.push(skill);
      } else {
        generalSkillsCategories[skill.category.toLowerCase()].data.push(skill);
      }
    });
		buildSkillsHTML();
		displaySkills();
	}

	function buildSkillsHTML() {
    for (cat in techSkillsCategories) {
      let data = techSkillsCategories[cat].data.sort((a, b) => (a.skillName > b.skillName ? 1 : -1));
      data.forEach((skill) => {
        techSkillsCategories[cat].list += `<p class='skill-name'>${skill.skillName}</p>`;
      })
    }
    for (cat in generalSkillsCategories) {
      let data = generalSkillsCategories[cat].data.sort((a, b) => (a.skillName > b.skillName ? 1 : -1));
      data.forEach((skill) => {
        generalSkillsCategories[cat].list += `<p class='skill-name'>${skill.skillName}</p>`;
      })
    }
	}

	function displaySkills() {
			let allTechSkills = "";
			for (techCategory in techSkillsCategories) {
				allTechSkills += `
          <div class="content-block skills-subsection">
            <div class="content-primary">
              <div class="content-primary-text skills-list">
                <p class="content-header">${techSkillsCategories[techCategory].category}</p>
                <div>${techSkillsCategories[techCategory].list}</div> 
              </div>
            </div>
          </div>
        `;
			}
			techSkillsArea.innerHTML = allTechSkills;

			let allGeneralSkills = "";
			for (generalCategory in generalSkillsCategories) {
				allGeneralSkills += `
          <div class="content-block skills-subsection">
            <div class="content-primary">
              <div class="content-primary-text skills-list">
                <p class="content-header">${generalSkillsCategories[generalCategory].category}</p>
                <div>${generalSkillsCategories[generalCategory].list}</div> 
              </div>
            </div>
          </div>
        `;
			}
			generalSkillsArea.innerHTML = allGeneralSkills;
	}
});