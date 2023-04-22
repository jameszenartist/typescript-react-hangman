import styles from "../css/HangmanDrawing.module.css";

const prop: number = 0;

const HEAD = <div className={`${styles.head}`} key={prop + 1} />;

const BODY = <div className={`${styles.body}`} key={prop + 2} />;
const RIGHT_ARM = <div className={`${styles.right_arm}`} key={prop + 3} />;
const LEFT_ARM = <div className={`${styles.left_arm}`} key={prop + 4} />;
const RIGHT_LEG = <div className={`${styles.right_leg}`} key={prop + 5} />;
const LEFT_LEG = <div className={`${styles.left_leg}`} key={prop + 6} />;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div className={`${styles.wireframe}`}>
      {BODY_PARTS.slice(0, numberOfGuesses)}

      <div className={`${styles.piece_1}`}></div>
      <div className={`${styles.piece_2}`}></div>
      <div className={`${styles.piece_3}`}></div>
      <div className={`${styles.piece_4}`}></div>
    </div>
  );
}
