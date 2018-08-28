
$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  console.log(corpoTabela);
  var usuario = $("#usuarios").val(); // insere o placar da funçao selectize
  var numPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario,numPalavras);
  linha.find(".botao-remover").click(removeLinha);
  corpoTabela.prepend(linha);
  $(".placar").slideDown(500); // ao terminar a digitação mostra o Placar
  scrollPlacar();

  //var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";
  // var linha = "<tr>" +
  //                 "<td>"+ usuario + "</td>"+
  //                 "<td>"+ numPalavras + "</td>"+
  //                 "<td>"+ botaoRemover + "</td>"+
  //             "</tr>";
  //corpoTabela.preppend(linha); //função preppend insere o campo na início da tabela e append insere o campo no final da tabela

}
function scrollPlacar(){
  var posicaoPlacar = $(".placar").offset().top; // mostra a qual posição da tela - numeraçao
  $("body").animate(
  {
    scrollTop: posicaoPlacar + "px"
  },1000)
}

function novaLinha(usuario,palavras){
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").addClass("botao-remover").attr("href","#");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone); //colocar o icone dentro da linha como no html
  colunaRemover.append(link); // colocar a linha dentro da <td> remove igual no gohtml

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000); // (this) envolve toda a linha e parent(). parent() sobe duas casas para esmaecer devagar a linha toda Pai e avô.
    setTimeout(function(){
      linha.remove(); // (this) envolve toda a linha e parent(). parent() sobe duas casas para remover a linha toda Pai e avô. Depois de 1 segundo(uso do setTimeout)

    },1000);

}

// $(".botao-remover").click(function(event){
//   event.preventDefault();
//   $(this). parent().parent().remove(); // (this) envolve toda a linha e parent(). parent() sobe duas casas para remover a linha toda Pai e avô.
//
// }); // remove linha mas de forma obsoleta.
function mostraPlacar(){
  $(".placar").stop().slideToggle(800);
  scrollPlacar();

}
function sincronizaPlacar(){
  var placar = [];
  var linhas = $("tbody>tr"); // cria um tabela com os seu tr e td´s
  linhas.each(function(){
      var usuario = $(this).find("td:nth-child(1)").text(); //mostra o primeiro posição(usuario) do primeiro array na pagina html
      var palavras = $(this).find("td:nth-child(2)").text();//mostra o segundo posição(palavra) do primeiro array da pagina html

      var score = { //fazer o score(resultado) igual o texto que está no servidor http://.../placar
        usuario: usuario,
        pontos: palavras
      };//a cada linha foi salvo um objeto diferente
      placar.push(score); //coloca dentro do array placar os valores digitado na página
  }); //igual o for{} de array
  var dados = {  //criação do objeto JavaScript para vincular ao POST
    placar: placar
  };
  $.post("http://localhost:3000/placar",dados,function(){
    console.log("Salvou placar no servidor!");
    $(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao sincronizar.");
    console.log("Sucesso ao sincronizar.");
  }).fail(function(){
    $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar.");
    console.log("Falha ao sincronizar");

  }).always(function(){
    setTimeout(function(){
      $(".tooltip").tooltipster("close");
    },2000);
  });
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
        var linha = novaLinha(this.usuario, this.pontos); //usuario e ponnto os nomes dados no placar do servidor
        linha.find(".botao-remover").click(removeLinha);
        $("tbody").append(linha); //adiciona/jogar a linha dentro da tabela do html

    });

  });

}
