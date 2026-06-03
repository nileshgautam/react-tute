import TaskItem from "./TaskItem";
import { useTaskContext } from "../context/TaskContext";
function TaskList() {

    const { tasks, taskStats, clearTask } = useTaskContext();

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>No Task Found</h3>
                <p>Add a task to started!</p>
            </div>
        )
    }

    return (

        <div className="list">

            <div className="clear-all">
                <button onClick={() => clearTask()}>Clear All</button>
            </div>

            <div className="task-list">
                {tasks.map(task => {
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                        />
                    );
                })}
            </div>
        </div>

    );
}

export default TaskList;