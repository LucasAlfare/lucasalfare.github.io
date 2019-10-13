const enviar = document.getElementById('enviar');
const limpar = document.getElementById('limpar');
const laudo = document.getElementById('laudo');
const output = document.getElementById('output');
const app = document.querySelector('.app');
const body = document.querySelector('body');

function handleButtonEnviar(e) {
    e.preventDefault();
    //  O preventDefault é obrigatório, em baixo dele pode colocar o código q quiser
    // output.innerText = resultadoQueVoceQuer

    const laud = laudo.value;
    let r = "";
    let l = getAcoes(laud);
    for (let i = 0; i < l.length; i++) {
        if (l[i] !== "") {
            r += `- ${l[i]}<br>;`
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
    if (e.target === output) {
        app.classList.toggle('focado');
    } else {
        app.classList.remove('focado');
    }
}

output.addEventListener('click', handleOutputFoco);
enviar.addEventListener('click', handleButtonEnviar);
limpar.addEventListener('click', handleButtonLimpar);