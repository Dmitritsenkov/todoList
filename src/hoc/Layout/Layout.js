import React, {Component} from 'react';

import Toolbar  from '../../Components/Toolbar/Toolbar';
import Aux  from '../Auxiliary/auxiliary';


class Layout extends Component{

	render(){

		return(
			<Aux>
				<Toolbar/>
				{this.props.children}
			</Aux>
			)

	}
}

export default Layout;