import styles from "../css/App.module.css";

type AboutProps = {};

export function About<T>({}: AboutProps) {
  return (
    <div className={`${styles.container}`}>
      <h1>About Page</h1>
    </div>
  );
}
