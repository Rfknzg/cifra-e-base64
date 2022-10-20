//Criptografia
var metodo = document.querySelector(".metodo");
var passo = document.querySelector(".passo");
var enviar = document.querySelector(".enviar");
var tipoRadio = document.forms[0].coddecod;
var tipo = document.querySelector(".tipo");
var chave = document.getElementById("chave").value;
var entrada = document.querySelector("#entrada");

passo.style.display = "none";
metodo.addEventListener("change", function () {
  metodo.style.backgroundColor = "#ffbb00";
  metodo.style.transition = "none";
  if (metodo.selectedIndex == 1) {
    // "passo" aparece se Cifra for selecionado
    passo.style.display = "flex";
  } else {
    passo.style.display = "none";
  }
});

tipo.addEventListener("change", function () {
  // muda msg do botão de enviar, conforme opção selecionada
  if (tipoRadio[0].checked) {
    enviar.textContent = "Codificar Mensagem!";
  } else {
    enviar.textContent = "Decodificar Mensagem!";
  }
});

passo.addEventListener("change", function () {
  // atualiza o valor da chave
  chave = document.getElementById("chave").value;
});

enviar.addEventListener("click", function (e) {
  e.preventDefault();
  var mensagem = entrada.value;
  if (metodo.selectedIndex == 0) {
    metodo.style.backgroundColor = "orangered";
    setTimeout(
      () => (metodo.style.backgroundColor = "rgba(100, 25, 160, 0.7)"),
      1000
    );
    metodo.style.transition = "1s";
  } else if (metodo.selectedIndex == 1) {
    if (tipoRadio[0].checked) {
      codificarCifra(mensagem, chave);
    } else {
      decodificarCifra(mensagem, chave);
    }
  } else {
    if (tipoRadio[0].checked) {
      codificarBase64(mensagem);
    } else {
      decodificarBase64(mensagem);
    }
  }
});

// Base 64
var resposta = document.querySelector(".resposta");

function codificarBase64(mensagem) {
  var codigo = btoa(mensagem);
  resposta.innerText = codigo;
}

function decodificarBase64(codigo) {
  var valido = true;
  // para evitar Failed to execute 'atob'
  for (var i = 0; i < codigo.length; i++) {
    var charCode = codigo[i].charCodeAt();
    if (
      !(
        (charCode >= 48 && charCode <= 57) ||
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        charCode == 61 ||
        charCode == 43 ||
        charCode == 47 ||
        charCode == 32
      )
    ) {
      valido = false;
      tipo.style.backgroundColor = "orangered";
      setTimeout(
        () => (tipo.style.backgroundColor = "rgba(0, 0, 255, 0.7)"),
        1000
      );
      tipo.style.transition = "1s";
      break;
    }
  }
  if (valido) {
    var mensagem = atob(codigo);
    resposta.innerText = mensagem;
  }
}

// Cifra de César
var resposta = document.querySelector(".resposta");

function codificarCifra(mensagem, chave) {
  mensagem = mensagem.split("");
  chave = parseInt(chave, 10);
  var codigo = "";
  for (var i = 0; i < mensagem.length; i++) {
    var charCode = mensagem[i].charCodeAt();
    if (charCode >= 65 && charCode <= 90) {
      codigo += String.fromCharCode(((charCode + chave - 65) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      codigo += String.fromCharCode(((charCode + chave - 97) % 26) + 97);
    } else {
      codigo += mensagem[i];
    }
  }
  resposta.innerText = codigo;
}
function decodificarCifra(mensagem, chave) {
  mensagem = mensagem.split("");
  chave = parseInt(chave, 10);
  var codigo = "";
  for (var i = 0; i < mensagem.length; i++) {
    var charCode = mensagem[i].charCodeAt();
    if (charCode >= 65 && charCode <= 90) {
      codigo += String.fromCharCode(((charCode - chave - 90) % 26) + 90);
    } else if (charCode >= 97 && charCode <= 122) {
      codigo += String.fromCharCode(((charCode - chave - 122) % 26) + 122);
    } else {
      codigo += mensagem[i];
    }
  }
  resposta.innerText = codigo;
}
