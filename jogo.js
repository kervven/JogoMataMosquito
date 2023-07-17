var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

//logica dos niveis do jogo, que altera a velocidade da criação aleatoria dos mosquitos
var criaMosquitoTempo = 1500
var nivel = window.location.search 
nivel = nivel.replace('?', '')

if (nivel === 'normal'){

    criaMosquitoTempo = 1500

} else if (nivel === 'dificil'){

    criaMosquitoTempo = 1000

} else if (nivel === 'expert'){

    criaMosquitoTempo = 750

}



function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

//aqui está a logica do cronometro, onde o tempo é contado de forma decrescente
var cronometro = setInterval(function() {

    tempo -= 1

    //essa condicao serve para nao deixar o cronometro seguir com numeros negativos e estabelecendo a regra de vitoria do jogo
    if(tempo < 0){

        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else {
    document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

//os codigos dessa função precisaram ser encapsulados em uma função porque, como é necessário rodar esse codigo depois da existencia do body la no html, essa função precisa ser chamada dentro do body, que já é o momento em que ela é criada.
//Caso o contratrio, a imagem do mosquito nao sera criada, pois a referencia do js no head vem primeiro do que a criação do body html
function posicaoRandomica() {

    //aqui vamos remover o mosquito anterior caso exista
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3) {
            
            window.location.href = 'fim_de_jogo.html'

        } else {
        document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
        vidas++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}