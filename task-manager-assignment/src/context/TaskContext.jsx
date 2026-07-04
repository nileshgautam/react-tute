import { createContext, useContext, useReducer } from "react";

const initialState = {
  tasks: [],
};

// Action types using constants prevent typos and improve maintainability
export const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  EDIT_TASK: "EDIT_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  CLEAR_TASKS: "CLEAR_TASKS",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case ACTIONS.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                ...action.payload.updates,
              }
            : task,
        ),
      };

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };

    case ACTIONS.CLEAR_TASKS: {
      return {
        ...state,
        tasks: [],
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Step1 : create the context
const TaskContext = createContext();

//Step2: Custom hook for easior  usage

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
};

// Step3: Provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (taskData) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: taskData });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: taskId });
  };

  const editTask = (taskId, updates) => {
    dispatch({
      type: ACTIONS.EDIT_TASK,
      payload: {
        id: taskId,
        updates,
      },
    });
  };

  const clearTask = () => {
    dispatch({ type: ACTIONS.CLEAR_TASKS });
  };

  // Derived state - computed value based on current state
  const taskStats = {
    total: state.tasks.length,
    completed: state.tasks.filter((task) => task.completed).length,
  };

  const value = {
    // state
    tasks: state.tasks,
    taskStats,
    //Actions
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
