import React from 'react';
import classes from './Toolbar.module.css';

const Toolbar = () =>{
	return(
		<div className={classes.toolbar}>
			<span className={classes.logo}>ToDo Lists</span>
			<button className={classes.newListBtn}><span className={classes.plus}>+</span> New List</button>
		</div>
		)
}

export default Toolbar;