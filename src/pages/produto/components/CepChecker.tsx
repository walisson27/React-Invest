// src/components/CepChecker.tsx
import { useState } from "react";

type Address = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

const CepChecker = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState("");

  const handleCepSearch = async () => {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length !== 8) {
      setError("CEP deve conter 8 dígitos.");
      setAddress(null);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        setAddress(null);
      } else {
        setAddress(data);
        setError("");
      }
    } catch (err) {
      setError("Erro ao buscar o CEP.");
      setAddress(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-sm font-medium">Consultar Frete</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleCepSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Consultar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {address && (
        <div className="text-sm text-gray-800 bg-gray-100 rounded p-3">
          <p><strong>CEP:</strong> {address.cep}</p>
          <p><strong>Endereço:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade} - {address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default CepChecker;
