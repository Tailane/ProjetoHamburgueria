import { useState } from 'react';
import { Login } from './components/Login';
import { Cadastro } from './components/Cadastro';
import { Menu } from './components/Menu';
import { Carrinho } from './components/Carrinho';
import { Perfil } from './components/Perfil';
import { RecuperarSenha } from './components/RecuperarSenha';

export type Screen = 'login' | 'cadastro' | 'menu' | 'carrinho' | 'perfil' | 'recuperar-senha';

export interface MenuItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

export interface CartItem extends MenuItem {
  quantidade: number;
}

export interface User {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  telefone: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const adicionarAoCarrinho = (item: MenuItem) => {
    setCarrinho(prev => {
      const existente = prev.find(i => i.id === item.id);
      if (existente) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const atualizarQuantidade = (id: number, quantidade: number) => {
    if (quantidade === 0) {
      removerDoCarrinho(id);
      return;
    }
    setCarrinho(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const fazerLogin = (email: string, senha: string) => {
    // Mock login
    if (user && user.email === email) {
      setCurrentScreen('menu');
      return true;
    }
    return false;
  };

  const fazerCadastro = (novoUser: User) => {
    setUser(novoUser);
    setCurrentScreen('menu');
  };

  const atualizarPerfil = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const fazerLogout = () => {
    setUser(null);
    setCarrinho([]);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentScreen === 'login' && (
          <Login 
            onNavigate={setCurrentScreen}
            onLogin={fazerLogin}
            user={user}
          />
        )}
        {currentScreen === 'cadastro' && (
          <Cadastro 
            onNavigate={setCurrentScreen}
            onCadastro={fazerCadastro}
          />
        )}
        {currentScreen === 'menu' && (
          <Menu 
            onNavigate={setCurrentScreen}
            onAddToCart={adicionarAoCarrinho}
            cartCount={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
          />
        )}
        {currentScreen === 'carrinho' && (
          <Carrinho 
            onNavigate={setCurrentScreen}
            carrinho={carrinho}
            onRemove={removerDoCarrinho}
            onUpdateQuantity={atualizarQuantidade}
            onClear={limparCarrinho}
          />
        )}
        {currentScreen === 'perfil' && user && (
          <Perfil 
            onNavigate={setCurrentScreen}
            user={user}
            onUpdateUser={atualizarPerfil}
            onLogout={fazerLogout}
          />
        )}
        {currentScreen === 'recuperar-senha' && (
          <RecuperarSenha 
            onNavigate={setCurrentScreen}
          />
        )}
      </div>
    </div>
  );
}
