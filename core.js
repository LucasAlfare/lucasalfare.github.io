//[parametro, refMin, refMax]
const TARGET_INDICES = {
    'hemacias': [0, 1, 2],
    'hemoglobina': [3, 4, 5],
    'hematocrito': [6, 7, 8],
    'vcm': [9, 10, 11],
    'hcm': [12, 13, 14],
    'chcm': [15, 16, 17],
    'rdw': [18, 19, 20],

    'leucocitos': [21, 22, 23],
    'neutrofilos': [25, 28, 29],
    'eosinofilos': [55, 58, 59],
    'basofilos': [61, 64, 65],
    'linfocitos': [67, 70, 71],

    'plaquetas': [86, 87, 88]
};

function getAcoes(laudo) {
    let nums = laudo.replace(/\./g, "").replace(/,/g, ".").match(/[\d.]+/g);
    let acoes = [];

    function resultadoParametro(chave) {
        const resultadoParam = parseFloat(nums[TARGET_INDICES[chave][0]]);
        const min = parseFloat(nums[TARGET_INDICES[chave][1]]);
        const max = parseFloat(nums[TARGET_INDICES[chave][2]]);

        //[alto/normal/baixo, resultado, refMin, refMax]
        return {
            r: resultadoParam < min ? -1 : resultadoParam > max ? 1 : 0,
            resultadoParam: resultadoParam,
            min: min,
            max: max
        }
    }

    /*
    TODO: (TUDO DO ERITROGRAMA)
        - DETECTAR CRUZES (+++) DO RESULTADO:
            - ANISOCITOSE;
            - ANISOPOIQUILOCITOSE;
            - OLIGOCREMIA;
            - HIPOCROMIA E MICROCITOSE
     */

    //LEUCOGRAMA
    if (resultadoParametro('leucocitos').r === -1) {
        acoes.push("leucopenia");
    } else if (resultadoParametro('leucocitos').r === 1) {
        acoes.push("leucocitose");
    }

    if (resultadoParametro('neutrofilos').r === -1) {
        acoes.push("neutropenia");
    } else if (resultadoParametro('neutrofilos').r === 1) {
        acoes.push("neutrofilia");
    }

    if (resultadoParametro('eosinofilos').r === 1) {
        acoes.push("eosinofilia");
    }

    if (resultadoParametro('basofilos').r === 1) {
        acoes.push("basofilia");
    }

    if (resultadoParametro('linfocitos').r === -1) {
        acoes.push("linfocitopenia");
    } else if (resultadoParametro('linfocitos').r === 1) {
        acoes.push("linfocitose");
    }

    let aux = resultadoParametro('plaquetas');
    if (aux.r === -1) {
        if (aux.resultadoParam < 100000) {
            acoes = ["NÃO LIBERA, PLAQUETAS MUITO BAIXAS!"];
        } else if (aux.resultadoParam > (aux.min - 2000)) {
            acoes.push("altere o valor das plaquetas para 150000");
        } else {
            acoes.push("trombocitopenia");
        }
    } else if (aux.r === 1) {
        if (aux.resultadoParam > 700000) {
            acoes = ["NÃO LIBERA, PLAQUETAS MUITO ALTAS!"];
        } else {
            acoes.push("trombocitose");
        }
    }

    return acoes;
}
