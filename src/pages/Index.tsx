import { useState, useCallback } from "react";
import Home from "@/components/Home";
import Game from "@/components/Game";
import Results from "@/components/Results";

type Screen = "home" | "game" | "results";
type Difficulty = "easy" | "medium" | "hard" | "expert";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [score, setScore] = useState(0);
  const [totalRed, setTotalRed] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  const handleStartGame = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameKey(prev => prev + 1);
    setScreen("game");
  }, []);

  const handleGameEnd = useCallback((finalScore: number, finalTotalRed: number) => {
    setScore(finalScore);
    setTotalRed(finalTotalRed);
    setScreen("results");
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameKey(prev => prev + 1);
    setScreen("game");
  }, []);

  const handleGoHome = useCallback(() => {
    setScreen("home");
  }, []);

  return (
    <>
      {screen === "home" && <Home onStartGame={handleStartGame} />}
      {screen === "game" && (
        <Game key={gameKey} difficulty={difficulty} onGameEnd={handleGameEnd} onBack={handleGoHome} />
      )}
      {screen === "results" && (
        <Results
          score={score}
          totalRed={totalRed}
          onPlayAgain={handlePlayAgain}
          onGoHome={handleGoHome}
        />
      )}
    </>
  );
};

export default Index;
