import React from "react"
import ReactDom from 'react-dom'

import './TodoItem.css'

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'editing':false};
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
        this.props.toggleEdit({id:this.props.id, content:this.editRef.current.value});
        console.log("edit"+this.editRef.current.value);
        console.log("edit");
    }
    toggleComplete(e) {
        if (this.props.complete === "true") {
            this.props.toggleComplete(this.props.id);
        }
        console.log(e);
    }
    changeEditState() {
        if (this.state.editing === true) {
            this.setState({editing:false});
        }
        else {
            this.setState({editing:true});
        }
    }
    componentDidUpdate() {
        if (this.editRef.current) {
            console.log(this.editRef.current.select());
        }
    }
    render() {
        let content = this.props.content;
        var itemChecked;
        if (this.props.complete === "true") {
            itemChecked = true;
        }
        else {
            itemChecked = false;
        }
        if (this.state.editing === true) {
            content = <span>
                <input 
                        type="text" 
                        className="editingInput"
                        ref={this.editRef}
                        />
                <button type="button" onClick={this.editTask}>确认编辑</button>
            </span>
        }
        else {
            content = <span onClick={this.changeEditState}>
                {this.props.content}
            </span>
        }
        return (
            <li>
                <input type="checkbox" checked={this.complete} onChange={this.toggleComplete}/>
                {content}
                <button type="button" onClick={this.deleteTask}>删除记录</button>
            </li>
        )
    }
}

export default TodoItem;