import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-display font-bold">
                <span className="gold-text">Burger</span>
                <span className="text-foreground"> Gourmet</span>
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Hambúrgueres artesanais feitos com ingredientes premium e muito amor. 
              Uma experiência gastronômica única em cada mordida.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-display font-semibold text-foreground">
              Links Rápidos
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Início' },
                { href: '/cardapio', label: 'Cardápio' },
                { href: '/#sobre', label: 'Sobre Nós' },
                { href: '/#depoimentos', label: 'Depoimentos' },
                { href: '/#localizacao', label: 'Localização' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-display font-semibold text-foreground">
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                <Phone className="h-4 w-4 text-primary" />
                (11) 99999-9999
              </a>
              <a
                href="mailto:contato@burgergourmet.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                <Mail className="h-4 w-4 text-primary" />
                contato@burgergourmet.com
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Rua das Delícias, 123<br />
                  Jardim Gourmet - São Paulo/SP
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-display font-semibold text-foreground">
              Horário de Funcionamento
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Terça a Domingo</p>
                  <p>18:00 - 23:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Sexta e Sábado</p>
                  <p>18:00 - 00:00</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/70 pt-2">
                * Segunda-feira: Fechado
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {currentYear} Burger Gourmet. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/termos" className="text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
