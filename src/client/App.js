import React, { useEffect, useState } from 'react';
import './app.css';
// import ReactImage from './react.png';

const App = () => {
  const [state, setState] = useState({ username: null });
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => setState({ username: user.username }));
  }, [])

  const onGetToken = () => {
    fetch('/api/getToken')
      .then(res => res.json())
      .then(res => console.log(res));
  }

  const getTriviaPoints = () => {
    fetch('/api/triviaPoints')
      .then(res => res.json())
      .then(res => setPlayers(res));
  }

  const { username } = state;
  return (
    <div>
      {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
      <button type="button" onClick={onGetToken}>Get Token!</button>
      <button type="button" onClick={getTriviaPoints}> Get Trivia Ladder</button>

      <ul>
        {players.map(p => <li>{p.name} - {p.score}</li>)}
      </ul>
    </div>
  );
}

export default App