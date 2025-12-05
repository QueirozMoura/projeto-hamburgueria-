import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Pronto para uma <span className="gold-text">Experiência</span> Inesquecível?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Faça seu pedido agora mesmo e descubra por que somos a hamburgueria 
            favorita de milhares de clientes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cardapio">
              <Button
                size="lg"
                className="h-16 px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg group shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Fazer Pedido
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+5511999999999">
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-10 border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Ligar Agora
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/50">
            {[
              { icon: '🚀', text: 'Entrega Rápida' },
              { icon: '💳', text: 'Pagamento Fácil' },
              { icon: '⭐', text: '4.9 Avaliação' },
              { icon: '🎁', text: 'Promoções' },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
