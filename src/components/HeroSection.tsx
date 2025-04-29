import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-victory-blue text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Сохраняем память о подвиге народа
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Образовательный проект «Уроки Победы» — современный интерактивный ресурс 
            для учителей, школьников и всех, кто интересуется историей Великой Отечественной войны
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/materials">Изучить материалы</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/about">О проекте</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
