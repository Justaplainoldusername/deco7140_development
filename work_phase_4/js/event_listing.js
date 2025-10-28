import { postFormData } from "./modules/postFormData.js";
import { fetchGetData } from "./modules/getData.js";

//POST
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("event-form");
    const feedback = document.getElementById("form-feedback");
    const container = document.getElementById("event-list");

    // Define loadEvents *inside* so container is visible
    async function loadEvents() {
        container.innerHTML = '<p>Loading Events...</p>';

        const data = await fetchGetData(
            'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/',
            {
                'student_number': 's4794039',
                'uqcloud_zone_id': 'e9ee3aeb'
            }
        );

        if (!data) {
            container.innerHTML = '<p class="text-danger">Unable to load events.</p>';
            return;
        }

        if (data.length === 0) {
            container.innerHTML = '<p>No events yet.</p>';
            return;
        }

        container.innerHTML = '';
        data.forEach(event => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <p class="card-title">${event.event_name}</p>
                    <p class="card-title">${event.location}</p>
                    <p class="card-title">${event.organiser}</p>
                    <p class="card-title">${event.type}</p>
                    <p class="card-title">${event.description}</p>
                    <p class="card-title">${event.date_time}</p>
                    ${event.photo ? `<img src="${event.genericevent_photo}" alt="${event.event_name}" class="event-photo">` : ''}
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Load existing events
    loadEvents();

    // Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        feedback.textContent = "Submitting...";

        const { success, data } = await postFormData(form,
            'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/',
            {
                'student_number': 's4794039',
                'uqcloud_zone_id': 'e9ee3aeb'
            }
        );

        if (success) {
            feedback.textContent = data.message || "Event added successfully!";
            form.reset();
            loadEvents();
        } else {
            feedback.textContent = data.message || "Something went wrong.";
        }
    });
});