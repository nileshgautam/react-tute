import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import Modal from "./Modal";



function TaskItem({ task }) {
    const { deleteTask, toggleTask, editTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority
    });
    const [showModal, setShowModal] = useState(false);


    const handleEdit = () => {


        if (!editData.title.trim()) {
            alert('Title is required');
            return;

        }

        if (editData.title.trim().length > 160) {
            alert('Title cannot exceed 160 characters');
            return;
        }

        if (editData.description.trim().length > 500) {
            alert('Description cannot exceed 500 characters');
            return;
        }

        editTask(task.id, editData);
        setIsEditing(false);

        alert('Task updated successfully!');
    }

    const handleCancel = () => {
        setEditData({
            title: task.title,
            description: task.description,
            priority: task.priority
        });
        setIsEditing(false);
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff4757';
            case 'medium': return '#ffa502';
            case 'low': return '#26de81'
            default: return '#ddd';
        }
    }

    if (isEditing) {
        return (
            <div className="task-titem editing">
                <input value={editData.title}
                    onChange={(e) => setEditData(prev => ({
                        ...prev, title: e.target.value

                    }))}

                    placeholder="Task Title..."

                />
                <small>
                    {editData.title.length}/160 characters
                </small>

                <textarea
                    value={editData.description}
                    onChange={(e) => setEditData(prev => ({
                        ...prev, description: e.target.value

                    }))}
                    placeholder="Task Description..."
                ></textarea>
                <small>
                    {editData.description.length}/160 characters
                </small>


                <select
                    value={editData.priority}
                    onChange={(e) => setEditData(prev => ({
                        ...prev, priority: e.target.value

                    }))}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

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
                    <span className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >{task.priority}</span>
                </div>

                {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                    <small>Created : {new Date(task.createdAt).toLocaleDateString()}</small>
                </div>

                <div className="task-action">
                    <button onClick={() => setShowModal(true)}>
                        View
                    </button>
                    <button onClick={() => toggleTask(task.id)}
                        className={`toggle-btn ${task.completed ? 'completed' : ''}`}
                    >{task.completed ? 'Completed' : 'Pending'}</button>
                    <button className="editbtn" onClick={() => setIsEditing(true)}
                        disabled={task.completed}
                    >Edit</button>
                    <button className="deletebtn" onClick={() => deleteTask(task.id)}
                    >Delete</button>
                </div>

                <Modal isOpen={showModal}
                    onClose={() => setShowModal(false)}>
                    <h2>{task.title}</h2>
                    <p><strong>Description : </strong></p>
                    <p>
                        {task.description || "No description available"}
                    </p>
                    <p>
                        <strong>Priority:</strong> {task.priority}
                    </p>
                    <p>
                        <strong>Status:</strong>{" "}
                        {task.completed ? "Completed" : "Pending"}
                    </p>
                    <p>
                        <strong>Created:</strong>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                </Modal>

            </div>

        </div>
    )

}

export default TaskItem;