import styles from "../css/Contact.module.css";
import { Form } from "../components/Form";

type ContactProps = {};

export function Contact<T>({}: ContactProps) {
  return (
    <div className={`${styles.contact}`}>
      <h1>Contact:</h1>
      <br />
      <h2>
        Have a question or just want to say hi? Let’s talk! <br />
        I'll try my best to get back to you as soon as I can. If you want to
        know more, please don't hesitate to ask!
      </h2>
      <br />
      <h1>**Messaging functionality currently in progress**</h1>
      <br />
      <Form />
    </div>
  );
}
