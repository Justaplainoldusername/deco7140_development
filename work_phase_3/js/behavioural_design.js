import { postFormData } from './modules/postFormData.js';
            
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('community-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        feedback.textContent = 'Submitting...';
        const { success, data } = await postFormData(form, 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/', {
            'student_number': 's47940398',
            'uqcloud_zone_id': 'e9ee3aeb',
        });

        if (success) {
            feedback.textContent = data.message;
            form.reset();
        } else {
            feedback.textContent = data.message || 'Something went wrong.';
        }
    });
});