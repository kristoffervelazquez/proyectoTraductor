const idiomaUno = document.querySelector('#idioma1');
const idiomaDos = document.querySelector('#idioma2');
const textoUno = document.querySelector('#texto1');
const textoDos = document.querySelector('#texto2');
const formulario = document.querySelector('#formularios');
const detectarBtn = document.querySelector('#detectar')

const opcionesObj = {
    lenguaje1: '',
    lenguaje2: '',
    texto: ''
}



window.onload = () => {
    cargarEventListeners();
}


function cargarEventListeners() {

    // Se llena la informacion del objeto
    idiomaUno.addEventListener('change', () => {
        opcionesObj.lenguaje1 = idiomaUno.value;

    });
    idiomaDos.addEventListener('change', () => {
        opcionesObj.lenguaje2 = idiomaDos.value;        
    });
    textoUno.addEventListener('change', () => {
        opcionesObj.texto = textoUno.value
    })

    // Evento de submit al formulario ya con los datos
    formulario.addEventListener('submit', traducirTexto);

    // Detectar idioma
    detectar.addEventListener('click', () => {
        if(opcionesObj.texto === ''){
            console.log('No tiene nada bro');
            return;
        }
        detectarIdiomaAPI(opcionesObj.texto);
    })
}




function llamarAPI(mensaje, idioma1, idioma2) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            'X-RapidAPI-Key': 'aaca00f86amshf414996a122ccbap19dbbejsnba9e8f635148'
        },
        body: `[{"Text":"${mensaje}"}]`
    };
    const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${idioma2}&api-version=3.0&from=${idioma1}&profanityAction=NoAction&textType=plain`;
    fetch(url, options)
        .then(response => response.json())
        .then(response => llenarTextoDos(response[0].translations[0]))
        .catch(err => console.error(err));
}




function detectarIdiomaAPI(texto) {

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            'X-RapidAPI-Key': 'aaca00f86amshf414996a122ccbap19dbbejsnba9e8f635148'
        },
        body: `[{"Text":"${texto}"}]`
    };

    fetch('https://microsoft-translator-text.p.rapidapi.com/Detect?api-version=3.0', options)
        .then(response => response.json())
        .then(response => {
            idiomaDetectado(response[0].language)
            console.log('Se ha detectado el idioma: ', response[0].language);
        })
        .catch(err => console.error(err));

}

function idiomaDetectado(valueToSelect) {
    idiomaUno.value = valueToSelect;
    opcionesObj.lenguaje1 = valueToSelect;
}

function traducirTexto(e) {
    e.preventDefault();

    if (textoUno.value === '') {
        console.log('Texto vacio');
        return;
    }
    if(opcionesObj.lenguaje2 === '' || opcionesObj.lenguaje1 === '') {
        console.log('No se seleccionó idioma');
        return;
    }

    opcionesObj.texto = textoUno.value;
    llamarAPI(opcionesObj.texto, opcionesObj.lenguaje1, opcionesObj.lenguaje2);

}


function llenarTextoDos(resultado){
    const {text, to} = resultado;
    
    // Se llena el texto obtenido de la api en el text area
    textoDos.value = text;

}

