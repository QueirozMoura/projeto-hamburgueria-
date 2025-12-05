import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBurger from '@/assets/hero-burger.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBurger})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in-up">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">
              #1 Hamburgueria Gourmet da Cidade
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in-up animation-delay-200">
            <span className="text-foreground">Sabor que</span>
            <br />
            <span className="gold-text">Transforma</span>
            <br />
            <span className="text-foreground">Momentos</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
            Hambúrgueres artesanais feitos com ingredientes selecionados, 
            técnicas refinadas e uma paixão que você sente em cada mordida.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
            <Link to="/cardapio">
              <Button
                size="lg"
                className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ver Cardápio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#sobre">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold text-base"
              >
                Nossa História
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in-up animation-delay-800">
            {[
              { value: '50K+', label: 'Clientes Satisfeitos' },
              { value: '4.9', label: 'Avaliação Média' },
              { value: '25+', label: 'Receitas Exclusivas' },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
