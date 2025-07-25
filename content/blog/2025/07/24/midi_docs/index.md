+++
date = '2025-07-24T00:00:00-03:00'
title = 'Documentação MIDI pt-BR'
summary = 'Minha própria documentação do formato binário MIDI com linguagem acessível.'
type = 'blog'
+++

> _**Nota:**_ _Ainda em construção!_

# Índice

- [1. Apresentação](#1-apresentação)
- [2. O que é MIDI?](#2-o-que-é-midi)
- [3. Usos de MIDI](#3-usos-de-midi)
- [4. Arquivos](#4-arquivos)
- [5. Noções de leitura](#5-noções-de-leitura)
    - [5.1 Ponto de partida](#51-ponto-de-partida)
    - [5.2 Tipo numéricos](#52-tipo-numéricos)
    - [5.3 Binário, Decimal, Hexadecimal](#53-binário-decimal-hexadecimal)
    - [5.4 Números positivos e Números negativos](#54-números-positivos-e-números-negativos)
    - [5.5 _"MSB"_ e _"LSB"_](#55-msb-e-lsb)
    - [5.6 Números se transformam em informação](#56-números-se-transformam-em-informação)
    - [5.7 O tal _"endianess"_](#57-o-tal-endianess)
    - [5.8 Operações de leitura](#58-operações-de-leitura)
        - [5.8.1 Juntar dois números](#581-juntar-dois-números)
- [6. Estrutura MIDI](#6-estrutura-midi)
    - [6.1 _Chunks_](#61-chunks)
        - [6.1.1 _Chunk_ de cabeçalho (_header_)](#611-chunk-de-cabeçalho-header)
            - [6.1.1.1 Assinatura (_MThd_)](#6111-assinatura-MThd)
            - [6.1.1.2 Tamanho do _header_](#6112-tamanho-do-header)
            - [6.1.1.3 Formato do arquivo](#6113-formato-do-arquivo)
            - [6.1.1.4 Número de trilhas (_`ntrks`_)](#6114-número-de-trilhas-ntrks)

# 1. Apresentação

Opa, pessoal! Neste artigo, vou tentar descrever a especificação para arquivos MIDI (extensão `.mid`). Mas não quero uma descrição resumida ou que omita coisas; minha intenção é trazer a especificação em uma linguagem mais tranquila e fácil de entender.

Também vou tentar escrever este texto de forma acessível tanto para quem já tem costume com esse tipo de tema quanto para quem nunca mexeu com interpretação de arquivos antes. Por conta disso, este conteúdo poderá ser usado como material introdutório justamente para esse tópico de leitura de arquivos. Tentarei fazer isso deixando algumas notas ou tornando o texto um pouco mais explicativo, indo além de simplesmente descrever a estrutura do arquivo MIDI.

Além disso, farei o possível para usar exemplos de código em *pseudo-código*, afinal, ver código é algo que sempre ajuda a entender melhor alguns processos, pois a linguagem da programação é universal.

Sendo assim, meu objetivo com este material é simplesmente documentar esse formato, sobretudo focando em fornecer uma fonte em português, já que esse tipo de conteúdo é bem escasso neste idioma.

Por fim, mesmo esse formato MIDI sendo "relativamente datado" (antigo), ele ainda é usado _pra caramba_ nos dias de hoje! Simplesmente jogos, aplicações que lidam com efeitos sonoros, projetos no âmbito da _programação musical_ e uma outra grande quantidade de contextos de fato usam MIDI — e isso acontece justamente pelo fato de o MIDI ser um formato absurdamente leve e portável.

Como veremos ao longo do nosso material, MIDI não é necessariamente trivial de ser _analisado_, mas isso não significa que esse formato não seja simples.

# 2. O que é MIDI?

*MIDI* basicamente se refere a um formato que serve para lidar com **sons** de forma totalmente digital.

> _**Q.:**_ _Mas... o que exatamente isso quer dizer?_

Isso significa que a ideia do formato é que os dados sobre sons sejam mais como "informações" do que uma "representação" sonora propriamente dita.

Para entendermos melhor, vamos pensar em um arquivo de áudio tradicional, como `WAVE` ou `MP3`. Esses arquivos têm a intenção de guardar informações sobre as próprias frequências de som, permitindo que algum hardware de áudio possa ser alimentado com tais informações e desencadear sons. Obviamente, aqui eu resumi pra caramba, mas, para efeito comparativo, está bom. Já o MIDI basicamente guarda informações como *"nota X começou a ser tocada no momento Y"*, o que é uma informação que um dispositivo de hardware de som jamais seria capaz de entender por si só.

Portanto, em resumo, o MIDI demonstra dados sobre *eventos*, enquanto outros formatos demonstram dados sobre *frequências*.

No contexto prático, MIDI serve basicamente pra descrever as notas musicais de uma música. Ou seja, artistas e produtores musicais usam esse formato pra escrever uma música em baixo nível, sendo esse nível o "nível de nota".

Existe algumas outras coisas que podem ser gravadas no arquivo MIDI além das notas propriamente ditas, como informação sobre _tempo_/_andamento_, informações textuais, _letras_ e etc.

Devido a isto, talvez alguns pontos desta documentação não sejam amigavelmente acessíveis para leitores _não-músicos_, entretanto, como programadores, acredito que o material deva ser relativamente tranquilo para ser consumido mesmo por quem seja leigo em teoria musical, visto a própria linguagem tranquila no qual o material está escrito.

# 3. Usos de MIDI

MIDI é um formato absurdamente antigo. Por exemplo, a documentação que estou usando como base para escrever este artigo tem *©Copyright* do ano de 1999. Porém, segundo o [site oficial do projeto](https://midi.org/specs), a versão 1.0 é datada de 1983. Dessa forma, esse formato tem sido usado ao longo de décadas e, devido à sua extrema "simplicidade", ainda é utilizado até hoje.

Mas, contrariando o que muitos podem pensar, MIDI não é um formato que serve apenas para escrever arquivos; ele também é um protocolo de comunicação entre determinados dispositivos físicos e algum software. Por exemplo, controladores MIDI podem ser simplesmente conectados ao computador e receber dados provenientes desses dispositivos, desde que consigam entender o formato MIDI. Da mesma forma, os controladores podem enviar sinais específicos por seus *outputs*, compatíveis com a especificação.

Neste artigo, quero focar no uso do MIDI para escrever arquivos.

# 4. Arquivos

Como ficou estabelecido, os arquivos MIDI guardam informações como *"nota X começou a ser tocada no momento Y"*. Porém, tais informações não são gravadas dentro de um arquivo essencialmente em formato de texto legível para nós, humanos, mas sim em *bytes* puros. Logo, arquivos MIDI são arquivos "binários".

> **Nota:** Todo e qualquer arquivo é binário. Porém, existem arquivos para os quais damos um significado padrão aos seus bytes, tabelando-os como caracteres visuais, formando assim os formatos do tipo "texto". No entanto, até os arquivos em formatos de texto também são formados por bytes puros; a diferença está apenas na forma como interpretamos esses bytes.

# 5. Noções de leitura

Nas seções a seguir, vou fazer uma "breve" introdução sobre leitura de arquivos em geral. Vamos ver detalhes sobre como exatamente devemos lidar com essa coisa toda de "bytes", numa perspectiva em que estejamos fazendo a leitura diretamente a partir dos bytes puros.

É importante lembrar que todos esses conceitos basicamente já existem por padrão em bibliotecas das próprias linguagens de programação. Ou seja, os tópicos a seguir vão servir justamente para que entendamos o que exatamente está acontecendo com os números quando realizamos tais operações.

Fazer essas coisas na mão — ou seja, sem necessariamente usar os recursos que já vêm prontos nas linguagens — não é algo ruim. Afinal, na maioria dos contextos, essas operações são absurdamente simples para os computadores modernos de hoje em dia. Portanto, é altamente recomendável que, caso você seja iniciante, implemente essas coisas do absoluto zero; o aprendizado se tornará muito mais satisfatório!

## 5.1 Ponto de partida

Sabendo disso, é importante entendermos como exatamente devemos proceder para ler um arquivo binário bruto. Essa introdução vai nos ajudar a compreender a forma como iremos estruturar o formato propriamente dito.

Para lermos um arquivo em um formato não convencional (ou seja, que não é baseado em texto) diretamente pelos seus bytes, podemos começar carregando todos os bytes do arquivo em alguma estrutura de uma linguagem de programação, como uma lista ou um array. Todas as linguagens de programação modernas oferecem suporte para isso, mas, em um exemplo de pseudo-código, poderia ser algo como:

```
bytes_arquivo = carregarBytes("meu_arquivo_midi.mid")
```

A seguir, veremos mais tópicos explicando detalhes sobre a leitura de arquivos.

## 5.2 Tipo numéricos

Outro conceito importante sobre a leitura de arquivos binários é que devemos entender, de uma vez por todas, o que de fato são esses *"bytes"*.

Quando nos referimos a "bytes", estamos falando de nada mais, nada menos que números inteiros. Sim, exatamente, simplesmente números. Porém, o termo "byte" nos indica que esses números têm um "tamanho" específico.

No caso de *1 byte*, os números podem ir de `0` a `255`. Como você pode ver, não é possível armazenar um número maior que `255` dentro de 1 byte.

Nesse ponto, isso pode parecer estranho, especialmente se você nunca teve contato com linguagens de programação que possuem *tipagem forte* e *estática*, ou seja, linguagens que exigem que você declare explicitamente o tipo da variável ou que definem o tipo da variável por inferência.

Exemplos de linguagens que não exigem manipulação explícita dos tipos das variáveis incluem `JavaScript` e `Python`. Já outras linguagens, como `Java` e `C++`, obrigatoriamente requerem que especifiquemos os tipos das variáveis.

Se você programa apenas em JavaScript, por exemplo, entender sobre tamanhos de números pode parecer algo novo. Afinal, quando escrevemos um número em JavaScript, ele automaticamente é definido como sendo do tipo `Number`, o que é algo muito abstrato. Mas, para efeitos de curiosidade, linguagens como JavaScript são escritas em cima de outras linguagens, normalmente `C`/`C++`, as quais tratam tipos explicitamente.

Sabendo disso, os *bytes* são simplesmente números desse tipo. Um arquivo, seja ele qual for, é composto por um monte desses *bytes*, um atrás do outro, o que comprova que podemos carregá-los em um array, uma estrutura comum para sequências.

Além disso, vale lembrar que mencionei que `1 byte = 0 a 255`, porém esses números estão escritos no formato "decimal". Mas por que exatamente 1 byte pode armazenar no máximo 255? Isso acontece porque o tamanho dos números é determinado pela quantidade de **bits** que cada tipo pode guardar!

Byte é um tipo que pode armazenar no máximo **8 bits**, e se lembrarmos que bits são apenas *zeros* ou *uns*, temos o seguinte:

```
1 byte = 00000000 a 11111111
```

Perceba que, em vez de usar a representação decimal dos números (0 a 255), utilizei uma representação **binária**. Dessa forma, podemos visualizar diretamente os bits dos números e entender por que 1 byte pode armazenar, no máximo, o número 255, que em binário é `11111111`!

> _**Nota:**_ A leitura desses números binários, tipo o `11111111` acima, seria algo como "um um um um...", afinal não devemos pensar nessa sequência de números `1` como sendo um número decimal. Ou seja, é **errado** olhar pra esse número e pensar nele como sendo _"onze milhões cento e onze mil cento e onze"_. Mais adiante, veremos como podemos diferenciar e evidenciar se estamos falando de um número binário ou não.

Temos, então, vários outros tipos de números:
- `byte`: como vimos, guarda no máximo 8 bits;
- `short`: guarda no máximo 16 bits;
- `int`: guarda no máximo 32 bits;
- `long`: guarda no máximo 64 bits.

Há também o tipo `boolean`, que armazena apenas 1 único bit. Esse tipo é tão simples que o usamos para representar o famoso "verdadeiro" (bit `1`) ou "falso" (bit `0`).

Existe também o tipo `char`, que, basicamente, é a mesma coisa que `byte`, mas semanticamente é utilizado para armazenar valores que representem caracteres.

## 5.3 Binário, Decimal, Hexadecimal

Demos uma pincelada sobre binário no tópico anterior, mas, neste ponto, quero que vocês entendam que, dependendo do formato, compreender a forma como os números são escritos é imprescindível.

Binário, como sabemos, é basicamente a forma de escrever números usando apenas 2 símbolos visuais diferentes, no caso, `0` e `1`.

Já o decimal é o sistema numérico mais comum, aquele que usamos no dia a dia. As quantidades são escritas utilizando 10 símbolos visuais diferentes, em vez de apenas 2, como no binário. 

Logo, quando aumentamos a quantidade de símbolos visuais disponíveis para a escrita de uma quantidade, conseguimos representar quantidades maiores utilizando menos caracteres! Por exemplo, veja os números que já usamos neste artigo: `11111111` e `255` representam exatamente a mesma quantidade nominal. Porém, a escrita binária exige mais dígitos, pois há menos opções para representar os valores. Já no sistema decimal, precisamos de apenas 3 dígitos para escrever essa mesma quantidade nominal (*duzentos e cinquenta e cinco*).

Além desses dois formatos de escrita numérica, temos o *hexadecimal*, que usa 16 dígitos diferentes para representar os números. Talvez isso pareça um pouco confuso, pois podemos nos perguntar:

> _**Q.:**_ _Se temos dígitos de 0 a 9, com o que mais podemos completar até termos 16 dígitos?_

A resposta é simples: podemos usar letras!

Lembre-se de que os dígitos visuais (os desenhos/glifos/caracteres) são apenas símbolos para representar os números. Poderíamos usar qualquer outra coisa. Imagine um sistema numérico que utilizasse todos os números, todas as letras e ainda precisasse de mais símbolos... o que poderíamos usar? Sei lá, talvez emojis kkkkkk 💀

Brincadeiras à parte, no hexadecimal usamos os dígitos de `0` a `9` e as letras de `A` a `F`.

Portanto, podemos representar a mesma quantidade nominal (*duzentos e cinquenta e cinco*) usando os três sistemas de numeração:
- **Binário**: `11111111`;
- **Decimal**: `255`;
- **Hexadecimal**: `FF`.

Antes de terminarmos esta seção, é comum usarmos alguns "prefixos" para indicar diferentes formas de escrita numérica. Inclusive, adotarei essa convenção a partir de agora. Por exemplo, quando escrevemos um número binário, utilizamos o prefixo `0b`, e para hexadecimal usamos `0x`. O resultado ficaria assim:
- **Binário**: `0b11111111`;
- **Decimal**: `255`;
- **Hexadecimal**: `0xFF`.

Decimal não precisa de prefixo, pois, sendo o padrão, assumimos automaticamente que um número sem prefixo está em base decimal. Mas até que seria interessante termos um prefixo como "`0d255`"... Enfim, vamos avançar.

## 5.4 Números positivos e Números negativos

Vimos que 1 byte pode simplesmente guardar números de [0b000000..0b111111]/[0..255]/[0x00..0xFF]. Mas e se... quisermos guardar o número decimal -19?

Bom, com a explicação que tivemos até agora, não teria como. Porém, o que vimos foi a explicação sobre números **não assinalados**, ou em inglês, _**unsigned**_. Isso significa que também temos uma representação **assinalada** (em inglês, _**signed**_)!

> *Mas... por que existe essa coisa toda?*

A resposta é que nem sempre temos necessidade de trabalhar com números negativos. E, sabendo que muitos desses conceitos foram criados quando praticamente não existia poder computacional, economizar qualquer mísero bit já era obrigatório.

Ou seja, se a gente precisar de um número negativo, qual a conclusão que temos? A conclusão é que, de um jeito ou de outro, vamos precisar de algum artifício para guardar a informação de que tal número é negativo.

Então, a estratégia encontrada, que foi a melhor para esse caso, foi justamente pegar os **8 bits** de 1 byte e reservar **1 deles** para guardar essa informação! Então, é como se o número binário máximo fosse algo como 0b(0/1)1111111. Percebe que o bit mais à esquerda ali eu coloquei como podendo ser 0 ou 1? Isso meio que faz com que a gente use esse bit para dizer se o número é negativo ou não. Nesse caso, se esse bit for 0, o número é positivo; e se for 1, o número é negativo.

Porém, isso tem uma consequência, e das grandes.

Se você observar, a gente meio que "desperdiçou" 1 bit dos 8 que tínhamos para poder guardar a informação do "sinal". Isso significa que restaram apenas **7 bits** para escrever o número! Vamos escrever esses 7 bits e ver o que teremos:

```
0b(0)1111111 -> 127
```

Como você pôde ver, quando dizemos que trabalhamos com números _**signed**_, isso implica dizer que vamos poder trabalhar apenas com metade do intervalo que tínhamos no formato _**unsigned**_, que era 255.

Mas, como você também pôde ver, 255 é ímpar e não tem metade exata. Portanto, o intervalo de bytes *signed* é justamente de [-128..127] (em decimal).

De certa forma, ainda temos a mesma quantidade de itens que cabem dentro desse intervalo, os mesmos 255 itens. Porém, os valores máximos são reduzidos, pois primeiramente vão de [-128..0] e depois de [1..127].

## 5.5 _"MSB"_ e _"LSB"_

Vocês podem se deparar bastante com essas siglas quando forem mexer com coisas de baixo nível assim. Para irmos direto ao ponto, _"MSB"_ significa _"most significant bit"_, ou "bit mais significativo". Já o _"LSB"_ significa _"least significant bit"_, ou "bit menos significativo".

Na prática, isso serve para nos dizer qual é o bit que mais "impacta" no valor de um número. Por exemplo, considere este número em binário:

```
0b1001101
```

Se a gente considerar que a leitura do número é da esquerda para a direita (→), então o dígito mais à esquerda é o _MSB_, enquanto o que está na ponta direita é o _LSB_. Porém, se lermos no outro sentido, a conclusão seria o contrário.

É importante falarmos disso, pois cada documentação pode acabar considerando a escrita dos números de um jeito ou de outro!

## 5.6 Números se transformam em informação

Outro conceito absurdamente importante sobre a leitura de arquivos binários é que, dependendo da especificação, devemos ler uma determinada quantidade de bytes e combiná-los em um único número para podermos extrair o significado desejado em tal ponto. Por exemplo, imagine que um arquivo binário hipotético comece com os seguintes bytes:

```
// estou escrevendo em hexadecimal aqui
[0x2F, 0xDA, 0xE8, 0x22, ...]
```

Perceba que temos 4 itens (4 bytes) nessa sequência. Porém, curiosamente, podemos extrair muito mais informações daí do que apenas 4 coisas. *Como isso funciona?*

Podemos simplesmente ler uma determinada quantidade de bytes e combiná-los em um número maior no final. Veja, podemos ler os 2 primeiros bytes e escrever em um único número assim: `0x2FDA`. Agora não temos mais `1 byte`, mas sim `1 short`, afinal, como vimos, um short pode guardar até 16 bits, e como cada byte tem 8 bits, juntando 2 bytes em sequência isso nos dá um comprimento final de 16 bits!

Isso significa que os 2 primeiros bytes podem ter significado por si mesmos, assim como o número resultante da leitura desses dois primeiros bytes também pode ter algum outro significado.

> **Nota:** você pode converter os números binários ou hexadecimais dos exemplos para decimal em alguma calculadora ou site online!

Dei o exemplo lendo 2 bytes, mas podemos ler 2, 3 ou mesmo os 4 bytes. Juntando os números dessa forma, simplesmente podemos chegar a informações que não necessariamente ficam restritas apenas aos bytes puros. Muitas vezes, as informações de que precisamos estarão em bytes únicos, mas nem sempre. Dependendo da especificação do formato em questão, a informação pode estar em sequências como essas.

É importante lembrar também que, se a gente fizer a leitura de, por exemplo, 2 bytes, o número resultante (no nosso exemplo anterior, `0x2FDA`) não vai mais caber dentro de uma variável declarada com o tipo byte. Nesse caso, precisaremos de, pelo menos, um `short` para gravar esse número.

## 5.7 O tal _"endianess"_

O termo _endianess_ não tem exatamente uma tradução para o português, é complicado traduzir isso. Então, vamos assumir que essa é uma palavra em português totalmente nova que você está conhecendo agora. 🤡

Quando a gente fala de *endianess*, estamos nos referindo à ordem com que lidamos com os bytes. Por exemplo, vamos pegar aqueles bytes aqui de novo:

```
[0x2F, 0xDA, 0xE8, 0x22, ...]
```

Se lermos os 2 primeiros bytes, podemos automaticamente escrevê-los na seguinte ordem:

```
0x2FDA
```

Que é justamente nossa ordem natural de leitura. Mas poderíamos simplesmente ler os bytes e escrevê-los em outra ordem, olha só:

```
0xDA2F
```

Percebe que, nesse segundo exemplo, eu escrevi o segundo byte da lista primeiro e, depois, o primeiro byte?

Isso, basicamente, é o conceito de *endianess*, onde no primeiro caso temos o formato **BIG-ENDIAN**, ou seja, o nosso formato natural de leitura é o *big-endian*, enquanto o segundo exemplo é o **LITTLE-ENDIAN** (tipo ao contrário).

Assim como o _MSB_ e o _LSB_ que vimos, o *endianess* também serve para convenção. Então, cada formato de seja lá o que for pode ter suas próprias convenções e regras baseadas nessas coisas.

## 5.8 Operações de leitura

Para que consigamos fazer essas leituras, é absurdamente obrigatório que saibamos as operações que usaremos para juntar, separar, obter e fazer todo tipo de manipulação nos números. Essas operações de baixo nível são as operações _**bitwise**_, e, usando elas, podemos montar várias operações de nível mais alto.

Não vou explicar a nível de _bit_ cada uma das operações, mas vamos ver as principais coisas que precisamos saber fazer usando _bitwise_.

### 5.8.1 Juntar dois números

Podemos ter dois números e querer juntar ambos em um só, assim como exemplificamos nos tópicos anteriores. Imagine que tenhamos os seguintes números:

```
numero_A = 0xAB
numero_B = 0xCD
```

Se quisermos ter esses dois números juntos em um só, podemos simplesmente fazer:

```
uniao = (numero_A << 8) | numero_B
```

E obtemos exatamente `uniao == 0xABCD`!

> _**Nota:**_ O número `8` _hardcoded_ ali significa exatamente que primeiro fazemos um deslocamento _left shift_ (`<<`) de **8 bits**, sendo que 8 bits é exatamente o **tamanho**, em _bits_, da variável `numero_A`. Obviamente, se o tamanho, em _bits_, dessa variável fosse outro, para fazer a união, deveríamos deslocar exatamente o tamanho em _bits_ que ela teria.

> _**Nota:**_ O operador `|` (lê-se _"or"_) simplesmente junta dois números!

> _E se tivermos 3 números para serem unidos em 1 só?_

Nesse caso, podemos fazer as operações por partes:

```
numero_A = 0xAB
numero_B = 0xCD
numero_C = 0xEF

uniao_1 = (numero_A << 8) | numero_B
uniao_2 = (uniao_1 << 16) | numero_C
```

Note que fizemos duas operações de união: primeiro unimos os dois primeiros números, depois deslocamos o número da união resultante (que, nesse ponto, já tinha o dobro do tamanho) e o unimos com o terceiro número!

> _**Nota:**_ Observe que a ordem em que fazemos a união determina justamente o tal _**endianess**_! Do jeito que fiz nos exemplos, os números estão na ordem de leitura "natural", logo, trata-se de _**BIG-ENDIAN**_, mas poderíamos também ler esses bytes ao contrário, gerando uma leitura em ordem _**LITTLE-ENDIAN**_.

# 6. Estrutura MIDI

Agora que fizemos uma boa introdução geral sobre leitura e um pouco sobre o formato MIDI em si, vamos, então, começar a ver detalhes sobre a estrutura do arquivo.

Excepcionalmente, vou focar, em um primeiro momento, em detalhar a estrutura de uma forma mais textual, destacando as informações presentes em um arquivo. Vou colocar algumas informações sobre bytes nos tópicos a seguir, porém, o foco vai ser justamente entender quais são essas informações e como elas estão presentes em um arquivo. Posteriormente, iremos fazer uma série de exemplos para vermos como os bytes são usados para _codificar_ tais dados em um arquivo.

## 6.1 _Chunks_

Assim como muitos outros formatos binários, o formato MIDI também usa o conceito de _chunks_. Em português, isso significa algo como "pedaços", o que faz sentido para as coisas que este formato se propõe a organizar.

Em termos gerais, um _chunk_ basicamente é um grupo de coisas sequenciais do mesmo "tipo" que um arquivo pode guardar. Se pensarmos em programação, podemos fazer uma analogia considerando um _chunk_ como se fosse um "objeto". Assim, o arquivo MIDI é composto por esses _objetos_.

O formato MIDI, portanto, contém dois tipos de _chunks_, sendo eles um _chunk_ de cabeçalho (_header chunk_) e **um ou mais** _chunks_ de trilha (_track chunks_).

A seguir, vamos ver os detalhes sobre esses dois tipos de _chunks_.

### 6.1.1 _Chunk_ de cabeçalho (_header_)

Esse _chunk_ é bem simples de entender, pois serve para guardar informações gerais sobre o arquivo em questão. As informações contidas em um _header chunk_ são as seguintes:

| Número de bytes 	|         Dado        	| Tipo Esperado 	|                            Observações                            	|
|:---------------:	|:-------------------:	|:-------------:	|:-----------------------------------------------------------------:	|
|        4        	|      Assinatura     	|     Texto     	|                    **sempre** é o valor `MThd`                    	|
|        4        	| Tamanho do _header_ 	|     Número    	|    **sempre** é o valor `0x0006`, ou simplesmente `6` (decimal)   	|
|        2        	|  Formato do arquivo 	|     Número    	|        Esperamos ler um destes três números: `0`, `1`, `2`        	|
|        2        	|  Número de trilhas  	|     Número    	|          Quantidade de trilhas que o arquivo MIDI contém          	|
|        2        	|      "Divisão"      	|     Número    	| Resolução de tempo MIDI: ticks/semínima ou subdivisões SMPTE. 	|

> _**Nota:**_ Normalmente, em _headers_ como este, alguns campos de dados são usados sem tantos propósitos, mas, ainda assim, podem servir para validações. Afinal, se um número não for lido como esperado, isso significará que ou o arquivo está "corrompido", ou foi "mal gravado", ou a leitura atual não está sendo feita corretamente.

> _**Nota:**_ A documentação oficial menciona que os elementos presentes no _header_ podem ser expandidos no futuro. Ou seja, novas informações podem ser adicionadas conforme necessário. Portanto, mesmo que um _header_ tenha dados que pareçam inúteis, é importante lê-los todos e verificar se fazem sentido em alguma versão da documentação.

Essa tabela resume bem o conteúdo de um _header_ MIDI. Vamos agora entender cada um dos itens.

#### 6.1.1.1 Assinatura (_MThd_)

Tipicamente, arquivos binários costumam ter essas coisas chamadas de "assinaturas" no meio dos seus bytes. Assinaturas podem ser qualquer coisa; neste caso, foi definido que seria um texto.

> _**Nota:**_ Curiosamente, se você abrir um arquivo MIDI em um bloco de notas, será possível ler essa assinatura (_"MThd"_) diretamente. Isso acontece porque esperamos justamente que os bytes correspondentes a esse dado representem um texto, e um programa como o Bloco de Notas faz exatamente isso: exibe o símbolo visual (caractere) para cada byte puro do arquivo. No entanto, se você abrir um MIDI no bloco de notas, verá muitos caracteres "aleatórios" ou até mesmo símbolos como um "quadrado". Isso ocorre porque nem todos os valores de bytes possuem um caractere visual associado a eles em qualquer esquema de mapeamento, como o padrão `UTF-8`. Porém, renderizando os bytes com outro _**charset**_, é possível obter resultados totalmente diferentes.

No arquivo MIDI, a assinatura de um _chunk_ de cabeçalho sempre será a _string_ `MThd`, que é formada pela seguinte sequência de bytes:

```
[0x4D, 0x54, 0x68, 0x64, ...]
```

Portanto, ao ler cada byte separadamente e convertê-lo para um tipo `char`, vemos que os quatro formam a _string_ `MThd`.

> _**Nota:**_ Isso equivale a simplesmente verificar qual é o valor desse número (o byte) na tabela _ASCII_.

Portanto, todo arquivo MIDI começa exatamente com essa sequência. Se carregarmos o arquivo em um _array_, conforme descrito no item [Ponto de partida](#51-ponto-de-partida) deste artigo, podemos extrair a assinatura do cabeçalho nos primeiros quatro itens do array.

#### 6.1.1.2 Tamanho do _header_

A especificação define este campo para indicar o tamanho do _header_, em bytes. Excluindo os bytes usados na assinatura (4), os restantes somam 6 bytes. Logo, sempre devemos esperar ler o número 6 para este campo.

Caso a documentação venha a incluir mais dados no _header_, esse valor certamente mudará.

#### 6.1.1.3 Formato do arquivo

Curiosamente o formato MIDI meio que... possui _sub-formatos_. 💀

Mas não se preocupe, não é tão complicado assim. Esse formato que lemos aqui basicamente define algumas regras sobre a organização dos _chunks_ de trilha. Veja só esta tabela resumo:

| Formato 	|                                                                              Descrição                                                                             	|
|:-------:	|:------------------------------------------------------------------------------------------------------------------------------------------------------------------:	|
|   `0`   	|                                      O arquivo MIDI terá apenas uma única trilha; apenas um único _chunk_ de trilha é esperado                                     	|
|   `1`   	| O arquivo MIDI pode conter uma ou mais trilhas que funcionam **simultaneamente**. Para este formato, a primeira trilha **obrigatoriamente** conterá metadados. 	|
|   `2`   	|                                                O arquivo MIDI terá uma ou mais trilhas sequencialmente independentes.                                                	|

Como você pôde ver, os formatos descrevem coisas bem simples sobre as trilhas, mas para detalhar mais um pouco, veja só:

- **Formato 0**: contém um único *track chunk* após o *header chunk*. Ele é simples e muito compatível, sendo ideal para programas básicos que precisam tocar um único canal de som, como sintetizadores simples ou sistemas focados em efeitos sonoros. Mesmo que seu software utilize múltiplas trilhas, pode ser útil oferecer suporte ao Formato 0 para garantir compatibilidade com programas mais simples.

- **Formato 1**: contém múltiplos *track chunks* organizados como trilhas simultâneas. Esse formato é ideal para softwares que trabalham com várias faixas ao mesmo tempo, como sequenciadores de áudio. A primeira trilha sempre contém informações de tempo e outros metadados essenciais.

- **Formato 2**: também contém múltiplos *track chunks*, mas eles representam padrões independentes em vez de trilhas sincronizadas. É útil para programas que organizam música de forma modular, permitindo a manipulação de diferentes segmentos separadamente. Esse formato é menos comum e geralmente usado para bancos de padrões musicais.

Para garantir compatibilidade entre dispositivos e softwares, é essencial que os arquivos MIDI incluam informações sobre **tempo e compasso**. Caso contrário, assume-se um compasso 4/4 e um tempo de 120 BPM. Essas informações devem estar no primeiro *track chunk* de arquivos nos formatos 1 e 2, e no início da única trilha em arquivos no Formato 0.

No futuro, novos formatos podem surgir. Por isso, é importante que os programas lidem com IDs desconhecidos de forma flexível, aproveitando os *track chunks* disponíveis. Além disso, o *header chunk* pode ganhar novos parâmetros, então os leitores de arquivos MIDI devem sempre considerar seu tamanho ao processá-lo.

#### 6.1.1.4 Número de trilhas (_`ntrks`_)

Um outro dado que existe no _header_ é basicamente autoexplicativo: mostra exatamente quantas trilhas o arquivo MIDI tem. Além disso, a documentação oficial chama isso de "_`ntrks`_", então é importante você ter esse pequeno detalhe em mente, caso vá ler a documentação oficial também.

Mesmo esse campo sendo basicamente trivial de se entender, é interessante vermos algumas particularidades sobre esse número — em especial, como exatamente ele se relaciona com o valor do tópico anterior: o _formato do arquivo_:

- Em um arquivo MIDI de formato `0`, o campo `ntrks` será, logicamente, lido com valor `1`, já que um arquivo de trilha única terá, em termos lógicos, apenas uma trilha;
- Um arquivo MIDI de formato `1` ou `2` terá, logicamente, o campo `ntrks` maior que `1`.

> _**Nota:**_ Se um MIDI de tipo `1` ou `2` tem apenas 1 trilha, obrigatoriamente deve-se esperar que haja uma trilha extra de metadados. Ou seja, sempre que um MIDI não for de tipo `0`, espera-se que o valor lido em `ntrks` seja maior que `1`. Qualquer inconsistência na relação dos valores lidos desses dois campos implica em algum problema de leitura, corrupção do arquivo ou má gravação do mesmo.