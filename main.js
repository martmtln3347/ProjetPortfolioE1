// 🔧 Configuration & Sélecteurs
const projectsContainer = document.getElementById('projects-list');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');

let allProjects = [];

// 1. Gestion du Dark Mode (LocalStorage)
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Si 'dark', on ajoute la classe (gérée par Plugo : .dark-mode)
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// 2. Chargement des projets via AJAX (Fetch)
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

// 3. Rendu des projets (Utilisation du composant Card de Plugo)
function renderProjects(projects) {
    projectsContainer.innerHTML = '';

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="text-dark-2">Aucun projet trouvé.</p>';
        return;
    }

    projects.forEach(project => {
        // On crée une string HTML en utilisant les classes Plugo (.card, .text-primary...)
        const cardHTML = `
            <article class="card">
                <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius: 4px 4px 0 0;">
                <div class="p-4">
                    <span class="text-xs font-bold text-primary uppercase tracking-wide">${project.type}</span>
                    <h4 class="text-xl text-dark-1 my-2">${project.title}</h4>
                    <p class="text-dark-2 mb-4 text-sm">${project.description}</p>
                    <button class="btn is-primary w-full">Voir détails</button>
                </div>
            </article>
        `;
        projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 4. Système de Filtrage
function filterProjects(category) {
    // Mise à jour visuelle des boutons
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('is-primary');
        } else {
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

// 5. Système de Recherche (Titre, description ou type)
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

// 6. Formulaire de contact (Simulation)
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci John Doe (simulation) ! Votre message a bien été "envoyé".');
    contactForm.reset();
});

// Initialisation
initTheme();
loadProjects();