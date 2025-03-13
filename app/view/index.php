<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Registro de Productos</title>
    <script src="index.js"></script>
    <link rel="stylesheet" href="index.css"/>
</head>
<body>
    <div class="container">
        <h1>Formulario de Producto</h1>
        <form id="productForm" onsubmit="validateForm(event)">

            <div>
                <div class="row flex">
                    <div>
                        <label for="codigo">Código</label>
                        <input type="text" id="codigo" name="codigo">
                    </div>
                    <div>
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Ingresar el nombre completo del producto, asegurándose de que sea claro y descriptivo." title="Ingresar el nombre completo del producto, asegurándose de que sea claro y descriptivo.">
                    </div>
                </div>
                <div class="row flex">    
                    <div>
                        <label for="bodega">Bodega</label>
                        <select id="bodega" name="bodega" onchange="changeBodega(this.value)">
                            <option value=""></option>
                        </select>
                    </div>
                    <div>
                        <label for="sucursal">Sucursal</label>
                        <select id="sucursal" name="sucursal">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="row flex">                    
                    <div>
                        <label for="moneda">Moneda</label>
                        <select id="moneda" name="moneda">
                            <option value=""></option>
                        </select>
                    </div>
                    <div>
                        <label for="precio">Precio</label>
                        <input type="text" id="precio" name="precio">
                    </div>
                </div>
                <div class="row">
                    <label>Material del Producto:</label>
                    <section class="checkGroup">
                        <label><input type="checkbox" name="material" value="Plastíco"> Plastíco</label>
                        <label><input type="checkbox" name="material" value="Metal"> Metal</label>
                        <label><input type="checkbox" name="material" value="Madera"> Madera</label>
                        <label><input type="checkbox" name="material" value="Vidrio"> Vidrio</label>
                        <label><input type="checkbox" name="material" value="Textil"> Textil</label>
                    </section>                        
                </div>
                <div class="row">
                    <label for="descripcion">Descripción del Producto:</label>
                    <textarea id="descripcion" name="descripcion"></textarea>
                </div>
                <div class="row">
                    <button type="submit">Guardar Producto</button>
                </div>
            </div>

        </form>
    </div> 
</body>
</html>
