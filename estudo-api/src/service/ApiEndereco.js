import EnderecoDTO from "../dto/EnderecoDTO.js";

export default async function EnderecoGet(cep) {
    
   try{  
        if(!cep){
            throw new Error("zip code not issued!")
        }

        const cleanCep = cep.replace(/\D/g, '')
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        if(!response.ok){
            throw new Error(`Error it's API: ${response.status}`);
        }

        const data = await response.json();

        const endereco = new EnderecoDTO (
            data.cep,
            data.logradouro,
            data.complemento,
            data.unidade,
            data.bairro,
            data.localidade,
            data.uf,
            data.estado,
            data.regiao,
            data.ibge,
            data.gia,
            data.ddd,
            data.siafi,
        );
        console.log("Create Object DTO:", endereco);
        return endereco;
    }
    catch (error){
        console.error(`Fetch error: ${error}`);
    }
}

EnderecoGet();