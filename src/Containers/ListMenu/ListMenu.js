import React, {Component} from 'react';
import classes from './ListMenu.module.css';

import TodoList from '../TodoList/TodoList';
import ListTab from '../../Components/ListTab/ListTab'

class ListMenu extends Component {


	state = {
		todoLists: [
        {
          id: 123,
          title: 'Grocery list',
          path: '/grocery-list',
          isShown: false
        },
       {
       	  id: 543,
          title: 'Project Tasks',
          path: '/project-tasks',
          isShown: true
        },
        {
       	  id: 54523,
          title: 'Bucket list',
          path: '/project-tasks',
          isShown: false
        },
      ],
      currentListId: null,
      currentNewListInputText: ''
	}

	showToDoList = (todoListId) => {

		let newTodoLists = [...this.state.todoLists];

		newTodoLists.find((el)=>el.id==todoListId).isShown=true;

		for(let i = 0; i < newTodoLists.length; i++){
			if(newTodoLists[i].id!==todoListId){
				newTodoLists[i].isShown=false;
			}
		}
		
		this.setState({todoLists:newTodoLists})
	}

	addNewListWrapperHandle = () => {
		let addNewListWrapper = document.getElementById('addNewListWrapper');

		if(addNewListWrapper.style.display == "inline-block")
		addNewListWrapper.style.display="none";

		else{
			addNewListWrapper.style.display="inline-block";
			addNewListWrapper.childNodes[0].setAttribute("autofocus");
		}
	}

	newListChangeHandler = (event) => {
		let text = event.target.value;
		this.setState({currentNewListInputText: text})
	}

	addNewList = () => {
		let newTodoListObj = {
		  id: new Date().getTime(),
          title: this.state.currentNewListInputText,
          path: '',
          isShown: true
		}

		let oldTodoLists = [...this.state.todoLists]

		for(let i = 0; i < oldTodoLists.length; i++){
			if(oldTodoLists[i].isShown){
				oldTodoLists[i].isShown=false;
			}
		}

		oldTodoLists.push(newTodoListObj);
		this.addNewListWrapperHandle();
		this.setState({todoLists: oldTodoLists, currentNewListInputText: ''})
	}

	showRemovePopUp = (id) => {
		document.getElementById('popUpContainer').style.display="block";
		document.getElementById('cover').style.display="block";
		this.setState({currentListId: id});
	}

	hideRemovePopUp = () => {
		document.getElementById('popUpContainer').style.display="none";
		document.getElementById('cover').style.display="none";
	}


	removeTodoList = () => {

		let oldTodoLists = [...this.state.todoLists];
		let id = this.state.currentListId;
		let index = oldTodoLists.findIndex(el=>el.id==id);
		oldTodoLists.splice(index, 1);

		if(oldTodoLists.length>0){
		oldTodoLists[oldTodoLists.length-1].isShown=true;
		}

		this.hideRemovePopUp();
		this.setState({todoLists: oldTodoLists});
	}

	// Edit todoList title

	changeTitle = (id, newTitle) => {
		let oldtodoLists = [...this.state.todoLists];
		let index = oldtodoLists.findIndex(el=>el.id==id);
		oldtodoLists[index].title = newTitle;
		this.setState({todoLists: oldtodoLists});
		document.getElementById('todoListTitle').style.display="block";
		document.getElementById('editTodoListTitleWraper').style.display="none";
	}

	

	// _________


	render(){


		let popUpMessage = (
			<div id="popUpContainer" className={classes.popUpContainer}>
				<p className={classes.popUpContainer_message}>Are you sure you want to delete this todoList?</p>
				<button onClick={this.removeTodoList} className={classes.yesBtn}>YES</button>
				<button onClick={this.hideRemovePopUp} className={classes.noBtn}>NO</button>
				<a onClick={this.hideRemovePopUp} href="#" className={classes.close}/>
			</div>
		)

		let ToDoLists;

		if(this.state.todoLists.length>0){
			ToDoLists = this.state.todoLists.map(el=>
				<TodoList 
					showRemovePopUp={this.showRemovePopUp}
					isShown={el.isShown}
					title={el.title}
					id={el.id}
					changeTitle={this.changeTitle}/>
			)
		}	
		else if(this.state.todoLists.length==0){
			ToDoLists = 
			<div>
				<h2 className={classes.addNewListMessage}>Add a new todoList.</h2>
			</div>
		}


		let listTabs = this.state.todoLists.map(el=>
			<ListTab 
				isShown={el.isShown}
				title={el.title}
				showToDoList={() => this.showToDoList(el.id)}/>
			)
				
		return(
			<div>
				<div className={classes.menuContainer}>
					<ul className={classes.listMenu}>
						{listTabs}
						<li>
							<div id="addNewListWrapper" style={{display: 'none'}}>
							<input 
								style={{width: '100px'}}
								value={this.state.currentNewListInputText}
								type="text"
								placeholder="Title"
								onChange={(event) => this.newListChangeHandler(event)}/>
								<button onClick={this.addNewList}>OK</button>
							</div>	
						</li>	
					<li onClick={this.addNewListWrapperHandle}>
						<span className={classes.plus}>+</span>
						New List
					</li>
					</ul>
				</div>
					{ToDoLists}
					{popUpMessage}

					<div 
					id="cover" 
					className={classes.cover}
					onClick={this.hideRe