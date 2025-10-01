import { useState } from "react";
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

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScreen("game");
  };

  const handleGameEnd = (finalScore: number, finalTotalRed: number) => {
    setScore(finalScore);
    setTotalRed(finalTotalRed);
    setScreen("results");
  };

  const handlePlayAgain = () => {
    setScreen("game");
  };

  const handleGoHome = () => {
    setScreen("home");
  };

  return (
    <>
      {screen === "home" && <Home onStartGame={handleStartGame} />}
      {screen === "game" && (
        <Game difficulty={difficulty} onGameEnd={handleGameEnd} />
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
