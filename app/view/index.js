// Funcion asyncronica que verifica si el codigo del producto ya existe
async function verifyCodigo(codigo){            

    const formData = new FormData();
    formData.append('verifyCodigo',codigo);

    try {                

        // Ejecutar la funcion cuando este lista
        const response = await fetch('../controller/controllerProduct.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        
        return response; // Retorna la respuesta del servidor

    } catch (error) {
        console.log("Error en la solicitud AJAX:", error);
        return false; // Retorna false si falla
    }
}
// Funcion para validar el código del producto
function validateCodigo(codigo) {

    // Quitar espacios vacios
    if (codigo.trim() === "") {
        alert("El código del producto no puede estar en blanco.")
        return false
    }
    // Verifica que sea alfanumerico
    if (!/^[A-Za-z0-9]+$/.test(codigo)) {
        alert("El código del producto debe contener solo letras y números.")
        return false
    }
    // Limites a los caracteres
    if (codigo.length < 5 || codigo.length > 15) {
        alert("El código del producto debe tener entre 5 y 15 caracteres.")
        return false
    }

    return true
}
// Funcion para validar el nombre
function validateNombre(nombre) {

    if (nombre.trim() === "") {
        alert("El nombre del producto no puede estar en blanco.")
        return false;
    }

    if (nombre.length < 2 || nombre.length > 20) {
        alert("El nombre del producto debe tener entre 2 y 50 caracteres.")
        return false
    }

    return true
}
// Funcion para validar el precio
function validatePrecio(precio) {

    if (precio.trim() === "") {
        alert("El precio del producto no puede estar en blanco.")
        return false;
    }
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(precio)) {
        alert("El precio del producto debe ser un número positivo con hasta dos decimales.")
        return false
    }

    return true
}
// Funcion para validar bodega
function validateBodega(bodega) {

    // Validar que no este vacio
    if (bodega === "") {
        alert("Debe seleccionar una bodega.")
        return false
    }

    return true
}
// Funcion para validar sucursal
function validateSucursal(sucursal) {
    
    if (sucursal === "") {
        alert("Debe seleccionar una sucursal para la bodega seleccionada.")
        return false
    }

    return true
}
// Funcion para validar moneda
function validateMoneda(moneda) {

    if (moneda === "") {
        alert("Debe seleccionar una moneda para el producto.");
        return false
    }

    return true
}
// Funcion para validar la descripcion
function validateDescripcion(descripcion) {

    if (descripcion === "") {
        alert("La descripción del producto no puede estar en blanco.")
        return false
    }
    if (descripcion.length < 10 || descripcion.length > 1000) {
        alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
        return false
    }

    return true
}
// Funcion para validar que se seleccionen al menos dos materiales
function validateMaterials() {

    // Get todos los checkbox checked
    const checkedMaterials = document.querySelectorAll('input[name="material"]:checked')

    if (checkedMaterials.length < 2) {
        alert("Debe seleccionar al menos dos materiales para el producto.")
        return false;
    }

    return true            
}
// Funcion de validación del formulario completo
async function validateForm(event) {
    event.preventDefault(); // Evita el envío del formulario si no es válido

    // Validación del Código del Producto
    const codigo = document.getElementById("codigo").value;
    if (!validateCodigo(codigo)) {

        return false //si es false no continua la ejecucion
    }
    //check codigo ya existe en bd
    const verify = await verifyCodigo(codigo)
    if(!verify.verify){
        alert("El código del producto ya está registrado.")
        return false
    }

    // Validación del Nombre del Producto
    const nombre = document.getElementById("nombre").value;
    if (!validateNombre(nombre)) {               

        return false;
    }

    // Validación de la Bodega
    const bodega = document.getElementById("bodega").value;
    if (!validateBodega(bodega)) {               

        return false;
    }

    // Validación de la Sucursal
    const sucursal = document.getElementById("sucursal").value;
    if (!validateSucursal(sucursal)) {

        return false;
    }

    // Validación de la Moneda
    const moneda = document.getElementById("moneda").value;
    if (!validateMoneda(moneda)) {

        return false;
    }

    // Validación del Precio
    const precio = document.getElementById("precio").value;
    if (!validatePrecio(precio)) {
        
        return false;
    }

    // Validación de los Materiales
    if (!validateMaterials()) {
        
        return false;
    }

    // Validación de la Descripción
    const descripcion = document.getElementById("descripcion").value;
    if (!validateDescripcion(descripcion)) {
        
        return false;
    }

    // Enviar formulario pasa todas las validaciones
    sendFormData();
}

// Funcion para enviar los datos del formulario
function sendFormData() {

    // Crear un formData para envia tipo POST
    const formData = new FormData();
    formData.append('codigo',document.querySelector('#codigo').value)
    formData.append('nombre',document.querySelector('#nombre').value)
    formData.append('precio',document.querySelector('#precio').value)
    formData.append('bodega',document.querySelector('#bodega').value)
    formData.append('sucursal',document.querySelector('#sucursal').value) 
    formData.append('moneda',document.querySelector('#moneda').value)
    
    formData.append('descripcion',document.querySelector('#descripcion').value)

    // Get formaData.descripcion y se remplaza posibles formatos por el salto de linea code
    let textFormatSalto = formData.get("descripcion").replace(/\r\n/g, "\n");
    formData.set('descripcion',textFormatSalto)

    // Recorrer y agregar materiales al formData
    document.querySelectorAll('input[name="material"]:checked').forEach(checkbox => {
        formData.append("material[]", checkbox.value);
    });            

    // Request
    fetch('../controller/controllerProduct.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        alert(data.messages);               
    })
    .catch(error => {   // Maneja errores
        alert('error al registrar el producto');
        console.log(error);
    });
}

// Cargar las opciones de la bodega y sucursal al mismo tiempo
window.onload = function () {
    loadMonedas()
    loadBodegas()
};
function loadMonedas(){

    const formData = new FormData();
    formData.append('loadMonedas',"")

    fetch('../controller/controllerProduct.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Aquí puedes manejar la respuesta del servidor

        const selectMoneda = document.getElementById("moneda");
        
        data.data.forEach(function (row) {

            let option = document.createElement("option");
            option.value = row.id;
            option.textContent = row.moneda;
            selectMoneda.appendChild(option);
        });
    })
    .catch(error => {
        alert('error ajax loadBodegas');
        console.log(error); // Aquí puedes manejar el error
    });
}
// Array para almacenar las sucursales solo 1 vez
var sucursales = []
// Cargar las opciones de la bodega y sucursal al mismo tiempo
function loadBodegas(){

    const formData = new FormData();
    formData.append('loadBodegas',"")

    fetch('../controller/controllerProduct.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Aquí puedes manejar la respuesta del servidor

        const selectBodega = document.getElementById("bodega");
        
        sucursales = data.sucursales
        console.log(sucursales)

        // Recorre todas las bodegas y las agrega como option al select de bodega
        data.bodegas.forEach(function (row) {

            let option = document.createElement("option");
            option.value = row.id;
            option.textContent = row.bodega;
            selectBodega.appendChild(option);
        });                
    })
    .catch(error => {
        alert('error ajax loadBodegas');
        console.log(error);
    });
}
function changeBodega(){

    const id_bodega = document.getElementById("bodega").value;
    const selectSucursal = document.getElementById("sucursal");
    
    // Filtra todas las sucursales que tengan el id_bodega seleccionado
    const filterSucursales= sucursales.filter(item => item.id_bodega === id_bodega);

    // Limpiar las sucursales anteriores
    selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';

        filterSucursales.forEach(function (row) {
            let option = document.createElement("option");
            option.value = row.id;
            option.textContent = row.sucursal;
            selectSucursal.appendChild(option);
        });

}