import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const statusConfig = {
  pending: {
    label: 'Pendente',
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  preparing: {
    label: 'Preparando',
    icon: Package,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  ready: {
    label: 'Pronto',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  delivered: {
    label: 'Entregue',
    icon: Truck,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
};

const Pedidos = () => {
  const { isAuthenticated, orders } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Meus Pedidos
            </h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe o histórico dos seus pedidos
            </p>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Nenhum pedido ainda
              </h2>
              <p className="text-muted-foreground mb-6">
                Você ainda não fez nenhum pedido. Que tal experimentar nossos hambúrgueres?
              </p>
              <Link to="/cardapio">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Ver Cardápio
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((order) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={order.id}
                      className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-foreground">
                              Pedido {order.id}
                            </span>
                            <span className={cn(
                              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                              status.bgColor,
                              status.color
                            )}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {order.deliveryType === 'delivery' ? (
                            <>
                              <Truck className="h-4 w-4" />
                              <span>Entrega</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="h-4 w-4" />
                              <span>Retirada</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Quantidade: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="font-medium text-foreground">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                          <span className="text-muted-foreground">Total do pedido</span>
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pedidos;
