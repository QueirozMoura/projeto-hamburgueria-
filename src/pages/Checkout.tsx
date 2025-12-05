import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CreditCard, Banknote, QrCode, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();
  const navigate = useNavigate();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'pix'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    complement: '',
    notes: '',
  });

  const deliveryFee = deliveryType === 'delivery' ? 8.90 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }

    if (deliveryType === 'delivery' && !formData.address) {
      toast.error('Informe o endereço de entrega');
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newOrderId = addOrder({
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total: finalTotal,
      status: 'pending',
      deliveryType,
      address: deliveryType === 'delivery' ? formData.address : undefined,
    });

    setOrderId(newOrderId);
    setOrderSuccess(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="h-24 w-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8 animate-scale-in">
            <Check className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-muted-foreground mb-2">
            Seu pedido <span className="text-primary font-semibold">{orderId}</span> foi recebido.
          </p>
          <p className="text-muted-foreground mb-8">
            {deliveryType === 'delivery'
              ? 'Você receberá seu pedido em aproximadamente 40-50 minutos.'
              : 'Seu pedido estará pronto para retirada em 20-30 minutos.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated && (
              <Link to="/pedidos">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Ver Meus Pedidos
                </Button>
              </Link>
            )}
            <Link to="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-muted-foreground mb-6">
            Adicione itens do nosso cardápio para continuar.
          </p>
          <Link to="/cardapio">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Ver Cardápio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link to="/cardapio" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-display font-bold text-foreground">
              Finalizar Pedido
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Type */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Tipo de Entrega
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-left',
                      deliveryType === 'delivery'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <MapPin className={cn('h-6 w-6 mb-2', deliveryType === 'delivery' ? 'text-primary' : 'text-muted-foreground')} />
                    <div className="font-semibold text-foreground">Entrega</div>
                    <div className="text-sm text-muted-foreground">40-50 min • R$ 8,90</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-left',
                      deliveryType === 'pickup'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <Clock className={cn('h-6 w-6 mb-2', deliveryType === 'pickup' ? 'text-primary' : 'text-muted-foreground')} />
                    <div className="font-semibold text-foreground">Retirada</div>
                    <div className="text-sm text-muted-foreground">20-30 min • Grátis</div>
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Seus Dados
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background"
                        required
                      />
                    </div>
                  </div>

                  {deliveryType === 'delivery' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Endereço completo</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Rua, número, bairro"
                          className="bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={formData.complement}
                          onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                          placeholder="Apartamento, bloco, referência..."
                          className="bg-background"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Alguma preferência especial?"
                      className="bg-background resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Forma de Pagamento
                </h2>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
                  <div className="space-y-3">
                    <label className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                      paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    )}>
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">Cartão</div>
                        <div className="text-sm text-muted-foreground">Crédito ou Débito na entrega</div>
                      </div>
                    </label>
                    <label className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                      paymentMethod === 'pix' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    )}>
                      <RadioGroupItem value="pix" id="pix" />
                      <QrCode className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">PIX</div>
                        <div className="text-sm text-muted-foreground">Pagamento instantâneo</div>
                      </div>
                    </label>
                    <label className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                      paymentMethod === 'cash' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    )}>
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">Dinheiro</div>
                        <div className="text-sm text-muted-foreground">Pagamento na entrega</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 border border-border sticky top-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Resumo do Pedido
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="text-foreground">
                      {deliveryFee === 0 ? 'Grátis' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
                </Button>

                {!isAuthenticated && (
                  <p className="mt-4 text-xs text-center text-muted-foreground">
                    <Link to="/login" className="text-primary hover:underline">
                      Faça login
                    </Link>{' '}
                    para acompanhar seus pedidos
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
