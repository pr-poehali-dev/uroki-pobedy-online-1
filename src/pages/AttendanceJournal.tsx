import { useState } from "react";
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
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Save,
  Download,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Logo from "@/components/Logo";

interface Student {
  id: string;
  name: string;
  group: string;
}

interface Attendance {
  id: string;
  lessonId: string;
  studentId: string;
  status: "present" | "absent" | "late" | null;
}

interface Lesson {
  id: string;
  title: string;
  date: string;
  description: string;
}

const AttendanceJournal = () => {
  // Состояния для хранения данных
  const [students, setStudents] = useState<Student[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  
  // Состояния для форм
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({ name: "", group: "" });
  const [newLesson, setNewLesson] = useState<Omit<Lesson, "id">>({ 
    title: "", 
    date: new Date().toISOString().split('T')[0], 
    description: "" 
  });
  
  // Состояние для отображения
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  
  // Генерация ID
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  // Добавление нового студента
  const handleAddStudent = () => {
    if (newStudent.name.trim() === "" || newStudent.group.trim() === "") {
      return;
    }
    
    const student: Student = {
      id: generateId(),
      name: newStudent.name.trim(),
      group: newStudent.group.trim()
    };
    
    setStudents([...students, student]);
    setNewStudent({ name: "", group: "" });
    setIsAddStudentOpen(false);
    showSuccess("Обучающийся успешно добавлен");
  };
  
  // Удаление студента
  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    setAttendance(attendance.filter(a => a.studentId !== id));
    showSuccess("Обучающийся удален");
  };
  
  // Добавление нового занятия
  const handleAddLesson = () => {
    if (newLesson.title.trim() === "" || newLesson.date.trim() === "") {
      return;
    }
    
    const lesson: Lesson = {
      id: generateId(),
      title: newLesson.title.trim(),
      date: newLesson.date,
      description: newLesson.description.trim()
    };
    
    const newLessons = [...lessons, lesson];
    setLessons(newLessons);
    setNewLesson({ 
      title: "", 
      date: new Date().toISOString().split('T')[0], 
      description: "" 
    });
    
    // Установка нового занятия как текущего
    setCurrentLessonId(lesson.id);
    
    // Инициализация посещаемости для нового занятия
    const newAttendanceRecords = students.map(student => ({
      id: generateId(),
      lessonId: lesson.id,
      studentId: student.id,
      status: null
    }));
    
    setAttendance([...attendance, ...newAttendanceRecords]);
    showSuccess("Занятие успешно добавлено");
  };
  
  // Удаление занятия
  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
    setAttendance(attendance.filter(a => a.lessonId !== id));
    
    if (currentLessonId === id) {
      setCurrentLessonId(lessons.length > 1 ? lessons[0].id : null);
    }
    
    showSuccess("Занятие удалено");
  };
  
  // Обновление статуса посещаемости
  const updateAttendance = (studentId: string, status: "present" | "absent" | "late") => {
    if (!currentLessonId) return;
    
    const existingRecord = attendance.find(
      a => a.lessonId === currentLessonId && a.studentId === studentId
    );
    
    if (existingRecord) {
      setAttendance(attendance.map(a => 
        a.id === existingRecord.id ? { ...a, status } : a
      ));
    } else {
      const newRecord: Attendance = {
        id: generateId(),
        lessonId: currentLessonId,
        studentId,
        status
      };
      setAttendance([...attendance, newRecord]);
    }
  };
  
  // Получение статуса посещаемости
  const getAttendanceStatus = (studentId: string): "present" | "absent" | "late" | null => {
    if (!currentLessonId) return null;
    
    const record = attendance.find(
      a => a.lessonId === currentLessonId && a.studentId === studentId
    );
    
    return record ? record.status : null;
  };
  
  // Сохранение всех данных
  const handleSaveAll = () => {
    // В реальном приложении здесь был бы API-запрос для сохранения данных
    // Для демонстрации мы просто покажем сообщение об успехе
    showSuccess("Все данные успешно сохранены");
  };
  
  // Экспорт данных
  const handleExport = () => {
    if (!currentLessonId) return;
    
    const currentLesson = lessons.find(l => l.id === currentLessonId);
    if (!currentLesson) return;
    
    const currentLessonAttendance = attendance.filter(a => a.lessonId === currentLessonId);
    
    const exportData = {
      lesson: currentLesson,
      students: students.map(student => ({
        ...student,
        status: getAttendanceStatus(student.id)
      }))
    };
    
    // Создаем и скачиваем файл
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `attendance-${currentLesson.date}-${currentLesson.title.replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showSuccess("Данные экспортированы");
  };
  
  // Показать сообщение об успехе
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };
  
  // Функция для получения русской локализованной даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
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
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-white/10"
            asChild
          >
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Панель управления
            </Link>
          </Button>
          <Button 
            variant="secondary" 
            className="w-full justify-start"
          >
            <Users className="mr-2 h-4 w-4" />
            Журнал посещаемости
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
            <h1 className="text-xl font-bold">Журнал посещаемости</h1>
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
        
        {/* Content */}
        <main className="p-6">
          {successMessage && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid gap-6 md:grid-cols-12">
            {/* Sidebar controls */}
            <div className="md:col-span-3 space-y-6">
              {/* Add student card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Управление обучающимися</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Добавить обучающегося
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Добавить обучающегося</DialogTitle>
                        <DialogDescription>
                          Введите информацию об обучающемся для добавления в журнал
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">ФИО обучающегося</Label>
                          <Input
                            id="name"
                            placeholder="Иванов Иван Иванович"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group">Группа/Класс</Label>
                          <Input
                            id="group"
                            placeholder="11А"
                            value={newStudent.group}
                            onChange={(e) => setNewStudent({...newStudent, group: e.target.value})}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={handleAddStudent}>
                          Добавить
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                
                  <div className="max-h-[400px] overflow-y-auto pr-2">
                    {students.length > 0 ? (
                      <div className="space-y-2">
                        {students.map((student) => (
                          <div 
                            key={student.id} 
                            className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50"
                          >
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">Группа: {student.group}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          Нет добавленных обучающихся
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Add lesson card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Занятия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lessonTitle">Название занятия</Label>
                    <Input
                      id="lessonTitle"
                      placeholder="Введите название"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lessonDate">Дата проведения</Label>
                    <Input
                      id="lessonDate"
                      type="date"
                      value={newLesson.date}
                      onChange={(e) => setNewLesson({...newLesson, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lessonDescription">Описание (необязательно)</Label>
                    <Input
                      id="lessonDescription"
                      placeholder="Краткое описание"
                      value={newLesson.description}
                      onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddLesson}>
                    <Plus className="mr-2 h-4 w-4" />
                    Создать занятие
                  </Button>
                  
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 mt-4">
                    {lessons.length > 0 ? (
                      <div className="space-y-2">
                        {lessons.map((lesson) => (
                          <div 
                            key={lesson.id} 
                            className={`flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 cursor-pointer ${
                              currentLessonId === lesson.id ? 'bg-victory-blue/10 border-victory-blue' : ''
                            }`}
                            onClick={() => setCurrentLessonId(lesson.id)}
                          >
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(lesson.date)}
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLesson(lesson.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          Нет созданных занятий
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Attendance table */}
            <div className="md:col-span-9">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {currentLessonId 
                          ? lessons.find(l => l.id === currentLessonId)?.title 
                          : "Журнал посещаемости"
                        }
                      </CardTitle>
                      <CardDescription>
                        {currentLessonId 
                          ? `Дата: ${formatDate(lessons.find(l => l.id === currentLessonId)?.date || '')}`
                          : "Выберите занятие из списка слева"
                        }
                      </CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        disabled={!currentLessonId || students.length === 0}
                        onClick={handleExport}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Экспорт
                      </Button>
                      <Button 
                        disabled={!currentLessonId || students.length === 0}
                        onClick={handleSaveAll}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {students.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Нет обучающихся</h3>
                      <p className="text-muted-foreground mb-6">
                        Добавьте обучающихся в систему, чтобы отмечать их посещаемость
                      </p>
                      <Button 
                        onClick={() => setIsAddStudentOpen(true)}
                        className="mx-auto"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Добавить обучающегося
                      </Button>
                    </div>
                  ) : lessons.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Нет занятий</h3>
                      <p className="text-muted-foreground mb-6">
                        Создайте занятие, чтобы отмечать посещаемость обучающихся
                      </p>
                    </div>
                  ) : !currentLessonId ? (
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Выберите занятие</h3>
                      <p className="text-muted-foreground">
                        Выберите занятие из списка слева, чтобы отметить посещаемость
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>№</TableHead>
                            <TableHead>ФИО обучающегося</TableHead>
                            <TableHead>Группа</TableHead>
                            <TableHead>Посещаемость</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student, index) => (
                            <TableRow key={student.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.group}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant={getAttendanceStatus(student.id) === "present" ? "default" : "outline"}
                                    className={getAttendanceStatus(student.id) === "present" ? "bg-green-600" : ""}
                                    onClick={() => updateAttendance(student.id, "present")}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Присутствует
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={getAttendanceStatus(student.id) === "absent" ? "default" : "outline"}
                                    className={getAttendanceStatus(student.id) === "absent" ? "bg-red-600" : ""}
                                    onClick={() => updateAttendance(student.id, "absent")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Отсутствует
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={getAttendanceStatus(student.id) === "late" ? "default" : "outline"}
                                    className={getAttendanceStatus(student.id) === "late" ? "bg-amber-500" : ""}
                                    onClick={() => updateAttendance(student.id, "late")}
                                  >
                                    <Clock className="h-4 w-4 mr-1" />
                                    Опоздал
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceJournal;
