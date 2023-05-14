import styles from "../css/Contact.module.css";
import { useState } from "react";

type ContactProps = {};

export function Contact<T>({}: ContactProps) {
  interface FormValues {
    name: string;
    email: string;
    message: string;
  }
  const initialFormValues: FormValues = {
    name: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(`handle input`);
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
  };

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

      <form name="contact" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <br />
        </label>
        <input
          id="name"
          type="name"
          name="name"
          defaultValue={formValues.name}
          onChange={handleInputChange}
          size={20}
          placeholder="Enter your name"
          required
          aria-required="true"
        />
        <br />
        <label htmlFor="email">
          Email:
          <br />
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          size={20}
          placeholder="Enter your email"
          required
          aria-required="true"
        />
        <p>
          <br />
          <br />
          Please feel free to let me know what you think of the game! <br />
          Just drop a line in the contact form:
        </p>

        <br />
        <label htmlFor="message">
          Message:
          <br />
        </label>
        <textarea
          id="message"
          name="message"
          value={formValues.message}
          onChange={handleInputChange}
          placeholder="Enter your message here..."
          required
          aria-required="true"
        ></textarea>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
