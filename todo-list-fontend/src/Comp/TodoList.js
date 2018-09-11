import React from "react"
import ReactDom from 'react-dom'
import TodoItem from './TodoItem'
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        var taskList = this.props.tasks.map((item) => {
            return (
                <TodoItem 
                    id={item.id} 
                    key={item.id} 
                    content={item.content}
                    complete={item.complete}
                    toggleComplete={this.props.toggleComplete}
                    toggleEdit={this.props.toggleEdit}
                    toggleDelete={this.props.toggleDelete}
                />
            )
        })
        return (
            <ul>
                {taskList}
            </ul>
        )
    }
}

export default TodoList;