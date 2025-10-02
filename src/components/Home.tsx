import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface HomeProps {
  onStartGame: (difficulty: Difficulty) => void;
}

const Home = ({ onStartGame }: HomeProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Animated gradient orbs */}
      <span aria-hidden className="pointer-events-none absolute top-20 left-10 h-96 w-96 rounded-full bg-gradient-to-br from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-purple))] blur-3xl opacity-30 animate-float" />
      <span aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-green))] blur-3xl opacity-25 animate-pulse" />
      <span aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-[hsl(var(--neon-red))] to-[hsl(var(--neon-purple))] blur-3xl opacity-20" />
      
      <div className="w-full max-w-2xl glass-card-bright p-8 sm:p-12 rounded-3xl glow-pink animate-bounce-in">
        <div className="text-center space-y-8 sm:space-y-10">
          {/* Epic title */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative inline-block">
              <h1 className="relative text-5xl sm:text-6xl md:text-8xl font-orbitron font-black tracking-wider bg-clip-text text-transparent gradient-cosmic animate-pulse-glow drop-shadow-2xl">
                LIGHTS OUT
              </h1>
              <div className="absolute inset-0 blur-2xl bg-clip-text text-transparent gradient-cosmic opacity-50 -z-10">
                LIGHTS OUT
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-neon-cyan to-transparent rounded-full" />
              <p className="text-2xl sm:text-3xl font-chakra font-bold text-neon-cyan glow-cyan tracking-widest">
                REACTION CHALLENGE
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-neon-cyan to-transparent rounded-full" />
            </div>
          </div>

          {/* Instructions card */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border-2 border-accent/50 glow-cyan animate-slide-up">
            <p className="text-foreground text-lg sm:text-xl leading-relaxed font-chakra font-medium">
              Destroy all <span className="text-neon-red font-black glow-red px-2 py-1 bg-neon-red/20 rounded">RED LIGHTS</span> in{" "}
              <span className="text-neon-cyan font-black glow-cyan px-2 py-1 bg-neon-cyan/20 rounded">30 SECONDS</span>
              <br className="my-2" />
              <span className="text-base sm:text-lg text-muted-foreground">Avoid the decoys & prove your reflexes!</span>
            </p>
          </div>

          {/* Difficulty selector */}
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-orbitron font-bold tracking-widest text-foreground uppercase">
              Choose Your <span className="gradient-neon bg-clip-text text-transparent">Challenge</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <button
                onClick={() => onStartGame("easy")}
                className="group relative h-20 sm:h-24 text-lg sm:text-xl font-orbitron font-black overflow-hidden rounded-2xl border-3 border-accent bg-gradient-to-br from-accent/30 to-accent/10 hover:from-accent/50 hover:to-accent/20 transition-all hover:scale-105 active:scale-95 touch-manipulation glow-cyan"
              >
                <span className="relative z-10 text-accent-foreground drop-shadow-lg">EASY</span>
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => onStartGame("medium")}
                className="group relative h-20 sm:h-24 text-lg sm:text-xl font-orbitron font-black overflow-hidden rounded-2xl border-3 border-secondary bg-gradient-to-br from-secondary/30 to-secondary/10 hover:from-secondary/50 hover:to-secondary/20 transition-all hover:scale-105 active:scale-95 touch-manipulation glow-purple"
              >
                <span className="relative z-10 text-secondary-foreground drop-shadow-lg">MEDIUM</span>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => onStartGame("hard")}
                className="group relative h-20 sm:h-24 text-lg sm:text-xl font-orbitron font-black overflow-hidden rounded-2xl border-3 border-primary bg-gradient-to-br from-primary/30 to-primary/10 hover:from-primary/50 hover:to-primary/20 transition-all hover:scale-105 active:scale-95 touch-manipulation glow-red"
              >
                <span className="relative z-10 text-primary-foreground drop-shadow-lg">HARD</span>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => onStartGame("expert")}
                className="group relative h-20 sm:h-24 text-lg sm:text-xl font-orbitron font-black overflow-hidden rounded-2xl border-3 border-destructive bg-gradient-to-br from-destructive/30 to-destructive/10 hover:from-destructive/50 hover:to-destructive/20 transition-all hover:scale-105 active:scale-95 touch-manipulation glow-pink animate-glow-pulse"
              >
                <span className="relative z-10 text-destructive-foreground drop-shadow-lg">EXPERT</span>
                <div className="absolute inset-0 bg-gradient-to-t from-destructive/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            <div className="text-sm sm:text-base text-muted-foreground font-chakra flex items-center justify-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              <p>Easy: Steady pace</p>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <p>Expert: Lightning fast + decoys</p>
              <span className="h-1 w-1 rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
