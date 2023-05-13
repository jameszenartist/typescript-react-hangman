// import styles from "../css/App.module.css";
import { Sidebar } from "../components/Sidebar";

type ContactPageProps = {
  useOverlay: boolean;
  handleClick: () => void;
  getNewWord: () => void;
};

export function Contact() {
  return (
    <div>
      {/* <Sidebar
        useOverlay={useOverlay}
        handleClick={handleClick}
        getNewWord={getNewWord}
      /> */}
      <h1>Contact Page</h1>
    </div>
  );
}
