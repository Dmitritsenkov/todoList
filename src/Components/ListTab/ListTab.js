import React from 'react';
import classes from './ListTab.css';

const ListTab = (props) => {
	
	let isListTabClicked;

	if(props.isShown){
		isListTabClicked = 'tabClicked';
	}
	else{
		isListTabClicked = 'tabIsNotClicked';
	}

  return (
	  	<li className={isListTabClicked} onClick={props.showToDoList}>{props.title}</li>
  );
}

export default ListTab;
