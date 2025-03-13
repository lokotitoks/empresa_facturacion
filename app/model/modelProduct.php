<?php

require_once 'conn.php';

mysqli_set_charset($GLOBALS['conn'],"utf8");

class Product{

    function createProduct($codigo,$nombre,$bodega,$sucursal,$moneda,$precio,$material,$descripcion){
        $sql = "INSERT INTO producto (
            codigo,
            nombre,
            bodega,
            sucursal,
            moneda,
            precio,
            material,
            descripcion
        ) 
        VALUES(
            '$codigo',
            '$nombre',
            '$bodega',
            '$sucursal',
            '$moneda',
            '$precio',
            '$material',
            '$descripcion'
        )";
        
        if($GLOBALS['conn']->query($sql) === TRUE) {            

            return true;
        }else{
            return false;
        }
    }
    function verifyCodigo($codigo){

        $sql = "SELECT codigo FROM producto WHERE codigo = '$codigo'";

        $result = $GLOBALS['conn']->query($sql);

        if ($result->num_rows > 0) {

            return 0;
        }else{
            return 1;
        }
    }
    function loadMonedas(){

        $sql = "SELECT id,moneda FROM moneda WHERE 1";

        $result = $GLOBALS['conn']->query($sql);

        $res = [];
        if ($result->num_rows > 0) {            

            while($row = $result->fetch_assoc()){
                $res[] = $row;
            }
        }

        return $res;
    }
    function loadBodegas(){

        $sql = "SELECT id,bodega FROM bodega WHERE 1";

        $result = $GLOBALS['conn']->query($sql);

        $res = [];
        if ($result->num_rows > 0) {            

            while($row = $result->fetch_assoc()){
                $res[] = $row;
            }
        }

        return $res;
    }
    function loadSucursales(){

        $sql = "SELECT id,id_bodega,sucursal FROM sucursal WHERE 1";

        $result = $GLOBALS['conn']->query($sql);

        $res = [];
        if ($result->num_rows > 0) {            

            while($row = $result->fetch_assoc()){
                $res[] = $row;
            }
        }

        return $res;
    }
}
?>