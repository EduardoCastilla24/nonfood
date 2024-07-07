
// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '300968915925-043fkmt82s224l3ehdkrrjkjeo8tk9vp.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDLSImxjMpxtxTaeD1usnV1jm5HI_KDxhg';
const TOKEN_STORAGE_KEY = 'gapi_token';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('gapi').addEventListener('load', gapiLoaded());
document.getElementById('gis').addEventListener('load', gisLoaded());

// document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        // document.getElementById('authorize_button').style.visibility = 'visible';
        restoreSession();
    }
}

/**
 * Restore the session from storage if a token is available.
 */
function restoreSession() {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
        gapi.client.setToken(JSON.parse(storedToken));
    }
}

/**
 * Sign in the user upon button click.
 */
export function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }

        // Guardar el token en el almacenamiento de sesión
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(gapi.client.getToken()));
        // Redireccion a la pagina
        window.location.href = './profundidad';
        // Obtener los datos google sheets
        // await getProductos('J08');
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        // Skip display of the account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
    }
}

/**
 * Sign out the user upon button click.
 */
export function handleSignoutClick() {
    const token = gapi.client.getToken();
    const signoutButton = document.getElementById('signout_button');

    if (signoutButton !== null) {
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            // Limpiar el token almacenado en el almacenamiento de sesión
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }

    } else {
        console.error("Elemento de SignOut no encontrado");
    }
}
