import styles from "./css/App.module.css";

import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>("");

  //typescript array of strings
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  console.log(wordToGuess);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  //fetch random word from API:
  async function fetchData() {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "X-Api-Key": `${API_KEY}`,
      },
    });
    const { word } = await response.json();
    setWordToGuess(word);
  }

  useEffect(() => {
    try {
      let isMounted = true;

      fetchData();
      console.log(wordToGuess);
      return () => {
        isMounted = !isMounted;
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      console.log(`useeffect called!`);
      const handler = (e: KeyboardEvent) => {
        const key = e.key;
        if (!key.match(/^[a-zA-Z]$/)) return;
        e.preventDefault();
        addGuessedLetter(key);
      };

      document.addEventListener("keypress", handler);

      return () => {
        document.removeEventListener("keypress", handler);
      };
    } catch (err) {
      console.log(err);
    }
  }, [guessedLetters]);

  useEffect(() => {
    let isMounted = true;
    console.log(`useeffect2 called!`);
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);
      let result = fetchData();
      setWordToGuess(result.toString());
      return () => {
        isMounted = !isMounted;
      };
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.win_lose}`}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try! - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div className={`${styles.keyboard_stretch}`}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
