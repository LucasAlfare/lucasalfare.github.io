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

//
function getAcoes(laudo) {
    let nums = laudo.replace(/\./g, "").replace(/,/g, ".").match(/[\d.]+/g);
    if (nums.length === 98){
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
            - hemacias em alvo (. a +);
            - anisocitose (+ a +++);
            - anisopoiquilocitose (+ a ++);
            - hopocromia (+ a +++);
            - microcitose (+);
            - hopocromia e microcitose (+ a ++);
            - oligocitose e oligocrememia.
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
    } else {
        return ["TEM QUANTIDADE DE ITENS DIFERENTE DO PADRAO!"];
    }
}

console.log(getAcoes(
    " ERITROGRAMA \tValores de Referência\n" +
    "Hemácias.....................: \t5,00 milhões/ mm³ \t   3,9 a 5,0 /mm³\n" +
    "Hemoglobina..................: \t12,2 g/dL \t   11,5 a 15,5 g/dL\n" +
    "Hematócrito..................: \t38,6 % \t35,0 a 45,0 %\n" +
    "VCM..........................: \t77,2 fl \t 80,0 a 96,0 fl\n" +
    "HCM..........................: \t24,4 pg \t 26,0 a 34,0 pg\n" +
    "CHCM.........................: \t31,6 g/dL \t   31,0 a 36,0 g/dL\n" +
    "RDW..........................: \t13,4 \t11,0 a 15,0 %\n" +
    "\n" +
    "LEUCOGRAMA\n" +
    "Leucócitos...................: \t15.000/mm³ \t4.000 a 10.000/mm³\n" +
    "  \t% \t/mm³\n" +
    "Neutrófilos..................: \t68,9% \t5.133/mm³ \t50 a 70 \t2000 a 7000\n" +
    "Promielocitos................: \t0,0% \t0/mm³ \t0 \t0\n" +
    "Mielocitos...................: \t0,0% \t0/mm³ \t0 \t0\n" +
    "Metamielocitos...............: \t0,0% \t0/mm³ \t0 \t0\n" +
    "Bastões......................: \t0,0% \t0/mm³ \t0 a 6 \t  0 a 600\n" +
    "Segmentados..................: \t68,9% \t5.133/mm³ \t50 a 70 \t2000 a 7000\n" +
    "Eosinofilos..................: \t1,6% \t119/mm³ \t2 a 4 \t 80 a 600\n" +
    "Basofilos....................: \t0,3% \t22/mm³ \t0 a 2 \t  0 a 200\n" +
    "Linfócitos típicos...........: \t24,5% \t1.825/mm³ \t25 a 35 \t 1000 a 3500\n" +
    "Linfócitos atípicos..........: \t0,0% \t0/mm³ \t0 \t0\n" +
    "Monócitos....................: \t4,7% \t350/mm³ \t 2 a 10 \t400 a 1000\n" +
    "Blastos......................: \t0,0% \t0/mm³ \t0 \t0\n" +
    "\n" +
    "PLAQUETAS\n" +
    "Plaquetas....................: \t149.000/mm³ \t150.000 a 450.000/mm³\n" +
    "VPM..........................: \t8,1/fL \t6,7 a 10,0fL\n" +
    "Plaquetócrito................: \t0,30% \t0,10 a 0,50%\n" +
    "PDW..........................: \t15,5 \t15,0 a 17,9%"
));