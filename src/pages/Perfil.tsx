import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Perfil = () => {
  const { isAuthenticated, user, updateUser, orders } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

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
              Meu Perfil
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas informações pessoais
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Informações Pessoais
                  </h2>
                  <Button
                    variant={isEditing ? 'ghost' : 'outline'}
                    size="sm"
                    onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                    className={isEditing ? 'text-muted-foreground' : 'border-primary text-primary'}
                  >
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Nome
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background"
                      />
                    ) : (
                      <p className="text-foreground py-2">{formData.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </Label>
                    <p className="text-foreground py-2">{formData.email}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Telefone
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="bg-background"
                      />
                    ) : (
                      <p className="text-foreground py-2">
                        {formData.phone || 'Não informado'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Endereço Padrão
                    </Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Rua, número, bairro"
                        className="bg-background"
                      />
                    ) : (
                      <p className="text-foreground py-2">
                        {formData.address || 'Não informado'}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <Button
                      onClick={handleSave}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Resumo
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total de Pedidos</span>
                    <span className="text-xl font-bold text-foreground">
                      {orders.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Gasto</span>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(totalSpent)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Links Rápidos
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/pedidos"
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
                  >
                    Ver Meus Pedidos
                  </Link>
                  <Link
                    to="/cardapio"
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
                  >
                    Fazer Novo Pedido
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Perfil;
