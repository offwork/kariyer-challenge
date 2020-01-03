import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Jobs from './jobs/Jobs';
import JobDetails from './jobs/JobDetails';

const App: React.FC = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Jobs} />
          <Route path="/:id" component={JobDetails}/>
        </Switch>
      </Router>
  );
}

export default App;
