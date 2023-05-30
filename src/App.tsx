import styles from "./css/App.module.css";
import { motion, AnimatePresence } from "framer-motion";
import randomWords from "random-words";
import { Routes, Route } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

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
    setGuessedLetters([]);
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

    // here using randomWords npm pkg. instead of prev API
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
    console.log(`useeffect 3 called!`);
    try {
      const handler = async (e: KeyboardEvent) => {
        const key = e.key;
        if (key !== "Enter") return;
        e.preventDefault();
        setGuessedLetters([]);

        await fetchData();
      };

      document.addEventListener("keypress", handler);

      return () => {
        document.removeEventListener("keypress", handler);
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
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
        {useOverlay && (
          <AnimatePresence>
            <motion.div
              key="sidebar"
              initial={{ opacity: 0, x: "100" }}
              animate={{
                opacity: 1,
                x: "-100",
              }}
              exit={{
                opacity: 0,
                x: "100",
              }}
              className={`${styles.sidebar}`}
            >
              <Sidebar
                useOverlay={useOverlay}
                handleClick={handleClick}
                getNewWord={getNewWord}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className={`${styles.container}`}>
              <div className={`${styles.win_lose}`}>
                {isWinner &&
                  wordToGuess !== "" &&
                  "Winner! - Refresh to try again"}
                {isLoser && "Nice Try! - Refresh to try again"}
              </div>
              <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
              <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
                addGuessedLetter={addGuessedLetter}
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
          }
        />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
