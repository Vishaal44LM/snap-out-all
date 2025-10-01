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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-neon-cyan glow-cyan">
              GAME OVER
            </h1>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/50 p-8 rounded-lg border-2 border-primary">
              <p className="text-sm text-muted-foreground mb-2">FINAL SCORE</p>
              <p className="text-6xl font-bold text-neon-red glow-red">
                {score}
              </p>
              <p className="text-lg text-muted-foreground mt-2">
                out of {totalRed} red lights
              </p>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">ACCURACY</p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-4 flex-1 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-red to-neon-green transition-all duration-1000"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
                <p className="text-3xl font-bold text-neon-cyan glow-cyan">
                  {accuracy}%
                </p>
              </div>
            </div>

            {accuracy === 100 && (
              <div className="bg-accent/20 p-4 rounded-lg border-2 border-accent">
                <p className="text-xl font-bold text-neon-cyan animate-pulse-glow">
                  🎯 PERFECT SCORE! 🎯
                </p>
              </div>
            )}
            
            {accuracy >= 80 && accuracy < 100 && (
              <div className="bg-secondary/20 p-4 rounded-lg border-2 border-secondary">
                <p className="text-xl font-bold text-neon-green">
                  ⚡ EXCELLENT! ⚡
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onPlayAgain}
              className="flex-1 h-14 text-lg font-bold bg-primary/20 hover:bg-primary/40 border-2 border-primary text-primary-foreground hover:glow-red transition-all"
            >
              PLAY AGAIN
            </Button>
            <Button
              onClick={onGoHome}
              className="flex-1 h-14 text-lg font-bold bg-accent/20 hover:bg-accent/40 border-2 border-accent text-accent-foreground hover:glow-cyan transition-all"
            >
              GO HOME
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Results;
