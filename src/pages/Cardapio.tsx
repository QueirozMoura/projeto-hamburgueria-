import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/menu/ProductCard';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { categories, menuItems } from '@/data/menuData';
import { Input } from '@/components/ui/input';

const Cardapio = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory ? item.category === activeCategory : true;
      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  // Group items by category when showing all
  const groupedItems = useMemo(() => {
    if (activeCategory) {
      return { [activeCategory]: filteredItems };
    }
    
    const grouped: Record<string, typeof menuItems> = {};
    filteredItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }, [filteredItems, activeCategory]);

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-background">
        {/* Hero Banner */}
        <section className="relative py-20 bg-gradient-hero">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Nosso <span className="gold-text">Cardápio</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Explore nossa seleção de hambúrgueres artesanais, acompanhamentos 
                irresistíveis e sobremesas deliciosas.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar no cardápio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-card/50 border-y border-border sticky top-20 z-30 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {Object.keys(groupedItems).length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  Nenhum item encontrado. Tente outra busca.
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {categories
                  .filter((cat) => groupedItems[cat.id]?.length > 0)
                  .map((category) => (
                    <div key={category.id} id={category.id}>
                      {/* Category Header */}
                      {!activeCategory && (
                        <div className="mb-8">
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{category.icon}</span>
                            <div>
                              <h2 className="text-3xl font-display font-bold text-foreground">
                                {category.name}
                              </h2>
                              <p className="text-muted-foreground">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
                        </div>
                      )}

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {groupedItems[category.id]?.map((item, index) => (
                          <div
                            key={item.id}
                            className="opacity-0 animate-fade-in-up"
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animationFillMode: 'forwards',
                            }}
                          >
                            <ProductCard product={item} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Cardapio;
