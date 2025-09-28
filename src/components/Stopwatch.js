import React, { useState, useEffect } from "react";

import "../styles/stopwatch.css";

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("output");
  const [activeFile, setActiveFile] = useState("App.js");

  const files = {
    "App.js": `
      import React from "react";
      import { Stopwatch } from "./components/Stopwatch";
      
      import "./App.css";
      
      function App() {
        return (
          <div className="App">
            <Stopwatch />
          </div>
        );
      }
      
      export default App;
    `,
    "Stopwatch.js": `
      import React, { useState, useEffect } from "react";

      import "../styles/stopwatch.css";

      export const Stopwatch = () => {
        const [time, setTime] = useState(0);
        const [isRunning, setIsRunning] = useState(false);
        const [activeTab, setActiveTab] = useState("output");
        const [activeFile, setActiveFile] = useState("App.js");

        const files = {
          "App.js": "...",
          "Stopwatch.js": "...",
        }

        useEffect(() => {
          if (isRunning) {
            let timer = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(timer);
          }
        }, [isRunning]);

        const formatTime = (totalSeconds) => {
          const min = Math.floor(totalSeconds / 60);
          const sec = totalSeconds % 60;

          const padMin = String(min).padStart(2, "0");
          const padSec = String(sec).padStart(2, "0");

          return \`\${padMin} : \${padSec}\`;
        };

        const handlerOutput = () => {
          setActiveTab("output");
        };

        const handlerCode = () => {
          setActiveTab("code");
        };

        const handlerStart = () => {
          setIsRunning(true);
        };

        const handlerStop = () => {
          setIsRunning(false);
        };

        const handlerReset = () => {
          setTime(0);
          setIsRunning(false);
        };

        const output = (
          <>
            <h3 className="timer">{formatTime(time)}</h3>

            <div className="button-container">
              <button
                type="button"
                className="btn btn-success"
                onClick={handlerStart}
              >
                Start
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handlerStop}
              >
                Stop
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlerReset}
              >
                Reset
              </button>
            </div>
          </>
        );

        const code = (
          <>
            <div className="d-flex flex-row active-file-container">
              {Object.keys(files).map((file) => (
                <div
                  key={file}
                  className="active-file"
                  onClick={() => setActiveFile(file)}
                  style={{
                    background: activeFile === file ? "#e0e0e0" : "transparent",
                    color: activeFile === file ? "#000" : "#fff",
                  }}
                >
                  {file}
                </div>
              ))}
            </div>

            <pre className="pre-code-container">
              <code>{files[activeFile]}</code>
            </pre>
          </>
        );
           
        return (
          <div className="stopwatch-container">
            <h1 className="heading">STOPWATCH</h1>

            <div className="tabs-container d-flex flex-row justify-content-evenly">
              <button
                className="tab-btn"
                style={{
                  background: activeTab === "output" ? "#3cc751ff" : "#000000",
                }}
                onClick={handlerOutput}
              >
                Output
              </button>
              <button
                className="tab-btn"
                style={{
                  background: activeTab !== "output" ? "#3cc751ff" : "#000000",
                }}
                onClick={handlerCode}
              >
                Code
              </button>
            </div>

            {activeTab === "output" ? output : code}
          </div>
        );
    };
    `,
  };

  useEffect(() => {
    if (isRunning) {
      let timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    const padMin = String(min).padStart(2, "0");
    const padSec = String(sec).padStart(2, "0");

    return `${padMin} : ${padSec}`;
  };

  const handlerOutput = () => {
    setActiveTab("output");
  };

  const handlerCode = () => {
    setActiveTab("code");
  };

  const handlerStart = () => {
    setIsRunning(true);
  };

  const handlerStop = () => {
    setIsRunning(false);
  };

  const handlerReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const output = (
    <>
      <h3 className="timer">{formatTime(time)}</h3>

      <div className="button-container">
        <button
          type="button"
          className="btn btn-success"
          onClick={handlerStart}
        >
          Start
        </button>
        <button type="button" className="btn btn-danger" onClick={handlerStop}>
          Stop
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handlerReset}
        >
          Reset
        </button>
      </div>
    </>
  );

  const code = (
    <>
      <div className="d-flex flex-row active-file-container">
        {Object.keys(files).map((file) => (
          <div
            key={file}
            className="active-file"
            onClick={() => setActiveFile(file)}
            style={{
              background: activeFile === file ? "#e0e0e0" : "transparent",
              color: activeFile === file ? "#000" : "#fff",
            }}
          >
            {file}
          </div>
        ))}
      </div>

      <pre className="pre-code-container">
        <code>{files[activeFile]}</code>
      </pre>
    </>
  );

  return (
    <div className="stopwatch-container">
      <h1 className="heading">STOPWATCH</h1>

      <div className="tabs-container d-flex flex-row justify-content-evenly">
        <button
          className="tab-btn"
          style={{
            background: activeTab === "output" ? "#3cc751ff" : "#000000",
          }}
          onClick={handlerOutput}
        >
          Output
        </button>
        <button
          className="tab-btn"
          style={{
            background: activeTab !== "output" ? "#3cc751ff" : "#000000",
          }}
          onClick={handlerCode}
        >
          Code
        </button>
      </div>

      {activeTab === "output" ? output : code}
    </div>
  );
};
