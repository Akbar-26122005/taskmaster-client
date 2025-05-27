import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import NotFoundPage from './pages/NotFoundPage';
import { MessageSystem } from './components/message';
import Tasks from './pages/Tasks';
import { useEffect, useState } from 'react';
import ControlPanel from './components/controlPanel';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch('/check');

        if (!response.ok) {
          throw new Error('');
        }

        const data = await response.json();

        if (!data.isAuthenticated)
          throw new Error('');

        setUser();
      } catch (err) {
        setUser(null);
        return;
      }
    };

    fetchingData();
  }, []);

  return (
    <div className="App">
      <header className="App-header no-copy">
        <h1 className="main-title">task master</h1>
        {/* <div className="no-copy">
          <div className="user-name">Akbar</div>
          <div className="log-out-btn">Log out</div>
        </div> */}
        <ControlPanel user={user} />
      </header>

      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/auth' Component={Auth} />
          <Route path='/tasks/:id' Component={Tasks} />
          <Route path='*' Component={NotFoundPage} />
        </Routes>
      </Router>

      <footer className='App-footer'>hello world</footer>

      {<MessageSystem />}
    </div>
  );
}

export default App;
