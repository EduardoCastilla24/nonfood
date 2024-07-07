import { appendDataToSheet } from './appendData.js';

export async function createSheetAndAppendData(headers, data, fileName, accessToken, spreadsheetId, sheetName) {
    const createSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate?access_token=${accessToken}`;

    const createSheetRequest = {
        requests: [{
            addSheet: {
                properties: {
                    title: sheetName
                }
            }
        }]
    };

    try {
        let response = await fetch(createSheetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createSheetRequest)
        });

        let result = await response.json();
        console.log('Hoja creada exitosamente en Google Sheets:', result);

        // Una vez que la hoja está creada, agregar los encabezados y datos
        await appendDataToSheet(headers, data, fileName, accessToken, spreadsheetId, sheetName);
    } catch (error) {
        console.error('Error al crear la hoja en Google Sheets:', error);
        throw error; // Asegúrate de que los errores se propaguen
    }
}
