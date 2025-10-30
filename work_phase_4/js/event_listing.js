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

        // Get today's date at midnight (so comparisons are consistent)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter events to only include those happening today or later
        const upcomingEvents = data.filter(event => {
            const eventDate = new Date(event.date_time);
            return eventDate >= today;
        });

        if (upcomingEvents.length === 0) {
            container.innerHTML = '<p>No upcoming events.</p>';
            return;
        }

        // Sort events by date (optional but useful)
        upcomingEvents.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

        container.innerHTML = '';
        upcomingEvents.forEach(event => {
            const card = document.createElement('div');
            card.className = 'simple-card';
            card.innerHTML = `
                <div class="card-body">
                    <h1>${event.event_name}</h1>
                    <h3>${event.location} | ${new Date(event.date_time).toLocaleString()}</h3>

                    <p class="card-title">${event.description}</p>

                    ${event.genericevent_photo ? `<img src="${event.genericevent_photo}" alt="${event.event_name}" class="event-photo">` : ''}
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
            loadEvents(); // reload to show the new event
        } else {
            feedback.textContent = data.message || "Something went wrong.";
        }
    });
});