import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

function TaskItem({ task }) {
    const { deleteTask, toggleTask, editTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
    });

    const handleEdit = () => {

        console.log('saving',editData);
        

        editTask(task.id, editData);
        setIsEditing(false);
    }

    const handleCancel = () => {
        setEditData({
            title: task.title,
        });
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div className="task-item editing">
                <input value={editData.title}
                    onChange={(e) => setEditData(prev => ({
                        ...prev, title: e.target.value

                    }))}
                    placeholder="Task Title..."
                />
                <div className="edit-action">
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <div className="task-header">
                    <h3>{task.title}</h3>
                </div>

                <div className="task-action">
                    <button onClick={() => toggleTask(task.id)}
                        className={`toggle-btn ${task.completed ? 'completed' : ''}`}
                    >{task.completed ? 'Completed' : 'Pending'}</button>
                    <button onClick={() => setIsEditing(true)}
                    >Edit</button>
                    <button onClick={() => deleteTask(task.id)}
                    >Delete</button>
                </div>
            </div>

        </div>
    )

}

export default TaskItem;