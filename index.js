const form = document.querySelector('.form');
const box = document.querySelector('.box2');
const modal = document.querySelector('.box3');
const spinner = document.querySelector('.spinner');
 
form.addEventListener('submit', (e) => {
    box.textContent = "" ;
    spinner.style.display="block";
    const input = document.querySelector('#input-text').value.trim();
    e.preventDefault()
    if( input.trim() === "" ){
         error('Debe ingresar una ciudad');
         return;
    }
    consultarApi(input);
})





// *********Funciones********
function consultarApi(ciudad){
    const apiKey = '6bed2b7f72e932142be0d4c6f3405180';
    const codigoPais = 'AR'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${codigoPais}&appid=${apiKey}`
    
    fetch( url )
    .then( response => response.json() )
    .then( datos => {
        if(datos.cod === "404"){
            error('NO SE PUDO ENCONTRAR LA CIUDAD ESPECIFICADA')
            return;
        }   
        console.log(datos)
        mostrarTemperatura(datos)  
        masDatos()
        } )
}
 

function mostrarTemperatura(datos){
    modal.textContent = "";
    const {name,coord:{lat, lon}, main:{temp, feels_like,humidity, temp_max}} = datos
     
    const celsius = tempConverter(temp);
    const max = tempConverter(temp_max);
    const sensacionTermica = tempConverter(feels_like)
        
    
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const divII = document.createElement('div'); 
    const ciudadName = document.createElement('h3');
    const tempActual = document.createElement('p');
    const maxima = document.createElement('p')
    const humedad = document.createElement('p');
    const termica = document.createElement('p');
    const latitud = document.createElement('p');
    const longitud = document.createElement('p');

    div.innerHTML = ` <h2>La temperatura en <span class="ciudad">${name}</span> es de:</h2>`;
    divII.innerHTML = `${celsius} &#8451 `;
    divII.classList.add('temperatura')
    ciudadName.textContent = name;
    tempActual.innerHTML = `Temperatura actual: <span>${celsius}&#8451</span>`;
    tempActual.classList.add('actual')
    maxima.innerHTML = `Maxima para hoy: <span>${max}&#8451;</span> `;
    maxima.classList.add('maxima')
    humedad.innerHTML = `Humedad : <span>${humidity}%</span>` ; 
    humedad.classList.add('humedad')
    termica.innerHTML = `Sensación Termica : <span>${sensacionTermica}&#8451</span>` ;
    termica.classList.add('termica');
    latitud.innerHTML = `Latitud: <span>${lat}</span>`;
    longitud.innerHTML = `Longitud: <span>${lon}</span>`;


    spinner.style.display="none";

    box.appendChild(div);
    box.appendChild(divII);

    fragment.appendChild(ciudadName);
    fragment.appendChild(tempActual);
    fragment.appendChild(maxima);
    fragment.appendChild(humedad);
    fragment.appendChild(termica);
    fragment.appendChild(latitud);
    fragment.appendChild(longitud);
  
    modal.appendChild(fragment);
    cerrarModal()

}

function tempConverter(grados){
    const celsius = Math.round(grados - 273.15)
        return celsius
}

 function error (mensaje){
    box.textContent = ""
    spinner.style.display="none";

    const div = document.createElement('div');
    div.classList.add('box-error')
    div.innerHTML = ` <p class="error"> ${mensaje} </p> `;
    
    box.appendChild(div)

    setTimeout(() => {
        div.remove()
    }, 2500);
  }  
  

 function masDatos(){
     const divMoreData = document.createElement('div');
     const h3 = document.createElement('h3');

     h3.textContent = 'Mas informacion';
     h3.classList.add('more-data');

     divMoreData.appendChild(h3);

     box.appendChild(divMoreData);

     const openModal = document.querySelector('.more-data');
     openModal.addEventListener('click', () => {
        modal.style.display="block";
    })
    
    
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', ()=>  {
        modal.style.display="none";
    })
 } 

 function cerrarModal(){
     const cerrar = document.createElement('span')
     cerrar.textContent = 'CERRAR';
     cerrar.classList.add('close');
     modal.appendChild(cerrar)
 }