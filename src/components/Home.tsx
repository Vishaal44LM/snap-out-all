import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface HomeProps {
  onStartGame: (difficulty: Difficulty) => void;
}

const Home = ({ onStartGame }: HomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-neon-red glow-red animate-pulse-glow">
              LIGHTS OUT
            </h1>
            <p className="text-2xl text-neon-cyan glow-cyan">
              Reaction Challenge
            </p>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg border border-border">
            <p className="text-foreground/80 text-lg leading-relaxed">
              Tap all <span className="text-neon-red font-bold">red lights</span> as fast as possible within{" "}
              <span className="text-neon-cyan font-bold">30 seconds</span>.
              <br />
              Avoid tapping non-red lights!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl text-muted-foreground">Select Difficulty</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => onStartGame("easy")}
                className="h-20 text-lg font-bold bg-accent/20 hover:bg-accent/40 border-2 border-accent text-accent-foreground hover:glow-cyan transition-all"
              >
                EASY
              </Button>
              <Button
                onClick={() => onStartGame("medium")}
                className="h-20 text-lg font-bold bg-secondary/20 hover:bg-secondary/40 border-2 border-secondary text-secondary-foreground hover:glow-cyan transition-all"
              >
                MEDIUM
              </Button>
              <Button
                onClick={() => onStartGame("hard")}
                className="h-20 text-lg font-bold bg-primary/20 hover:bg-primary/40 border-2 border-primary text-primary-foreground hover:glow-red transition-all"
              >
                HARD
              </Button>
              <Button
                onClick={() => onStartGame("expert")}
                className="h-20 text-lg font-bold bg-destructive/20 hover:bg-destructive/40 border-2 border-destructive text-destructive-foreground hover:glow-red transition-all"
              >
                EXPERT
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
