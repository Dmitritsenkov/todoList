import React, {Component} from 'react';

import classes from './TodoList.module.css'
import Task from '../../Components/Task/Task';

class TodoList extends Component{

	state = {
		currentInputTitle: this.props.title,
		currentInputText: "",
      	tasks: [
            // {id, taskText, checked},
          ],
	}

	taskInputChangeHandler = (event) => {
		let text = event.target.value;
		this.setState({currentInputText: text,})
	}

	addTask = (event) => {
		let taskObj = {
			id: new Date().getTime(),
			taskText: this.state.currentInputText,
			checked: false
		}
		let tasks = [...this.state.tasks];
		tasks.push(taskObj);

		this.setState({tasks: tasks, currentInputText: ""});

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

	// Edit title

	showEditInputTitle = () =>{
		document.getElementById('todoListTitle').style.display="none";
		document.getElementById('editTodoListTitleWraper').style.display="block";
	}	

	closeEditInputTitle = () =>{
		document.getElementById('todoListTitle').style.display="block";
		document.getElementById('editTodoListTitleWraper').style.display="none";
	}

	changeEditTitleHandler = (event) => {
		let currentText = this.state.currentInputTitle;
		currentText = event.target.value;
		console.log(currentText)
		this.setState({currentInputTitle: currentText})
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

		let todoList;
			if(this.props.isShown){
			todoList = 
				<div>

					<h2 id="todoListTitle" className={classes.title}>{this.props.title}</h2>

					<div id="editTodoListTitleWraper" className={classes.editTodoListTitleWraper}>
						<input 
							onChange={(event)=>this.changeEditTitleHandler(event)}
							value={this.state.currentInputTitle}
							 />
						<button 
							onClick={()=>this.props.changeTitle(this.props.id, this.state.currentInputTitle)}>OK</button>	
						<button onClick={this.closeEditInputTitle}>Cancel</button>
					</div>


					<div className={classes.editDeleteContainer}>
						<span onClick={this.showEditInputTitle} className={classes.editTitle}>Edit</span> 
						<span> | </span> 
	 					<span onClick={()=>this.props.showRemovePopUp(this.props.id)}
							  className={classes.removeTodoList}>Delete</span><br/>
					</div>
						<h4 style={{marginBottom: '5px'}}>New Task...</h4>
						<input 
						type="text" 
						onChange={(event)=>this.taskInputChangeHandler(event)} 
						size="40" value={this.state.currentInputText} 
						placeholder="Write your next task here..."
						/>
					<button onClick={(event)=>this.addTask(event)}>Add</button><br/>

					<div className={classes.listContainer}>
						<h3 className={classes.listTitle}>List</h3>
						<h4>Should be done:</h4>
						<ul className={classes.list}>
							{notDoneTasks}
						</ul>
						<h4>Done:</h4>
						<ul className={classes.list}>
							{doneTasks}
						</ul>
					</div>
				</div>
		}

		return (
			<div>
			{todoList}
			</div>
			)
	}
}

export default TodoList;