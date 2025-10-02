import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface GameProps {
  difficulty: Difficulty;
  onGameEnd: (score: number, totalRed: number) => void;
  onBack: () => void;
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

const Game = ({ difficulty, onGameEnd, onBack }: GameProps) => {
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
  const endedRef = useRef(false);
  const timerIntervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const activateRandomLight = useCallback(() => {
    if (endedRef.current) return;
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
    console.log("Light interval started with", settings);
    return () => clearInterval(lightInterval);
  }, [activateRandomLight, difficulty]);

useEffect(() => {
  // initialize timer on mount
  endedRef.current = false;
  setTimeLeft(30);
  const end = Date.now() + 30_000;
  endTimeRef.current = end;
  timerIntervalRef.current = window.setInterval(() => {
    const remaining = Math.max(0, Math.ceil((end - Date.now()) / 1000));
    setTimeLeft(remaining);
  }, 250);
  return () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };
}, []);

useEffect(() => {
  if (!endedRef.current && timeLeft <= 0) {
    endedRef.current = true;
    onGameEnd(score, totalRedLights);
  }
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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background effects */}
      <span aria-hidden className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-[hsl(var(--neon-red))] to-[hsl(var(--neon-pink))] blur-3xl opacity-20 animate-pulse" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] blur-3xl opacity-20" />
      
      <div className="w-full max-w-4xl space-y-6 sm:space-y-8 animate-bounce-in">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            aria-label="Go back"
            onClick={onBack}
            className="glass-card px-4 sm:px-5 py-2 sm:py-3 rounded-xl border-2 border-border hover:border-accent text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 font-orbitron font-bold flex items-center gap-2 glow-cyan"
          >
            <ArrowLeft className="h-5 w-5" /> BACK
          </button>
          <div className="flex-1" />
        </div>

        {/* Stats display */}
        <div className="flex justify-between items-center gap-4 sm:gap-6">
          <div className="glass-card-bright px-6 sm:px-8 py-4 sm:py-6 rounded-2xl border-2 border-accent/50 flex-1 glow-cyan">
            <p className="text-xs sm:text-sm font-chakra font-bold text-accent mb-2 tracking-widest">SCORE</p>
            <p className="text-4xl sm:text-5xl font-orbitron font-black text-neon-cyan glow-cyan">{score}</p>
          </div>
          
          <div className="glass-card-bright px-6 sm:px-8 py-4 sm:py-6 rounded-2xl border-2 border-primary/50 flex-1 glow-red">
            <p className="text-xs sm:text-sm font-chakra font-bold text-primary mb-2 tracking-widest">TIME</p>
            <p className="text-4xl sm:text-5xl font-orbitron font-black text-neon-red glow-red">{timeLeft}s</p>
          </div>
        </div>

        {/* Game grid */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-border/50">
          <div className="grid grid-cols-5 gap-3 sm:gap-4 md:gap-6 max-w-lg mx-auto sm:max-w-full">
            {lights.map((light) => (
              <button
                key={light.id}
                onClick={() => handleLightClick(light.id)}
                className={`
                  aspect-square rounded-2xl transition-all duration-200 border-3 touch-manipulation
                  min-h-[60px] sm:min-h-[80px]
                  ${
                    light.isActive && light.isRed
                      ? "bg-neon-red glow-red scale-110 border-neon-red shadow-2xl"
                      : light.isActive && !light.isRed
                      ? "bg-secondary/60 border-secondary glow-purple scale-105"
                      : "bg-muted/20 border-border/30 hover:border-border/50"
                  }
                  ${light.flashSuccess ? "bg-neon-green glow-green animate-flash-success border-neon-green" : ""}
                  active:scale-95
                `}
                disabled={!light.isActive}
              />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center px-4 pb-safe">
          <p className="text-lg sm:text-xl font-chakra font-bold text-foreground">
            Destroy the <span className="text-neon-red glow-red px-2 py-1 bg-neon-red/20 rounded font-black">RED LIGHTS</span> fast!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
