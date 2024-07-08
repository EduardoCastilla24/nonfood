// dataTable.js
import { Modal } from "../modal.js";
import { getProductos } from "../sheets/sheets.js";

let dataTable;  // Declarar la variable dataTable fuera de la función
let select = null;  // Inicializar select en null
let selectedOption = "J08"; // Variable para almacenar la opción seleccionada

// Llamada a getProductos para obtener los datos antes de inicializar la tabla
export function tableProductos(data, selectedSheet) {

    // Configuraciones comunes
    const commonConfig = {
        order: [[0, 'desc']], // Ordena la primera columna en orden descendente

        // PRIORIDAD DE COLUMNAS
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 }
        ],
        // CANTIDAD DE REGISTROS A MOSTRAR
        pageLength: 10,
        // TRADUCCION DE LOS MENSAJES
        language: {
            search: "",
            searchPlaceholder: "Buscar...",
            lengthMenu: '_MENU_',
            zeroRecords: 'No se han encontrado registros que coincidan',
            info: 'Mostrando _END_ de _MAX_ registros',
            infoEmpty: 'Mostrando _END_ coincidencias',
            infoFiltered: "(Filtrado de _MAX_ registros en total)",
            emptyTable: 'No existen registros en esta tabla',
            paginate: {
                next: '<i class="bx bx-chevron-right !relative !top-1 !text-lg"></i>',
                previous: '<i class="bx bx-chevron-left !relative !top-1 !text-lg"></i>'
            },
        },
    };
    // Limpiar el select existente si existe
    if (select) {
        select.remove();
    }

    if (dataTable) {
        dataTable.clear().rows.add(data).draw();

        // Restaurar la opción seleccionada
        select.val(selectedSheet);

    } else {
        // Inicializar la tabla DataTable con los datos de Productos
        dataTable = $('.dataTable').DataTable({
            data: data,
            columns: [
                { data: 'descripcion', title: 'Descripción' },
                { data: 'ean', title: 'Ean', className: 'hidden'},
                { data: 'asst', title: 'Asst', className: 'hidden'},
                { data: 'sku', title: 'Sku', className: 'hidden'},
                { data: 'marca', title: 'Marca', className: 'hidden'},
                { data: 'estado', title: 'Estado', className: 'hidden'},
            ],
            ...commonConfig,
            dom: 'Bfrtip',
             // Agregar evento de clic en las filas
            rowCallback: function(row, data) {
                $(row).on('click', function() {
                    // Acción a realizar cuando se hace clic en la fila
                    // console.log('Fila clicada:', data);
                    Modal(data.descripcion, data.ean, data.precio, data.oh, data.asst, data.division, data.estado, data.sku, data.marca)
                });
            }
        });
    }


    select = $('<select><option value="J08">J08 - VESTUARIO</option><option value="J09">J09 - HOGAR</option><option value="J10">J10 - BAZAR</option></select>')
    .appendTo($('.dataTables_filter'))
    .on('change', function () {
        const hojaSeleccionada = $(this).val();

        // Almacena la opción seleccionada
        selectedOption = hojaSeleccionada;

        // Llama a getProductos con la hoja seleccionada
        getProductos(hojaSeleccionada);
    });

    // Establecer la opción seleccionada
    select.val(selectedOption);

    return dataTable;
}
