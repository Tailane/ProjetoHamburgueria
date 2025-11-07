import { Menu as MenuIcon, Home, ShoppingBag, User } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, MenuItem } from '../App';

interface MenuProps {
  onNavigate: (screen: Screen) => void;
  onAddToCart: (item: MenuItem) => void;
  cartCount: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    nome: 'Cheeseburger',
    preco: 10.99,
    imagem: 'https://images.unsplash.com/photo-1616681936542-4346e1ad2af9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2VidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MjM4NDM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    nome: 'Bacon Egg Burger',
    preco: 12.50,
    imagem: 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNvbiUyMGJ1cmdlcnxlbnwxfHx8fDE3NjI0NzMwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    nome: 'Jacquim 4',
    preco: 14.59,
    imagem: 'https://images.unsplash.com/photo-1693915862455-a83d49302acc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYnVyZ2VyfGVufDF8fHx8MTc2MjQ3MzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 4,
    nome: 'Double Burger',
    preco: 16.99,
    imagem: 'https://images.unsplash.com/photo-1599155253646-7989e08c05c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3VibGUlMjBidXJnZXJ8ZW58MXx8fHwxNzYyNDczMDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function Menu({ onNavigate, onAddToCart, cartCount }: MenuProps) {
  return (
    <div className="bg-white rounded-[2rem] border-4 border-black p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <button className="p-2">
          <MenuIcon className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl italic text-black">La</span>
            <span className="text-2xl italic text-red-600">Ville</span>
          </div>
          <div className="text-xs tracking-widest text-gray-600">Menu</div>
        </div>

        <div className="w-6" />
      </div>

      <div className="space-y-4 mb-6 max-h-[450px] overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-orange-100 flex-shrink-0">
              <ImageWithFallback 
                src={item.imagem}
                alt={item.nome}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="mb-1">{item.nome}</h3>
              <p className="text-green-600">${item.preco.toFixed(2)}</p>
            </div>

            <Button 
              onClick={() => onAddToCart(item)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-2"
            >
              ADD
            </Button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around pt-4 border-t border-gray-200">
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Home className="w-5 h-5" />
          <span className="text-xs">Início</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <MenuIcon className="w-5 h-5" />
          <span className="text-xs">Menu</span>
        </button>
        
        <button 
          onClick={() => onNavigate('carrinho')}
          className="flex flex-col items-center gap-1 text-gray-400 relative"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs">Ordens</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => onNavigate('perfil')}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Perfil</span>
        </button>
      </div>
    </div>
  );
}
