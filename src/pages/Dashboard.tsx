import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  BookMarked,
  Settings,
  LogOut,
  Plus,
  Search,
  Calendar,
  UserCheck,
  UserX
} from "lucide-react";
import Logo from "@/components/Logo";

// Демо-данные для списка учащихся
const initialStudents = [
  { id: 1, name: "Иванов Иван", grade: "9А", present: true, lastAttendance: "28/04/2025" },
  { id: 2, name: "Петрова Мария", grade: "9А", present: false, lastAttendance: "28/04/2025" },
  { id: 3, name: "Сидоров Алексей", grade: "9Б", present: true, lastAttendance: "28/04/2025" },
  { id: 4, name: "Кузнецова Анна", grade: "10А", present: true, lastAttendance: "28/04/2025" },
  { id: 5, name: "Новиков Дмитрий", grade: "10А", present: false, lastAttendance: "27/04/2025" },
  { id: 6, name: "Морозова Екатерина", grade: "8В", present: true, lastAttendance: "28/04/2025" },
  { id: 7, name: "Волков Сергей", grade: "11А", present: true, lastAttendance: "28/04/2025" },
  { id: 8, name: "Зайцева Ольга", grade: "11Б", present: false, lastAttendance: "26/04/2025" },
];

const Dashboard = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("attendance");
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString("ru-RU"));

  // Фильтрация студентов по поисковому запросу
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Изменение статуса присутствия
  const toggleAttendance = (id: number) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, present: !student.present, lastAttendance: student.present ? student.lastAttendance : currentDate } 
        : student
    ));
  };

  // Добавление нового студента
  const addStudent = () => {
    if (newStudentName.trim() && newStudentGrade.trim()) {
      const newId = Math.max(...students.map(s => s.id)) + 1;
      const newStudent = {
        id: newId,
        name: newStudentName.trim(),
        grade: newStudentGrade.trim(),
        present: false,
        lastAttendance: "-"
      };
      setStudents([...students, newStudent]);
      setNewStudentName("");
      setNewStudentGrade("");
      setShowAddForm(false);
    }
  };

  // Отменить добавление студента
  const cancelAddStudent = () => {
    setNewStudentName("");
    setNewStudentGrade("");
    setShowAddForm(false);
  };

  // Отметить всех как присутствующих
  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, present: true, lastAttendance: currentDate })));
  };

  // Количество присутствующих
  const presentCount = students.filter(student => student.present).length;

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
            variant={activeSidebarItem === "attendance" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveSidebarItem("attendance")}
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Учет посещаемости
          </Button>
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
            <BookMarked className="mr-2 h-4 w-4" />
            Учебные материалы
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
            {activeSidebarItem === "attendance" && (
              <>
                {/* Статистика посещаемости */}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-victory-red" />
                    <span className="font-medium">{currentDate}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <UserCheck className="h-5 w-5 text-green-500 mr-1" />
                      <span className="font-medium">{presentCount}</span>
                    </div>
                    <div className="flex items-center">
                      <UserX className="h-5 w-5 text-red-500 mr-1" />
                      <span className="font-medium">{students.length - presentCount}</span>
                    </div>
                  </div>
                </div>

                {/* Управление списком учащихся */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Учет посещаемости</CardTitle>
                      <CardDescription>
                        Управление списком учащихся и отметки о присутствии
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={markAllPresent}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Отметить всех
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => setShowAddForm(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Добавить ученика
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Форма добавления нового ученика */}
                    {showAddForm && (
                      <div className="mb-4 p-4 border rounded-md bg-muted/20">
                        <h3 className="font-medium mb-2">Добавить нового ученика</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="col-span-2">
                            <Input
                              placeholder="ФИО ученика"
                              value={newStudentName}
                              onChange={(e) => setNewStudentName(e.target.value)}
                            />
                          </div>
                          <div>
                            <Input
                              placeholder="Класс"
                              value={newStudentGrade}
                              onChange={(e) => setNewStudentGrade(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={cancelAddStudent}>Отмена</Button>
                          <Button size="sm" onClick={addStudent}>Добавить</Button>
                        </div>
                      </div>
                    )}

                    {/* Поиск */}
                    <div className="relative mb-4">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Поиск по имени или классу..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* Таблица учащихся */}
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">№</TableHead>
                            <TableHead>ФИО</TableHead>
                            <TableHead>Класс</TableHead>
                            <TableHead>Присутствие</TableHead>
                            <TableHead>Последнее присутствие</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, index) => (
                              <TableRow key={student.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.grade}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={`student-${student.id}`} 
                                      checked={student.present}
                                      onCheckedChange={() => toggleAttendance(student.id)}
                                    />
                                    <Badge 
                                      variant={student.present ? "default" : "outline"}
                                      className={student.present ? "bg-green-500 hover:bg-green-500/90" : "text-red-500"}
                                    >
                                      {student.present ? "Присутствует" : "Отсутствует"}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell>{student.lastAttendance}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4">
                                Не найдено учащихся по вашему запросу
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeSidebarItem === "dashboard" && (
              <Card className="p-6 text-center">
                <h2 className="text-xl font-bold mb-4">Панель управления</h2>
                <p className="text-muted-foreground">
                  Этот раздел находится в разработке и будет доступен в ближайшее время.
                </p>
              </Card>
            )}

            {activeSidebarItem === "materials" && (
              <Card className="p-6 text-center">
                <h2 className="text-xl font-bold mb-4">Учебные материалы</h2>
                <p className="text-muted-foreground">
                  Здесь вы сможете управлять учебными материалами проекта.
                  Раздел в процессе разработки.
                </p>
              </Card>
            )}

            {activeSidebarItem === "settings" && (
              <Card className="p-6 text-center">
                <h2 className="text-xl font-bold mb-4">Настройки</h2>
                <p className="text-muted-foreground">
                  Настройки личного кабинета будут доступны в следующем обновлении.
                </p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
