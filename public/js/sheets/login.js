import { handleAuthClick } from './auth.js';

// Check if the user is already authenticated
const tokenData = localStorage.getItem('gapi_token');
const parsedData = JSON.parse(tokenData);

if (parsedData.access_token) {
    // User is authenticated, show the dashboard
    window.location.href = '/profundidad/';
} else {
    // User is not authenticated, show the login page
    var isTouchDevice = 'ontouchstart' in document.documentElement;

    if (isTouchDevice) {
        document.getElementById('authorize_button').addEventListener('onclick', function(event) {
            event.preventDefault(); // Evita el comportamiento táctil predeterminado
            handleAuthClick();
        });
    } else {
        document.getElementById('authorize_button').onclick = function() {
            handleAuthClick();
        };
    }
}
