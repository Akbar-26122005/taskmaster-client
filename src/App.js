import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { LogIn, SignUp } from './pages/Auth';
import NotFoundPage from './pages/NotFoundPage';
import { MessageSystem } from './components/message';
import Tasks from './pages/Tasks';
import { useEffect, useState } from 'react';
import ControlPanel from './components/controlPanel';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch('http://localhost:5050/auth/check', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok)
          throw new Error('Fetching failed');

        const data = await response.json();

        if (!data.isAuthenticated)
          throw new Error('User is not authenticated');

        if (!data.user)
          throw new Error('User is null');

        setUser(data.user);
      } catch (err) {
        setUser(null);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, []);

  if (loading) return null;

  return (
    <div className="App">
      <header className={`App-header no-copy ${
          window.location.href.includes('/auth/')
          ? 'hide'
          : '' }`
        }>
        <h1 className="main-title">task master</h1>
        <ControlPanel user={user} />
      </header>

      <Router>
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='/auth/log-in' element={<LogIn _user={user} _setUser={setUser} />} />
          <Route path='/auth/sign-up' element={<SignUp _user={user} _setUser={setUser} />} />
          <Route path='/tasks/:id' element={<Tasks user={user} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>

      <footer className={`App-footer ${
          window.location.href.includes('/auth/')
          || user
          ? 'hide'
          : ''}`
        }>hello world</footer>

      {<MessageSystem />}
    </div>
  );
}

export default App;
