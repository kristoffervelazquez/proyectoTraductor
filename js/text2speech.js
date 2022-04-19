const botonEscuchar = document.querySelector('#escuchar')

const synth = window.speechSynthesis;

const speak = () => {

    // do {
    //     mostrarSpinner();
    // } while (!synth.pending)

    try {
        // Check if speaking
        if (synth.speaking) {
            console.error('Already speaking..');
            return;
        }
        if (textoDos.value !== '') {
            // Get speak text
            const speakText = new SpeechSynthesisUtterance(textoDos.value);

            // Speak end
            speakText.onend = e => {
                console.log('Done speaking.');
            }

            // Speak error
            speakText.onerror = (e) => {
                console.error('Error: ', e)
            }

            speakText.lang = opcionesObj.lenguaje2
            console.log(speakText.lang);

            synth.speak(speakText);

        } else {
            mostrarAlerta('Texto vacio', 'error');
        }

    } catch (error) {
        mostrarAlerta('Función no disponible en este idioma', 'error');
    }
}

botonEscuchar.onclick = () => {
    speak();
}


// Spinner
// function mostrarSpinner() {
//     const haySpinner = document.querySelector('.spinner')
//     if (!haySpinner) {
//         const Spinner = document.createElement('div');
//         Spinner.classList.add('spinner');
//         Spinner.innerHTML = `
//         <div class="bounce1"></div>
//         <div class="bounce2"></div>
//         <div class="bounce3"></div>
//     `;
//         alertasDiv.appendChild(Spinner);
//     }

// }

