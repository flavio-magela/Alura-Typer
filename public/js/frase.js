$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
  $("#spinner").toggle();
  $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function(){
      $("#erro").toggle();
      setTimeout(function(){
      $("#erro").toggle();
    },5000);
    }).always(function(){
      $("#spinner").toggle();// apos a frase aparecer (always) sempre executa a função errada ou nao escode o spinner (icone de rodando o  aplicativo)

  });
}

function trocaFraseAleatoria(data){
  var frase = $(".frase");
  var numeroAleatorio = Math.floor(Math.random() * data.length);
  frase.text(data[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo)// .tempo é o nome dado no texto no servidor
}
function buscaFrase(){
  $("#spinner").toggle();
  var fraseId = $("#frase-id").val(); // busca o digito que vc digitou na pagina
  setTimeout(function(){
  $("#frase-id").val("");
},3000);
  console.log("Id da minha frase: " + fraseId);
  var dados = {id:fraseId}; // enviar um obj JavaScript p/ segundo parametro e ela vai enteder que vc quer o id que está no servidor.
  $.get("http://localhost:3000/frases",dados,trocaFrase).fail(function(){ //colocar o sempre na segunda posiçao para dar certo - dados
      $("#erro").toggle();
      setTimeout(function(){
      $("#erro").toggle();
    },5000);
    }).always(function(){
      $("#spinner").toggle();// apos a frase aparecer (always) sempre executa a função errada ou nao escode o spinner (icone de rodando o  aplicativo)

  });// pega no servidor o numero que foi digitado na pagina e apresenta o texte vinculado com id
}
function trocaFrase(data){
  var frase = $(".frase");
  frase.text(data.texto);
  console.log("Minha Frase: " + data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo)// .tempo é o nome dado no texto no servidor
}
