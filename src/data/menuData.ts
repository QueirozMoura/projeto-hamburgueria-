export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'burgers', name: 'Hambúrgueres', description: 'Clássicos e especiais', icon: '🍔' },
  { id: 'smash', name: 'Smash Burgers', description: 'Crocantes e suculentos', icon: '🔥' },
  { id: 'combos', name: 'Combos', description: 'O pacote completo', icon: '🎁' },
  { id: 'drinks', name: 'Bebidas', description: 'Refrescantes', icon: '🥤' },
  { id: 'desserts', name: 'Sobremesas', description: 'Doces especiais', icon: '🍰' },
  { id: 'sides', name: 'Acompanhamentos', description: 'Complementos perfeitos', icon: '🍟' },
];

export const menuItems: MenuItem[] = [
  // Hambúrgueres
  {
    id: 'classic-burger',
    name: 'Classic Burger',
    description: 'Blend de carnes nobres, queijo cheddar, alface americana, tomate, cebola roxa e nosso molho especial da casa.',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    category: 'burgers',
    featured: true,
    badge: 'Clássico',
  },
  {
    id: 'bacon-lover',
    name: 'Bacon Lover',
    description: 'Hambúrguer artesanal, duplo bacon crocante, queijo prato derretido, cebola caramelizada e BBQ defumado.',
    price: 38.90,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800',
    category: 'burgers',
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: 'gourmet-trufa',
    name: 'Truffle Burger',
    description: 'Blend wagyu, queijo gruyère, cogumelos salteados, aioli de trufa negra e rúcula selvagem.',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
    category: 'burgers',
    featured: true,
    badge: 'Premium',
  },
  {
    id: 'bbq-ranch',
    name: 'BBQ Ranch',
    description: 'Hambúrguer defumado, cheddar empanado, onion rings, bacon e molho ranch com BBQ.',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800',
    category: 'burgers',
  },
  {
    id: 'mushroom-swiss',
    name: 'Mushroom Swiss',
    description: 'Blend especial, queijo suíço, mix de cogumelos salteados na manteiga e aioli de alho.',
    price: 44.90,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800',
    category: 'burgers',
  },
  {
    id: 'texas-burger',
    name: 'Texas Burger',
    description: 'Duplo hambúrguer, duplo cheddar, jalapeños, bacon, onion rings crocantes e BBQ texano.',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800',
    category: 'burgers',
  },

  // Smash Burgers
  {
    id: 'smash-classic',
    name: 'Smash Classic',
    description: 'Dois smash patties prensados na chapa, queijo americano, picles, cebola e molho especial.',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800',
    category: 'smash',
    featured: true,
    badge: 'Novo',
  },
  {
    id: 'smash-double',
    name: 'Smash Double Cheese',
    description: 'Dois smash patties, queijo cheddar derretido em cada camada, cebola crispy e maionese trufada.',
    price: 34.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    category: 'smash',
  },
  {
    id: 'smash-bacon',
    name: 'Smash Bacon Crispy',
    description: 'Três smash patties, bacon crocante, queijo prato, relish de pepino e mostarda dijon.',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800',
    category: 'smash',
  },

  // Combos
  {
    id: 'combo-classic',
    name: 'Combo Classic',
    description: 'Classic Burger + Batata Frita M + Refrigerante 400ml.',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800',
    category: 'combos',
  },
  {
    id: 'combo-premium',
    name: 'Combo Premium',
    description: 'Truffle Burger + Batata com Cheddar e Bacon + Milk Shake 500ml.',
    price: 79.90,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
    category: 'combos',
    badge: 'Melhor Valor',
  },
  {
    id: 'combo-duplo',
    name: 'Combo Duplo',
    description: '2 Classic Burgers + Batata Frita G + 2 Refrigerantes 400ml.',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800',
    category: 'combos',
  },

  // Bebidas
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    description: 'Coca-Cola original gelada 400ml.',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800',
    category: 'drinks',
  },
  {
    id: 'milkshake-choco',
    name: 'Milk Shake Chocolate',
    description: 'Cremoso milk shake de chocolate belga com chantilly.',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800',
    category: 'drinks',
  },
  {
    id: 'milkshake-morango',
    name: 'Milk Shake Morango',
    description: 'Milk shake de morango natural com calda de frutas vermelhas.',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800',
    category: 'drinks',
  },
  {
    id: 'suco-natural',
    name: 'Suco Natural',
    description: 'Suco natural da fruta: laranja, limão ou abacaxi.',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800',
    category: 'drinks',
  },

  // Sobremesas
  {
    id: 'brownie',
    name: 'Brownie com Sorvete',
    description: 'Brownie quente de chocolate 70% com bola de sorvete de baunilha e calda.',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800',
    category: 'desserts',
    featured: true,
  },
  {
    id: 'churros',
    name: 'Churros Recheados',
    description: 'Churros crocantes recheados com doce de leite e cobertura de chocolate.',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1624371414361-bc02c27097a4?w=800',
    category: 'desserts',
  },
  {
    id: 'petit-gateau',
    name: 'Petit Gâteau',
    description: 'Bolo vulcão de chocolate com centro cremoso, servido com sorvete.',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
    category: 'desserts',
  },

  // Acompanhamentos
  {
    id: 'batata-frita',
    name: 'Batata Frita',
    description: 'Porção de batatas fritas crocantes com sal e orégano.',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800',
    category: 'sides',
  },
  {
    id: 'batata-cheddar',
    name: 'Batata com Cheddar',
    description: 'Batatas fritas cobertas com cheddar cremoso e bacon crocante.',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800',
    category: 'sides',
    badge: 'Popular',
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e fritos, servidos com molho ranch.',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800',
    category: 'sides',
  },
  {
    id: 'nuggets',
    name: 'Nuggets de Frango',
    description: '10 nuggets de frango crocantes com molho barbecue.',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800',
    category: 'sides',
  },
];

export const getFeaturedItems = () => menuItems.filter((item) => item.featured);
export const getItemsByCategory = (categoryId: string) => menuItems.filter((item) => item.category === categoryId);
export const getItemById = (id: string) => menuItems.find((item) => item.id === id);
