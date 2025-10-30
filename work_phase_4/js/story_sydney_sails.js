import { postFormData } from "./modules/postFormData.js";
import { fetchGetData } from "./modules/getData.js";

function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count >= 1) {
            return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
        }
    }
    return 'Just now';
}

function startAutoUpdate() {
    setInterval(() => {
        document.querySelectorAll('.card-date[data-time]').forEach(el => {
            const date = new Date(el.dataset.time);
            el.textContent = timeAgo(date);
        });
    }, 60000);
}

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
            card.className = 'comments';
            
            const createdAt = new Date(comment.created_at);
            const friendlyDate = timeAgo(createdAt);
            
            card.innerHTML = `
                <div class="comment">
                    <p class="name">${comment.name}</p>
                    <p class="date" data-time="${comment.created_at}">${friendlyDate}</p>
                    <p class="message">${comment.message}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Load existing comments
    loadComments();

    //Start auto-updating timestamps

    startAutoUpdate();
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