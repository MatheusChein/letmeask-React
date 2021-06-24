import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';

function App() {
  
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/rooms/new' component={NewRoom}/>
          </Switch>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
