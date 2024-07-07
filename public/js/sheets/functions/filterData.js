export function filterData(data, local) {
    // Filtrar los datos por el campo 'Local'
    const filteredData = data.filter(item => item[0] === local);
    // console.log(filteredData);
    // Retornar los datos filtrados
    return filteredData;
}