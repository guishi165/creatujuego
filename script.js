const juegos = [];
const txtNombreJuego = document.getElementById("nombreJuego");
const dtpFechaLanzamiento = document.getElementById("fechaLanzamiento");
const txtEdad = document.getElementById("edad");
const formulario = document.getElementById("formulario");
const chkMultijugador = document.getElementById("multijugador").checked;


formulario.addEventListener('submit', function(event) {//función anónima
    event.preventDefault(); // Prevent the default form submission
    
    agregarJuego();
  });

function agregarJuego()
{      	
   const nombreJuego = txtNombreJuego.value;
   const fechaLanzamiento = dtpFechaLanzamiento.value;
   const edad = txtEdad.value;
   const multijugador = document.getElementById("multijugador").checked;
   //obtener los valores(propiedad value) de los elementos
 
   const plataformas = Array.from(document.getElementById("plataformas").
   selectedOptions).map(option => option.value);
   /*
   console.log(nombreJuego)
   console.log(fechaLanzamiento)
   console.log(edad)
   console.log(multijugador)
   console.log(plataformas)
   */

   if (validarDatos(nombreJuego, fechaLanzamiento, edad, plataformas))
   {
	 const juego =
     {
 	  nombre: nombreJuego,
      lanzamiento: fechaLanzamiento,
      edad: edad,
      multijugador: multijugador,
      plataformas: plataformas,
	 };

    juegos.push(juego);
	
    //utilizar el método push para agregar el objeto al array
	actualizarListaJuegos();
	reiniciarForm();     
       	
   }


}

function validarDatos(nombreJuego, fechaLanzamiento, edad, plataformas)
//parametros son valores que reciben las funciones
{
   /*if (nombreJuego == "" || fechaLanzamiento == "" || edad == "" || plataformas == ""){
        alert("pon algo idiota")
        return false;
    }
    else{
        return true;
    }*/

    let isValid = true;

    if(nombreJuego === ""){
        txtNombreJuego.classList.add("valor-invalido")
        isValid = false;
    }
    if(fechaLanzamiento === ""){
        txtNombreJuego.classList.add("valor-invalido")
        isValid = false;
    }
    if(edad === ""){
        txtNombreJuego.classList.add("valor-invalido")
        isValid = false;
    }
    else
    {
        txtNombreJuego.classList.remove("valor-invalido"); 
    }
    return isValid;
}

function reiniciarForm(){
    document.getElementById("nombreJuego").value = "";
    document.getElementById("fechaLanzamiento").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("multijugador").checked = false;
    document.getElementById("btnAgregarJuego").innerText = "agregar juego!!!";
    //document.getElementById("plataformas").selectedOptions.map(option => option.value = "");
}

/*
function actualizarListaJuegos() {
    const listaJuegos = document.getElementById("listaJuegos");
    listaJuegos.innerHTML = "";
 
    for (const juego of juegos){
       const listItem = document.createElement ("li");
       listItem.innerHTML=
       "nombre juego:  " + juego.nombre + "<br>" +
       "fecha de lanzamiento:  " + juego.lanzamiento + "<br>" +
       "edad PEGI recomendada:  " + juego.edad + "<br>" +
       "multijugador:  " + (juego.multijugador? "sis :D" : "no :(") + "<br>" +   
       "plataformas:  " + juego.plataformas + 
       '<button id="btnEditarJuego" onclick="editarJuego(' + juegos.indexOf(juego) + ')">Editar</button>' + '<button id="btnEliminarJuego" onclick="eliminarJuego(' + juegos.indexOf(juego) + ')">Eliminar</button>';
       
        listaJuegos.appendChild(listItem);   
        
    }
}
*/

function actualizarListaJuegos() 
{
  const listaJuegos = document.getElementById("listaJuegos");
  listaJuegos.innerHTML = "";

  for (let i = 0; i < juegos.length; i++) {
      const juego = juegos[i];
      const row = listaJuegos.insertRow();

      const celdaNombre = row.insertCell(0);
      const celdaLanzamiento = row.insertCell(1);
      const celdaClasificacion = row.insertCell(2);
      const celdaMultijugador = row.insertCell(3);
      const celdaPlataformas = row.insertCell(4);
      const celdaAcciones = row.insertCell(5);

      celdaNombre.textContent = juego.nombre;
      celdaLanzamiento.textContent = juego.lanzamiento;
      celdaClasificacion.textContent = juego.clasificacion;
      celdaMultijugador.textContent = juego.esMultijugador ? "Sí" : "No";
      celdaPlataformas.textContent = juego.plataformas.join(', ');

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.addEventListener("click", function () {
          editarJuego(i);
      });

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", function () {
          eliminarJuego(i);
      });

      celdaAcciones.appendChild(btnEditar);
      celdaAcciones.appendChild(btnEliminar);
  }
}

function eliminarJuego(indexJuego){
    juegos.splice(indexJuego, 1); //splice es para eliminar un elemento del array
    actualizarListaJuegos();
}

function editarJuego(index) {
    const juego = juegos[index];//para obtener el juego
    if (juego) //si existe el juego
    {
        txtNombreJuego.value = juego.nombre;
        dtpFechaLanzamiento.value = juego.lanzamiento;
        txtEdad.value = juego.edad;
        chkMultijugador.checked = juego.multijugador;

        const plataformasSelect = document.getElementById("plataformas");
        Array.from(plataformasSelect.options).forEach(option => {
            option.selected = juego.plataformas.includes(option.value);
        });

        juegos.splice(index, 1);//eliminar juego
        // Cambiar el texto del botón a "Guardar Cambios"
        document.getElementById("btnAgregarJuego").innerText = "guardar cambios";
        actualizarListaJuegos();

    }
}
