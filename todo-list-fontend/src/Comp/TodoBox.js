import React, { Component } from 'react';
import axios from 'axios';

import TodoList from './TodoList'
import TodoAddForm from './TodoAddForm'
class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                tasks: [
                    { id: 0, content: '睡觉', complete: false },
                ],
                currentId: 0
            }
        };
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
    }
    componentDidMount() {
        // axios.get()
    }
    addTask(task) {
        this.setState((prevState) => {
            prevState.data.tasks.push(task);
            prevState.data.currentId = task.id;
            return prevState.data;
        })
    }
    toggleComplete(id) {
        let tasks = this.state.data.tasks;
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.complete = true;
            }
            return task;
        })
        this.setState((prevState) => {
            prevState.data.tasks = tasks;
            return prevState;
        })
    }
    deleteTask(id) {
        let tasks = this.state.data.tasks;
        tasks = tasks.filter(task => {
            return task.id !== id;
        })
        this.setState((prevState) => {
            prevState.data.tasks = tasks;
            return prevState;
        })
    }
    editTask(obj) {
        let id = obj.id;
        let content = obj.content;
        let tasks = this.state.data.tasks;
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.content = content;
            }
            return task;
        })
        this.setState((prevState) => {
            prevState.data.tasks = tasks;
            return prevState;
        })
    }
    render() {
        return (
            <div>
                <TodoList 
                    tasks={this.state.data.tasks} 
                    toggleDelete={this.deleteTask}
                    toggleEdit={this.editTask}
                />
                <TodoAddForm submit={this.addTask} currentId={this.state.data.currentId}/>
            </div>
        )
    }
}

export default TodoBox;
