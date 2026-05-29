import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

function TaksList() {

    const { tasks, taskStats } = useTaskContext();

    if (taskStats.length === 0) {
        return (
            <div className="empty-seach">
                <h3>No Task Found</h3>
                <p>Add a task to started!</p>
            </div>
        )
    }

    return (
        <div className="task-list">
            <div className="task-stats">
                <span>Total : {taskStats.total}</span>
                <span>Completed : {taskStats.completed}</span>
                <span>Pending : {taskStats.pending}</span>

            </div>

            <div className="tasks">

                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                    />
                ))}

            </div>
        </div>


    )

}

export default TaksList;