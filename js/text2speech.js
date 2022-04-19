const botonEscuchar = document.querySelector('#escuchar')

const synth = window.speechSynthesis;
console.log(synth);



const speak = () => {
    // Check if speaking
    if(synth.speaking) {
        console.error('Already speaking..');
        return;
    }
    if(textoDos.value !== ''){
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textoDos.value);

        // Speak end
        speakText.onend = e => {
            console.log('Done speaking.');
        }

        // Speak error
        speakText.onerror = (e) => {
            console.error('Error: ', e )
        }

        speakText.lang = opcionesObj.lenguaje2
        console.log(speakText.lang);

        synth.speak(speakText);
        
    }else{
        console.log('Pon algo prro');
    }
}




botonEscuchar.onclick = () => {
    speak();
}