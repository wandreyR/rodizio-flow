import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isRodizio?: boolean;
  quantity?: number;
  onAddToCart: (id: string, quantity: number) => void;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  isRodizio = false,
  quantity = 0,
  onAddToCart,
}: ProductCardProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleAddToCart = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    onAddToCart(id, newQuantity);
  };

  const handleRemoveFromCart = () => {
    if (localQuantity > 0) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      onAddToCart(id, newQuantity);
    }
  };

  return (
    <Card className="card-elegant hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isRodizio && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Rodízio
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{name}</h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                R$ {price.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {category}
              </p>
            </div>

            {localQuantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                className="btn-primary"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleRemoveFromCart}
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-semibold min-w-[20px] text-center">
                  {localQuantity}
                </span>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};