import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shield, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        
        {/* Materials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Образовательные материалы</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* ВОВ */}
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1579532649044-57b9574d070b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Великая Отечественная война" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-victory-red" />
                    <h3 className="text-lg font-semibold">Великая Отечественная война</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Исторические материалы, хроники и свидетельства о самой страшной войне XX века
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/materials/vov">
                      Изучить материалы
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* СВО */}
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1510036835912-32cadff1e3c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Специальная военная операция" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-victory-blue" />
                    <h3 className="text-lg font-semibold">Специальная военная операция</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Актуальные материалы о ходе СВО, хронология событий и аналитика
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/materials/svo">
                      Изучить материалы
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Донбасс и Крым */}
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1589536774882-8d349737a87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Донбасс и Крым" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-victory-red" />
                    <h3 className="text-lg font-semibold">Донбасс и Крым</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    История Крыма и Донбасса, воссоединение с Россией, документальные материалы
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/materials/donbass">
                      Изучить материалы
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/interactive">Перейти к интерактивным урокам</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 bg-victory-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Присоединяйтесь к проекту</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Станьте частью масштабного образовательного проекта, направленного на сохранение 
              исторической памяти и патриотическое воспитание молодежи
            </p>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/login">Войти в личный кабинет</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
