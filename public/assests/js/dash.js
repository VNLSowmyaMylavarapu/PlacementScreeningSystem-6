// Add functionality to the navigation menu (optional)
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Add a visual indicator (optional)
    link.classList.add('active'); // Add a class for styling

    // Remove the active class from other links after a delay (optional)
    setTimeout(() => {
      link.classList.remove('active');
    }, 100); // Adjust delay as needed
  });
});