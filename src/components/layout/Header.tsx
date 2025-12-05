import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/cardapio', label: 'Cardápio' },
    { href: '/#sobre', label: 'Sobre' },
    { href: '/#depoimentos', label: 'Depoimentos' },
    { href: '/#localizacao', label: 'Localização' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl md:text-3xl font-display font-bold gold-text">
              Burger
            </span>
            <span className="text-2xl md:text-3xl font-display font-light text-foreground">
              Gourmet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-300',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300',
                  'hover:text-primary hover:after:w-full',
                  isActive(link.href) ? 'text-primary after:w-full' : 'text-foreground/80'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/perfil">
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
                    <User className="h-4 w-4" />
                    {user?.name.split(' ')[0]}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Entrar
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-20 bg-background/98 backdrop-blur-lg border-b border-border transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-lg font-medium py-2 px-4 rounded-lg transition-all duration-300',
                'hover:bg-primary/10 hover:text-primary hover:pl-6',
                isActive(link.href) ? 'text-primary bg-primary/10' : 'text-foreground/80'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="border-t border-border pt-4 mt-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-primary/10 hover:text-primary"
                >
                  <User className="h-5 w-5" />
                  Meu Perfil
                </Link>
                <Link
                  to="/pedidos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-primary/10 hover:text-primary"
                >
                  Meus Pedidos
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-destructive/10 hover:text-destructive w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <User className="h-5 w-5" />
                Entrar / Cadastrar
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
