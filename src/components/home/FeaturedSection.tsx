import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/menu/ProductCard';
import { getFeaturedItems } from '@/data/menuData';

export function FeaturedSection() {
  const featuredItems = getFeaturedItems().slice(0, 4);

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="destaques">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Mais Pedidos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Nossos <span className="gold-text">Favoritos</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Descubra os hambúrgueres mais amados pelos nossos clientes. 
            Cada um é uma obra-prima de sabores.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/cardapio">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-semibold group"
            >
              Ver Cardápio Completo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
