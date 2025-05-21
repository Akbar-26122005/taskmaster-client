import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>logo</h1>
      </header>

      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/auth' Component={Auth} />
          <Route path='*' Component={NotFoundPage} />
        </Routes>
      </Router>

      <footer className='App-footer'>hello world</footer>
    </div>
  );
}

export default App;
