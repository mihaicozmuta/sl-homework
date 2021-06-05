import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/LoadingList';
import Navbar from './components/Navigation'
function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/mihaicozmuta/repos`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);
  
  return (
    <div className='App'>
      <Navbar/>
      <div className='container'>
        <h1>Repositories</h1>
      </div>
      <div>
        <input type="text" placeholder="username" />
        <button>Search</button>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
    </div>
  );
}
export default App;