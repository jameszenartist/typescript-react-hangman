import styles from "../css/App.module.css";
import { Link } from "react-router-dom";

type SidebarProps = {
  useOverlay: boolean;
  handleClick: () => void;
  getNewWord: () => void;
};

export function Sidebar<T>({
  useOverlay,
  handleClick,
  getNewWord,
}: SidebarProps) {
  return (
    <div
      className={`${styles.sidebar} ${useOverlay ? styles.sidebar_open : ""}`}
    >
      <button className={`${styles.sidebar_close}`} onClick={handleClick}>
        &times;
      </button>
      <div className={`${styles.btn_group}`}>
        <button className={`${styles.refresh}`} onClick={getNewWord}>
          New Word?
        </button>
        <Link to="/">
          <button className={`${styles.home}`} type="button">
            -Home
          </button>
        </Link>
        <Link to="about">
          <button className={`${styles.about}`} type="button">
            -About
          </button>
        </Link>
        <Link to="contact">
          <button className={`${styles.contact}`} type="button">
            -Contact
          </button>
        </Link>
      </div>
    </div>
  );
}
