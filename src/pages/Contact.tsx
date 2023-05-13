import styles from "../css/Contact.module.css";

type ContactProps = {};

export function Contact<T>({}: ContactProps) {
  return (
    <div className={`${styles.contact}`}>
      <h1>Contact Page</h1>
    </div>
  );
}
