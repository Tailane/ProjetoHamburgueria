import { useState } from 'react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Screen, User } from '../App';

interface LoginProps {
  onNavigate: (screen: Screen) => void;
  onLogin: (email: string, senha: string) => boolean;
  user: User | null;
}

export function Login({ onNavigate, onLogin, user }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha) {
      setErro('Preencha todos os campos');
      return;
    }

    const sucesso = onLogin(email, senha);
    if (!sucesso) {
      if (!user) {
        setErro('Você precisa criar uma conta primeiro');
      } else {
        setErro('Email ou senha incorretos');
      }
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border-4 border-black p-8 shadow-lg">
      <Logo />
      
      <h2 className="text-center mb-6">Fazer Conta</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Criar Completo</label>
          <Input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErro('');
            }}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Email</label>
          <Input 
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
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
          FAZER LOGIN
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm">Não tem uma conta?{' '}
            <button 
              type="button"
              onClick={() => onNavigate('cadastro')}
              className="text-red-600 underline"
            >
              Cadastra-se
            </button>
          </p>
          <button 
            type="button"
            onClick={() => onNavigate('recuperar-senha')}
            className="text-sm text-gray-600 underline mt-2"
          >
            Esqueceu a senha?
          </button>
        </div>
      </form>
    </div>
  );
}
