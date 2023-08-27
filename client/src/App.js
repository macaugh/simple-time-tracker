import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [logs, setLogs] = useState([]);
  const [task, setTask] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/logs')
      .then(response => {
        setLogs(response.data);
      });
  }, []);

  const handleSubmit = () => {
    const timestamp = new Date().toLocaleString();
    axios.post('http://localhost:3001/logs', { task, job, timestamp })
      .then(() => {
        setLogs(prevLogs => [...prevLogs, { task, job, timestamp }]);
        setTask('');
        setJob('');
      });
  };

  return (
    <div className="App">
      <h1>Work Time Tracker</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
      <input value={job} onChange={(e) => setJob(e.target.value)} placeholder="Job" />
      <button onClick={handleSubmit}>Add Log</button>
      <ul>
        {logs.map(log => (
          <li key={log.timestamp}>
            {log.timestamp} - Task: {log.task}, Job: {log.job}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
