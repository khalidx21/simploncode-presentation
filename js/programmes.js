document.addEventListener('DOMContentLoaded', () => {
    const programmesContainer = document.querySelector('.programmes__container');
    const addProgrammeForm = document.querySelector('#add-programme-form');
    const searchInput = document.querySelector('#search');

    let allProgrammes = [];

    const fetchProgrammes = async () => {
        try {
            const response = await fetch('http://localhost:3000/programmes');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const programmes = await response.json();
            allProgrammes = programmes;
            return programmes;
        } catch (error) {
            console.error('Error fetching programmes:', error);
            return null;
        }
    };

    const displayProgrammes = (programmes) => {
        programmesContainer.innerHTML = '';
        if (programmes === null) {
            programmesContainer.innerHTML = '<p class="error-message">Une erreur est survenue lors de la récupération des programmes. Veuillez réessayer plus tard.</p>';
            return;
        }
        if (programmes.length === 0) {
            programmesContainer.innerHTML = '<p class="no-programmes-message">Aucun programme trouvé.</p>';
            return;
        }
        programmes.forEach(programme => {
            const programmeElement = document.createElement('div');
            programmeElement.classList.add('programme');

            const skills = programme.skills.map(skill => `<span class="programme__skill">${skill}</span>`).join('');

            programmeElement.innerHTML = `
                <h3>${programme.title}</h3>
                <p>${programme.description}</p>
                <p><strong>Durée:</strong> ${programme.duration} mois</p>
                <div class="programme__skills">
                    ${skills}
                </div>
                <button class="remove-btn" data-id="${programme.id}">Supprimer</button>
            `;
            programmesContainer.appendChild(programmeElement);
        });
    };

    const addProgramme = async (programme) => {
        try {
            const response = await fetch('http://localhost:3000/programmes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(programme),
            });
            const newProgramme = await response.json();
            return newProgramme;
        } catch (error) {
            console.error('Error adding programme:', error);
        }
    };

    const removeProgramme = async (id) => {
        try {
            await fetch(`http://localhost:3000/programmes/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting programme:', error);
        }
    };

    addProgrammeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(addProgrammeForm);
        const skills = formData.get('skills').split(',').map(skill => skill.trim());

        const newProgramme = {
            title: formData.get('title'),
            description: formData.get('description'),
            duration: parseInt(formData.get('duration')),
            skills: skills,
        };

        const addedProgramme = await addProgramme(newProgramme);

        if (addedProgramme) {
            const programmes = await fetchProgrammes();
            displayProgrammes(programmes);
            addProgrammeForm.reset();
        }
    });

    programmesContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const programmeId = e.target.dataset.id;
            await removeProgramme(programmeId);
            const programmes = await fetchProgrammes();
            displayProgrammes(programmes);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProgrammes = allProgrammes.filter(programme =>
            programme.title.toLowerCase().includes(searchTerm)
        );
        displayProgrammes(filteredProgrammes);
    });

    const init = async () => {
        const programmes = await fetchProgrammes();
        displayProgrammes(programmes);
    };

    init();
});
