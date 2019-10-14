const enviar = document.getElementById('enviar');
const limpar = document.getElementById('limpar');
const laudo = document.getElementById('laudo');
const output = document.getElementById('output');
const app = document.querySelector('.app');
const html = document.querySelector('html');

function handleButtonEnviar(e) {
    e.preventDefault();

    const laud = laudo.value;
    let r = "";
    let l = getAcoes(laud);
    for (let i = 0; i < l.length; i++) {
        if (l[i] !== "") { //
            r += `- ${l[i]};<br>`
        }
    }

    output.innerHTML = r === "" ? "TUDO CERTO NOS LEUCO E PLAQ..." : r;
}

function handleButtonLimpar(e) {
    e.preventDefault();
    laudo.value = '';
    output.innerHTML = '';
}

function handleOutputFoco(e) {
    if (app.contains(e.target)) {
        app.classList.add('focado');
    } else {
        app.classList.remove('focado');
    }
}

html.addEventListener('click', handleOutputFoco);
enviar.addEventListener('click', handleButtonEnviar);
limpar.addEventListener('click', handleButtonLimpar);
