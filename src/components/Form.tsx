import styles from "../css/Contact.module.css";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export function Form() {
  interface FormValues {
    from_name: string;
    user_email: string;
    message: string;
  }
  const initialFormValues: FormValues = {
    from_name: "",
    user_email: "",
    message: "",
  };
<<<<<<< HEAD
=======

>>>>>>> testuibranch
  const form = useRef<HTMLFormElement | null>(null);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    //Emailsjs function:
    emailjs
      .sendForm(
        "VITE_SERVICE_ID",
        "VITE_TEMPLATE_ID",
        form.current!,
        "VITE_PUBLIC_KEY"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setFormValues({
<<<<<<< HEAD
      name: "",
      email: "",
=======
      from_name: "",
      user_email: "",
>>>>>>> testuibranch
      message: "",
    });
  };

  return (
    <>
<<<<<<< HEAD
      <form ref={form} method="POST" onSubmit={handleSubmit}>
        <label htmlFor="name">
=======
      <form ref={form} onSubmit={handleSubmit}>
        <label htmlFor="from_name">
>>>>>>> testuibranch
          Name:
          <br />
        </label>
        <input
          type="text"
          name="from_name"
<<<<<<< HEAD
          value={formValues.name}
=======
          value={formValues.from_name}
>>>>>>> testuibranch
          onChange={handleInputChange}
          size={20}
          placeholder="Enter your name"
          required
          aria-required="true"
        />
        <br />
        <label htmlFor="user_email">
          Email:
          <br />
        </label>
        <input
          type="email"
          name="user_email"
<<<<<<< HEAD
          value={formValues.email}
=======
          value={formValues.user_email}
>>>>>>> testuibranch
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
    </>
  );
}
