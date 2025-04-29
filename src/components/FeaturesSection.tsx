import { Book, VideoIcon, User, Award } from "lucide-react";

const features = [
  {
    icon: <Book className="h-10 w-10 text-victory-blue" />,
    title: "Образовательные материалы",
    description: "Уникальные методические разработки для проведения уроков на тему Великой Отечественной войны"
  },
  {
    icon: <VideoIcon className="h-10 w-10 text-victory-blue" />,
    title: "Мультимедийный контент",
    description: "Видеолекции, интерактивные карты, архивные материалы и документальные свидетельства"
  },
  {
    icon: <User className="h-10 w-10 text-victory-blue" />,
    title: "Методическая поддержка",
    description: "Консультации опытных педагогов и историков для учителей и кураторов проекта"
  },
  {
    icon: <Award className="h-10 w-10 text-victory-blue" />,
    title: "Конкурсы и проекты",
    description: "Регулярные всероссийские конкурсы творческих и исследовательских работ для школьников"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Возможности проекта</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-border hover:border-primary/50 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
