import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CategoryTabs } from "@/components/ui/category-tabs";
import { ProductCard } from "@/components/ui/product-card";
import { CartSidebar } from "@/components/ui/cart-sidebar";
import { Search, Clock, Users, QrCode } from "lucide-react";
import heroImage from "@/assets/hero-sushi.jpg";
import salmonSashimi from "@/assets/salmon-sashimi.jpg";
import yakisoba from "@/assets/yakisoba.jpg";
import tunaNigiri from "@/assets/tuna-nigiri.jpg";
import sake from "@/assets/sake.jpg";

// Mock data para demonstração
const categories = [
  { id: "all", name: "Todos", count: 15, icon: "🍽️" },
  { id: "sushi", name: "Sushi", count: 6, icon: "🍣" },
  { id: "sashimi", name: "Sashimi", count: 4, icon: "🐟" },
  { id: "yakisoba", name: "Yakisoba", count: 3, icon: "🍜" },
  { id: "bebidas", name: "Bebidas", count: 2, icon: "🥤" },
];

const products = [
  {
    id: "1",
    name: "Combo Salmão Premium",
    description: "6 peças de sushi de salmão fresco com arroz temperado",
    price: 28.90,
    image: tunaNigiri,
    category: "sushi",
    isRodizio: true,
  },
  {
    id: "2", 
    name: "Sashimi de Salmão",
    description: "Fatias frescas de salmão, cortadas na hora",
    price: 32.90,
    image: salmonSashimi,
    category: "sashimi",
    isRodizio: true,
  },
  {
    id: "3",
    name: "Yakisoba Especial",
    description: "Macarrão frito com legumes e molho especial da casa",
    price: 24.90,
    image: yakisoba,
    category: "yakisoba",
    isRodizio: true,
  },
  {
    id: "4",
    name: "Sake Premium",
    description: "Sake japonês tradicional, servido quente ou gelado",
    price: 15.90,
    image: sake,
    category: "bebidas",
    isRodizio: false,
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isRodizio?: boolean;
}

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isRodizioMode, setIsRodizioMode] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        if (quantity === 0) {
          return prev.filter(item => item.id !== productId);
        }
        return prev.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
      }
      if (quantity > 0) {
        return [...prev, {
          id: productId,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          isRodizio: product.isRodizio,
        }];
      }
      return prev;
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Implementar lógica de checkout
    console.log("Finalizar pedido", cartItems);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Restaurante Japonês"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Sabores Autênticos do
              <span className="gradient-text block mt-2">Japão</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Experimente nossa seleção premium de sushi, sashimi e pratos quentes.
              Rodízio livre ou pedidos à la carte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary text-lg px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Iniciar Rodízio
              </Button>
              <Button className="btn-secondary text-lg px-8 py-4">
                <QrCode className="w-5 h-5 mr-2" />
                Escanear Mesa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modo Rodízio */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="card-elegant max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">Rodízio Premium</h2>
                  <p className="text-muted-foreground">
                    Acesso ilimitado ao nosso cardápio especial por 2 horas
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">R$ 59,90</div>
                    <div className="text-sm text-muted-foreground">por pessoa</div>
                  </div>
                  
                  <Button 
                    className={`${isRodizioMode ? 'btn-secondary' : 'btn-primary'} text-lg px-6`}
                    onClick={() => setIsRodizioMode(!isRodizioMode)}
                  >
                    {isRodizioMode ? (
                      <>
                        <Clock className="w-5 h-5 mr-2" />
                        Modo Ativo
                      </>
                    ) : (
                      "Ativar Rodízio"
                    )}
                  </Button>
                </div>
              </div>
              
              {isRodizioMode && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-medium">Tempo restante:</span>
                    <span className="font-mono text-lg">1:45:30</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nosso Cardápio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descobra os sabores autênticos da culinária japonesa, 
              preparados com ingredientes frescos e técnicas tradicionais.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar pratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>

            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                quantity={cartItems.find(item => item.id === product.id)?.quantity || 0}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Nenhum produto encontrado</p>
              <p>Tente ajustar os filtros ou termo de busca</p>
            </div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        items={cartItems}
        isRodizioMode={isRodizioMode}
        timeRemaining={isRodizioMode ? "1:45:30" : undefined}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;