import styles from "../css/App.module.css";

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
        <button className={`${styles.about}`}>-About</button>
        <button className={`${styles.contact}`}>-Contact</button>
      </div>
    </div>
  );
}
