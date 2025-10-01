import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface HomeProps {
  onStartGame: (difficulty: Difficulty) => void;
}

const Home = ({ onStartGame }: HomeProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-cyan))] blur-3xl opacity-30" />
      <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-[hsl(var(--neon-red))] to-[hsl(var(--neon-green))] blur-3xl opacity-20" />
      <Card className="w-full max-w-2xl p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-neon-red glow-red animate-pulse-glow">
              LIGHTS OUT
            </h1>
            <p className="text-xl sm:text-2xl text-neon-cyan glow-cyan">
              Reaction Challenge
            </p>
          </div>

          <div className="bg-muted/50 p-4 sm:p-6 rounded-lg border border-border">
            <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
              Tap all <span className="text-neon-red font-bold">red lights</span> as fast as possible within{" "}
              <span className="text-neon-cyan font-bold">30 seconds</span>.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Avoid tapping non-red lights!
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl text-muted-foreground">Select Difficulty</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button
                onClick={() => onStartGame("easy")}
                className="h-16 sm:h-20 text-base sm:text-lg font-bold bg-accent/20 hover:bg-accent/40 active:bg-accent/50 border-2 border-accent text-accent-foreground hover:glow-cyan transition-all touch-manipulation"
              >
                EASY
              </Button>
              <Button
                onClick={() => onStartGame("medium")}
                className="h-16 sm:h-20 text-base sm:text-lg font-bold bg-secondary/20 hover:bg-secondary/40 active:bg-secondary/50 border-2 border-secondary text-secondary-foreground hover:glow-cyan transition-all touch-manipulation"
              >
                MEDIUM
              </Button>
              <Button
                onClick={() => onStartGame("hard")}
                className="h-16 sm:h-20 text-base sm:text-lg font-bold bg-primary/20 hover:bg-primary/40 active:bg-primary/50 border-2 border-primary text-primary-foreground hover:glow-red transition-all touch-manipulation"
              >
                HARD
              </Button>
              <Button
                onClick={() => onStartGame("expert")}
                className="h-16 sm:h-20 text-base sm:text-lg font-bold bg-destructive/20 hover:bg-destructive/40 active:bg-destructive/50 border-2 border-destructive text-destructive-foreground hover:glow-red transition-all touch-manipulation"
              >
                EXPERT
              </Button>
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">
              <p>• Easy: longer red glow • Expert: faster with decoys</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
