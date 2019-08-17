import React from 'react';

import Layout from './hoc/Layout/Layout';
import TodoList from './Containers/TodoList/TodoList';

function App() {
  return (
    <Layout>
      <TodoList/>
    </Layout>
  );
}

export default App;
