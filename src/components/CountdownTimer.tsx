import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Устанавливаем дату 9 мая следующего года
      const currentYear = new Date().getFullYear();
      const targetDate = new Date(currentYear, 4, 9); // Месяцы в JS начинаются с 0, поэтому 4 = май
      
      // Если 9 мая текущего года уже прошло, устанавливаем на следующий год
      if (targetDate < new Date()) {
        targetDate.setFullYear(currentYear + 1);
      }

      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-r from-victory-blue to-victory-blue/70 text-white">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">До Дня Победы осталось:</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-3xl font-bold">{formatNumber(timeLeft.days)}</div>
            <div className="text-xs mt-1">дней</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-3xl font-bold">{formatNumber(timeLeft.hours)}</div>
            <div className="text-xs mt-1">часов</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-3xl font-bold">{formatNumber(timeLeft.minutes)}</div>
            <div className="text-xs mt-1">минут</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-3xl font-bold">{formatNumber(timeLeft.seconds)}</div>
            <div className="text-xs mt-1">секунд</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">9 мая 2025 года - 80 лет Великой Победы</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
