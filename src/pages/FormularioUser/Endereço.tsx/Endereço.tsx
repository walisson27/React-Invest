import React from 'react';

interface EnderecoProps {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  pontoReferencia: string;
}

interface Props {
  endereco: EnderecoProps;
  setEndereco: React.Dispatch<React.SetStateAction<EnderecoProps>>;
}

const Endereco = ({ endereco, setEndereco }: Props) => {
  return (
    <div>
      <h2>Endereço</h2>
      <input
        type="text"
        placeholder="Rua"
        value={endereco.rua}
        onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
      />
      <input
        type="number"
        placeholder="Número"
        value={endereco.numero}
        onChange={(e) => setEndereco({ ...endereco, numero: Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Bairro"
        value={endereco.bairro}
        onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
      />
      <input
        type="text"
        placeholder="Cidade"
        value={endereco.cidade}
        onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
      />
      <input
        type="text"
        placeholder="Estado"
        value={endereco.estado}
        onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
      />
      <input
        type="text"
        placeholder="CEP"
        value={endereco.cep}
        onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
      />
      <input
        type="text"
        placeholder="Complemento"
        value={endereco.complemento}
        onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
      />
      <input
        type="text"
        placeholder="Ponto de Referência"
        value={endereco.pontoReferencia}
        onChange={(e) => setEndereco({ ...endereco, pontoReferencia: e.target.value })}
      />
    </div>
  );
};

export default Endereco;

