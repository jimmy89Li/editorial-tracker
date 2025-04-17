import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './assets/Components/Login';
import Dashboard from './assets/Components/Dashboard';
import ItemForm from './assets/Components/ItemForm';

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
