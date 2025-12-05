import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/menuData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: MenuItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    toast.success(`${product.name} adicionado ao carrinho!`, {
      position: 'bottom-right',
    });
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover-lift">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              product.badge === 'Best Seller' && "bg-primary text-primary-foreground",
              product.badge === 'Premium' && "bg-gradient-gold text-primary-foreground",
              product.badge === 'Novo' && "bg-accent text-accent-foreground",
              product.badge === 'Popular' && "bg-secondary text-secondary-foreground",
              product.badge === 'Clássico' && "bg-muted text-muted-foreground",
              product.badge === 'Melhor Valor' && "bg-green-600 text-white",
              !['Best Seller', 'Premium', 'Novo', 'Popular', 'Clássico', 'Melhor Valor'].includes(product.badge) && "bg-primary/80 text-primary-foreground"
            )}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick Add Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            onClick={handleAddToCart}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={handleAddToCart}
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
