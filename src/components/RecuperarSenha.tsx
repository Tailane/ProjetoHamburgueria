import { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Screen } from '../App';

interface RecuperarSenhaProps {
  onNavigate: (screen: Screen) => void;
}

export function RecuperarSenha({ onNavigate }: RecuperarSenhaProps) {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  const handleRecuperar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErro('Digite seu email');
      return;
    }

    // Simular envio de email
    setTimeout(() => {
      setEnviado(true);
    }, 500);
  };

  if (enviado) {
    return (
      <div className="bg-white rounded-[2rem] border-4 border-black p-8 shadow-lg">
        <button 
          onClick={() => onNavigate('login')}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h2 className="mb-4">Email Enviado!</h2>
          
          <p className="text-gray-600 mb-8">
            Enviamos um link de recuperação para<br />
            <span className="font-medium">{email}</span>
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Verifique sua caixa de entrada e spam.
          </p>

          <Button 
            onClick={() => onNavigate('login')}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-6"
          >
            VOLTAR AO LOGIN
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border-4 border-black p-8 shadow-lg">
      <button 
        onClick={() => onNavigate('login')}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <Logo />
      
      <h2 className="text-center mb-2">Recuperar Senha</h2>
      
      <p className="text-center text-gray-600 text-sm mb-6">
        Digite seu email para receber um link de recuperação
      </p>

      <form onSubmit={handleRecuperar} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Email</label>
          <div className="relative">
            <Input 
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErro('');
              }}
              className="w-full pl-10"
            />
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {erro && (
          <p className="text-red-600 text-sm text-center">{erro}</p>
        )}

        <Button 
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-6"
        >
          ENVIAR LINK
        </Button>

        <div className="text-center">
          <button 
            type="button"
            onClick={() => onNavigate('login')}
            className="text-sm text-gray-600"
          >
            Lembrei minha senha
          </button>
        </div>
      </form>
    </div>
  );
}
