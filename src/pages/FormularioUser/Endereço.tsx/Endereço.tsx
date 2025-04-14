import React, { useState } from "react";


interface enderecoProps {
    rua: string;
    numero: number; 
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento: string;
    pontoReferencia: string;
}


const endereco = () => {
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<number | undefined>(undefined);    
    const [bairro, setBairro] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [pontoReferencia, setPontoReferencia] = useState<string>("");
    const [dadosEndereco, setDadosEndereco] = useState<enderecoProps[]>([]);
    const [editando, setEditando] = useState<number | null>(null)
    const [showEndereco, setShowEndereco] = useState(false)
    const [showListaEndereco, setShowListaEndereco] = useState(false)   







    return(
        <>
            <input type="text"  placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
            <input type="number"  placeholder="Número" value={numero} onChange={(e) => setNumero(Number(e.target.value))} />
            <input type="text"  placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />  
            <input type="text"  placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            <input type="text"  placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
            <input type="text"  placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
            <input type="text"  placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
            <input type="text"  placeholder="Ponto de Referência" value={pontoReferencia} onChange={(e) => setPontoReferencia(e.target.value)} />
            
         </>

    )

}

export default endereco;