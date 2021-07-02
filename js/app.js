const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();
    
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === ''){
        mostrarError('Todos los campos son obligatorios', 'error');

        return;
    }
    
    consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais) {
    const key = 'ebb610cb03de6e5bce7c4746bc14f17c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
    
    spinner();

    fetch(url)
        .then(response => response.json())
        .then(data => {

            limpiarHTML();

            console.log(data);

            if(data.cod === '404'){
                mostrarError('Ciudad no encontrada');

                return;
            }

            mostarClima(data);
        }).catch(error => console.error(error));
}

function mostarClima(data) {
    const {name, main: {temp, temp_max, temp_min}} = data;
    const tempC = kelvinToCelsius(temp);
    const temp_maxC = kelvinToCelsius(temp_max);
    const temp_minC = kelvinToCelsius(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');
    
    const actual = document.createElement('p');
    actual.innerHTML = `${tempC} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');
    
    const max = document.createElement('p');
    max.innerHTML = `Max: ${temp_maxC} &#8451;`;
    max.classList.add('text-xl');

    const min = document.createElement('p');
    min.innerHTML = `Min: ${temp_minC} &#8451;`;
    min.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);
    resultado.appendChild(resultadoDiv);
}

const kelvinToCelsius = grados => Math.round(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.alerta');
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'border-red-400', 'text-red-700', 'bg-red-100', 'alerta');

        alerta.innerHTML = `
            <strong class="font-bold">Error!!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        }, 3000);
    }
}

function spinner() {

    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('sk-cube-grid');
    spinner.innerHTML = `    
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(spinner);
}