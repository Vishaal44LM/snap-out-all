import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface GameProps {
  difficulty: Difficulty;
  onGameEnd: (score: number, totalRed: number) => void;
}

interface Light {
  id: number;
  isRed: boolean;
  isActive: boolean;
  flashSuccess: boolean;
}

const difficultySettings = {
  easy: { duration: 900, interval: 1200 },
  medium: { duration: 700, interval: 900 },
  hard: { duration: 500, interval: 700 },
  expert: { duration: 400, interval: 600 },
};

const Game = ({ difficulty, onGameEnd }: GameProps) => {
  const [lights, setLights] = useState<Light[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      isRed: false,
      isActive: false,
      flashSuccess: false,
    }))
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalRedLights, setTotalRedLights] = useState(0);

  const activateRandomLight = useCallback(() => {
    const settings = difficultySettings[difficulty];
    const randomIndex = Math.floor(Math.random() * 10);
    const isRed = difficulty === "expert" ? Math.random() > 0.3 : true;

    setLights((prev) =>
      prev.map((light, idx) =>
        idx === randomIndex
          ? { ...light, isRed, isActive: true, flashSuccess: false }
          : light
      )
    );

    if (isRed) {
      setTotalRedLights((prev) => prev + 1);
    }

    setTimeout(() => {
      setLights((prev) =>
        prev.map((light, idx) =>
          idx === randomIndex ? { ...light, isActive: false } : light
        )
      );
    }, settings.duration);
  }, [difficulty]);

  useEffect(() => {
    const settings = difficultySettings[difficulty];
    const lightInterval = setInterval(activateRandomLight, settings.interval);
    
    return () => clearInterval(lightInterval);
  }, [activateRandomLight, difficulty]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameEnd(score, totalRedLights);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, totalRedLights, onGameEnd]);

  const handleLightClick = (lightId: number) => {
    const light = lights[lightId];
    
    if (light.isActive && light.isRed) {
      setScore((prev) => prev + 1);
      setLights((prev) =>
        prev.map((l) =>
          l.id === lightId ? { ...l, isActive: false, flashSuccess: true } : l
        )
      );
      
      setTimeout(() => {
        setLights((prev) =>
          prev.map((l) => (l.id === lightId ? { ...l, flashSuccess: false } : l))
        );
      }, 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
        <div className="flex justify-between items-center gap-3 sm:gap-4">
          <div className="bg-card/50 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-2 border-accent flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">SCORE</p>
            <p className="text-3xl sm:text-4xl font-bold text-neon-cyan glow-cyan">{score}</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-2 border-primary flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">TIME</p>
            <p className="text-3xl sm:text-4xl font-bold text-neon-red glow-red">{timeLeft}s</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-6 max-w-lg mx-auto sm:max-w-full">
          {lights.map((light) => (
            <button
              key={light.id}
              onClick={() => handleLightClick(light.id)}
              className={`
                aspect-square rounded-lg transition-all duration-200 border-2 touch-manipulation
                min-h-[60px] sm:min-h-[80px]
                ${
                  light.isActive && light.isRed
                    ? "bg-neon-red glow-red scale-110"
                    : light.isActive && !light.isRed
                    ? "bg-secondary/50 border-secondary"
                    : "bg-muted/30 border-border"
                }
                ${light.flashSuccess ? "bg-neon-green glow-green animate-flash-success" : ""}
                active:scale-95
              `}
              disabled={!light.isActive}
            />
          ))}
        </div>

        <div className="text-center px-4">
          <p className="text-base sm:text-lg text-muted-foreground">
            Tap the <span className="text-neon-red font-bold">red lights</span> quickly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
