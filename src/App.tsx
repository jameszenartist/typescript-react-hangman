import styles from "./css/App.module.css";
import randomWords from "random-words";
import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";
import { Sidebar } from "./components/Sidebar";
import { FiRefreshCw } from "react-icons/fi";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [useOverlay, setUseOverlay] = useState<boolean>(false);
  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [newWord, setNewWord] = useState<boolean>(false);

  //typescript array of strings
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

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

  //handles overlay state
  const handleClick = useCallback(() => {
    console.log("overlay status changed");
    setUseOverlay((prev) => !prev);
  }, []);

  //new word btn calls this to trigger fetch
  const getNewWord = useCallback(() => {
    setNewWord((prev) => !prev);
  }, [newWord]);

  //fetch random word from API:
  async function fetchData(): Promise<void> {
    // const response = await fetch(`${BASE_URL}`, {
    //   method: "GET",
    //   headers: {
    //     "X-Api-Key": `${API_KEY}`,
    //   },
    // });
    // const { word } = await response.json();

    // console.log(randomWords({ minLength: 2 }));

    const word: string[] = randomWords(1);
    setWordToGuess(word[0]);
  }

  useEffect(() => {
    console.log(`useeffect called!`);

    try {
      let isMounted = true;

      fetchData();

      return () => {
        isMounted = !isMounted;
      };
    } catch (err) {
      console.log(err);
    }
  }, [newWord]);

  useEffect(() => {
    try {
      console.log(`useeffect 2 called!`);
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
    console.log(`useeffect 3 called!`);
    try {
      const handler = async (e: KeyboardEvent) => {
        const key = e.key;
        if (key !== "Enter") return;
        e.preventDefault();
        setGuessedLetters([]);
        let result: any = await fetchData();
        setWordToGuess(result.toString());
      };

      document.addEventListener("keypress", handler);

      return () => {
        document.removeEventListener("keypress", handler);
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  // console.log(useOverlay);

  return (
    <div className={`${styles.container}`}>
      <div
        className={`${useOverlay && styles.overlay}`}
        onClick={handleClick}
      ></div>
      <FiRefreshCw
        className={`${styles.open_sidebar} ${
          useOverlay ? styles.rotate_icon : ""
        }`}
        onClick={handleClick}
      />
      <Sidebar
        useOverlay={useOverlay}
        handleClick={handleClick}
        getNewWord={getNewWord}
      />

      <div className={`${styles.win_lose}`}>
        {isWinner && wordToGuess !== "" && "Winner! - Refresh to try again"}
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
