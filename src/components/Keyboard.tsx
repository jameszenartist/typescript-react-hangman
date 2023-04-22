import styles from "../css/Keyboard.module.css";

//list of keys to render for board
// const KEYS = [
//   "a",
//   "b",
//   "c",
//   "d",
//   "e",
//   "f",
//   "g",
//   "h",
//   "i",
//   "j",
//   "k",
//   "l",
//   "m",
//   "n",
//   "o",
//   "p",
//   "q",
//   "r",
//   "s",
//   "t",
//   "u",
//   "v",
//   "w",
//   "x",
//   "y",
//   "z",
// ];

//FUNC TO CREATE KEYS:

function createLetters() {
  const letters = [];

  for (let i = 97; i <= 122; i++) {
    letters.push(String.fromCharCode(i));
  }

  return letters;
}

const KEYS = createLetters();

type KeyBoardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

export function Keyboard({
  activeLetters,
  disabled = false,
  inactiveLetters,
  addGuessedLetter,
}: KeyBoardProps) {
  return (
    <div className={`${styles.keyboard}`}>
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`${styles.btn} ${isActive ? styles.active : ""} ${
              isInactive ? styles.inactive : ""
            }`}
            disabled={isInactive || isActive || disabled}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
