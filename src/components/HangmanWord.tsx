import styles from "../css/HangmanWord.module.css";
import { useEffect } from "react";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
  addGuessedLetter: (letter: string) => void;
};

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
  addGuessedLetter,
}: HangmanWordProps) {
  // this useEffect was causing the input bug
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

  return (
    <div className={`${styles.text}`}>
      {wordToGuess.split("").map((letter, index) => (
        <span key={index} className={`${styles.under_letter}`}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal
                  ? "#ffffff"
                  : "#ffffff",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
