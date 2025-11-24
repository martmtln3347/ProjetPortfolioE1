const projectsContainer = document.getElementById('projects-list');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');

let allProjects = [];

// Majuscule 1ère lettre
const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

// Dark Mode
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Chargement Projets
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('Erreur de chargement');
        allProjects = await response.json();
        renderProjects(allProjects);
    } catch (error) {
        console.error(error);
        projectsContainer.innerHTML = '<p class="text-danger">Impossible de charger les projets.</p>';
    }
}

// Rendu
function renderProjects(projects) {
    projectsContainer.innerHTML = '';

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="text-dark-2">Aucun projet trouvé.</p>';
        return;
    }

    projects.forEach(project => {
        const cardHTML = `
            <article class="card">
                <img src="${project.image}" alt="${project.title}">
                <div class="p-4">
                    <span class="text-xs font-bold text-primary uppercase tracking-wide">
                        ${capitalize(project.type)}
                    </span>
                    <h4 class="text-xl text-dark-1 my-2 font-bold">${project.title}</h4>
                    
                    <p class="project-desc text-dark-2 mb-4 text-sm" style="display:none;">
                        ${project.description}
                    </p>
                    
                    <button class="btn is-primary w-full view-details-btn">Voir détails</button>
                </div>
            </article>
        `;
        projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Gestion boutons "Voir détails"
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const desc = e.target.previousElementSibling;
            if (desc.style.display === 'none') {
                desc.style.display = 'block';
                e.target.textContent = 'Masquer détails';
            } else {
                desc.style.display = 'none';
                e.target.textContent = 'Voir détails';
            }
        });
    });
}

// Filtres
function filterProjects(category) {
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.remove('is-outlined');
            btn.classList.add('is-primary');
        } else {
            btn.classList.add('is-outlined');
            btn.classList.remove('is-primary');
        }
    });

    if (category === 'all') {
        renderProjects(allProjects);
    } else {
        const filtered = allProjects.filter(p => p.type === category);
        renderProjects(filtered);
    }
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterProjects(e.target.dataset.filter);
    });
});

// Recherche
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const searchResults = allProjects.filter(project => {
        return (
            project.title.toLowerCase().includes(term) ||
            project.description.toLowerCase().includes(term) ||
            project.type.toLowerCase().includes(term)
        );
    });
    renderProjects(searchResults);
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci John Doe (simulation) ! Votre message a bien été "envoyé".');
    contactForm.reset();
});

initTheme();
loadProjects();