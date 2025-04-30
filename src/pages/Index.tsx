import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import QuoteCarousel from "@/components/QuoteCarousel";
import CountdownTimer from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shield, MapPin, Award, FileText, Calendar, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* 2025 Year Special Section */}
        <section className="py-10 bg-victory-red/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-victory-red text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                2025 - Год защитника Отечества
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                80 лет Великой Победы
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                2025 год объявлен Годом защитника Отечества. Мы отмечаем 
                80-летие Победы в Великой Отечественной войне — значимую дату 
                для всех народов бывшего СССР. В этот год мы особенно чтим подвиг 
                героев, защитивших Родину и весь мир от нацизма.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="rounded-full" asChild>
                  <Link to="/materials/vov">
                    <Calendar className="mr-2 h-4 w-4" />
                    План мероприятий
                  </Link>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link to="/materials/vov">
                    <Star className="mr-2 h-4 w-4" />
                    Юбилейные события
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quote Carousel & Countdown */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Цитаты о патриотизме и памяти</h2>
                <QuoteCarousel />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Обратный отсчёт</h2>
                <CountdownTimer />
              </div>
            </div>
          </div>
        </section>
        
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
                    Исторические материалы, хроники и свидетельства о самой страшной войне XX века. Включает материалы о ключевых сражениях, героях и событиях 1941-1945 годов.
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
                    Актуальные материалы о ходе СВО, хронология событий, исторические предпосылки, геополитический контекст и официальные заявления руководства страны.
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
                    История Крыма и Донбасса, хронология событий 2014 года, референдумы, воссоединение с Россией, международное право и геополитические аспекты.
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
            
            {/* Второй ряд материалов */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Герои ВОВ */}
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Герои ВОВ" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-victory-red" />
                    <h3 className="text-lg font-semibold">Герои ВОВ</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Истории подвигов героев Великой Отечественной войны, биографии полководцев, рассказы о простых солдатах, совершивших подвиги, и тружениках тыла.
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/heroes/vov">
                      Изучить материалы
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Герои СВО */}
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1566766292206-eeaf223cae68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Герои СВО" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-victory-blue" />
                    <h3 className="text-lg font-semibold">Герои СВО</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Современные герои России, биографии участников СВО, удостоенных государственных наград, истории подвигов российских военнослужащих и гражданских специалистов.
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/heroes/svo">
                      Изучить материалы
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* История России */}
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="История России" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-victory-blue" />
                    <h3 className="text-lg font-semibold">История России</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Комплексные материалы по истории России с древнейших времен до наших дней, ключевые события, выдающиеся государственные деятели и культурное наследие страны.
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/materials/russia">
                      Изучить материалы
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/dashboard">Войти в личный кабинет</Link>
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
