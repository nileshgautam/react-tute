import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <header className='app-header'>
          <h1>Task Manager</h1>
        </header>
        <main className='app-main'>
          <div className="">
            <TaskInput />
          </div>
          <div className="content">
            <TaskSummary />
            <TaskList />
          </div>
        </main>
      </div>
    </TaskProvider>
  )
}

export default App;

