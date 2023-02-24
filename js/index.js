const projectsContainer = document.querySelector(".cjdev__projects");
window.onload = load;

function load() {
    drawProjects();

    const experienceTechSwitches = document.querySelectorAll('.cjdev__experience .cjdev__switch__checkbox');
    experienceTechSwitches.forEach(experienceTechSwitch => {
        experienceTechSwitch.addEventListener('change', changeTechnologiesDisplayState);
    })
}

function changeTechnologiesDisplayState(event) {
    event.preventDefault();

    const companyID = this.dataset.company;
    const listSelector = `cjdev__techs--${companyID}`;

    const listElement = document.querySelector(`.${listSelector}`);

    if(this.checked) {
        listElement.classList.add('cjdev__techs--show');
    } else {
        listElement.classList.remove('cjdev__techs--show');
    }
}

async function getProjects() {
    const response = await fetch("./data/projects.json");
    const projects = await response.json();
    return projects;
}

async function drawProjects() {
    const projects = await getProjects();
    const projectsHTML = projects.map(project => {
        const tags = project.tags.map(tag => {
            return `<li class="cjdev__project__tag">
                        <i class="cjdev__project__tag__icon fa-solid fa-tag"></i>
                        <span class="cjdev__project__tag__text">${tag}</span>
                    </li>`;
        }).join("");

        const links = project.links.map(link => {
            let linkIcon = link.icon == "" ? "fa-solid fa-link" : link.icon;
            let linkText = link.type == "code"  ? "Code" : "Visit";
            return `<li class="cjdev__project__link__item">
                        <a class="cjdev__project__link" href="${link.link}">
                            <i class="cjdev__project__link__icon ${linkIcon}"></i>
                            <span class="cjdev__project__text">${linkText}</span>
                        </a>
                    </li>`;
        }).join("");

        const descriptions = project.descriptions.map(description => `<p>${description}</p>`).join("");

        const technologies = project.technologies.map(technology => {
            const iconTechnology = technology.icon == "" ? "" : `<i class="cjdev__project__tech__item__icon ${technology.icon}"></i>`;
            return `<li class="cjdev__project__tech__item">
                ${iconTechnology}
                <span class="cjdev__project__tech__item__text">${technology.text}</span>
            </li>`
        }).join("");

        return `<article class="cjdev__project">
                                <figure class="cjdev__project__image_container">
                                    <img class="cjdev__project__image" src="./assets/projects/${project.type}${project.id}_desktop001.png" alt="preview image" loading="lazy">
                                    <h6 class="cjdev__project__type">
                                        <i class="cjdev__project__type__icon fa-solid fa-${project.type == "company"?"building":"code"}"></i>
                                        <span class="cjdev__project__type__text">${project.typeText}</span>
                                    </h6>
                                </figure>
                                <section class="cjdev__project__information">
                                    <h4 class="cjdev__project__title">${project.title}</h4>
                                    <ul class="cjdev__project__links">
                                        ${links}
                                    </ul>
                                    <hr>
                                    <section class="cjdev__project__description">
                                        <i class="cjdev__project__description__icon fa-solid fa-circle-info"></i>
                                        ${descriptions}
                                    </section>
                                    <hr>
                                    <ul class="cjdev__project__tags">
                                        ${tags}
                                    </ul>
                                    <hr>
                                    <ul class="cjdev__project__techs">
                                        ${technologies}
                                    </ul>
                                </section>
                            </article>`;
    });

    projectsContainer.innerHTML = projectsHTML.join("");
}