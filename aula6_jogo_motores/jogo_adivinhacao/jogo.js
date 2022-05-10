var valorRandomico;
var contadorTentativas;
var tentativasRealizadas
function iniciaJogo() {
    valorRandomico = Math.floor(Math.random() * 100) +1;
    debugger;
    console.log(valorRandomico);
    
    contadorTentativas = 1;
    tentativasRealizadas = "";
    document.querySelector("#tentativas").innerHTML = tentativasRealizadas;
    document.querySelector("#tentativa").value = "";
    document.querySelector("#ultimoResultado").innerHTML = "";
    document.querySelector("#baixoAlto").innerHTML = "";
    
}

function verificarTentativa() {
    var tentativa = document.querySelector("#tentativa").value;
    var tentativaInt = parseInt(tentativa);

    tentativasRealizadas += tentativa + " ";
    document.querySelector("#tentativas").innerHTML = tentativasRealizadas;
    
    if (valorRandomico === tentativaInt) {
        document.querySelector("#ultimoResultado").innerHTML = "ACERTOU!";
        alert("FIM DO JOGO! Você Venceu! Parabéns!");
        iniciaJogo();
    }
    else {
        if (valorRandomico > tentativaInt)
            document.querySelector("#baixoAlto").innerHTML = "Seu palpite deve ser mais alto!";
        else
            document.querySelector("#baixoAlto").innerHTML = "Seu palpite deve ser mais baixo!";
        document.querySelector("#ultimoResultado").innerHTML = "ERROU!";
    }

    if (contadorTentativas === 10) {
        alert("FIM DO JOGO! Você perdeu!");

        iniciaJogo();
    }
    else {
        contadorTentativas++;
    }
    document.querySelector("#tentativa").value = "";
	document.querySelector("#tentativa").focus();
}