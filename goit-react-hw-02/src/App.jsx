import { useState, useEffect } from "react";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const handleFeedback = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const total = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = total
    ? Math.round((feedback.good / total) * 100)
    : 0;

  const buttonStyle = {
    border: "1px solid #888",
    borderRadius: "4px",
    padding: "8px 16px",
    backgroundColor: "transparent",
    marginRight: "8px",
    cursor: "pointer",
    color: "#2c3e50",
  };

  const textStyle = {
    color: "#2c3e50",
    fontSize: "20px",
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0, padding: "20px" }}>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "normal",
          color: "#2c3e50",
          margin: 0,
          marginBottom: "20px",
        }}
      >
        Sip Happens Café
      </h1>
      <p style={{ ...textStyle, marginBottom: "20px" }}>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <button style={buttonStyle} onClick={() => handleFeedback("good")}>
          Good
        </button>
        <button style={buttonStyle} onClick={() => handleFeedback("neutral")}>
          Neutral
        </button>
        <button style={buttonStyle} onClick={() => handleFeedback("bad")}>
          Bad
        </button>
      </div>

      <div>
        <p style={{ ...textStyle, margin: "5px 0" }}>Good: {feedback.good}</p>
        <p style={{ ...textStyle, margin: "5px 0" }}>
          Neutral: {feedback.neutral}
        </p>
        <p style={{ ...textStyle, margin: "5px 0" }}>Bad: {feedback.bad}</p>
        {total > 0 && (
          <>
            <p style={{ ...textStyle, margin: "5px 0" }}>Total: {total}</p>
            <p style={{ ...textStyle, margin: "5px 0" }}>
              Positive: {positivePercentage}%
            </p>
            <button style={buttonStyle} onClick={resetFeedback}>
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
