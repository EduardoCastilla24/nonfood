export async function appendDataToSheet(headers, data, fileName, accessToken, spreadsheetId, sheetName) {
    const headersUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:append?valueInputOption=RAW&access_token=${accessToken}`;

    try {
        let response = await fetch(headersUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: [headers]
            })
        });

        let result = await response.json();
        console.log('Encabezados agregados exitosamente a Google Sheets:', result);

        // Añadir los datos filtrados en la fila A2
        const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A2:append?valueInputOption=RAW&access_token=${accessToken}`;

        response = await fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: data
            })
        });

        result = await response.json();
        console.log('Datos filtrados agregados exitosamente a Google Sheets:', result);
    } catch (error) {
        console.error('Error al agregar datos a Google Sheets:', error);
        throw error; // Asegúrate de que los errores se propaguen
    }
}
