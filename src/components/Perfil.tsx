import { useState } from 'react';
import { ArrowLeft, User as UserIcon, Home, Menu as MenuIcon, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Screen, User } from '../App';

interface PerfilProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

export function Perfil({ onNavigate, user, onUpdateUser, onLogout }: PerfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState(user.senha);
  const [endereco, setEndereco] = useState(user.endereco);
  const [telefone, setTelefone] = useState(user.telefone);

  const handleSave = () => {
    onUpdateUser({ nome, email, senha, endereco, telefone });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-[2rem] border-4 border-black p-6 shadow-lg">
      <button 
        onClick={() => onNavigate('menu')}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl italic text-black">La</span>
          <span className="text-2xl italic text-red-600">Ville</span>
        </div>
        <div className="text-xs tracking-widest text-gray-600">Meu Perfil</div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <UserIcon className="w-12 h-12 text-gray-400" />
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-2 text-sm">Nome Completo</label>
            <Input 
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Email</label>
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Senha</label>
            <Input 
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Endereço de Etrega</label>
            <Input 
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Telefone</label>
            <Input 
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full"
            />
          </div>

          <Button 
            onClick={handleSave}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-6"
          >
            SALVAR PERFIL
          </Button>

          <Button 
            onClick={() => setIsEditing(false)}
            variant="outline"
            className="w-full rounded-lg py-6 border-2 border-gray-300"
          >
            CANCELAR
          </Button>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-2 text-sm text-gray-600">Nome Completo</label>
            <p>{user.nome}</p>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600">Email</label>
            <p>{user.email}</p>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600">Senha</label>
            <p>••••••••</p>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600">Endereço de Etrega</label>
            <p>{user.endereco}</p>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600">Telefone</label>
            <p>{user.telefone}</p>
          </div>

          <Button 
            onClick={() => setIsEditing(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-6"
          >
            EDITAR PERFIL
          </Button>

          <Button 
            onClick={onLogout}
            variant="outline"
            className="w-full rounded-lg py-6 border-2 border-gray-300"
          >
            Logout
          </Button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around pt-4 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('menu')}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Início</span>
        </button>
        
        <button 
          onClick={() => onNavigate('menu')}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <MenuIcon className="w-5 h-5" />
          <span className="text-xs">Menu</span>
        </button>
        
        <button 
          onClick={() => onNavigate('carrinho')}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs">Ordens</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-red-600">
          <UserIcon className="w-5 h-5" />
          <span className="text-xs">Perfil</span>
        </button>
      </div>
    </div>
  );
}
