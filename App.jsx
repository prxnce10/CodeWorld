import { useState } from "react";
import PythonCourse from "./PythonCourse";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  if (page === "python") {
    return <PythonCourse onBack={() => setPage("home")} />;
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <button
          className="brand"
          onClick={() => setPage("home")}
        >
          <span className="brand-icon">&lt;/&gt;</span>

          <span>
            CODE<span className="brand-light">WORLD</span>
          </span>
        </button>


        <nav>

          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("python")}>
            Courses
          </button>

          <button onClick={() => scrollToSection("projects")}>
            Projects
          </button>

          <button onClick={() => scrollToSection("roadmap")}>
            Roadmap
          </button>

        </nav>


        <button
          className="nav-button"
          onClick={() => setPage("python")}
        >
          Start Coding
          <span>↗</span>
        </button>

      </header>


      {/* ================= HERO ================= */}

      <main>

        <section className="hero">

          <div className="hero-left">

            <div className="status-pill">
              <span></span>
              LEARN • PRACTICE • BUILD
            </div>


            <h1>
              Learn coding.
              <br />
              <span>Build anything.</span>
            </h1>


            <p>
              Learn programming from the basics through
              clear lessons, practical examples and
              projects you can actually build.
            </p>


            <div className="hero-actions">

              <button
                className="main-button"
                onClick={() => setPage("python")}
              >
                Start Learning
                <span>→</span>
              </button>


              <button
                className="text-button"
                onClick={() => scrollToSection("roadmap")}
              >
                Explore roadmap ↓
              </button>

            </div>


            <div className="mini-stats">

              <div>
                <strong>08</strong>
                <span>Python Lessons</span>
              </div>

              <div>
                <strong>05</strong>
                <span>Projects</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Learn by Doing</span>
              </div>

            </div>

          </div>


          {/* ================= CODE EDITOR ================= */}

          <div className="editor">

            <div className="editor-bar">

              <div className="traffic">
                <i></i>
                <i></i>
                <i></i>
              </div>

              <span>
                first_program.py
              </span>

              <div className="editor-live">
                PYTHON
              </div>

            </div>


            <div className="editor-main">

              <div className="numbers">
                1<br />
                2<br />
                3<br />
                4<br />
                5<br />
                6<br />
                7<br />
                8
              </div>


              <pre>
<span className="purple">name</span> ={" "}
<span className="green">"CodeWorld"</span>

<span className="purple">print</span>(
  <span className="green">"Hello, "</span>
  + name
)

<span className="blue">for</span> i{" "}
<span className="blue">in</span> range(
  <span className="orange">5</span>
):
  <span className="purple">print</span>(i)
              </pre>

            </div>


            <div className="editor-terminal">

              <div className="terminal-label">
                OUTPUT
              </div>

              <div>
                <span className="terminal-arrow">
                  &gt;
                </span>{" "}
                Hello, CodeWorld
              </div>

              <div className="success">
                0 1 2 3 4
              </div>

            </div>

          </div>

        </section>


        {/* ================= CLEAN LEARNING DASHBOARD ================= */}

        <section className="learning-bar">

          <div className="learning-heading">

            <span className="small-label">
              YOUR LEARNING
            </span>

            <h3>
              Python Fundamentals
            </h3>

            <p>
              Start your journey from the basics.
            </p>

          </div>


          <div className="learning-progress">

            <div className="progress-info">

              <span>
                0 of 8 lessons
              </span>

              <strong>
                0%
              </strong>

            </div>


            <div className="progress-track">

              <div className="progress-fill"></div>

            </div>


            <div className="level-info">

              <span>
                Beginner
              </span>

              <span>
                Level 1
              </span>

            </div>

          </div>


          <button
            className="learning-button"
            onClick={() => setPage("python")}
          >
            Start Learning
            <span>→</span>
          </button>

        </section>


        {/* ================= ROADMAP ================= */}

        <section
          className="section"
          id="roadmap"
        >

          <div className="section-header">

            <div>

              <span className="section-number">
                01
              </span>

              <span className="section-label">
                LEARNING PATH
              </span>

              <h2>
                Your path to
                <span> coding.</span>
              </h2>

            </div>


            <p>
              Start with the fundamentals and
              gradually move towards real-world
              programming.
            </p>

          </div>


          <div className="path">

            <div className="path-line"></div>


            {/* PYTHON */}

            <button
              className="path-card active"
              onClick={() => setPage("python")}
            >

              <div className="path-number">
                01
              </div>

              <div className="path-icon">
                🐍
              </div>

              <div className="path-info">

                <div className="path-tag">
                  START HERE
                </div>

                <h3>
                  Python Fundamentals
                </h3>

                <p>
                  Learn variables, conditions,
                  loops, functions and more.
                </p>

                <div className="path-meta">
                  8 Lessons · Beginner
                </div>

              </div>

              <div className="path-arrow">
                →
              </div>

            </button>


            {/* JAVASCRIPT */}

            <div className="path-card locked">

              <div className="path-number">
                02
              </div>

              <div className="path-icon">
                JS
              </div>

              <div className="path-info">

                <div className="path-tag">
                  COMING SOON
                </div>

                <h3>
                  JavaScript
                </h3>

                <p>
                  Learn the language behind
                  interactive websites.
                </p>

                <div className="path-meta">
                  Coming soon
                </div>

              </div>

              <div className="lock">
                🔒
              </div>

            </div>


            {/* WEB DEVELOPMENT */}

            <div className="path-card locked">

              <div className="path-number">
                03
              </div>

              <div className="path-icon">
                &lt;/&gt;
              </div>

              <div className="path-info">

                <div className="path-tag">
                  COMING SOON
                </div>

                <h3>
                  Web Development
                </h3>

                <p>
                  Build complete websites and
                  modern web applications.
                </p>

                <div className="path-meta">
                  Coming soon
                </div>

              </div>

              <div className="lock">
                🔒
              </div>

            </div>

          </div>

        </section>


        {/* ================= PROJECTS ================= */}

        <section
          className="section projects-section"
          id="projects"
        >

          <div className="section-header">

            <div>

              <span className="section-number">
                02
              </span>

              <span className="section-label">
                PRACTICE
              </span>

              <h2>
                Learn by
                <span> building.</span>
              </h2>

            </div>


            <p>
              Practice what you learn by
              creating simple projects.
            </p>

          </div>


          <div className="projects">

            <div className="project-card">

              <div className="project-top">
                <span>PYTHON</span>
                <span>01</span>
              </div>

              <div className="project-symbol">
                #
              </div>

              <h3>
                Number Guessing Game
              </h3>

              <p>
                Build your first interactive
                Python game.
              </p>

              <button onClick={() => setPage("python")}>
                Learn →
              </button>

            </div>


            <div className="project-card">

              <div className="project-top">
                <span>PYTHON</span>
                <span>02</span>
              </div>

              <div className="project-symbol">
                []
              </div>

              <h3>
                To-Do List
              </h3>

              <p>
                Practice lists, loops and
                functions with a useful project.
              </p>

              <button onClick={() => setPage("python")}>
                Learn →
              </button>

            </div>


            <div className="project-card">

              <div className="project-top">
                <span>PYTHON</span>
                <span>03</span>
              </div>

              <div className="project-symbol">
                &gt;_
              </div>

              <h3>
                Mini Calculator
              </h3>

              <p>
                Create a calculator while
                learning Python basics.
              </p>

              <button onClick={() => setPage("python")}>
                Learn →
              </button>

            </div>

          </div>

        </section>


        {/* ================= METHOD ================= */}

        <section className="why">

          <div className="why-inner">

            <div className="why-title">

              <span className="section-label">
                THE CODEWORLD METHOD
              </span>

              <h2>
                Understand.
                <br />
                <span>Practice. Build.</span>
              </h2>

            </div>


            <div className="why-grid">

              <div>

                <span>01</span>

                <h3>
                  Understand
                </h3>

                <p>
                  Learn concepts with simple
                  explanations and examples.
                </p>

              </div>


              <div>

                <span>02</span>

                <h3>
                  Practice
                </h3>

                <p>
                  Solve coding challenges and
                  improve your problem-solving.
                </p>

              </div>


              <div>

                <span>03</span>

                <h3>
                  Build
                </h3>

                <p>
                  Turn your knowledge into
                  projects you can actually use.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= FINAL CTA ================= */}

        <section className="final-cta">

          <div className="cta-glow"></div>

          <span>
            READY TO BEGIN?
          </span>

          <h2>
            Start your coding
            <br />
            journey today.
          </h2>

          <button
            className="main-button"
            onClick={() => setPage("python")}
          >
            Start Learning →
          </button>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-brand">

          <span className="brand-icon">
            &lt;/&gt;
          </span>

          CODEWORLD

        </div>

        <p>
          Learn. Build. Create.
        </p>

        <div className="footer-right">
          © 2026 CodeWorld
        </div>

      </footer>

    </div>
  );
}

export default App;