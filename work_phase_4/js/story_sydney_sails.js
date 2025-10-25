/** IMPORTS */
import { postFormData } from "./modules/postFormData.js";


/** CONSTANTS */

/** VARIABLES */

/** FUNCTIONS */

/** EVENT LISTENERS */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const feedback = document.getElementById("form-feedback");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        feedback.textContent = "Submitting...";

        const { success, data } = await postFormData(
            form,
            "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericchat/"
        );

        if (success) {
            feedback.textContent = data.message || "Chat post submitted!";
            form.reset();
        } else {
            feedback.textContent = data.message || "Something went wrong.";
        }
    });
});
