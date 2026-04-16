import EnderecoGet from "./src/service/ApiEndereco.js";

const inputCep = document.querySelector("#cep-usuario");
const inputLogradouro = document.querySelector("#busca-logradouro");
const inputCidade = document.querySelector("#busca-cidade")
const botao = document.querySelector("#btn-buscar");
const display = document.querySelector("#resultado");

botao.addEventListener("click", async () => {
    
    const valorDigitado = inputCep.value.replace(/\D/g, '');

    if (!valorDigitado) {
        alert("Digite um CEP antes de buscar!");
        return;
    }

    const endereco = await EnderecoGet(valorDigitado);

    if (endereco) { 
        inputLogradouro.value = endereco.logradouro;
        inputCidade.value = endereco.localidade;
        display.innerHTML = `<p style="color: green;">CEP encontrado.</p>`
        
    } else {
        display.innerHTML = `<p style="color: red;">CEP não encontrado ou erro na busca.</p>`;
    }
});