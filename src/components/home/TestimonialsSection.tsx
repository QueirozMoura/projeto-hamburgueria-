import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Maria Fernanda',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    rating: 5,
    text: 'Simplesmente o melhor hambúrguer que já comi na vida! O Truffle Burger é uma obra-prima. A combinação de sabores é perfeita e o atendimento impecável.',
  },
  {
    id: 2,
    name: 'Carlos Eduardo',
    role: 'Chef Executivo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rating: 5,
    text: 'Como chef, sou exigente com hambúrgueres. O Burger Gourmet superou todas as expectativas. Ingredientes de qualidade e execução impecável.',
  },
  {
    id: 3,
    name: 'Ana Paula',
    role: 'Cliente Frequente',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    rating: 5,
    text: 'Venho toda semana com minha família. As crianças amam os Smash Burgers e eu adoro o Bacon Lover. Ambiente acolhedor e comida sempre fresquinha!',
  },
  {
    id: 4,
    name: 'Roberto Silva',
    role: 'Crítico Gastronômico',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    rating: 5,
    text: 'Finalmente uma hamburgueria que entende o conceito gourmet. O BBQ Ranch é sensacional, e a batata com cheddar é viciante. Nota 10!',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="depoimentos">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            O Que Dizem <span className="gold-text">Nossos Clientes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Veja o que eles têm a dizer.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Quote className="h-8 w-8 text-primary" />
            </div>

            {/* Main Card */}
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary/30"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-5 w-5',
                          i < testimonials[currentIndex].rating
                            ? 'text-primary fill-primary'
                            : 'text-muted'
                        )}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Author */}
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="h-12 w-12 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-muted hover:bg-primary/50'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="h-12 w-12 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
