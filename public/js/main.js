var tempoInicial = $("#tempo-digitacao").text();
var frase = $(".frase").text();
var campo = $(".campo-digitacao");
var tempoRestante = $("#tempo-digitacao");
var contaPalavras = $("#contador-palavras");
var contaCaracteres =   $("#contador-caracteres");

$(function(){  // função $(document).ready(function(){}) outra forma rapida de mostrar,
    console.log("Pagina Carregada.");
    atualizaTamanhoFrase();
    resultadoDaFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    atualizaPlacar();

    $("#botao-reiniciar").click(reiniciaJogo);
    $(".botao-remover").click(removeLinha);
    $("#usuarios"). selectize({
        create: true,
        sortField: 'text'
    });
     $('.tooltip').tooltipster({
          trigger: 'costom' // costomisado = ativar o tooltipster não pelo mouse e sim quando meu placar sincronisar /salvar placar ou seja der certo. .tooltip está desenvolvido na class placar.js

     });

  });

  function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
  }

function resultadoDaFrase() {
    campo.on("input",function() {
      var resultado = campo.val();
      var tamanhoResultado = $("#meu-resultado");
      var resultFinal = tamanhoResultado.text(resultado);

    });
}
//função Mostra o resultodo da Digitação logo abaixo do textarea
function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(/\S+/).length - 1;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);

  console.log(" Frase: " + frase);
  console.log("Tamanho da Frase: " + numPalavras);
  //console.log("Numero de Palavras da Frase: " + tamanhoFrase.text(numPalavras));
}

// função inicializa os contadores do Jogo
function inicializaContadores() {
  campo.on("input",function() {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;//split(/\S+/).length - 1
    contaPalavras.text(qtdPalavras);//conta o numero de palavras

    var qtdCaracteres = conteudo.length; //conta o  números de caracteres;
    contaCaracteres.text(qtdCaracteres);

  });
}
//função inicializa o cronometro do jogo
function inicializaCronometro() {
  campo.one("focus", function(){
    var tempoRestante = $("#tempo-digitacao").text();
    var cronometroID = setInterval(function() {
      tempoRestante --;
      var time = $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometroID); //no setInterval o tempo é parado (para de contar)
        finalizaJogo();
      }
    },1000);
  });
}
function finalizaJogo(){
  //inserePlacar();
  campo.toggleClass("campo-desativado"); // pinta a tela de cinza claro
  //campo.css("background-color","lightgray");//não é recomendável. usar um addclass
  //campo.addclass("campo-desativado");  // usando o toggClass ele verifica se esta de um jeito ele inverte
  campo.attr("disabled", true); // .att inseri algo no campo. Coloca desable na textarea ,true assim desabilitando o campo para digitação
  inserePlacar();
}

function inicializaMarcadores(){
  campo.on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length); //substr vare todo o campo da frase palavra por palavra fazendo a comparação com o digitado
    if(digitado == comparavel){
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    }else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }

  });
}

function reiniciaJogo() {
    campo.attr("disabled", false); //false - habilita o campo para digitação
    campo.val("");
    contaPalavras.text("0");
    contaCaracteres.text("0");
    tempoRestante.text(tempoInicial);
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
    inicializaCronometro();
    $("#meu-resultado").text("");
    campo.toggleClass("campo-desativado");

}
