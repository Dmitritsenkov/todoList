import React from 'react';
import classes from './Layout.module.css';

const Layout = (props) =>{
	return(
		<div>
			<div className={classes.toolbar}>
				<span className={classes.logo}>ToDo Lists</span>
			</div>
				{props.children}
		</div>	
		)
}

export default Layout;