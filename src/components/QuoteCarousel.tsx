import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Quote {
  text: string;
  author: string;
  role: string;
  country: string;
}

const quotes: Quote[] = [
  {
    text: "Народ, который не знает свою историю, не имеет будущего.",
    author: "Владимир Путин",
    role: "Президент",
    country: "Россия"
  },
  {
    text: "Вечная память героям, павшим при защите Родины.",
    author: "Сергей Шойгу",
    role: "Министр обороны",
    country: "Россия"
  },
  {
    text: "Мы сохраним нашу историю и сделаем её достоянием будущих поколений.",
    author: "Александр Лукашенко",
    role: "Президент",
    country: "Беларусь"
  },
  {
    text: "История — это путеводитель для молодого поколения.",
    author: "Валентина Матвиенко",
    role: "Председатель Совета Федерации",
    country: "Россия"
  },
  {
    text: "Подвиг народа в Великой Отечественной войне навсегда останется в нашей памяти.",
    author: "Вячеслав Володин",
    role: "Председатель Государственной Думы",
    country: "Россия"
  },
  {
    text: "Историю нельзя переписать, её нужно знать и помнить.",
    author: "Владимир Макей",
    role: "Министр иностранных дел",
    country: "Беларусь"
  },
  {
    text: "Память о войне — это обязанность перед павшими и ответственность перед будущими поколениями.",
    author: "Сергей Лавров",
    role: "Министр иностранных дел",
    country: "Россия"
  },
  {
    text: "Только зная свою историю, мы можем строить уверенное будущее.",
    author: "Роман Головченко",
    role: "Премьер-министр",
    country: "Беларусь"
  },
  {
    text: "Патриотизм — это не просто любовь к Родине, это готовность защищать её интересы.",
    author: "Дмитрий Медведев",
    role: "Заместитель Председателя Совета Безопасности",
    country: "Россия"
  },
  {
    text: "Великая Отечественная война показала силу духа нашего народа и его способность к самопожертвованию.",
    author: "Михаил Мишустин",
    role: "Председатель Правительства",
    country: "Россия"
  },
  {
    text: "Мы должны сохранить правду о войне для молодежи и будущих поколений.",
    author: "Пётр Петровский",
    role: "Политолог",
    country: "Беларусь"
  },
  {
    text: "Наша общая история — это фундамент, на котором строятся отношения между братскими народами.",
    author: "Владимир Андрейченко",
    role: "Председатель Палаты представителей",
    country: "Беларусь"
  },
  {
    text: "Образование — это ключ к пониманию истории и формированию национального самосознания.",
    author: "Сергей Кравцов",
    role: "Министр просвещения",
    country: "Россия"
  },
  {
    text: "Подвиг советского народа в Великой Отечественной войне — это пример мужества и стойкости для всего мира.",
    author: "Наталья Кочанова",
    role: "Председатель Совета Республики",
    country: "Беларусь"
  },
  {
    text: "Мы должны противостоять попыткам переписать историю и фальсифицировать итоги Второй мировой войны.",
    author: "Николай Патрушев",
    role: "Секретарь Совета Безопасности",
    country: "Россия"
  }
];

const QuoteCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextQuote = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const prevQuote = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextQuote, 10000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <Card className="relative overflow-hidden border-none shadow-none bg-white/80 backdrop-blur" 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
      <CardContent className="pt-6 px-6">
        <div className="flex items-start mb-4">
          <Quote className="h-10 w-10 text-victory-red/30 mr-4 mt-1 flex-shrink-0" />
          <div>
            <p className="text-lg md:text-xl font-medium italic">
              {quotes[activeIndex].text}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <p className="font-bold">{quotes[activeIndex].author}</p>
                <p className="text-sm text-muted-foreground">
                  {quotes[activeIndex].role}, {quotes[activeIndex].country}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={prevQuote}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={nextQuote}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCarousel;
