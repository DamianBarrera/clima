const form = document.querySelector('.form');
const box = document.querySelector('.box2');

form.addEventListener('submit', (e) => {
    const input = document.querySelector('#input-text').value;
    e.preventDefault()

    if( input.trim() === "" ){
         error('Debe ingresar una ciudad')
    }


    consultarApi(input);
})
 


// *********Funciones********
function consultarApi(ciudad){
    const apiKey = '6bed2b7f72e932142be0d4c6f3405180'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},{AR}&appid=${apiKey}`
    
    fetch( url )
        .then( response => response.json() )
        .then( datos => {
            if(datos.cod === "404"){
                 error('NO SE PUDO ENCONTRAR LA CIUDAD ESPECIFICADA')
                 return;
            }
            mostrarTemperatura(datos)  

        } )
}


function mostrarTemperatura(datos){
    box.textContent = ""
    const {name, main:{temp,temp_max, temp_min}} = datos
    
    const celsius = tempConverter(temp)
    
    const div = document.createElement('div');
    const divII = document.createElement('div'); 
    div.innerHTML = ` <h2>La temperatura en <span class="ciudad">${name}</span> es de:</h2>`;
    divII.innerHTML = `${celsius} &#8451;`;
    divII.classList.add('temperatura')
    
    box.appendChild(div);
    box.appendChild(divII);
}

function tempConverter(grados){
    const celsius = Math.round(grados - 273.15)
        return celsius
}

 function error (mensaje){
    box.textContent = ""

    const div = document.createElement('div');
    div.classList.add('box-error')
    div.innerHTML = ` <p class="error"> ${mensaje} </p> `;
    
    box.appendChild(div)

    setTimeout(() => {
        div.remove()
    }, 2500);
 }  
 