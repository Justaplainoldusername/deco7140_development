import { postFormData } from "./modules/postFormData.js";
import { fetchGetData } from "./modules/getData.js";

//POST
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("event-form");
    const feedback = document.getElementById("form-feedback");
    const container = document.getElementById('event-list');   //check if this needs changing

    // Load existing events
    loadEvents();

    // handle form submission (posting data)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        feedback.textContent = "Submitting...";

        const { success, data } = await postFormData(form, `https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/`, {
            'student_number': 's4794039',
            'uqcloud_zone_id': 'e9ee3aeb',
        });

        if (success) {
            feedback.textContent = data.message || "Event added successfully!";
            form.reset();
            loadEvents(); //Reload events to show new one.
        } else {
            feedback.textContent = data.message || "Something went wrong.";
        }
    });
});


//Handle GET data requests

function loadEvents() {
    container.innerHTML = '<p>Loading Events...</p>';

    fetchGetData('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
        'student_number': 's4794039',
        'uqcloud_zone_id': 'e9ee3aeb'
    }).then(data => {
        
        if (!data) {
        container.innerHTML = '<p class="text-danger">Unable to load events.</p>';
        return;
        }

        if (data.lenth === 0 ) {
            container.innerHTML = '<p>No events yet.</p>';
            return;
        }

        container.innerHTML = '';
        data.forEach(event => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.message || 'No message provided.'}</p>
                    ${event.photo ? `<img src="${event.photo}" alt="${event.name}" class="event-photo">`: ''}
                </div>
            `;
            container.appendChild(card);
        });
    });
    
};

