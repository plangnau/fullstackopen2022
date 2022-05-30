import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={() => onClick()}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleClickVote = () => {
    let pointsCopy = { ...points };

    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  };

  const getMostVoted = () => {
    let pointsCopy = { ...points };
    let indexOfMostVoted = 0;
    let countOfVotes = 0;

    for (let i = 0; i < anecdotes.length; i++) {
      if (pointsCopy[i] > countOfVotes) {
        countOfVotes = pointsCopy[i];
        indexOfMostVoted = i;
      }
    }

    return (
      <>
        <div> {anecdotes[indexOfMostVoted]}</div>
        <div>has {countOfVotes} votes</div>
      </>
    );
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div> {anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button onClick={handleClickVote} text="vote" />
      <Button onClick={handleClickNext} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {getMostVoted()}
    </>
  );
};

export default App;
