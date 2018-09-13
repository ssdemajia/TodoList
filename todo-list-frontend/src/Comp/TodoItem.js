import React from "react"

import moment from 'moment';
import './TodoItem.css'
moment.locale('zh');
function formatTime(time) {
    let second = parseInt(time % 60, 10);
    let minute = parseInt(time / 60, 10) % 60;
    let hour = parseInt(time / 3600, 10);
    return `${hour}:${minute}:${second}`;
}
class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'editing': false, 'label': '' }; // label用于展示当前task状态
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.changeEditState = this.changeEditState.bind(this);
        this.editRef = React.createRef();
    }
    deleteTask() {
        console.log("delete");
        this.props.toggleDelete(this.props.id)
    }
    editTask() {
        this.changeEditState();
        this.props.toggleEdit({ id: this.props.id, content: this.editRef.current.value });
        console.log("edit" + this.editRef.current.value);
        console.log("edit");
    }
    toggleComplete(e) {
        this.setState({ label: "任务已完成" });
        if (this.props.complete === false) {
            this.props.toggleComplete(this.props.id);
        }
    }
    changeEditState() {
        if (this.state.editing === true) {
            this.setState({ editing: false });
        }
        else {
            this.setState({ editing: true });
        }
    }
    componentDidUpdate() {
        if (this.editRef.current) {
            console.log(this.editRef.current.select());
        }
    }
    componentDidMount() {
        let current_timestamp = Date.parse(new Date()) / 1000;
        let expire_time = this.props.expire_time;
        console.log(current_timestamp, expire_time);
        if (this.props.complete === true) {
            this.setState({ label: "任务已完成" });
        }
        else {
            if (current_timestamp > expire_time) {
                this.setState({ label: "任务到期" });
            }
            else {
                let l = "剩余时间: " + formatTime(expire_time - current_timestamp);
                this.setState({ label: l });
            }
        }
    }
    render() {
        let content = this.props.content;

        if (this.state.editing === true) {
            content = 
            <span >
                <input
                    type="text"
                    className="editingInput"
                    ref={this.editRef}
                />
                <button className="btn close" type="button" onClick={this.editTask}>确认</button>
            </span>
        }
        else {
            content = <span className="" onClick={this.changeEditState}>
                {this.props.content}
                <button className="btn close " type="button" onClick={this.deleteTask}>删除</button>
            </span>
        }
        return (
            <li className="list-group-item">
                <input className="form-check-input" type="checkbox" checked={this.props.complete} onChange={this.toggleComplete} />
                <span className="itemLabel">{this.state.label}</span>
                {content}
                
            </li>
        )
    }
}

export default TodoItem;