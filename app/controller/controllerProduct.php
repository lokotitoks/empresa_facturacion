<?php
include '../model/modelProduct.php';

// Si existe y tiene valor el POST codigo
if(isset($_POST['codigo'])){

    // Captura de POST data
    $codigo = $_POST['codigo'];
    $nombre = $_POST['nombre'];
    $bodega = $_POST['bodega'];
    $sucursal = $_POST['sucursal'];
    $moneda = $_POST['moneda'];
    $precio = $_POST['precio'];
    $material = $_POST['material'];
    $materialInner = implode(";", $material);
    $descripcion = nl2br(htmlspecialchars($_POST['descripcion']));

    // Array de Errores comienza vacio
    $errors = [];

    // Valida codigo
    if (!preg_match('/^[A-Za-z0-9]{5,15}$/', $codigo)) {
        $errors[] = "El código del producto debe tener entre 5 y 15 caracteres alfanuméricos.";
    }

    // Valida nombre
    if (strlen($nombre) < 2 || strlen($nombre) > 50) {
        $errors[] = "El nombre del producto debe tener entre 2 y 50 caracteres.";
    }

    // Valida precio
    if (!preg_match('/^[0-9]+(\.[0-9]{1,2})?$/', $precio)) {
        $errors[] = "El precio debe ser un número positivo con hasta dos decimales.";
    }

    // Valida descripcion
    if (strlen($descripcion) < 10 || strlen($descripcion) > 1000) {
        $errors[] = "La descripción debe tener entre 10 y 1000 caracteres.";
    }

    // Validate al menos 2 checkbox material
    if (count($material) < 2) {
        $errors[] = "Debe seleccionar al menos dos materiales.";
    }

    // Si array errores no esta vacio 
    if (!empty($errors)) {
        // Response mensajes de error JOINED
        echo json_encode(['status' => 'error', 'messages' => $errors]);
        exit;
    }

    $Product = new Product();
    $res = $Product->createProduct($codigo,$nombre,$bodega,$sucursal,$moneda,$precio,$materialInner,$descripcion);

    if($res){
        echo json_encode(['status' => 'success', 'messages' => 'Producto registrado correctamente.']);
    }
}
if(isset($_POST['verifyCodigo'])){

    $codigo = $_POST['verifyCodigo'];

    $Product = new Product();
    $res = $Product->verifyCodigo($codigo);
 
    echo json_encode(['status' => 'success', 'verify' => $res]);

}
if(isset($_POST['loadMonedas'])){

    $Product = new Product();
    $res = $Product->loadMonedas();
 
    echo json_encode(['status' => 'success', 'data' => $res]);

}
if(isset($_POST['loadBodegas'])){

    $Product = new Product();
    $bodegas = $Product->loadBodegas();
    $sucursales = $Product->loadSucursales();
 
    echo json_encode(['status' => 'success', 'bodegas' => $bodegas, 'sucursales' => $sucursales]);
}
?>