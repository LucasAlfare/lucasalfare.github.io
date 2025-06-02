+++
date = '2025-06-02T02:00:52-03:00'
title = 'Meu (primeiro) Site Estático'
summary = 'Eu sou farmacêutico mas curioso por programação, montei um blog com Hugo + Hextra pra publicar adaptações da Divina Comédia e olha no que deu...'
type = 'blog'
+++

Bom, como esse é literalmente o meu primeiro post nessa aba de blog que estou fazendo nada mais justo iniciar com uma breve contextualização sobre mim mesmo. Eu basicamente não sou programador mas gosto muito dessa área; quer dizer, não é que eu não seja programador, até porque eu sei programar (o básico), mas a questão é que eu não sou formado na área nem trabalho com isso no dia-a-dia. Sim, eu sou farmacêutico, então essa já é uma deixa de que vamos ter postagens sobre medicamentos, saúde e etc por aqui! 😝

Agora indo para nosso conteúdo propriamente dito o contexto é o seguinte: nunca gerenciei blogs ou coisas do tipo. Pra ser sincero eu tenho dificuldade até pra escrever tweet já que não tenho hábito de fazer isso, então esse tipo de coisa é desafio pra mim. Mesmo assim eu sempre tenho "criado" conteúdos e interagido na internet, então com o passar do tempo senti necessidade de ter um "repositório" pessoal pra "documentar" as coisas. E sim, desculpa, mas eu tenho muito costume de escrever com aspas. Hahahaha

Há uns anos eu meio que "descobri" o github pages. Na época eu absolutamente leigo em web, basicamente gostava de brincar de programação só com algorítmos, bots pra jogos e coisas assim. De certa forma nunca tinha pegado a "sério" pra treinar ou fazer algum projeto. Por causa disso mesmo eu tendo conhecido o Github Pages eu acabei nunca aproveitando ele como um repositório pessoal, até porque é grátis e facilitaria muito.

Mesmo assim fiz um monte de brincadeira, um monte de teste; usei essa ferramenta pra conectar com alguns backends que brincava e por aí vai. Até que cheguei num ponto que vi um uso um pouco mais "prático" para a possibilidade de ter um repositório pessoal assim, que foi quando comecei a adaptar a Divina Comédia (de Dante Alighieri) do formato "poema" para "prosa".

É... eu realmente gosto muito da Divina Comédia de Dante também, então foi uma boa forma de unir duas coisas que gosto, a programação e a literatura. Obviamente a conexão mais óbvia que pensei foi justamente salvar meus rascunhos de adaptação no Github Pages. Eu fiz isso mas sempre muito bagunçado até que eu cheguei nessa stack atual, que eu acredito ser muito adequada pro meu caso.

Eu vi que não tinha a necessidade de trabalhar com conteúdo dinâmico então comecei a dar atenção para as soluções e ferramentas que proporcionariam construir coisas estáticas. E como eu vou falar em outras postagens, eu sou bastante fã do Fabio Akita e, acompanhando ele, vi que recentemente ele usou essa stack pra atualizar um projeto dele. Eu dei uma olhada, fiz alguns rascunhos usando essas coisas e aqui estou; aparentemente é bem tranquilo de manter e organizar.

E a stack é basicamente um Gerador de site estático chamado `HUGO`, que é feito usando a linguagem Go, e também um template feito usando esse gerador chamado `Hextra`. A ideia dessa stack é bem simples: a gente basicamente tem que escrever markdowns e o `HUGO` se encarrega de "converter" tudo pra HTML/CSS/Javascript. O interessante é que a gente pode conseguir comportamentos diferentes com esse `HUGO` usando diferentes coisas que chamamos de "`themes`"; o `Hextra` é um tema desses.

Alguns temas podem oferecer comportamentos estilizações totalmente diferentes então vale a pena ir testando. Porém uma coisa que ainda não aprendi é justamente se todos esses temas têm propriedades em comum ou podem ter configurações exclusivas que quebram em outros temas.

Por exemplo, aqui no `Hextra` eu tô usando esse seguinte trecho de código no meu `hugo.yaml`:
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

Como eu ainda não pesquisei eu não faço ideia se esse trecho de código funciona só pro `Hextra` ou se eu trocar de tema depois (mesmo que seja só pra testar) se vai quebrar.

De qualquer forma estou bem satisfeito com essa stack, provavelmente não vou ver a necessidade de trocar nem o `Hextra`, tampouco o próprio `HUGO`. Ao longo do tempo vou aprender muita coisa sobre como mexer nos detalhes dessas ferramentas.

E quanto à questão da Divina Comédia, vou falar melhor sobre isso em outros posts. Por enquanto vocês podem dar uma olhada na adaptação do [Paraíso](../../../../divina_comedia/paraiso/), tá basicamente "finalizada". É o tipo de coisa que vou fazendo ajustes com o tempo, mas já dá pra ler tranquilo.

Bom, como não é um tutorial acho que tá bom pra uma primeira postagem kkkkkk Por enquanto não tenho comentários configurados nesse site, vi que tem como configurar um tal de "Disqus", mas ainda não me aprodundei. Por causa disso, meu [contato de Instagram](https://www.instagram.com/lucas.alfare/) tá aqui pra quem quiser mandar mensagem. Tem meu repositório na homepage também, lá tem um monte de código de estudo. Um dia quem sabe não começo a trabalhar nessa área, né?! Hahahaha