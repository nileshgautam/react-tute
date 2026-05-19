import React, { useState } from 'react'
import './App.css'

function App() {

  const [newTask, setNewTasks] = useState('');
  const [tasks, setTasks] = useState([]);

  const toggleTask = (id) => {
    setTasks((tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    }
    )))

  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const handleAddTask = () => {
    if (newTask.trim()) {

      const task = {
        id: Date.now(),
        text: newTask,
        completed: false
      }

      setTasks([...tasks, task]);
      //for now just clear the input.
      setNewTasks('');
    }
  }

  const totalTask = tasks.length;
  const totalCompletedTask = tasks.filter(((task) => task.completed)).length;
  const remainingTasks = totalTask - totalCompletedTask;

  const totalCompletedRatio = totalTask > 0 ? (Math.round((totalCompletedTask / totalTask) * 100)) : 0;

  console.log('current task list', tasks);

  return (
    <div className='App'>
      <h1>My Task List</h1>

      <div style={
        {
          background: '#f0f0f0',
          padding: '10px 20px',
          margin: '10 10px',
          borderRadius: '5px'
        }
      }>
        <h3>Task Statistics</h3>
        <p>Total Tasks: {totalTask} </p>
        <p>Completed Tasks: {totalCompletedTask} </p>
        <p>Remaining Tasks: {remainingTasks} </p>
        <div style={{
          width: '100%',
          height: '20px',
          borderRadius: '10px',
          background: '#ddd',
          overflow: 'hidden',
        }}>
          <div
            style={{
              width: `${totalCompletedRatio}%`,
              height: '100%',
              backgroundColor: '#4caf50',
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
        <p>Progress : {totalCompletedRatio} %</p>

      </div>

      <input type="text"
        value={newTask}
        placeholder='Enter new task here....'
        onChange={(e) => setNewTasks(e.target.value)}
      />
      <button onClick={handleAddTask}>Add new task</button>



      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
