import React from 'react';
import trash from '../../assets/images/trash.png';
import classes from './Task.module.css';

	const Task = (props) => {

		let isDone;
		props.checked ? isDone = classes.crossed : isDone = classes.notCrossed;


		return(
				<li className={classes.task}>
					<input 
						type="checkbox" 
						onChange={() => props.checkboxHandler(props.index)} 
						/>
					<span className={isDone}>{props.text}</span>
					<img 
						className={classes.trash} 
						src={trash}
						onClick={()=>props.removeTask(props.id)}/>
				</li>
			)
	}

export default Task;