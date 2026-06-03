import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";


function TaskInput() {

    const { addTask } = useTaskContext();

    const [TaskInput, setTaskInput] = useState({
        title: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!TaskInput.title.trim()) return;
        addTask(TaskInput);

        setTaskInput({
            title: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTaskInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <form onSubmit={handleSubmit} className="task-input-from">
            <div className="task-input">
                <input type="text"
                    id="title"
                    name="title"
                    value={TaskInput.title}
                    onChange={handleChange}
                    placeholder="Enter task title..."
                    required
                />

            </div>
            <div className="form-action-section">
                <button type="submit" disabled={!TaskInput.title.trim()} >Add Task</button>

            </div>


        </form>
    );
}

export default TaskInput;