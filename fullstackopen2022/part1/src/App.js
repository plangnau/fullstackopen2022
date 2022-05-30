import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button
    onClick={() => {
      onClick();
    }}
  >
    {text}
  </button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;

  const getAverage = () => {
    let average = 0;
    let count = getAll();

    if (count !== 0) {
      average += good;
      average -= bad;
      average = average / count;
    }
    return average;
  };

  const getPositive = () => {
    let count = getAll();

    if (count !== 0) {
      return good / count;
    }

    return 0;
  };

  const getContent = () => {
    if (good !== 0 || neutral !== 0 || bad !== 0) {
      return (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={getAll()} />
            <StatisticLine text="average" value={getAverage()} />
            <StatisticLine text="positive" value={getPositive()} />
          </tbody>
        </table>
      );
    }

    return <div>No feedback given</div>;
  };

  return (
    <>
      <Header text="statistics" />
      {getContent()}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickOnGood = () => setGood(good + 1);

  const handleClickOnNeutral = () => setNeutral(neutral + 1);

  const handleClickOnBad = () => setBad(bad + 1);

  return (
    <>
      <Header text="give feedback" />
      <Button onClick={() => handleClickOnGood()} text="good" />
      <Button
        onClick={() => {
          handleClickOnNeutral();
        }}
        text="neutral"
      />
      <Button
        onClick={() => {
          handleClickOnBad();
        }}
        text="bad"
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
