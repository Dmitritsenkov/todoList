import React from 'react';
import classes from './Toolbar.module.css';

const Toolbar = () =>{
	return(
		<div className={classes.toolbar}>
			<span>ToDo Lists</span>
			<button>+ New List</button>
		</div>
		)
}

export default Toolbar;