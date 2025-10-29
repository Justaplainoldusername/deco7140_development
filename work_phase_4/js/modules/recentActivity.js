import { fetchGetData } from "./modules/getData.js";

//POST
document.addEventListener("DOMContentLoaded", () => {

    const Container = document.getElementById("activity-list");


    // Define loadEvents *inside* so container is visible
    async function loadRecentActivity() {
        container.innerHTML = '<p>Loading RecentActivity...</p>';

        const data = await fetchGetData(
            'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/communityformsimple/',
            {
                'student_number': 's4794039',
                'uqcloud_zone_id': 'e9ee3aeb'
            }
        );

        if (!data) {
            container.innerHTML = '<p class="text-danger">Unable to load recent activity.</p>';
            return;
        }

        if (data.length === 0) {
            container.innerHTML = '<p>No recent activity yet.</p>';
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
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Load existing events
    loadRecentActivity();
    });