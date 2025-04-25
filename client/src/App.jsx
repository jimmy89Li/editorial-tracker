import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ItemForm from './Components/ItemForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/dashboard' Component={Dashboard} />
        <Route path='/content' Component={ItemForm} />
        <Route path='/content/:id' Component={ItemForm} />
        <Route path='/' Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
