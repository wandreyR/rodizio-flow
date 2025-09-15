import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, Clock } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isRodizio?: boolean;
}

interface CartSidebarProps {
  items: CartItem[];
  isRodizioMode?: boolean;
  timeRemaining?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartSidebar = ({
  items,
  isRodizioMode = false,
  timeRemaining,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const rodizioItems = items.filter(item => item.isRodizio);
  const extraItems = items.filter(item => !item.isRodizio);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-glow z-50 btn-primary">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground min-w-[1.5rem] h-6">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="flex items-center justify-between">
            Seu Pedido
            {isRodizioMode && timeRemaining && (
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{timeRemaining}</span>
              </div>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Seu carrinho está vazio</p>
              <p className="text-sm">Adicione alguns itens deliciosos!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {isRodizioMode && rodizioItems.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Itens do Rodízio</h3>
                  <div className="space-y-3">
                    {rodizioItems.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemoveItem={onRemoveItem}
                      />
                    ))}
                  </div>
                </div>
              )}

              {extraItems.length > 0 && (
                <div>
                  {isRodizioMode && (
                    <>
                      <Separator className="mb-4" />
                      <h3 className="font-semibold mb-3 text-secondary">Itens Extras</h3>
                    </>
                  )}
                  <div className="space-y-3">
                    {extraItems.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemoveItem={onRemoveItem}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-primary">R$ {totalPrice.toFixed(2)}</span>
            </div>
            
            <Button 
              onClick={onCheckout} 
              className="w-full btn-primary"
              size="lg"
            >
              Finalizar Pedido
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItemCard = ({ item, onUpdateQuantity, onRemoveItem }: CartItemCardProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border bg-card">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 rounded object-cover"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{item.name}</h4>
        <p className="text-sm text-primary font-semibold">
          R$ {item.price.toFixed(2)}
          {item.isRodizio && (
            <Badge variant="outline" className="ml-2 text-xs">
              Rodízio
            </Badge>
          )}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
        >
          <Minus className="w-3 h-3" />
        </Button>
        
        <span className="font-medium min-w-[20px] text-center">
          {item.quantity}
        </span>
        
        <Button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
        >
          <Plus className="w-3 h-3" />
        </Button>
        
        <Button
          onClick={() => onRemoveItem(item.id)}
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};