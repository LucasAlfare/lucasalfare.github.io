+++
date = '2025-06-02T02:00:52-03:00'
title = 'Meu (primeiro) Site Estático'
summary = ' '
type = 'blog'
+++

Bom, como este é literalmente o meu primeiro post nesta aba de blog que estou criando, nada mais justo do que começar com uma breve contextualização sobre mim. Basicamente, eu não sou programador, mas gosto muito dessa área. Quer dizer, não é que eu não saiba programar — até sei o básico —, mas a questão é que não sou formado na área nem trabalho com isso no dia a dia. Sim, eu sou farmacêutico, então já fica o aviso de que teremos postagens sobre medicamentos, saúde e afins por aqui! 😝

Indo agora para o conteúdo propriamente dito: o contexto é o seguinte. Nunca gerenciei blogs ou coisas do tipo. Pra ser sincero, tenho dificuldade até para escrever tweets, já que não tenho o hábito de fazer isso — então esse tipo de coisa é um desafio pra mim. Mesmo assim, sempre estive criando conteúdos e interagindo na internet, então com o tempo senti necessidade de ter um "repositório" pessoal para "documentar" as coisas. E sim, desculpa, mas tenho muito costume de escrever com aspas. Hahaha

Há alguns anos, meio que "descobri" o GitHub Pages. Na época eu era absolutamente leigo em web; basicamente gostava de brincar com programação só com algoritmos, bots para jogos e coisas assim. De certa forma, nunca tinha levado a sério o aprendizado ou desenvolvimento de projetos. Por isso, mesmo tendo conhecido o GitHub Pages, nunca cheguei a aproveitá-lo como um repositório pessoal — sendo que ele é gratuito e facilitaria muito.

Mesmo assim, fiz várias brincadeiras, muitos testes; usei a ferramenta para conectar com alguns backends com os quais brincava, e por aí vai. Até que cheguei a um ponto em que vi um uso mais "prático" para essa possibilidade de ter um repositório pessoal: quando comecei a adaptar a *Divina Comédia* (de Dante Alighieri) do formato "poema" para "prosa".

É... eu realmente gosto muito da *Divina Comédia* também, então foi uma boa forma de unir duas coisas que gosto: programação e literatura. Obviamente, a conexão mais imediata que pensei foi salvar meus rascunhos de adaptação no GitHub Pages. Eu fiz isso, mas sempre de forma muito bagunçada, até que cheguei nesta stack atual, que acredito ser muito adequada para o meu caso.

Percebi que não havia necessidade de trabalhar com conteúdo dinâmico, então comecei a focar em soluções e ferramentas voltadas para construção de sites estáticos. Como vou comentar em outros posts, sou bastante fã do Fabio Akita e, acompanhando ele, vi que recentemente usou essa stack para atualizar um projeto pessoal. Dei uma olhada, fiz alguns rascunhos usando essas ferramentas, e aqui estou — aparentemente é bem tranquilo de manter e organizar.

A stack é basicamente um gerador de site estático chamado `HUGO`, feito em Go, e um template chamado `Hextra`, feito com esse gerador. A ideia é simples: escrevemos em Markdown e o `HUGO` se encarrega de converter tudo para HTML/CSS/JavaScript. O interessante é que podemos obter diferentes comportamentos no `HUGO` utilizando o que chamamos de *themes* — e o `Hextra` é um desses temas.

Alguns temas podem oferecer comportamentos e estilizações totalmente diferentes, então vale a pena testar. Porém, uma coisa que ainda não entendi é se todos os temas compartilham certas propriedades ou se possuem configurações exclusivas que podem quebrar ao trocar de tema.

Por exemplo, aqui no `Hextra`, estou usando o seguinte trecho de código no meu `hugo.yaml`:

```yaml
menu:
  main:
    - name: Contact ↗
      url: "https://www.instagram.com/lucas.alfare/"
      weight: 1
    - name: Search
      weight: 2
      params:
        type: search
    - name: Source
      weight: 3
      url: "https://github.com/LucasAlfare/lucasalfare.github.io"
      params:
        icon: github
```

Como ainda não pesquisei, não sei se isso funciona apenas com o `Hextra` ou se vai quebrar ao trocar de tema, mesmo que só para teste.

De qualquer forma, estou satisfeito com essa stack e provavelmente não sentirei necessidade de trocar nem o `Hextra`, nem o próprio `HUGO`. Com o tempo, vou aprendendo a lidar melhor com os detalhes dessas ferramentas.

Quanto à *Divina Comédia*, falarei mais sobre isso em outros posts. Por enquanto, vocês podem dar uma olhada na adaptação do [Paraíso](../../../../../divina_comedia/paraiso/), que está basicamente finalizada. É o tipo de coisa que vou ajustando com o tempo, mas já está bem legível.

Bom, como não é um tutorial, acho que está bom para uma primeira postagem kkkkkk. Por enquanto, não tenho comentários configurados no site. Vi que é possível usar algo chamado *Disqus*, mas ainda não me aprofundei nisso. Por isso, deixo meu [Instagram](https://www.instagram.com/lucas.alfare/) como forma de contato para quem quiser mandar mensagem. Também tem meu repositório na homepage, onde deixo vários códigos de estudo. Quem sabe um dia eu comece a trabalhar nessa área, né? Hahahaha