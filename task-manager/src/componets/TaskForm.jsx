/*
- A controlled form component that manages it own local state
- intgration with our content API to ad tasks globally
- form validation and user experience fratures
- clean separation of concern - the form only knows ablut form things   

  */

import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

function TaskForm() {

    const { addTask } = useTaskContext();

    const [formData, setFormData] = useState({
        title: '',
        description: "",
        priority: 'medium'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Title is required');
            return;

        }

        if (formData.title.trim().length > 160) {
            alert('Title cannot exceed 160 characters');
            return;
        }

        if (formData.description.trim().length > 500) {
            alert('Description cannot exceed 500 characters');
            return;
        }

        addTask(formData);

        setFormData({ title: '', description: '', priority: 'medium' });

        alert('Task Created successfully!');
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>Add New Task</h2>
            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title..."
                    required
                />
                <small>
                    {formData.title.length}/160 characters
                </small>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description </label>
                <textarea name="description" id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task Description"
                    rows="3"
                />
                <small>
                    {formData.description.length}/500 characters
                </small>
            </div>

            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>

                </select>
            </div>

            <button type="submit" disabled={!formData.title.trim()} >Add Task</button>

        </form>
    )


}

export default TaskForm;