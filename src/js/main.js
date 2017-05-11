//var alumnos = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];codigo,nombre,apellidos, dni,email,telefono
var alumnos=[
             {"codigo":1,"nombre":"sergio","apellidos":"aparicio vegas","dni":"xxxxxx","email":"xxxx@.com","telefono":"607519862"},
             {"codigo":2,"nombre":"maite","apellidos":"monasterio herrero","dni":"xxxxxx","email":"xxxx@.com","telefono":"xxxxxxx"},
             {"codigo":3,"nombre":"jorge","apellidos":"manso rodriguez","dni":"xxxxxx","email":"xxxx@.com","telefono":"xxxxxxx"}
            ];

$.noConflict();
jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $("#contactForm").on("submit",validarFormularioContacto);
    $("#tablaAlumnos tbody").on("click","td:last-child button:last-child",function(event){
        alert("has pulsado el boton de borrar");

    });
    $("#tablaAlumnos tbody").on("click","td:last-child button:first-child",function(event){
        alert("has pulsado el boton de editar");

    });
    $("#borrartodos").click(function (event) {
        //attr ---> cambios de atributos
        // prop --> propiedades
        // is ----> validacion booleana
        if($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked",true);
            //
            //checked = checked
            //selected= selected
            //
        }else{
            $("tbody input[type=checkbox]").prop("checked",false);
        }


    });
    cargarArrayAlumnos();

    function validarFormularioContacto(){
        //recoger los valores de la vista
        var pdni = $("#dni").val();
        var pnombre = $("#nombre").val();
        var papellidos = $("#apellidos").val();
        var ptelefono = $("#telefono").val();
        var valido = false;
        //evaluarlos
        var dniValido= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
        var nomValido = validarNombre(pnombre);
        var apeValido = validarApellidos(papellidos);
        var teleValido = validarTelefono(ptelefono);
        $("#dni").siblings("div.text-error").text("");
        $("#nombre").siblings("div.text-error").text("");
        $("#apellidos").siblings("div.text-error").text("");
        $("#telefono").siblings("div.text-error").text("");
        if(dniValido&&nomValido&&apeValido&&teleValido){
           // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
            valido = true;
        }else {
            //mostar mensaje de error
            if(!dniValido){
                $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
            }
            if(!nomValido){
                $("#nombre").siblings("div.text-error").text("El nombre tiene que tener al menos 3 letras");
            }
            if(!apeValido){
                $("#apellidos").siblings("div.text-error").text("Los apellidos tienen que tener al menos 7 letras");
            }
            if(!teleValido){
                $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 numeros");
            }
            //text y html
        }
        return false;
    }

    function cargarArrayAlumnos() {
        //recorrer el array
        if (alumnos.length > 0) {
            for (i=0;i<alumnos.length;i++) {
                console.log(alumnos[i]);
                var codigo = alumnos[i].codigo;
                var nombre = alumnos[i].nombre;
                var apellidos = alumnos[i].apellidos;
                var email = alumnos[i].email;
                var telefono = alumnos[i].telefono;
                var dni = alumnos[i].dni;
                var htmlEdit ="<button>Editar</button>";
                var htmlDelete ="<button>Borrar</button>";
                var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>" + nombre + "</td><td>" + apellidos + "</td><td>" + email + "</td><td>" + dni + "</td><td>" + htmlEdit + htmlDelete + "</td></tr>";
                //añadir el html correspondiente a la página
                $("#tablaAlumnos tbody").append(texto);
                //-->
            }
            $("#tablaAlumnos tfoot td").html("<span class='text-error'>Total alumnos:"+alumnos.length,10+"</span>");
        }else{
            $("#tablaAlumnos").remove();
            $("#listadoAlumnos").text("No se han encontrado alumnos")
        }
    }
});
function validarNombre(nombre){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
function validarApellidos(apellidos) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(apellidos);
}
function validarTelefono(telefono){
    var valido = true;
    if(telefono!=""){
        const pattern = new RegExp(/\d{9}/);
        valido = pattern.test(telefono);
    }
    return valido ;
}
function validarDni(dni) {
    var valido =false;
    const pattern = new RegExp(/\d{8}[A-Za-z]{1}/);
    if(pattern.test(dni)){
        numero = parseInt(dni.substr(0,dni.length-1),10);
        letr = dni.substr(dni.length-1,1);
        numero = numero % 23;
        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra==letr.toUpperCase()) {
            valido = true;
        }
    }
    return valido;
}
