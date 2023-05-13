// import styles from "../css/App.module.css";
import { Sidebar } from "../components/Sidebar";

type AboutPageProps = {
  useOverlay: boolean;
  handleClick: () => void;
  getNewWord: () => void;
};

export function About() {
  return (
    <div>
      {/* <Sidebar
        useOverlay={useOverlay}
        handleClick={handleClick}
        getNewWord={getNewWord}
      /> */}
      <h1>About Page</h1>
    </div>
  );
}
