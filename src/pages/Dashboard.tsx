import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  Users, 
  BookOpen, 
  FilePlus, 
  ChevronRight, 
  Award, 
  LayoutDashboard,
  BookMarked,
  Settings,
  LogOut
} from "lucide-react";
import Logo from "@/components/Logo";

const statistics = [
  {
    month: "Янв",
    students: 120,
    resources: 30,
  },
  {
    month: "Фев",
    students: 170,
    resources: 40,
  },
  {
    month: "Март",
    students: 210,
    resources: 45,
  },
  {
    month: "Апр",
    students: 250,
    resources: 60,
  },
];

const recentActivities = [
  {
    id: 1,
    action: "Добавлен новый материал",
    title: "История Ржевской битвы",
    date: "27 апреля 2025",
  },
  {
    id: 2,
    action: "Создан интерактивный урок",
    title: "Герои Сталинградской битвы",
    date: "25 апреля 2025",
  },
  {
    id: 3,
    action: "Обновлена информация о проекте",
    title: "Добавлены новые цели и задачи",
    date: "20 апреля 2025",
  },
];

const Dashboard = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");

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
            variant={activeSidebarItem === "dashboard" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveSidebarItem("dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Панель управления
          </Button>
          <Button 
            variant={activeSidebarItem === "materials" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveSidebarItem("materials")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Материалы
          </Button>
          <Button 
            variant={activeSidebarItem === "courses" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveSidebarItem("courses")}
          >
            <BookMarked className="mr-2 h-4 w-4" />
            Курсы
          </Button>
          <Button 
            variant={activeSidebarItem === "settings" ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => setActiveSidebarItem("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Настройки
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="ghost" className="w-full justify-start" asChild>
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
          <div className="grid gap-6">
            {/* Overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Всего учащихся
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-victory-red mr-2" />
                    <div className="text-2xl font-bold">1,248</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +32 за последнюю неделю
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Образовательные материалы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-victory-blue mr-2" />
                    <div className="text-2xl font-bold">78</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +5 материалов добавлено
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Реализованные интерактивные уроки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-victory-red mr-2" />
                    <div className="text-2xl font-bold">24</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    В проведении: 3 урока
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Tabs section */}
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                <TabsTrigger value="activities">Активности</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика участия</CardTitle>
                    <CardDescription>
                      Количество активных учащихся и созданных образовательных ресурсов по месяцам
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statistics}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="students" 
                            name="Учащиеся" 
                            fill="#E63946" 
                            radius={[4, 4, 0, 0]} 
                          />
                          <Bar 
                            dataKey="resources" 
                            name="Материалы" 
                            fill="#1D3557" 
                            radius={[4, 4, 0, 0]} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Последние действия</CardTitle>
                      <CardDescription>
                        Последние изменения в проекте
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div 
                            key={activity.id} 
                            className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0"
                          >
                            <div>
                              <p className="text-sm text-muted-foreground">{activity.action}</p>
                              <p className="font-medium">{activity.title}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Быстрые действия</CardTitle>
                      <CardDescription>
                        Основные операции для управления проектом
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-between group"
                        >
                          <div className="flex items-center">
                            <FilePlus className="mr-2 h-4 w-4 text-victory-red" />
                            <span>Добавить новый материал</span>
                          </div>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-between group"
                        >
                          <div className="flex items-center">
                            <BookOpen className="mr-2 h-4 w-4 text-victory-blue" />
                            <span>Создать интерактивный урок</span>
                          </div>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-between group"
                        >
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-victory-red" />
                            <span>Управление участниками</span>
                          </div>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Детальная аналитика</CardTitle>
                    <CardDescription>
                      Подробная информация об использовании материалов
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Раздел находится в разработке...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities">
                <Card>
                  <CardHeader>
                    <CardTitle>Журнал активностей</CardTitle>
                    <CardDescription>
                      История всех действий в системе
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Раздел находится в разработке...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
