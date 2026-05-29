import './App.css';
import TaskForm from './componets/TaskForm';
import { TaskProvider } from './context/TaskContext';
import TaskList from './componets/TaskList';
import FilterControls from './componets/FilterControls';

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <header className='app-header'>
          <h1>Task Manager</h1>
          <p>Built with React Context API & useReducer</p>
        </header>
        <main className='app-main'>
          <div className="sidebar">
            <TaskForm />
          </div>
          <div className="content">
            <FilterControls />
            <TaskList />
          </div>
        </main>
      </div>
    </TaskProvider>
  )

}

export default App;