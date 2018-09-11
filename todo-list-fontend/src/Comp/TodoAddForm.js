import React from 'react'

class TodoAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = React.createRef();
        this.addItem = this.addItem.bind(this);
    }
    addItem(e) {
        e.preventDefault();
        let content = this.inputText.current.value;
        let id = this.props.currentId + 1;
        this.props.submit( {id, content, complete:false})
        this.inputText.current.value = null;
    }
    render() {
        return (
            <form onSubmit={this.addItem}>
                <div>
                    <input type="text" ref={this.inputText}/>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        )
    }
}

export default TodoAddForm;