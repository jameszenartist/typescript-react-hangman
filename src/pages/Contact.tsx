import styles from "../css/App.module.css";

type ContactProps = {};

export function Contact<T>({}: ContactProps) {
  return (
    <div className={`${styles.container}`}>
      <h1>Contact Page</h1>
    </div>
  );
}
