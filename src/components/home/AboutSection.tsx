import { Flame, Heart, Award, Leaf } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Flame,
      title: 'Na Brasa',
      description: 'Grelhados na chapa de ferro fundido para aquele sabor defumado perfeito.',
    },
    {
      icon: Heart,
      title: 'Feito com Amor',
      description: 'Cada hambúrguer é preparado artesanalmente com atenção aos detalhes.',
    },
    {
      icon: Award,
      title: 'Premium',
      description: 'Ingredientes selecionados dos melhores fornecedores locais.',
    },
    {
      icon: Leaf,
      title: 'Fresco',
      description: 'Vegetais e pães frescos todos os dias, direto do forno.',
    },
  ];

  return (
    <section className="py-24 bg-card relative overflow-hidden" id="sobre">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800"
                alt="Chef preparando hambúrguer"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/30 rounded-2xl" />
            <div className="absolute top-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-2xl" />
            
            {/* Stats Card */}
            <div className="absolute -bottom-8 -right-4 lg:right-8 bg-background p-6 rounded-xl shadow-xl border border-border">
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground mt-1">Anos de Experiência</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                Nossa História
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Onde a <span className="gold-text">Paixão</span> Encontra o Sabor
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nascemos do sonho de criar hambúrgueres que não são apenas refeições, 
                mas experiências memoráveis. Cada receita foi desenvolvida com anos de 
                pesquisa, testes e muito carinho.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                Nosso blend exclusivo de carnes nobres, combinado com ingredientes 
                frescos e técnicas artesanais, resulta em sabores que conquistam 
                até os paladares mais exigentes.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-300 group"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
