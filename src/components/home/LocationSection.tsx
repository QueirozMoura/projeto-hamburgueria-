import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LocationSection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden" id="localizacao">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Localização
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Venha Nos <span className="gold-text">Visitar</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Estamos localizados em um ponto privilegiado, fácil de acessar. 
            Esperamos você!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975970066057!2d-46.65512692378685!3d-23.564611061530373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-border rounded-2xl" />
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-5 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Endereço</h3>
                <p className="text-muted-foreground">
                  Rua das Delícias, 123<br />
                  Jardim Gourmet - São Paulo/SP<br />
                  CEP: 01234-567
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-5 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Telefone</h3>
                <p className="text-muted-foreground">
                  (11) 99999-9999<br />
                  (11) 3333-3333
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-5 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Horários</h3>
                <div className="text-muted-foreground space-y-1">
                  <p><span className="text-foreground">Terça a Quinta:</span> 18:00 - 23:00</p>
                  <p><span className="text-foreground">Sexta e Sábado:</span> 18:00 - 00:00</p>
                  <p><span className="text-foreground">Domingo:</span> 18:00 - 22:00</p>
                  <p className="text-sm text-muted-foreground/70">Segunda: Fechado</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://www.google.com/maps/dir//Av.+Paulista,+São+Paulo+-+SP"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base group">
                <Navigation className="mr-2 h-5 w-5" />
                Como Chegar
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
