export	 interface EnderecoProps {
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento: string;
    pontoReferencia: string;
  }
  
export  interface FormularioUsers {
    name: string;
    email: string;
    telefone: number;
    endereco: EnderecoProps;
    dataCadastro: string;
  }
  
export  type DateInputProps = {
    onDateChange: (date: string) => void;
    label?: string;
    value?: string;
  };