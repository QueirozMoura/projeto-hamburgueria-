import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { AboutSection } from '@/components/home/AboutSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { LocationSection } from '@/components/home/LocationSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <AboutSection />
        <TestimonialsSection />
        <LocationSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
