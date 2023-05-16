import styles from "../css/Contact.module.css";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export function Form() {
  let VITE_SERVICE_ID: string = import.meta.env.VITE_SERVICE_ID;
  let VITE_TEMPLATE_ID: string = import.meta.env.VITE_TEMPLATE_ID;
  let VITE_PUBLIC_KEY: string = import.meta.env.VITE_PUBLIC_KEY;

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
  const form = useRef<HTMLFormElement | null>(null);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [alertType, setAlertType] = useState<string | null>(null);

  function BasicAlerts() {
    return (
      <Stack sx={{ width: "50%" }} spacing={2}>
        {alertType === "error" && (
          <Alert
            className={styles.alert}
            variant="outlined"
            severity="error"
            onClose={() => setAlertType(null)}
          >
            Oops! Something went wrong!
          </Alert>
        )}
        {alertType === "success" && (
          <Alert
            className={styles.alert}
            variant="outlined"
            severity="success"
            onClose={() => setAlertType(null)}
          >
            Message sent!
          </Alert>
        )}
      </Stack>
    );
  }

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
        VITE_SERVICE_ID,
        VITE_TEMPLATE_ID,
        form.current!,
        VITE_PUBLIC_KEY
      )
      .then((result) => {
        console.log(result.text);
        setAlertType("success");
        setTimeout(() => {
          setAlertType(null);
        }, 4000);
      })
      .catch((error) => {
        console.log(error.text);
        setAlertType("error");
        setTimeout(() => {
          setAlertType(null);
        }, 4000);
      });
    setFormValues({
      from_name: "",
      user_email: "",
      message: "",
    });
  };

  return (
    <>
      <form ref={form} onSubmit={handleSubmit}>
        <BasicAlerts />
        <br />
        <label htmlFor="from_name">
          Name:
          <br />
        </label>
        <input
          type="text"
          name="from_name"
          value={formValues.from_name}
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
          value={formValues.user_email}
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
