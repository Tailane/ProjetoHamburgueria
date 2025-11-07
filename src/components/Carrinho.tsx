import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, CartItem } from '../App';

interface CarrinhoProps {
  onNavigate: (screen: Screen) => void;
  carrinho: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantidade: number) => void;
  onClear: () => void;
}

export function Carrinho({ onNavigate, carrinho, onRemove, onUpdateQuantity, onClear }: CarrinhoProps) {
  const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const handleCheckout = () => {
    alert('Pedido finalizado com sucesso! 🍔');
    onClear();
    onNavigate('menu');
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
        <div className="text-xs tracking-widest text-gray-600">CARRINHO</div>
      </div>

      {carrinho.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
          <Button 
            onClick={() => onNavigate('menu')}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-8 py-3"
          >
            Ver Menu
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            {carrinho.map((item) => (
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
                  <p className="text-green-600 mb-2">${item.preco.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantidade - 1)}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantidade}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantidade + 1)}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Taxa de entrega</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-green-600">${(total + 5).toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={handleCheckout}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-6"
          >
            FAZER LOGIN
          </Button>
        </>
      )}
    </div>
  );
}
