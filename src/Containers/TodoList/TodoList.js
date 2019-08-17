import React, {Component} from 'react';

import classes from './TodoList.module.css'
import Task from '../../Components/Task/Task';

class TodoList extends Component{

	state = {
		listTitle: "My List #1",
		currentInputText: '',
		tasks: [
			// {id, taskText, checked},
		]
	}

	taskInputChangeHandler = (event) => {
		let text = event.target.value;
		this.setState({
			...this.state,
			currentInputText: text
		})
	}

	addTask = (event) => {
		let taskObj = {
			id: new Date().getTime(),
			taskText: this.state.currentInputText,
			checked: false
		}
		let tasks = [...this.state.tasks];
		tasks.push(taskObj);
		this.setState({
			...this.state,
			tasks: tasks,
			currentInputText: ''
		})
	}

	removeTask = (id) => {
		let newTasks = this.state.tasks.filter(el=>el.id!==id);
		this.setState({
			...this.state,
			tasks: newTasks
		})
	}

	checkboxHandler = (index) => {

		let newTasks = [
			...this.state.tasks,
		]
			newTasks[index].checked = !newTasks[index].checked;

		this.setState({
			tasks: newTasks
		})
		}

	render(){

		let doneTasks = [];
		let notDoneTasks = [];


		doneTasks = this.state.tasks.map((el, index) => {
					if(el.checked){
						return(
						<Task key={el.id} 
							  id={el.id} 
							  index={index}
							  text={el.taskText} 
							  checked={el.checked} 
							  checkboxHandler={this.checkboxHandler}
							  removeTask = {this.removeTask}/>
							  )
					}

					else{
						notDoneTasks.push(<Task key={el.id} 
							  id={el.id} 
							  index={index}
							  text={el.taskText} 
							  checked={el.checked} 
							  checkboxHandler={this.checkboxHandler}
							  removeTask = {this.removeTask}/>)
					}
				}	  
		)



		return(
			<div>
				<h2>{this.state.listTitle}</h2>
				<input type="text" onChange={(event)=>this.taskInputChangeHandler(event)} size="40" value={this.state.currentInputText} placeholder="Write your next task here..."/>
				<button onClick={(event)=>this.addTask(event)}>Add</button>
				<h3>Should be done:</h3>
				<ul className={classes.list}>
					{notDoneTasks}
				</ul>
				<h3>Done:</h3>
				<ul className={classes.list}>
					{doneTasks}
				</ul>
			</div>
			)
	}
}

export default TodoList;