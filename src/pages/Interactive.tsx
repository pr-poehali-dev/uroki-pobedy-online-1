import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  CheckCircle, 
  Medal, 
  Timer, 
  Search, 
  Filter, 
  Clock, 
  LucideTarget,
  History,
  User,
  BookMarked,
  Heart
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: "Начальный" | "Средний" | "Продвинутый";
  duration: string;
  questions: number;
  category: string;
  image: string;
  tags: string[];
  completed?: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Когда началась Великая Отечественная война?",
    options: [
      { id: "a", text: "1 сентября 1939 года" },
      { id: "b", text: "22 июня 1941 года" },
      { id: "c", text: "9 мая 1945 года" },
      { id: "d", text: "5 декабря 1941 года" },
    ],
    correctAnswer: "b",
    explanation: "Великая Отечественная война началась 22 июня 1941 года с вторжения нацистской Германии на территорию СССР."
  },
  {
    id: 2,
    text: "Как называлась операция по взятию Берлина?",
    options: [
      { id: "a", text: "Операция «Барбаросса»" },
      { id: "b", text: "Операция «Багратион»" },
      { id: "c", text: "Операция «Цитадель»" },
      { id: "d", text: "Берлинская операция" },
    ],
    correctAnswer: "d",
    explanation: "Берлинская операция (16 апреля — 8 мая 1945 года) — стратегическая наступательная операция Красной Армии, в результате которой была взята столица Германии и победоносно завершена Великая Отечественная война."
  },
  {
    id: 3,
    text: "Кто водрузил Знамя Победы над Рейхстагом?",
    options: [
      { id: "a", text: "Жуков и Рокоссовский" },
      { id: "b", text: "Егоров и Кантария" },
      { id: "c", text: "Покрышкин и Кожедуб" },
      { id: "d", text: "Матросов и Космодемьянская" },
    ],
    correctAnswer: "b",
    explanation: "Знамя Победы водрузили разведчики 150-й стрелковой дивизии сержант Михаил Егоров и младший сержант Мелитон Кантария 30 апреля 1945 года."
  },
  {
    id: 4,
    text: "В каком году Крым вошел в состав Российской Федерации?",
    options: [
      { id: "a", text: "2013" },
      { id: "b", text: "2014" },
      { id: "c", text: "2015" },
      { id: "d", text: "2016" },
    ],
    correctAnswer: "b",
    explanation: "Крым вошел в состав Российской Федерации 18 марта 2014 года после проведения референдума, на котором большинство жителей полуострова проголосовали за воссоединение с Россией."
  },
  {
    id: 5,
    text: "Какой город является столицей Донецкой Народной Республики?",
    options: [
      { id: "a", text: "Луганск" },
      { id: "b", text: "Донецк" },
      { id: "c", text: "Мариуполь" },
      { id: "d", text: "Севастополь" },
    ],
    correctAnswer: "b",
    explanation: "Донецк является столицей Донецкой Народной Республики, которая вошла в состав Российской Федерации в 2022 году."
  }
];

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Ключевые сражения ВОВ",
    description: "Интерактивный урок о решающих битвах Великой Отечественной войны",
    difficulty: "Средний",
    duration: "45 минут",
    questions: 15,
    category: "ВОВ",
    tags: ["История", "ВОВ", "Сражения"],
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Герои Великой Отечественной",
    description: "Урок посвящен героям войны и их подвигам",
    difficulty: "Начальный",
    duration: "30 минут",
    questions: 10,
    category: "ВОВ",
    tags: ["История", "ВОВ", "Герои"],
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Освобождение Крыма",
    description: "История операции по освобождению Крымского полуострова",
    difficulty: "Продвинутый",
    duration: "60 минут",
    questions: 20,
    category: "ВОВ",
    tags: ["История", "ВОВ", "Крым"],
    image: "https://images.unsplash.com/photo-1615529482188-63e9a1c87ee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "История Донбасса",
    description: "Историческое развитие Донбасса и современные события",
    difficulty: "Средний",
    duration: "40 минут",
    questions: 12,
    category: "Современность",
    tags: ["История", "Донбасс", "СВО"],
    image: "https://images.unsplash.com/photo-1611516823275-98e5bfa75f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Современные герои России",
    description: "Урок о героях СВО и их подвигах во имя Родины",
    difficulty: "Начальный",
    duration: "35 минут",
    questions: 10,
    category: "Современность",
    tags: ["СВО", "Герои", "Патриотизм"],
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Возвращение Крыма в Россию",
    description: "История воссоединения Крыма с Российской Федерацией",
    difficulty: "Средний",
    duration: "50 минут",
    questions: 15,
    category: "Современность",
    tags: ["История", "Крым", "Россия"],
    image: "https://images.unsplash.com/photo-1586931775007-9f3fb809279a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    completed: true,
  },
];

const completedLessons = [
  {
    id: 101,
    title: "Возвращение Крыма в Россию",
    completedDate: "27 апреля 2025",
    score: "12/15",
    percentage: 80,
  },
  {
    id: 102,
    title: "Города-герои ВОВ",
    completedDate: "25 апреля 2025",
    score: "9/10",
    percentage: 90,
  }
];

const Interactive = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };
  
  const handleNextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };
  
  const getCorrectAnswersCount = () => {
    return questions.reduce((count, question) => {
      return selectedAnswers[question.id] === question.correctAnswer ? count + 1 : count;
    }, 0);
  };
  
  const resetQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setActiveTab("quiz");
    resetQuiz();
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === "all" || lesson.category === filterCategory;
    const matchesDifficulty = filterDifficulty === "all" || lesson.difficulty === filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  const currentQuestion = questions[activeQuestion];
  const progress = ((activeQuestion + 1) / questions.length) * 100;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Интерактивные уроки</h1>
          <p className="text-muted-foreground mb-8">
            Закрепите знания с помощью интерактивных заданий и тестов
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="available">Доступные уроки</TabsTrigger>
              <TabsTrigger value="quiz">Тестирование</TabsTrigger>
              <TabsTrigger value="completed">Пройденные уроки</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="space-y-6">
              {/* Фильтры и поиск */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Поиск и фильтры</CardTitle>
                  <CardDescription>Найдите интерактивный урок по теме или сложности</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Поиск по названию или тегам..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                      >
                        <option value="all">Все категории</option>
                        <option value="ВОВ">Великая Отечественная война</option>
                        <option value="Современность">Современные события</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LucideTarget className="h-4 w-4 text-muted-foreground" />
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                      >
                        <option value="all">Любая сложность</option>
                        <option value="Начальный">Начальный</option>
                        <option value="Средний">Средний</option>
                        <option value="Продвинутый">Продвинутый</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Результаты поиска */}
              {filteredLessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredLessons.map((lesson) => (
                    <Card key={lesson.id} className="overflow-hidden relative">
                      {lesson.completed && (
                        <div className="absolute top-2 right-2 z-10">
                          <Badge variant="success" className="bg-green-500">Пройден</Badge>
                        </div>
                      )}
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={lesson.image} 
                          alt={lesson.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{lesson.title}</CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div className="flex items-center">
                            <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{lesson.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{lesson.questions} вопросов</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {lesson.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${lesson.difficulty === "Начальный" ? "border-green-500 text-green-600" : ""}
                              ${lesson.difficulty === "Средний" ? "border-amber-500 text-amber-600" : ""}
                              ${lesson.difficulty === "Продвинутый" ? "border-red-500 text-red-600" : ""}
                            `}
                          >
                            {lesson.difficulty}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handleStartLesson(lesson)}
                        >
                          {lesson.completed ? "Пройти снова" : "Начать урок"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg border">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Уроки не найдены</h3>
                  <p className="text-muted-foreground">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="quiz">
              <Card>
                {!showResults ? (
                  <>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          Вопрос {activeQuestion + 1} из {questions.length}
                        </div>
                        <div className="flex items-center">
                          <Timer className="h-4 w-4 mr-1" />
                          <span className="text-sm">00:30</span>
                        </div>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <CardTitle className="mt-4">{currentQuestion.text}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={selectedAnswers[currentQuestion.id]}
                        onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                        className="space-y-3"
                      >
                        {currentQuestion.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                            <Label 
                              htmlFor={`option-${option.id}`}
                              className="flex-1 py-3 px-4 rounded-md hover:bg-muted/50 cursor-pointer"
                            >
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousQuestion}
                        disabled={activeQuestion === 0}
                      >
                        Назад
                      </Button>
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={!selectedAnswers[currentQuestion.id]}
                      >
                        {activeQuestion === questions.length - 1 ? "Завершить" : "Далее"}
                      </Button>
                    </CardFooter>
                  </>
                ) : (
                  <>
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 bg-muted/30 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                        <Medal className="h-8 w-8 text-victory-red" />
                      </div>
                      <CardTitle>Результаты тестирования</CardTitle>
                      <CardDescription>
                        Вы ответили на {getCorrectAnswersCount()} из {questions.length} вопросов правильно
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {questions.map((question) => (
                          <div key={question.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <p className="font-medium">{question.text}</p>
                              {selectedAnswers[question.id] === question.correctAnswer ? (
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-red-500 shrink-0" />
                              )}
                            </div>
                            <div className="mt-2 text-sm">
                              <p>Ваш ответ: {
                                question.options.find(opt => opt.id === selectedAnswers[question.id])?.text || "Нет ответа"
                              }</p>
                              {selectedAnswers[question.id] !== question.correctAnswer && (
                                <p className="text-green-700 mt-1">
                                  Правильный ответ: {
                                    question.options.find(opt => opt.id === question.correctAnswer)?.text
                                  }
                                </p>
                              )}
                              {question.explanation && (
                                <div className="mt-3 p-3 bg-muted/20 rounded border-l-2 border-victory-blue">
                                  <p className="font-medium text-xs mb-1">Пояснение:</p>
                                  <p>{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("available")}>
                        К списку уроков
                      </Button>
                      <Button onClick={resetQuiz}>Пройти тест снова</Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Пройденные уроки</CardTitle>
                  <CardDescription>
                    История ваших завершенных интерактивных уроков
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {completedLessons.length > 0 ? (
                    <div className="space-y-4">
                      {completedLessons.map((lesson) => (
                        <div key={lesson.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{lesson.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{lesson.completedDate}</span>
                                </div>
                                <div className="flex items-center">
                                  <BookMarked className="h-4 w-4 mr-1" />
                                  <span>Результат: {lesson.score}</span>
                                </div>
                              </div>
                            </div>
                            <Badge 
                              className={`
                                ${lesson.percentage >= 90 ? "bg-green-500" : ""}
                                ${lesson.percentage >= 70 && lesson.percentage < 90 ? "bg-amber-500" : ""}
                                ${lesson.percentage < 70 ? "bg-red-500" : ""}
                              `}
                            >
                              {lesson.percentage}%
                            </Badge>
                          </div>
                          <Progress value={lesson.percentage} className="h-1.5 mt-2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Нет пройденных уроков</h3>
                      <p className="text-muted-foreground mb-4">
                        Начните проходить интерактивные уроки, чтобы они появились в истории
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab("available")}>
                        Перейти к доступным урокам
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {completedLessons.length > 0 && (
                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ваши достижения</CardTitle>
                      <CardDescription>Прогресс в обучении и полученные награды</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center p-4 bg-muted/20 rounded-lg">
                          <div className="bg-victory-red/10 p-3 rounded-full mr-4">
                            <User className="h-6 w-6 text-victory-red" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Уровень знаний</h4>
                            <p className="text-sm text-muted-foreground">Промежуточный</p>
                            <Progress value={35} className="h-2 mt-2" />
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold">35%</span>
                            <p className="text-xs text-muted-foreground">до продвинутого</p>
                          </div>
                        </div>

                        <Separator />

                        <h4 className="font-medium mt-2">Полученные награды</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-victory-blue/10 flex items-center justify-center mb-2">
                              <BookOpen className="h-8 w-8 text-victory-blue" />
                            </div>
                            <span className="text-sm font-medium">Историк</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-victory-red/10 flex items-center justify-center mb-2">
                              <Heart className="h-8 w-8 text-victory-red" />
                            </div>
                            <span className="text-sm font-medium">Патриот</span>
                          </div>
                          <div className="flex flex-col items-center opacity-40">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                              <Medal className="h-8 w-8 text-gray-400" />
                            </div>
                            <span className="text-sm font-medium">Победитель</span>
                          </div>
                          <div className="flex flex-col items-center opacity-40">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                              <User className="h-8 w-8 text-gray-400" />
                            </div>
                            <span className="text-sm font-medium">Эксперт</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Interactive;
