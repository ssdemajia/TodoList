import React from 'react';
import './TodoAddForm.css';
class TodoAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = React.createRef();
        this.selectValue = React.createRef();
        this.addItem = this.addItem.bind(this);

    }
    addItem(e) {
        e.preventDefault();
        let content = this.inputText.current.value;
        let time = this.selectValue.current.value;
        var timestamp = Date.parse(new Date()) / 1000;  // 当前时间
        timestamp = parseInt(time, 10) * 3600 + timestamp;  // 到期的时间
        console.log(timestamp);
        this.props.submit({ content, complete: false, expire_time: timestamp })
        this.inputText.current.value = null;
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.addItem}>
                <div className="form-group ">
                    <label >新建任务:</label>
                    <input id="content" className="form-control" type="text" ref={this.inputText} placeholder="做点啥?"/>
                </div>
                <div className="form-group timeSelect">
                    <select className="form-control" ref={this.selectValue}>
                        <option value="1">预计1小时</option>
                        <option value="2">预计2小时</option>
                        <option value="3">预计3小时</option>
                        <option value="4">预计4小时</option>
                    </select>
                </div>
                <button className="btn btn-default" type="submit" >新建</button>
                

                {/* <div>
                    <input className="btn btn-default" type="submit" />
                </div> */}
            </form>
        )
    }
}

export default TodoAddForm;