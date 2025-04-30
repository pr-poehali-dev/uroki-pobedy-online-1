import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard,
  BookMarked,
  Settings,
  LogOut,
  Calendar,
  Users,
  BookOpen,
  FileText
} from "lucide-react";
import Logo from "@/components/Logo";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-victory-blue text-white p-4 hidden md:block">
        <div className="mb-8">
          <Logo className="text-white" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-white/60 mb-2 pl-3">ГЛАВНОЕ МЕНЮ</p>
          <Button 
            variant="secondary" 
            className="w-full justify-start"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Панель управления
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-white/10" 
            asChild
          >
            <Link to="/attendance">
              <Users className="mr-2 h-4 w-4" />
              Журнал посещаемости
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-white/10"
          >
            <BookMarked className="mr-2 h-4 w-4" />
            Учебные материалы
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-white/10"
          >
            <Settings className="mr-2 h-4 w-4" />
            Настройки
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10" asChild>
            <Link to="/">
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 bg-muted/10">
        {/* Header */}
        <header className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Личный кабинет куратора</h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">Блинов Антон Александрович</p>
                <p className="text-sm text-muted-foreground">Куратор проекта</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-victory-red text-white flex items-center justify-center font-medium">
                АБ
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Быстрый доступ */}
            <Card>
              <CardHeader>
                <CardTitle>Быстрый доступ</CardTitle>
                <CardDescription>
                  Основные инструменты для работы
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                  <Link to="/attendance">
                    <Calendar className="h-8 w-8 mb-2 text-victory-blue" />
                    <span>Журнал посещаемости</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <BookOpen className="h-8 w-8 mb-2 text-victory-red" />
                  <span>Учебные материалы</span>
                </Button>
              </CardContent>
            </Card>
            
            {/* Информация о проекте */}
            <Card>
              <CardHeader>
                <CardTitle>О проекте "Уроки Победы"</CardTitle>
                <CardDescription>
                  Информация о образовательном проекте
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Образовательный проект "Уроки Победы" направлен на сохранение исторической памяти о 
                  ключевых событиях в истории нашей страны, патриотическое воспитание молодежи и 
                  формирование объективного взгляда на современные события.
                </p>
                <p>
                  В рамках проекта проводятся образовательные мероприятия, посвященные Великой Отечественной 
                  войне, специальной военной операции, истории Донбасса, Крыма и важным событиям российской истории.
                </p>
                <Button className="w-full mt-2">Подробнее о проекте</Button>
              </CardContent>
            </Card>
            
            {/* Календарь мероприятий */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Ближайшие мероприятия</CardTitle>
                <CardDescription>
                  График образовательных мероприятий на ближайшее время
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start border-l-4 border-victory-red pl-4 pb-4">
                    <div className="bg-muted rounded-md w-16 h-16 flex flex-col items-center justify-center mr-4 shrink-0">
                      <span className="text-lg font-bold">9</span>
                      <span className="text-xs">мая</span>
                    </div>
                    <div>
                      <h3 className="font-medium">День Победы</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Праздничные мероприятия, посвященные Дню Победы
                      </p>
                      <div className="text-xs text-muted-foreground">09:00 - 18:00, Центральная площадь</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-l-4 border-victory-blue pl-4 pb-4">
                    <div className="bg-muted rounded-md w-16 h-16 flex flex-col items-center justify-center mr-4 shrink-0">
                      <span className="text-lg font-bold">12</span>
                      <span className="text-xs">мая</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Урок мужества "Герои СВО"</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Встреча с участниками СВО, рассказ о современных героях
                      </p>
                      <div className="text-xs text-muted-foreground">14:00 - 16:00, Актовый зал школы №5</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-l-4 border-victory-red pl-4">
                    <div className="bg-muted rounded-md w-16 h-16 flex flex-col items-center justify-center mr-4 shrink-0">
                      <span className="text-lg font-bold">18</span>
                      <span className="text-xs">мая</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Исторический квест "Дорогами Победы"</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Интерактивное мероприятие для школьников по истории ВОВ
                      </p>
                      <div className="text-xs text-muted-foreground">10:00 - 13:00, Городской парк</div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-6">
                  Показать все мероприятия
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
