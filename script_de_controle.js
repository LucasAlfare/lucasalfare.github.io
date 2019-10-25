const enviar = document.getElementById('enviar');
const limpar = document.getElementById('limpar');
const colar = document.getElementById('colar');
const laudo = document.getElementById('laudo');
const output = document.getElementById('output');
const app = document.querySelector('.app');
const html = document.querySelector('html');

// Experimental - Checar CTRL V e CTRL C
/*let ctrlPressed = false;
function handleKeyboard(e) {
    if(e.code === 'ControlLeft') {
        ctrlPressed = true
    }

    if(ctrlPressed) {
        let key = e.code;
        switch (key) {
            case 'KeyC':
                console.log('Copiou');
                ctrlPressed = false;
                break;
            case 'KeyV':
                console.log('Colou');
                ctrlPressed = false;
                break;
        }

    }

}*/

function handleButtonEnviar(e) {
    e.preventDefault();
    const laud = laudo.value;
    let r = "";
    let acoesLaudo = getAcoes(laud);
    for (let i = 0; i < acoesLaudo.length; i++) {
        if (acoesLaudo[i] !== "") { //
            r += `- ${acoesLaudo[i]};<br>`;
        }
    }

    output.innerHTML = r === "" ? "Leucocitos e Plaquetas OK." : r;
}

function handleButtonLimpar(e) {
    e.preventDefault();
    laudo.value = '';
    output.innerHTML = '';
}

function handleOutputFoco(e) {
    if (app.contains(e.target)) {
        app.classList.add('focado');
        app.querySelector('h1').classList.add('focado');
    } else {
        app.classList.remove('focado');
        app.querySelector('h1').classList.remove('focado');
    }
}

function handleButtonColar(e) {
    e.preventDefault();
    navigator.clipboard.readText()
        .then(text => {
            laudo.value = text;
        });
}
//Isso talvez seja um comentário
html.addEventListener('click', handleOutputFoco);
// html.addEventListener('keydown', handleKeyboard);

colar.addEventListener('click', handleButtonColar);
enviar.addEventListener('click', handleButtonEnviar);
limpar.addEventListener('click', handleButtonLimpar);
