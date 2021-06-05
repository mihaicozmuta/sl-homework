import React from 'react';
import Navbar from './components/Navigation';
import Users from './components/Users';
import Search from './components/Search';
import Alert from './components/Alert'
import axios from 'axios';

import './App.css';

class App extends React.Component{
  state = {
    users: [],
    loading: false,
    alert: null
  }

  searchUsers = async (text) => {
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
                                client_id= ${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users:res.data.items, loading:false});
  }
x
  clearUsers = () => {
    this.setState({users:[], loading:false});
  }

  //Set alert for empty field
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});

    setTimeout(() => this.setState({alert: null}), 3000);
  };

  render(){
    const {users, loading} = this.state;
    return (
      //jsx
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true : false }
                  setAlert={this.setAlert}/>
                  
          <Users loading={loading} users={users}/>
        </div>    
      </div>
    );
  }

  
}

export default App;
