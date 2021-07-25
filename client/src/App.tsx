import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from '../src/pages/landing/Landing'
import Home from '../src/pages/home/Home'
import './App.css';
import MovieDetails from './pages/details/MovieDetails';

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
           <Route exact path='/' component={Landing}/>  
           <Route path='/home' component={Home}/>
           <Route  path='/movie/:id'  component={MovieDetails}/>
          </Switch>
          
          </div>
    </Router>
    
  );
}

export default App;
