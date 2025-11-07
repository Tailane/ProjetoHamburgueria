import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Screen, User } from '../App';

interface CadastroProps {
  onNavigate: (screen: Screen) => void;
  onCadastro: (user: User) => void;
}

export function Cadastro({ onNavigate, onCadastro }: CadastroProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !senha || !endereco || !telefone) {
      setErro('Preencha todos os campos');
      return;
    }

    onCadastro({ nome, email, senha, endereco, telefone });
  };

  return (
    <div className="bg-white rounded-[2rem] border-4 border-black p-8 shadow-lg">
      <button 
        onClick={() => onNavigate('login')}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <Logo />
      
      <div className="text-center mb-6">
        <span className="tracking-widest text-xs text-gray-600">CARRINHO</span>
      </div>

      <h2 className="text-center mb-6">Cadono</h2>

      <form onSubmit={handleCadastro} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Nome Completo</label>
          <Input 
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setErro('');
            }}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Email</label>
          <Input 
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErro('');
            }}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Senha</label>
          <Input 
            type="password"
            placeholder="Sauto@saedil.com"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setErro('');
            }}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Endereço de Entrega</label>
          <Input 
            type="text"
            placeholder="999-999-9698"
            value={endereco}
            onChange={(e) => {
              setEndereco(e.target.value);
              setErro('');
            }}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Telefone</label>
          <Input 
            type="tel"
            placeholder="(99) 99999-9999"
            value={telefone}
            onChange={(e) => {
              setTelefone(e.target.value);
              setErro('');
            }}
            className="w-full"
          />
        </div>

        {erro && (
          <p className="text-red-600 text-sm text-center">{erro}</p>
        )}

        <Button 
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-6"
        >
          CADASTRAR
        </Button>
      </form>
    </div>
  );
}
