import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle, Medal, Timer } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
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
  },
];

const lessons = [
  {
    id: 1,
    title: "Ключевые сражения ВОВ",
    description: "Интерактивный урок о решающих битвах Великой Отечественной войны",
    difficulty: "Средний",
    duration: "45 минут",
    questions: 15,
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Герои Великой Отечественной",
    description: "Урок посвящен героям войны и их подвигам",
    difficulty: "Начальный",
    duration: "30 минут",
    questions: 10,
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Освобождение Крыма",
    description: "История операции по освобождению Крымского полуострова",
    difficulty: "Продвинутый",
    duration: "60 минут",
    questions: 20,
    image: "https://images.unsplash.com/photo-1615529482188-63e9a1c87ee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const Interactive = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className="overflow-hidden">
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
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{lesson.questions} вопросов</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => setActiveTab("quiz")}
                      >
                        Начать урок
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
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
                      <div className="space-y-4">
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
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button onClick={resetQuiz}>Пройти тест снова</Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="bg-white border rounded-lg p-8 text-center">
                <div className="mx-auto mb-4 bg-muted/30 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-victory-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Раздел в разработке</h3>
                <p className="text-muted-foreground mb-6">
                  Здесь будет отображаться информация о пройденных интерактивных уроках
                </p>
                <Button variant="outline" onClick={() => setActiveTab("available")}>
                  Вернуться к доступным урокам
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Interactive;
