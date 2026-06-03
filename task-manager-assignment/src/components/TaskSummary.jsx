import { useTaskContext } from "../context/TaskContext";
function TaskSummary() {

    const { tasks, taskStats } = useTaskContext();

    if (tasks.length > 0) {
        return (
            <div className="task-summary" >
                <div className="task-stats">
                    <span>Total : {taskStats.total}</span>
                    <span>Completed : {taskStats.completed}</span>
                </div>
            </div>
        )
    }
}

export default TaskSummary;

