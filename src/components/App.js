import React, { useState, useEffect } from "react";
import "../styles/App.css";

const WORD_LIST = ["apple", "banana", "cherry", "grape", "orange"];

function App() {
  const [index, setIndex] = useState(0);
  const [cword, setCWord] = useState(WORD_LIST[index]);
  const [showword, setShowWord] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [uIDis, setUIDis] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWord(false);
      setUIDis(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [cword]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === cword.toLowerCase()) {
      setResult("You won!");
    } else {
      setResult("You lost!");
    }
    setUIDis(true);
  };
  const handleRestartClick = () => {
    setIndex(index + 1);
    setCWord(WORD_LIST[index + 1]);
    setShowWord(true);
    setUserInput("");
    setResult("");
    setUIDis(true);

    setTimeout(() => {
      setShowWord(false);
      setUIDis(false);
    }, 500);
  };

  return (
    <div class="mini-game-container">
      <h2 class="mini-game-title">Mini Game</h2>
      <p
        style={{ display: showword ? "block" : "none" }}
        class="mini-game-word"
      >
        {cword}
      </p>
      <form
        class="mini-game-form"
        style={{ display: showword ? "none" : "block" }}
        onSubmit={handleFormSubmit}
      >
        <input
          class="mini-game-input"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={uIDis}
        />
        <button
          class="mini-game-button"
          // style={{ display: showword ? "none" : "block" }}
          disabled={uIDis}
          type="submit"
        >
          Check Answer
        </button>
      </form>
      {result && (
        <>
          <p class="mini-game-result">{result}</p>
          <button class="mini-game-restart-button" onClick={handleRestartClick}>
            Restart
          </button>
        </>
      )}
    </div>
  );
}

export default App;
