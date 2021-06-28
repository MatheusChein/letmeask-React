import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  
  return (
    <>
      <Router>
        <ThemeContextProvider>
          <AuthContextProvider>
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/rooms/new' exact component={NewRoom}/>
              <Route path='/rooms/:id' exact component={Room}/>
              <Route path='/admin/rooms/:id' component={AdminRoom}/>
            </Switch>
          </AuthContextProvider>
        </ThemeContextProvider>
      </Router>
    </>
  );
}

export default App;
