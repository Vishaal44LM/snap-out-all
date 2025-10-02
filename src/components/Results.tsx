import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResultsProps {
  score: number;
  totalRed: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const Results = ({ score, totalRed, onPlayAgain, onGoHome }: ResultsProps) => {
  const accuracy = totalRed > 0 ? Math.round((score / totalRed) * 100) : 0;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Epic background effects */}
      <span aria-hidden className="pointer-events-none absolute top-10 left-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-purple))] blur-3xl opacity-30 animate-pulse" />
      <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-green))] blur-3xl opacity-25 animate-float" />
      
      <div className="w-full max-w-3xl glass-card-bright p-8 sm:p-12 rounded-3xl glow-pink animate-bounce-in">
        <div className="text-center space-y-8 sm:space-y-10">
          {/* Epic Game Over title */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative inline-block">
              <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-orbitron font-black tracking-widest gradient-cosmic bg-clip-text text-transparent animate-pulse-glow">
                GAME OVER
              </h1>
              <div className="absolute inset-0 blur-3xl gradient-cosmic bg-clip-text text-transparent opacity-40 -z-10">
                GAME OVER
              </div>
            </div>
          </div>

          {/* Score section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="glass-card-bright p-8 sm:p-10 rounded-3xl border-3 border-primary/50 glow-red relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <p className="relative text-sm sm:text-base font-chakra font-bold text-primary mb-3 tracking-widest">FINAL SCORE</p>
              <p className="relative text-7xl sm:text-8xl font-orbitron font-black text-neon-red glow-red drop-shadow-2xl">
                {score}
              </p>
              <p className="relative text-xl sm:text-2xl font-chakra font-medium text-muted-foreground mt-4">
                out of <span className="text-foreground font-bold">{totalRed}</span> red lights
              </p>
            </div>

            {/* Accuracy bar */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border-2 border-accent/50 glow-cyan">
              <p className="text-sm sm:text-base font-chakra font-bold text-accent mb-4 tracking-widest">ACCURACY</p>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className="h-4 sm:h-6 flex-1 bg-muted/30 rounded-full overflow-hidden border-2 border-border/30">
                  <div
                    className="h-full gradient-neon transition-all duration-1000 relative"
                    style={{ width: `${accuracy}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
                <p className="text-4xl sm:text-5xl font-orbitron font-black text-neon-cyan glow-cyan min-w-[90px] sm:min-w-[110px]">
                  {accuracy}%
                </p>
              </div>
            </div>

            {/* Achievements */}
            {accuracy === 100 && (
              <div className="glass-card-bright p-5 sm:p-6 rounded-2xl border-3 border-accent animate-glow-pulse glow-cyan">
                <p className="text-2xl sm:text-3xl font-orbitron font-black gradient-neon bg-clip-text text-transparent animate-pulse-glow">
                  🎯 PERFECT SCORE! 🎯
                </p>
                <p className="text-base sm:text-lg font-chakra text-muted-foreground mt-2">You are a LEGEND!</p>
              </div>
            )}
            
            {accuracy >= 80 && accuracy < 100 && (
              <div className="glass-card p-4 sm:p-5 rounded-2xl border-2 border-secondary/50 glow-purple">
                <p className="text-xl sm:text-2xl font-orbitron font-black text-neon-purple animate-pulse">
                  ⚡ EXCELLENT! ⚡
                </p>
                <p className="text-sm sm:text-base font-chakra text-muted-foreground mt-1">Amazing reflexes!</p>
              </div>
            )}
            
            {accuracy >= 50 && accuracy < 80 && (
              <div className="glass-card p-4 sm:p-5 rounded-2xl border-2 border-primary/50">
                <p className="text-xl sm:text-2xl font-orbitron font-bold text-neon-pink">
                  💪 GOOD JOB!
                </p>
                <p className="text-sm sm:text-base font-chakra text-muted-foreground mt-1">Keep practicing!</p>
              </div>
            )}
            
            {accuracy < 50 && (
              <div className="glass-card p-4 sm:p-5 rounded-2xl border-2 border-border/50">
                <p className="text-xl sm:text-2xl font-orbitron font-bold text-muted-foreground">
                  🎮 NICE TRY!
                </p>
                <p className="text-sm sm:text-base font-chakra text-muted-foreground mt-1">You'll get better!</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button
              onClick={onPlayAgain}
              className="group relative flex-1 h-16 sm:h-18 text-lg sm:text-xl font-orbitron font-black overflow-hidden rounded-2xl border-3 border-primary bg-gradient-to-br from-primary/40 to-primary/20 hover:from-primary/60 hover:to-primary/30 transition-all hover:scale-105 active:scale-95 touch-manipulation glow-red"
            >
              <span className="relative z-10 text-primary-foreground drop-shadow-lg">PLAY AGAIN</span>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={onGoHome}
              className="group relative flex-1 h-16 sm:h-18 text-lg sm:text-xl font-orbitron font-black overflow-hidden rounded-2xl border-3 border-accent bg-gradient-to-br from-accent/40 to-accent/20 hover:from-accent/60 hover:to-accent/30 transition-all hover:scale-105 active:scale-95 touch-manipulation glow-cyan"
            >
              <span className="relative z-10 text-accent-foreground drop-shadow-lg">GO HOME</span>
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
