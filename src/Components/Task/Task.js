import React from 'react';
import trash from '../../assets/images/trash.png';
import classes from './Task.module.css';

	const Task = (props) => {

		let isCrossed;
		props.checked ? isCrossed = classes.crossed : isCrossed = classes.notCrossed;

		let isTaskDone;
		props.checked ? isTaskDone = classes.task_done : isTaskDone = classes.task;

		return(
				<li className={`${classes.task} ${isTaskDone}`}>
					<input 
						className={classes.taskCheckBox}
						type="checkbox" 
						onChange={() => props.checkboxHandler(props.index)} 
						checked = {props.checked}
						/>

					<span className={`${isCrossed} ${classes.taskText}`}>{props.text}</span>
					<img 
						className={classes.trash} 
						src={trash}
						onClick={()=>props.removeTask(props.id)}/>
				</li>
			)
	}

export default Task;