import styles from "../css/About.module.css";

type AboutProps = {};

export function About<T>({}: AboutProps) {
  return (
    <div className={`${styles.about}`}>
      <h1>About Me:</h1>
      <br />
      <h2>
        Full Stack Dev, former Fine Art Painter, and Brazilian jiu-jitsu
        enthusiast.
      </h2>
      <h2>Lover of Stoicism, code, and coffee.</h2>

      <br />

      <p>
        Hey Everyone!!,
        <br />
        <br />
        Thanks for checking out my Hangman Game. I had a lot of fun working on
        this, and I sure hope to make iterative improvements in the near future.
        While most of my experience has been in Web Development, I’d love to
        continue to make more games like these and others in increasing
        complexity. If you’re interested in more of my projects, they can be
        found
        <a href="https://github.com/jameszenartist" target="_blank">
          here
        </a>
        <br />
        <br />
        Again, thanks for looking! <br />
        <br />
        -James Hansen
      </p>
    </div>
  );
}
