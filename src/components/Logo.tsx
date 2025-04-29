
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-victory-red rounded-lg transform rotate-45"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          УП
        </div>
      </div>
      <div className="font-bold text-xl">
        <span className="text-victory-red">Уроки</span> 
        <span className="text-victory-blue">Победы</span>
      </div>
    </div>
  );
};

export default Logo;
