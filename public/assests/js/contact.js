document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Basic validation (you can expand this as needed)
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        // Display a success message (you can customize this)
        alert("Thank you for your message! We'll get back to you shortly.");

        // Optionally, you could send the form data using Fetch API or XMLHttpRequest
        // Example:
        /*
        fetch('/submit_contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => response.json())
        .then(data => {
            alert("Message sent successfully!");
            form.reset(); // Reset the form fields
        })
        .catch((error) => {
            alert("There was an error sending your message.");
            console.error('Error:', error);
        });
        */

        // Reset the form after successful submission
        form.reset();
    });
});