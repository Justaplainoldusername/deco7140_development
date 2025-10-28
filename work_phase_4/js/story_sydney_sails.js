import { postFormData } from "./modules/postFormData.js";
import { fetchGetData } from "./modules/getData.js";

//POST
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("comments-form");
    const feedback = document.getElementById("form-feedback");
    const container = document.getElementById("comments-list");

    // Define loadEvents *inside* so container is visible
    async function loadComments() {
        container.innerHTML = '<p>Loading Comments...</p>';

        const data = await fetchGetData(
            'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/communitymembersimple/',
            {
                'student_number': 's4794039',
                'uqcloud_zone_id': 'e9ee3aeb'
            }
        );

        if (!data) {
            container.innerHTML = '<p class="text-danger">Unable to load comments.</p>';
            return;
        }

        if (data.length === 0) {
            container.innerHTML = '<p>No comments yet.</p>';
            return;
        }

        container.innerHTML = '';
        data.forEach(comment => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <p class="card-title">${comment.name}</p>
                    <p class="card-title">${comment.message}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Load existing comments
    loadComments();

    // Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        feedback.textContent = "Submitting...";

        const { success, data } = await postFormData(form,
            'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/communitymembersimple/',
            {
                'student_number': 's4794039',
                'uqcloud_zone_id': 'e9ee3aeb'
            }
        );

        if (success) {
            feedback.textContent = data.message || "Comment added successfully!";
            form.reset();
            loadComments();
        } else {
            feedback.textContent = data.message || "Something went wrong.";
        }
    });
});