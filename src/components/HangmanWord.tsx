import styles from "../css/HangmanWord.module.css";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
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
                  ? "#f00e2e"
                  : "#f00e2e",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
