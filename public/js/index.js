// En index.js
import { createCardFile } from "./createFile.js";
import { csvDataLists, parseTXT } from "./sheets/functions/parseData.js";
import { filterData } from "./sheets/functions/filterData.js";
import { sendDataToGoogleSheets } from "./sheets/functions/sendData.js";

const uploadInputs = document.querySelectorAll('.upload-file');
const processButton = document.getElementById('processButton');

let csvDataLists_ = csvDataLists

uploadInputs.forEach((uploadInput, index) => {
    uploadInput.addEventListener('change', function () {
        const files = this.files;
        const sectionId = index + 1;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const fileName = file.name;
                const fileSize = file.size;
                createCardFile(fileName, fileSize, i, sectionId);

                const reader = new FileReader();
                reader.onload = function(e) {
                    const buffer = e.target.result;
                    const decoder = new TextDecoder('ISO-8859-1'); // Ajusta la codificación según tu archivo
                    const contents = decoder.decode(buffer);
                    parseTXT(contents, fileName, i, sectionId);
                };
                reader.readAsArrayBuffer(file);
            }
        }
    });
});

processButton.addEventListener('click', async function() {
    const allPromises = [];

    for (let sectionId in csvDataLists_) {
        csvDataLists_[sectionId].forEach((csvData, index) => {
            Notiflix.Loading.hourglass();
            const promise = processFile(index, sectionId);
            allPromises.push(promise);
        });
    }

    try {
        await Promise.all(allPromises);
        Notiflix.Loading.remove();
        deleteAllCardFileContainers()
    } catch (error) {
        console.error("Ocurrió un error en el procesamiento:", error);
    }
});

async function processFile(fileIndex, sectionId) {
    const csvData = csvDataLists_[sectionId][fileIndex];
    if (csvData) {
        const filteredData = filterData(csvData.data, '332-Chincha');
        await sendDataToGoogleSheets(csvData.headers, filteredData, csvData.fileName);
    } else {
        console.log(`No se ha cargado el archivo con índice ${fileIndex} en la sección ${sectionId}.`);
    }
}


function deleteAllCardFileContainers() {
    // Seleccionar todos los elementos .cardFile-container
    const cardContainers = document.querySelectorAll('.cardFile-container');

    // Iterar sobre cada contenedor
    cardContainers.forEach((container, index) => {
        // Aplicar la clase para animación de eliminación
        container.classList.add('animate-delete');

        // Esperar a que termine la animación (600ms)
        setTimeout(() => {
            document.getElementById(`section_cardFiles1`).innerHTML = '' ;
            document.getElementById(`section_cardFiles2`).innerHTML = '' ;
            document.getElementById(`section_cardFiles3`).innerHTML = '' ;

            container.remove(); // Eliminar el contenedor después de la animación
        }, '600'); // Añadir un retardo progresivo para una animación escalonada
    });
}