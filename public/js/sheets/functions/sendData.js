import { appendDataToSheet } from './appendData.js';
import { createSheetAndAppendData } from './createSheet.js';

export async function sendDataToGoogleSheets(headers, data, fileName) {
    const gapiTokenString = localStorage.getItem('gapi_token');
    const gapiToken = JSON.parse(gapiTokenString);
    const accessToken = gapiToken.access_token;

    // const spreadsheetId = '1zEmjWMzGNjhOHGG_zsTltXUtfPiH3pWRewFYdd2vO0Y';
    const spreadsheetId = '1SQm2Ccg1cFJGWSbcX1dIpI01UsytOGn1UxzSkEJwmKs';
    const sheetName = fileName.replace(/\.txt$/, ''); // Usa el nombre del archivo sin la extensión como nombre de la hoja

    // Verificar si la hoja existe
    const sheetExistsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?access_token=${accessToken}`;

    try {
        const response = await fetch(sheetExistsUrl);
        const result = await response.json();
        const sheetExists = result.sheets.some(sheet => sheet.properties.title === sheetName);

        if (sheetExists) {
            // Si la hoja existe, limpiar su contenido antes de agregar nuevos datos
            const clearUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:Z1000:clear?access_token=${accessToken}`;
            const clearResponse = await fetch(clearUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            await clearResponse.json();

            // Una vez que se han limpiado los datos existentes, procede a agregar los nuevos datos
            await appendDataToSheet(headers, data, fileName, accessToken, spreadsheetId, sheetName);
        } else {
            // Si la hoja no existe, crea la hoja y agrega los datos
            await createSheetAndAppendData(headers, data, fileName, accessToken, spreadsheetId, sheetName);
        }
    } catch (error) {
        console.error('Error al interactuar con Google Sheets:', error);
        throw error; // Asegúrate de que los errores se propaguen
    }
}
