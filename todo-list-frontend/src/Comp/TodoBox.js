import React, { Component } from 'react';
import axios from 'axios';

import { baseUrl } from '../utils/conf';
import TodoList from './TodoList';
import TodoAddForm from './TodoAddForm';
import './TodoBox.css';
class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                tasks: [],
                currentId: 0
            }
        };
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }
    componentDidMount() {
        axios.get(baseUrl).then(res => {
            console.log(res);
            this.setState({
                data: {
                    tasks: res.data
                }
            });
        });
    }
    addTask(task) {
        axios.post(baseUrl, {
            content: task.content,
            complete: task.complete,
            expire_time: task.expire_time
        }).then(res => {
            task.id = res.data.id;
            this.setState((prevState) => {
                prevState.data.tasks.push(task);
                return prevState.data;
            })
            console.log("add task success!");
        })
    }
    toggleComplete(id) {
        axios.put(baseUrl, {
            id: id,
            complete: true
        }).then(res => {
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
            console.log("toggle complete!");
        })
    }
    deleteTask(id) {
        axios.delete(baseUrl, {
            data: {
                id
            }
        }).then(res => {
            let tasks = this.state.data.tasks;
            tasks = tasks.filter(task => {
                return task.id !== id;
            })
            this.setState((prevState) => {
                prevState.data.tasks = tasks;
                return prevState;
            })
            console.log("delete success!");
        })
    }
    editTask(obj) {
        let id = obj.id;
        let content = obj.content;
        axios.put(baseUrl, {
            id,
            content
        }).then(res => {
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
        })
    }
    render() {
        return (
            <div className="container center">
          
                    <h1 className="text-center">Todo </h1>
      
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <TodoList
                            tasks={this.state.data.tasks}
                            toggleDelete={this.deleteTask}
                            toggleEdit={this.editTask}
                            toggleComplete={this.toggleComplete}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-md-12">
                        <TodoAddForm submit={this.addTask} currentId={this.state.data.currentId} />
                    </div>
                </div>

            </div>
        )
    }
}

export default TodoBox;
