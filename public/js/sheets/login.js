import { handleAuthClick } from './auth.js';

// Check if the user is already authenticated
const tokenData = localStorage.getItem('gapi_token');
const parsedData = tokenData ? JSON.parse(tokenData) : null;

if (parsedData && parsedData.access_token) {
    // User is authenticated, show the dashboard
    window.location.href = '/profundidad/';
} else {
    // User is not authenticated, show the login page
    const authorizeButton = document.getElementById('authorize_button');

    // Check if device is touch-enabled
    var isTouchDevice = 'ontouchstart' in document.documentElement;

    if (isTouchDevice) {
        // Use 'touchstart' event for touch devices
        authorizeButton.addEventListener('touchstart', function(event) {
            event.preventDefault(); // Prevent default touch behavior if necessary
            handleAuthClick();
        });
    } else {
        // Use 'click' event for non-touch devices
        authorizeButton.addEventListener('click', function() {
            handleAuthClick();
        });
    }
}
