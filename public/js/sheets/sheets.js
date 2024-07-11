// sheets.js
import { tableProductos } from "../dataTable/dataTable.js";

let Productos;

export async function getProductos(hoja) {
    try {
        Notiflix.Loading.pulse();

        // Fetch first 10 filesA
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1SQm2Ccg1cFJGWSbcX1dIpI01UsytOGn1UxzSkEJwmKs',
            range: hoja + '!A2:AY', // Utiliza el nombre de la hoja en la consulta
        });

        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('content').innerText = 'No se encontraron valores.';
            return;
        }

        Productos = [];
        range.values.forEach((fila) => {
            const nuevoProducto = {
                descripcion: fila[11],
                ean: fila[8],
                precio: fila[25],
                oh: fila[43],
                asst: fila[31],
                estado: fila[30],
                division: fila[1],
                sku: fila[9],
                marca: fila[12],
            };
            Productos.push(nuevoProducto);
        });
        // Llama a getProductos con la hoja seleccionada
        setTimeout(function(){
            // REMOVE LOADER
            tableProductos(Productos);
            Notiflix.Loading.remove();
        }, 700);

        // Llamada a tableProductos después de obtener los datos

    } catch (err) {
        if (err.status === 401) {
            // Manejar específicamente el error 401
            Notiflix.Report.warning(
                '¡Expiro la sesión!',
                '"Vuelve a iniciar sesion para continuar',
                'Okay',
                () => {
                    localStorage.removeItem('gapi_token');
                    window.location.href = '/';
                }
            );

        } else {
            // Manejar otros tipos de errores
            document.getElementById('content').innerText = `Error: ${err.message}`;
        }
    }
}
