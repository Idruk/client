import './App.css';
import client from './apoloClient'
import {
  ApolloProvider
} from "@apollo/client";

import {BrowserRouter as Router, Route} from "react-router-dom";

import DisplayTodo from './components/getTodo'
import TodoDetails from './components/todoDetails';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Route component={DisplayTodo} exact path='/'></Route>
          <Route component={TodoDetails} exact path='/detail/:id'></Route>
        </Router>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
