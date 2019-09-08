import React from "react";

const StoreContext = React.createContext();

const createStore = WrappedComponent => {
  return class extends React.Component {
  	
    state = {

      listsMenu: [
        {
          title: 'Grocery list',
          currentInputText: '',
          tasks: [
            // {id, taskText, checked},
          ],
          path: '/grocery-list'
        },
       {
          title: 'Prject Tasks',
          currentInputText: '',
          tasks: [
            // {id, taskText, checked},
          ],
          path: '/project-tasks'
        },
      ],

      currentPath: ''

    };

    render() {
      return (
        <StoreContext.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </StoreContext.Provider>
      );
    }
  };
};
const withStore = WrappedComponent => {
  return class extends React.Component {
    render() {

      return (
        <StoreContext.Consumer>
          {context => <WrappedComponent store={context} {...this.props} />}
        </StoreContext.Consumer>
      );
    }
  };
};
export { createStore, withStore };
