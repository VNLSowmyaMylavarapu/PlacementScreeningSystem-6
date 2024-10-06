document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("studentRegistrationForm");
    const resumeInput = document.getElementById("resume");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let valid = true;

        // Check if the resume is a PDF
        const filePath = resumeInput.value;
        const allowedExtensions = /\.pdf$/i;
        if (!allowedExtensions.test(filePath)) {
            alert("Please upload a valid PDF file.");
            resumeInput.focus();
            valid = false;
        }

        // If validation passes, display a success message
        if (valid) {
            successMessage.style.display = "block";
            alert("Registration successful! Your details have been submitted.");
            
            // Reset form fields
            form.reset();
        }
    });
});
