import React from "react"

import TodoItem from './TodoItem'
import './TodoList.css'
class TodoList extends React.Component {
    render() {
        var taskList = this.props.tasks.map((item) => {
            return (
                <TodoItem 
                    id={item.id} 
                    key={item.id} 
                    expire_time={item.expire_time}
                    content={item.content}
                    complete={item.complete}
                    toggleComplete={this.props.toggleComplete}
                    toggleEdit={this.props.toggleEdit}
                    toggleDelete={this.props.toggleDelete}

                />
            )
        })
        return (
            <ul className="list-group">
                {taskList}
            </ul>
        )
    }
}

export default TodoList;