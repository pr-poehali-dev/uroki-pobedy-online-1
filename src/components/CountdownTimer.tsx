import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Определяем ближайшее 9 мая
      const currentYear = new Date().getFullYear();
      const victoryDay = new Date(currentYear, 4, 9); // Месяцы в JavaScript начинаются с 0 (январь = 0, май = 4)
      
      // Если 9 мая текущего года уже прошло, берём 9 мая следующего года
      if (victoryDay.getTime() < Date.now()) {
        victoryDay.setFullYear(currentYear + 1);
      }
      
      const difference = victoryDay.getTime() - Date.now();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-victory-blue text-white border-none shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4 text-center">До Дня Победы осталось:</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col">
            <div className="text-2xl md:text-3xl font-bold">{timeLeft.days}</div>
            <div className="text-xs md:text-sm text-white/80">дней</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs md:text-sm text-white/80">часов</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs md:text-sm text-white/80">минут</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs md:text-sm text-white/80">секунд</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
