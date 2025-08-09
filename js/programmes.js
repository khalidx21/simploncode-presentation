document.addEventListener("DOMContentLoaded", () => {
    const programmesContainer = document.querySelector(
        ".programmes__container"
    );
    const addProgrammeForm = document.querySelector("#add-programme-form");

    const fetchProgrammes = async () => {
        try {
            const response = await fetch("http://localhost:3000/programmes");
            const programmes = await response.json();
            return programmes;
        } catch (error) {
            console.error("Error fetching programmes:", error);
        }
    };

    const displayProgrammes = (programmes) => {
        programmesContainer.innerHTML = "";
        programmes.forEach((programme) => {
            const programmeElement = document.createElement("div");
            programmeElement.classList.add("programme");

            const skills = programme.skills
                .map(
                    (skill) => `<span class="programme__skill">${skill}</span>`
                )
                .join("");

            programmeElement.innerHTML = /*html*/ `
                <h3>${programme.title}</h3>
                <p>${programme.description}</p>
                <p><strong>Durée:</strong> ${programme.duration}</p>
                <div class="programme__skills">
                    ${skills}
                </div>
            `;
            programmesContainer.appendChild(programmeElement);
        });
    };

    const addProgramme = async (programme) => {
        try {
            const response = await fetch("http://localhost:3000/programmes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(programme),
            });
            const newProgramme = await response.json();
            return newProgramme;
        } catch (error) {
            console.error("Error adding programme:", error);
        }
    };

    addProgrammeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(addProgrammeForm);
        const skills = formData
            .get("skills")
            .split(",")
            .map((skill) => skill.trim());

        const newProgramme = {
            title: formData.get("title"),
            description: formData.get("description"),
            duration: formData.get("duration"),
            skills: skills,
        };

        const addedProgramme = await addProgramme(newProgramme);

        if (addedProgramme) {
            const programmes = await fetchProgrammes();
            displayProgrammes(programmes);
            addProgrammeForm.reset();
        }
    });

    const init = async () => {
        const programmes = await fetchProgrammes();
        displayProgrammes(programmes);
    };

    init();
});
