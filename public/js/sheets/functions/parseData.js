export let csvDataLists = { 1: [], 2: [], 3: [] };

export function parseTXT(contents, fileName, fileIndex, sectionId) {
    // Separar las líneas del archivo
    const lines = contents.split('\n');

    if (lines.length < 6) {
        console.error('El archivo no tiene suficientes líneas para procesar los encabezados y datos.');
        return;
    }

    // Asumiendo que la línea 7 es el encabezado (ajusta según sea necesario)
    const headerLine = lines[7];
    const headers = headerLine.split('\t');

    if (!headers || headers.length === 0) {
        console.error('No se encontraron encabezados en la línea 7.');
        return;
    }

    // Procesar las líneas de datos a partir de la línea 8
    const data = lines.slice(8).map(line => line.split('\t'));

    const txtData = {
        fileName: fileName,
        headers: headers,
        data: data
    };

    if (!csvDataLists[sectionId]) {
        csvDataLists[sectionId] = [];
    }

    csvDataLists[sectionId][fileIndex] = txtData; // Almacena los datos en la posición correspondiente al índice del archivo.
}
