import { useEffect, useState } from "react";
import "./PythonCourse.css";

function PythonCourse({ onBack }) {
  // =====================================================
  // LESSON DATA
  // =====================================================

  const lessons = [
    { id: 1, title: "What is Python?" },
    { id: 2, title: "Variables" },
    { id: 3, title: "Input & Output" },
    { id: 4, title: "Conditions" },
    { id: 5, title: "Loops" },
    { id: 6, title: "Functions" },
    { id: 7, title: "Lists" },
    { id: 8, title: "Mini Project" },
  ];

  // =====================================================
  // STARTER CODE
  // =====================================================

  const starterCode = {
    1: `name = "CodeWorld"
print("Hello", name)`,

    2: `name = "Prince"
age = 16

print(name)
print(age)`,

    3: `name = input("What is your name? ")
print("Hello", name)`,

    4: `age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are under 18")`,

    5: `for i in range(5):
    print(i)`,

    6: `def greet(name):
    return "Hello " + name

message = greet("Prince")
print(message)`,

    7: `languages = [
    "Python",
    "JavaScript",
    "C++"
]

print(languages)`,

    8: `name = input("Enter your name: ")

print("Welcome to CodeWorld,", name)

score = 0

print("Your starting score is:", score)`,
  };

  // =====================================================
  // PROGRESS STATE
  // =====================================================

  const [currentLesson, setCurrentLesson] = useState(1);

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "codeworld_completed_lessons"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [xp, setXp] = useState(() => {
    try {
      const saved = localStorage.getItem("codeworld_xp");

      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // =====================================================
  // EDITOR STATE
  // =====================================================

  const [code, setCode] = useState("");
  const [output, setOutput] = useState(
    "Run your code to see the output..."
  );

  const [pyodide, setPyodide] = useState(null);

  const [loading, setLoading] = useState(true);

  const [running, setRunning] = useState(false);

  const [challengePassed, setChallengePassed] =
    useState(false);

  // =====================================================
  // SAVE XP
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "codeworld_xp",
      String(xp)
    );
  }, [xp]);

  // =====================================================
  // SAVE LESSON PROGRESS
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "codeworld_completed_lessons",
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  // =====================================================
  // LOAD LESSON CODE
  // =====================================================

  useEffect(() => {
    setCode(
      starterCode[currentLesson] || ""
    );

    setOutput(
      "Run your code to see the output..."
    );

    setChallengePassed(
      completedLessons.includes(currentLesson)
    );
  }, [currentLesson, completedLessons]);

  // =====================================================
  // LOAD PYODIDE
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadPython = async () => {
      try {
        if (window.loadPyodide) {
          const python = await window.loadPyodide({
            indexURL:
              "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
          });

          if (mounted) {
            setPyodide(python);
            setLoading(false);
          }

          return;
        }

        const script = document.createElement("script");

        script.src =
          "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";

        script.onload = async () => {
          try {
            const python = await window.loadPyodide({
              indexURL:
                "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
            });

            if (mounted) {
              setPyodide(python);
              setLoading(false);
            }
          } catch (error) {
            console.error(error);

            if (mounted) {
              setOutput(
                "Could not start Python. Please refresh the page."
              );

              setLoading(false);
            }
          }
        };

        script.onerror = () => {
          if (mounted) {
            setOutput(
              "Could not load Python. Check your internet connection."
            );

            setLoading(false);
          }
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error(error);

        if (mounted) {
          setOutput("Failed to start Python.");
          setLoading(false);
        }
      }
    };

    loadPython();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // RUN PYTHON
  // =====================================================

  const runCode = async () => {
    if (!pyodide) {
      setOutput("Python is still loading...");
      return;
    }

    setRunning(true);
    setOutput("");

    let programOutput = "";

    try {
      pyodide.setStdout({
        batched: (text) => {
          programOutput += text;
        },
      });

      pyodide.setStderr({
        batched: (text) => {
          programOutput += text;
        },
      });

      await pyodide.runPythonAsync(code);

      if (programOutput.trim() === "") {
        setOutput(
          "Program finished with no output."
        );
      } else {
        setOutput(programOutput);
      }

      checkChallenge(
        code,
        programOutput
      );
    } catch (error) {
      setOutput(`Error:\n${error.message}`);
    } finally {
      setRunning(false);
    }
  };

  // =====================================================
  // CHALLENGE CHECK
  // =====================================================

  const checkChallenge = (
    userCode,
    programOutput
  ) => {
    let passed = false;

    if (currentLesson === 1) {
      if (
        userCode.includes("print") &&
        programOutput
          .toLowerCase()
          .includes("hello")
      ) {
        passed = true;
      }
    }

    if (currentLesson === 2) {
      if (
        userCode.includes("=") &&
        userCode.includes("print")
      ) {
        passed = true;
      }
    }

    if (currentLesson === 3) {
      if (
        userCode.includes("input") &&
        userCode.includes("print")
      ) {
        passed = true;
      }
    }

    if (currentLesson === 4) {
      if (
        userCode.includes("if") &&
        userCode.includes("else")
      ) {
        passed = true;
      }
    }

    if (currentLesson === 5) {
      if (
        userCode.includes("for") &&
        userCode.includes("range")
      ) {
        passed = true;
      }
    }

    if (currentLesson === 6) {
      if (
        userCode.includes("def") &&
        userCode.includes("return")
      ) {
        passed = true;
      }
    }

    if (currentLesson === 7) {
      if (
        userCode.includes("[") &&
        userCode.includes("]")
      ) {
        passed = true;
      }
    }

    if (currentLesson === 8) {
      if (
        userCode.includes("input") &&
        userCode.includes("print") &&
        userCode.includes("score")
      ) {
        passed = true;
      }
    }

    setChallengePassed(passed);

    if (
      passed &&
      !completedLessons.includes(currentLesson)
    ) {
      setCompletedLessons((previous) => [
        ...previous,
        currentLesson,
      ]);

      setXp((previous) => previous + 100);
    }
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const nextLesson = () => {
    if (currentLesson < lessons.length) {
      setCurrentLesson(currentLesson + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousLesson = () => {
    if (currentLesson > 1) {
      setCurrentLesson(currentLesson - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // =====================================================
  // LESSON HEADER
  // =====================================================

  const LessonHeader = ({
    number,
    title,
    intro,
  }) => (
    <>
      <div className="lesson-label">
        LESSON {number}
      </div>

      <h1>{title}</h1>

      <p className="intro">
        {intro}
      </p>
    </>
  );

  // =====================================================
  // CONCEPT CARD
  // =====================================================

  const Concept = ({
    icon,
    title,
    text,
  }) => (
    <div className="concept-card">
      <div className="concept-icon">
        {icon}
      </div>

      <div>
        <h2>{title}</h2>

        <p>{text}</p>
      </div>
    </div>
  );

  // =====================================================
  // CODE EXAMPLE
  // =====================================================

  const Example = ({ children }) => (
    <div className="example-box">
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );

  // =====================================================
  // CODE EDITOR
  // =====================================================

  const CodeEditor = () => (
    <div className="editor">

      <div className="editor-header">

        <div className="editor-file">
          🐍 lesson{currentLesson}.py
        </div>

        <button
          className="run-button"
          onClick={runCode}
          disabled={loading || running}
        >
          {loading
            ? "Loading Python..."
            : running
            ? "Running..."
            : "▶ Run Code"}
        </button>

      </div>

      <textarea
        value={code}
        onChange={(event) =>
          setCode(event.target.value)
        }
        spellCheck="false"
        className="code-editor"
      />

      <div className="output">

        <div className="output-title">
          OUTPUT
        </div>

        <pre className="output-content">
          {output}
        </pre>

      </div>

    </div>
  );

  // =====================================================
  // CHALLENGE
  // =====================================================

  const Challenge = ({
    title,
    description,
    hint,
  }) => (
    <div className="challenge">

      <div className="challenge-badge">
        ⚡ CHALLENGE
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <div className="hint">
        💡 {hint}
      </div>

      {challengePassed && (
        <div className="success-message">
          ✅ Challenge completed!
        </div>
      )}

    </div>
  );

  // =====================================================
  // LESSON CONTENT
  // =====================================================

  const renderLesson = () => {
    switch (currentLesson) {

      // =================================================
      // LESSON 1
      // =================================================

      case 1:
        return (
          <>
            <LessonHeader
              number="01"
              title={
                <>
                  What is{" "}
                  <span>Python?</span>
                </>
              }
              intro="Python is a programming language designed to make writing code simple and readable."
            />

            <Concept
              icon="🐍"
              title="Why learn Python?"
              text="Python is used for web development, automation, data science, artificial intelligence, robotics and many other fields."
            />

            <h2 className="section-title">
              Your first Python program
            </h2>

            <p className="explanation">
              The <code>print()</code> function
              displays information on the screen.
            </p>

            <CodeEditor />

            <Challenge
              title="Print a greeting"
              description='Change the program so it prints "Hello World!"'
              hint="Use print() to display text."
            />
          </>
        );

      // =================================================
      // LESSON 2
      // =================================================

      case 2:
        return (
          <>
            <LessonHeader
              number="02"
              title={
                <>
                  Python{" "}
                  <span>Variables</span>
                </>
              }
              intro="Variables allow you to store information and use that information later in your program."
            />

            <Concept
              icon="📦"
              title="Think of a variable as a box"
              text="A variable has a name and stores a value. You can change the value whenever you need to."
            />

            <h2 className="section-title">
              Creating a variable
            </h2>

            <p className="explanation">
              In Python, you can create a
              variable using the <code>=</code>{" "}
              operator.
            </p>

            <Example>
              {`name = "Prince"
age = 16`}
            </Example>

            <p className="explanation">
              Here, <code>name</code> stores text
              and <code>age</code> stores a number.
            </p>

            <CodeEditor />

            <Challenge
              title="Create your own variables"
              description="Create a variable called city and store your city name in it. Then print the variable."
              hint={'Example: city = "Delhi"'}
            />
          </>
        );

      // =================================================
      // LESSON 3
      // =================================================

      case 3:
        return (
          <>
            <LessonHeader
              number="03"
              title={
                <>
                  Input{" "}
                  <span>& Output</span>
                </>
              }
              intro="Programs become interactive when they can receive information from the user."
            />

            <Concept
              icon="⌨️"
              title="Getting information from users"
              text="Python's input() function allows your program to ask the user for information."
            />

            <h2 className="section-title">
              The input() function
            </h2>

            <Example>
              {`name = input("What is your name? ")
print("Hello", name)`}
            </Example>

            <p className="explanation">
              When input() runs, Python waits
              for the user to provide information.
            </p>

            <CodeEditor />

            <Challenge
              title="Build a greeting program"
              description="Ask the user for their name and print a greeting."
              hint="Use input() and print()."
            />
          </>
        );

      // =================================================
      // LESSON 4
      // =================================================

      case 4:
        return (
          <>
            <LessonHeader
              number="04"
              title={
                <>
                  Python{" "}
                  <span>Conditions</span>
                </>
              }
              intro="Conditions allow your program to make decisions."
            />

            <Concept
              icon="🔀"
              title="Making decisions"
              text="Python uses if, elif and else to decide which code should run."
            />

            <h2 className="section-title">
              The if statement
            </h2>

            <Example>
              {`age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are under 18")`}
            </Example>

            <p className="explanation">
              If the condition is true,
              Python executes the code inside
              the if block.
            </p>

            <CodeEditor />

            <Challenge
              title="Check a number"
              description="Create a program that checks whether a number is positive or negative."
              hint="Use if and else."
            />
          </>
        );

      // =================================================
      // LESSON 5
      // =================================================

      case 5:
        return (
          <>
            <LessonHeader
              number="05"
              title={
                <>
                  Python{" "}
                  <span>Loops</span>
                </>
              }
              intro="Loops allow you to repeat code without writing the same instructions again and again."
            />

            <Concept
              icon="🔁"
              title="Repeat code"
              text="A for loop can repeat a block of code a specific number of times."
            />

            <h2 className="section-title">
              The for loop
            </h2>

            <Example>
              {`for i in range(5):
    print(i)`}
            </Example>

            <p className="explanation">
              The <code>range()</code> function
              generates a sequence of numbers.
            </p>

            <CodeEditor />

            <Challenge
              title="Count from 1 to 10"
              description="Use a for loop to print the numbers 1 through 10."
              hint="Try range(1, 11)."
            />
          </>
        );

      // =================================================
      // LESSON 6
      // =================================================

      case 6:
        return (
          <>
            <LessonHeader
              number="06"
              title={
                <>
                  Python{" "}
                  <span>Functions</span>
                </>
              }
              intro="Functions allow you to organize code into reusable blocks."
            />

            <Concept
              icon="🧩"
              title="Write reusable code"
              text="Instead of writing the same code multiple times, you can put it inside a function and call it whenever you need it."
            />

            <h2 className="section-title">
              Creating a function
            </h2>

            <Example>
              {`def greet(name):
    return "Hello " + name

message = greet("Prince")
print(message)`}
            </Example>

            <p className="explanation">
              The <code>def</code> keyword creates
              a function. The <code>return</code>{" "}
              keyword sends a value back.
            </p>

            <CodeEditor />

            <Challenge
              title="Create a calculator function"
              description="Create a function called add that accepts two numbers and returns their sum."
              hint="Use def and return."
            />
          </>
        );

      // =================================================
      // LESSON 7
      // =================================================

      case 7:
        return (
          <>
            <LessonHeader
              number="07"
              title={
                <>
                  Python{" "}
                  <span>Lists</span>
                </>
              }
              intro="Lists allow you to store multiple values inside a single variable."
            />

            <Concept
              icon="📋"
              title="Store multiple items"
              text="A list can contain multiple values such as names, numbers, programming languages or anything else your program needs."
            />

            <h2 className="section-title">
              Creating a list
            </h2>

            <Example>
              {`languages = [
    "Python",
    "JavaScript",
    "C++"
]

print(languages)`}
            </Example>

            <p className="explanation">
              Lists use square brackets and
              items are separated by commas.
            </p>

            <CodeEditor />

            <Challenge
              title="Create a favorite foods list"
              description="Create a list called foods containing at least three foods and print it."
              hint="Use square brackets [ ]."
            />
          </>
        );

      // =================================================
      // LESSON 8
      // =================================================

      case 8:
        return (
          <>
            <LessonHeader
              number="08"
              title={
                <>
                  Mini{" "}
                  <span>Project</span>
                </>
              }
              intro="Let's combine the concepts you learned to build your first small Python program."
            />

            <Concept
              icon="🚀"
              title="Your first CodeWorld project"
              text="We'll combine variables, input, output and conditions to create a simple interactive program."
            />

            <h2 className="section-title">
              Build a mini program
            </h2>

            <Example>
              {`name = input("Enter your name: ")

print("Welcome to CodeWorld,", name)

score = 0

print("Your starting score is:", score)`}
            </Example>

            <p className="explanation">
              Try modifying this program and
              adding your own features.
            </p>

            <CodeEditor />

            <Challenge
              title="Build your own program"
              description="Create a small interactive program that asks for a user's name and displays a welcome message."
              hint="Use input(), variables and print()."
            />

            {completedLessons.length ===
              lessons.length && (
              <div className="completion-card">

                <div className="completion-icon">
                  🏆
                </div>

                <h2>
                  Python course completed!
                </h2>

                <p>
                  Amazing! You completed all
                  8 Python lessons.
                </p>

                <button
                  className="primary-btn"
                  onClick={onBack}
                >
                  Back to CodeWorld
                </button>

              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  // =====================================================
  // MAIN
  // =====================================================

  const progress =
    (completedLessons.length /
      lessons.length) *
    100;

  return (
    <div className="python-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <header className="course-header">

        <button
          className="course-back"
          onClick={onBack}
          title="Back to CodeWorld"
        >
          ←
        </button>

        <div className="course-logo">
          <span>&lt;/&gt;</span>{" "}
          CodeWorld
        </div>

        <div className="course-title">
          Python Fundamentals
        </div>

        <div className="course-header-progress">

          <span>
            {completedLessons.length} /{" "}
            {lessons.length} lessons
          </span>

          <div className="header-progress-bar">
            <div
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>

      </header>


      {/* =================================================
          COURSE INTRO / PROGRESS
          ================================================= */}

      <section className="course-overview">

        <div className="course-overview-text">

          <div className="overview-label">
            PYTHON FUNDAMENTALS
          </div>

          <h1>
            Your learning path.
          </h1>

          <p>
            Complete the lessons in order and
            build your Python skills step by step.
          </p>

        </div>


        <div className="overview-progress">

          <div className="overview-progress-top">

            <span>
              Course progress
            </span>

            <strong>
              {completedLessons.length} /{" "}
              {lessons.length}
            </strong>

          </div>


          <div className="overview-progress-track">

            <div
              className="overview-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>


          <span className="overview-progress-bottom">
            {Math.round(progress)}% complete
          </span>

        </div>

      </section>


      {/* =================================================
          LAYOUT
          ================================================= */}

      <div className="course-layout">

        {/* =================================================
            SIDEBAR
            ================================================= */}

        <aside className="lesson-sidebar">

          <div className="sidebar-title">
            COURSE CONTENT
          </div>

          {lessons.map((lesson) => {

            const completed =
              completedLessons.includes(
                lesson.id
              );

            return (
              <button
                key={lesson.id}
                className={`lesson ${
                  currentLesson === lesson.id
                    ? "active"
                    : ""
                } ${
                  completed
                    ? "completed"
                    : ""
                }`}
                onClick={() =>
                  setCurrentLesson(
                    lesson.id
                  )
                }
              >

                <span className="lesson-number">
                  {String(
                    lesson.id
                  ).padStart(2, "0")}
                </span>

                <span className="lesson-name">
                  {lesson.title}
                </span>

                {completed && (
                  <span className="lesson-check">
                    ✓
                  </span>
                )}

              </button>
            );
          })}

        </aside>


        {/* =================================================
            MAIN CONTENT
            ================================================= */}

        <main className="lesson-content">

          {renderLesson()}


          {/* =================================================
              NAVIGATION
              ================================================= */}

          <div className="lesson-navigation">

            <button
              className="back-button"
              onClick={
                currentLesson === 1
                  ? onBack
                  : previousLesson
              }
            >
              ←{" "}
              {currentLesson === 1
                ? "Back to Home"
                : "Previous Lesson"}
            </button>


            <button
              className="next-button"
              onClick={nextLesson}
              disabled={
                currentLesson ===
                lessons.length
              }
            >
              {currentLesson ===
              lessons.length
                ? "Course Complete"
                : "Next Lesson →"}
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}

export default PythonCourse;