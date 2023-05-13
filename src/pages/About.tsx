import styles from "../css/About.module.css";

type AboutProps = {};

export function About<T>({}: AboutProps) {
  return (
    <div className={`${styles.about}`}>
      <h1>About Page</h1>
    </div>
  );
}
